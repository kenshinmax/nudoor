export const home = {
  hero: {
    eyebrow: "Stripe setup for small businesses",
    title: "Stripe, set up right the first time.",
    lead: "We're a small team of certified Stripe developers who help small businesses take payments online, in person, and on repeat, without the tech headaches.",
    noteBilling: "Fixed and usage-based billing, set up in Stripe",
    noteItems: ["Flat project prices", "You always own your account"],
  },
  flow: {
    nodes: [
      { title: "Checkout", subtitle: "Payment Element · Link · wallets", pill: "live" },
      { title: "Fraud screening", subtitle: "Radar rules tuned to your risk", pill: "−38% disputes" },
      { title: "Billing & Tax", subtitle: "Fixed plans · usage metering", pill: "automated" },
      { title: "Payouts", subtitle: "Straight to your bank", pill: "T+2" },
    ],
    metrics: [
      { value: "+3.1%", label: "auth rate" },
      { value: "−41%", label: "failed renewals" },
      { value: "2 wks", label: "to go-live" },
    ],
  },
  problems: {
    eyebrow: "Problems we fix",
    title: "Payments that quietly cost you money",
    subtitle: "Most small businesses use a fraction of what Stripe can do. We find the gaps and close them.",
    items: [
      { title: "Customers drop off at checkout", body: "Slow forms, missing wallets, no local payment methods." },
      { title: "Subscriptions fail to renew", body: "Expired cards and weak retry logic cause silent churn." },
      { title: "Fraud and disputes pile up", body: "Chargebacks that eat into thin margins." },
      { title: "Chasing unpaid invoices", body: "Manual reminders and no card on file." },
      { title: "Sales tax is guesswork", body: "Registering and collecting in the right places." },
      { title: "Stuck on an old processor", body: "Fear of losing saved cards and subscribers." },
    ],
  },
  steps: [
    { title: "Discover", body: "A free 20-minute call to understand your business and current setup." },
    { title: "Plan", body: "A written scope, timeline, and fixed quote within 3 business days." },
    { title: "Build & test", body: "We work in Stripe's test mode with weekly demos and a shared checklist." },
    { title: "Launch & support", body: "A monitored go-live, team handover docs, and 30 days of support." },
  ],
} as const;
