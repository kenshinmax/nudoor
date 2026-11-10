import { env } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { clientIp, rateLimit } from "@/lib/rate-limit";

function origin(request: Request) {
  return (env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin).replace(/\/$/, "");
}

export async function POST(request: Request) {
  if (!rateLimit(`checkout:${clientIp(request.headers)}`, 10, 60_000).ok) {
    return new Response("Too many requests. Please wait a minute and try again.", { status: 429 });
  }

  const base = origin(request);
  const stripe = getStripe();

  if (!stripe || !env.STRIPE_PRICE_HEALTH_CHECK) {
    if (env.STRIPE_PAYMENT_LINK_HEALTH_CHECK) return Response.redirect(env.STRIPE_PAYMENT_LINK_HEALTH_CHECK, 303);
    return Response.redirect(`${base}/health-check/unavailable`, 303);
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: env.STRIPE_PRICE_HEALTH_CHECK, quantity: 1 }],
      success_url: `${base}/health-check/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/health-check`,
      customer_creation: "always",
      allow_promotion_codes: true,
      automatic_tax: { enabled: env.STRIPE_TAX_ENABLED === "true" },
      custom_fields: [{ key: "company", label: { type: "custom", custom: "Company name" }, type: "text" }],
      metadata: { product: "health_check" },
    });
    if (!session.url) throw new Error("Checkout Session has no URL");
    return Response.redirect(session.url, 303);
  } catch (error) {
    console.error("[checkout] failed to create session:", error);
    return Response.redirect(`${base}/health-check/unavailable?reason=error`, 303);
  }
}
