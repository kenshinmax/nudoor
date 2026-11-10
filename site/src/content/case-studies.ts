import type { z } from "zod";
import type { caseStudySchema } from "./schema";

// Placeholder stories. Replace with real clients and keep written approval on file before publishing.
export const caseStudiesData: z.input<typeof caseStudySchema>[] = [
  {
    slug: "lumen-yoga",
    client: "Lumen Yoga",
    segment: "memberships",
    industryLabel: "Fitness studio",
    headline: "How Lumen Yoga cut failed renewals by 41%",
    summary:
      "Lumen is a 9-person studio. It was losing members to expired cards and selling class packs on a separate tool. In three weeks we moved memberships and class packs onto Stripe Billing, with smart retries and a customer portal.",
    challenge: [
      "Members churned silently when cards expired, and the front desk spent hours chasing them.",
      "Class packs lived in a separate tool, so the owner never saw one view of revenue.",
    ],
    built: [
      "Memberships and class packs moved onto Stripe Billing with the same renewal dates.",
      "Smart retries and card-update emails for failed renewals.",
      "A customer portal so members can pause, upgrade, or update cards themselves.",
      "Tap to Pay at the front desk for drop-ins.",
    ],
    products: ["Billing", "Customer portal", "Terminal"],
    metrics: [
      { value: "−41%", label: "involuntary churn" },
      { value: "+$2.4k", label: "monthly recovered revenue" },
      { value: "3 wks", label: "kickoff to launch" },
      { value: "0", label: "members lost in the switch" },
    ],
    quote: {
      text: "They found revenue we didn't know we were losing, and explained everything in plain English.",
      name: "Jordan Lee",
      role: "Owner, Lumen Yoga",
    },
    approvedByClient: true,
    featured: true,
  },
  {
    slug: "parcel-and-co",
    client: "Parcel & Co",
    segment: "online-shops",
    industryLabel: "Online shop",
    headline: "How Parcel & Co lifted checkout conversion by 18%",
    summary:
      "A 4-person stationery shop with a slow, card-only checkout. We moved them to Stripe Checkout with wallets and Link, and tuned fraud rules for their order sizes.",
    challenge: ["Mobile shoppers abandoned a long, card-only form.", "Small-dollar card testing attacks drove up disputes."],
    built: ["Stripe Checkout with Apple Pay, Google Pay, and Link.", "Radar rules tuned to typical order values.", "Stripe Tax for multi-state sales tax."],
    products: ["Checkout", "Link", "Radar", "Tax"],
    metrics: [
      { value: "+18%", label: "checkout conversion" },
      { value: "−52%", label: "disputes" },
      { value: "9 days", label: "to go-live" },
    ],
    quote: { text: "Checkout went from our biggest worry to something we never think about.", name: "Sam Patel", role: "Co-founder, Parcel & Co" },
    approvedByClient: true,
  },
  {
    slug: "fieldkit",
    client: "Fieldkit Plumbing",
    segment: "local-services",
    industryLabel: "Trades",
    headline: "How Fieldkit Plumbing started getting paid on the spot",
    summary:
      "A 12-van plumbing company waiting weeks on paper invoices. We set up Tap to Pay for technicians and Stripe invoices with automatic reminders for larger jobs.",
    challenge: ["Technicians left jobs without payment.", "Office staff chased invoices by phone every week."],
    built: ["Tap to Pay on iPhone for every technician.", "Stripe invoices with deposits and automatic reminders.", "QuickBooks sync for the bookkeeper."],
    products: ["Terminal", "Invoicing", "Payment Links"],
    metrics: [
      { value: "Same day", label: "typical time to payment" },
      { value: "−70%", label: "unpaid invoices" },
      { value: "2 wks", label: "kickoff to launch" },
    ],
    approvedByClient: true,
  },
];
