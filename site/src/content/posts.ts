import type { z } from "zod";
import type { postSchema } from "./schema";

export const postsData: z.input<typeof postSchema>[] = [
  {
    slug: "stripe-launch-checklist",
    title: "The Stripe launch checklist for small businesses",
    description: "Twelve things to check before you turn on live payments, from receipts to payout timing.",
    date: "2026-10-14",
    readingMinutes: 6,
    kind: "checklist",
    body: [
      { type: "p", text: "Most payment problems we fix could have been caught before launch. Use this list before you switch Stripe from test mode to live." },
      { type: "h2", text: "Account and payouts" },
      { type: "ul", items: ["Business details and statement descriptor match your brand", "Bank account verified and payout schedule chosen", "Team members invited with the least access they need"] },
      { type: "h2", text: "Checkout" },
      { type: "ul", items: ["Apple Pay, Google Pay, and Link turned on", "Receipts branded with your logo and support email", "Tax settings reviewed for every state or country you sell to"] },
      { type: "h2", text: "After the sale" },
      { type: "ul", items: ["Refund and dispute process written down", "Webhooks tested for every event your systems rely on", "A test purchase made end to end with a real card"] },
    ],
  },
  {
    slug: "why-subscription-renewals-fail",
    title: "Why subscription renewals fail (and how to fix them)",
    description: "Expired cards, bank declines, and weak retry logic quietly cost subscription businesses up to 9% of revenue.",
    date: "2026-09-30",
    readingMinutes: 5,
    kind: "guide",
    body: [
      { type: "p", text: "When a renewal fails, most customers didn't mean to leave. Their card expired, or their bank declined a charge it didn't recognize." },
      { type: "h2", text: "The three biggest causes" },
      { type: "ul", items: ["Expired or replaced cards", "Bank fraud checks on unfamiliar charges", "Retrying at the wrong time of day or month"] },
      { type: "h2", text: "What to turn on in Stripe" },
      { type: "ul", items: ["Smart Retries, which picks the best time to retry", "Card-update emails with a hosted page", "Automatic card updater for supported networks"] },
      { type: "p", text: "Together these usually recover a third or more of failed renewals without anyone on your team lifting a finger." },
    ],
  },
  {
    slug: "switching-to-stripe-without-losing-customers",
    title: "Switching to Stripe without losing customers",
    description: "How saved cards and subscriptions move between processors, and how to plan a cutover nobody notices.",
    date: "2026-09-02",
    readingMinutes: 7,
    kind: "guide",
    body: [
      { type: "p", text: "The biggest fear we hear about switching processors is losing saved cards. The good news: cards can move securely between processors without customers re-entering them." },
      { type: "h2", text: "How the move works" },
      { type: "ul", items: ["You request a secure card data export from your current processor", "Stripe imports it directly, so card numbers never touch your systems", "We recreate subscriptions on the same billing dates"] },
      { type: "h2", text: "Planning the cutover" },
      { type: "p", text: "Pick a quiet day, freeze plan changes for 48 hours, and keep the old processor live for refunds until the last renewal cycle has passed." },
    ],
  },
];
