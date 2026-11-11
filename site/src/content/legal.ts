import type { z } from "zod";
import type { legalPageSchema } from "./schema";

// Starting templates only. Have a lawyer review before launch.
export const legalData: z.input<typeof legalPageSchema>[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    updated: "2026-11-01",
    sections: [
      { heading: "What we collect", body: ["When you book a call, send a project brief, or buy a Health Check, we collect your name, email, company details, and what you tell us about your project."] },
      { heading: "How we use it", body: ["We use your information to reply to you, deliver the work you buy, and send occasional updates you can opt out of."] },
      { heading: "Payment data", body: ["Payments are processed by Stripe. Card details go directly to Stripe and never reach our servers."] },
      { heading: "Service providers", body: ["We share data only with providers that help us run the business: Stripe (payments), Resend (email), HubSpot (customer records), Cal.com (scheduling), Cloudflare (spam protection), and Plausible (cookie-free analytics)."] },
      { heading: "Your choices", body: ["Email us to see, correct, or delete the information we hold about you."] },
    ],
  },
  {
    slug: "terms",
    title: "Terms of service",
    updated: "2026-11-01",
    sections: [
      { heading: "Our services", body: ["Project work is governed by a written statement of work and master services agreement signed before work starts."] },
      { heading: "Health Check purchases", body: ["Health Checks are delivered within the stated turnaround after we receive read-only access to your Stripe account."] },
      { heading: "Your Stripe account", body: ["You own your Stripe account and its data. You can revoke our access at any time."] },
    ],
  },
  {
    slug: "trademarks",
    title: "Trademarks",
    updated: "2026-11-01",
    sections: [
      { heading: "Stripe", body: ["Stripe and Stripe product names are trademarks of Stripe, Inc. We use them only to describe the products we work with."] },
      { heading: "Our relationship with Stripe", body: ["Nudoor Payments is an independent company. Any partner relationship with Stripe is stated explicitly on this site."] },
    ],
  },
];
