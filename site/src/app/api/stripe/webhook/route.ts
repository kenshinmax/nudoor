import type Stripe from "stripe";
import { env } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { processedEvents } from "@/lib/processed-events";
import { handleHealthCheckPaid } from "@/lib/fulfillment";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
    return Response.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return Response.json({ error: "Missing Stripe-Signature header" }, { status: 400 });

  // The signature covers the exact bytes Stripe sent, so read the raw body before any parsing.
  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (await processedEvents.has(event.id)) {
    return Response.json({ received: true, duplicate: true });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      if (session.metadata?.product === "health_check" && session.payment_status === "paid") {
        await handleHealthCheckPaid(session);
      }
    }
  } catch (error) {
    console.error(`[webhook] ${event.type} ${event.id} failed:`, error);
    // A non-2xx response makes Stripe retry the event later.
    return Response.json({ error: "Processing failed" }, { status: 500 });
  }

  await processedEvents.add(event.id);
  return Response.json({ received: true });
}
