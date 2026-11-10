import type { z } from "zod";
import type { packageSchema } from "./schema";

export const packagesData: z.input<typeof packageSchema>[] = [
  {
    id: "health-check",
    title: "Payments Health Check",
    tagline: "Find quick wins in a week.",
    price: 495,
    priceSuffix: "one-time",
    features: [
      "15-point account and checkout review",
      "Fees, fraud, and failed payment review",
      "A prioritized fix list with estimates",
      "60-minute walkthrough call",
    ],
    cta: { label: "Buy now", action: "checkout" },
  },
  {
    id: "get-paid-online",
    title: "Get Paid Online",
    tagline: "Go live on Stripe the right way.",
    price: 1500,
    plus: true,
    priceSuffix: "fixed quote",
    features: ["Checkout or Payment Links", "Receipts, wallets, and Tax", "A test plan and monitored go-live", "30 days of post-launch support"],
    cta: { label: "Get a quote", href: "/contact" },
    featured: true,
  },
  {
    id: "care-plan",
    title: "Care Plan",
    tagline: "Ongoing help from people who know your setup.",
    price: 299,
    plus: true,
    priceSuffix: "per month",
    features: ["Monitoring and alerts", "Fraud tuning and dispute help", "Stripe updates handled", "A monthly performance report"],
    cta: { label: "Talk to us", href: "/contact" },
  },
];
