import "server-only";
import type Stripe from "stripe";
import { upsertLead } from "@/lib/crm";
import { notifyTeam, sendEmail } from "@/lib/email";
import { site } from "@/content/site";

export async function handleHealthCheckPaid(session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email ?? undefined;
  const name = session.customer_details?.name ?? undefined;
  const company = session.custom_fields?.find((f) => f.key === "company")?.text?.value ?? undefined;
  const amount = session.amount_total != null ? `$${(session.amount_total / 100).toFixed(2)}` : "unknown amount";

  const optional: Promise<unknown>[] = [];
  if (email) {
    optional.push(
      sendEmail({
        to: email,
        subject: "Your Payments Health Check is booked",
        replyTo: site.email,
        text: [
          `Hi${name ? ` ${name.split(" ")[0]}` : ""},`,
          "",
          "Thanks for booking a Payments Health Check. Here's what happens next:",
          "1. We'll email you within one business day to schedule a 20-minute kickoff.",
          "2. You'll grant us read-only access to your Stripe account (we'll show you how).",
          "3. Your report arrives within 5 business days, followed by a walkthrough call.",
          "",
          `— The ${site.name} team`,
        ].join("\n"),
      }),
      upsertLead({ email, name, company, source: "health_check", tags: ["health_check"] }),
    );
  }

  // The team notification is the one step that must succeed; if it throws, the webhook
  // returns 500 and Stripe retries. Customer email and CRM failures are logged only, so a
  // retry doesn't send the customer duplicate emails.
  const [team, ...rest] = await Promise.allSettled([
    notifyTeam(
      `New Health Check: ${company ?? email ?? session.id}`,
      [`Session: ${session.id}`, `Customer: ${name ?? "-"} <${email ?? "-"}>`, `Company: ${company ?? "-"}`, `Amount: ${amount}`].join("\n"),
    ),
    ...optional,
  ]);
  for (const r of rest) if (r.status === "rejected") console.error("[fulfillment] non-critical step failed:", r.reason);
  if (team.status === "rejected") throw team.reason;
}
