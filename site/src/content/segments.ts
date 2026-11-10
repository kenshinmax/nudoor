import type { z } from "zod";
import type { segmentContentSchema } from "./schema";

export const segmentsData: z.input<typeof segmentContentSchema>[] = [
  {
    slug: "local-services",
    title: "Local service businesses",
    short: "Clinics, salons, studios, and trades",
    intro: "Take deposits, keep a card on file, and get paid at the counter or on the job, all in one Stripe account.",
    pains: [
      { title: "No-shows cost you money", body: "Deposits and card-on-file make bookings stick." },
      { title: "Invoices sit unpaid", body: "Automatic reminders and pay-by-link invoices get you paid faster." },
      { title: "Online and in-person don't match", body: "One customer record across every way you take payment." },
    ],
    services: ["invoicing", "terminal", "checkout"],
    caseStudy: "fieldkit",
  },
  {
    slug: "online-shops",
    title: "Small online shops",
    short: "Ecommerce and direct-to-consumer brands",
    intro: "A fast checkout with wallets and fraud protection that fits your order sizes.",
    pains: [
      { title: "Shoppers drop off at checkout", body: "Wallets and Link cut checkout to a few taps." },
      { title: "Fraud eats thin margins", body: "Radar rules tuned to your typical orders." },
      { title: "Sales tax is guesswork", body: "Stripe Tax collects the right amount automatically." },
    ],
    services: ["checkout", "care", "migration"],
    caseStudy: "parcel-and-co",
  },
  {
    slug: "memberships",
    title: "Memberships and subscription boxes",
    short: "Studios, clubs, and recurring boxes",
    intro: "Recurring plans that renew on time, recover failed cards, and let members manage themselves.",
    pains: [
      { title: "Cards expire and members vanish", body: "Smart retries and card-update emails recover most of them." },
      { title: "Pausing and cancelling is manual", body: "A self-serve portal handles it without a phone call." },
    ],
    services: ["billing", "terminal", "migration"],
    caseStudy: "lumen-yoga",
  },
  {
    slug: "small-saas",
    title: "Small SaaS and digital tools",
    short: "Software and online tools with a small team",
    intro: "Plans, trials, and pricing that match how customers get value, without building billing yourself.",
    pains: [
      { title: "Billing code eats engineering time", body: "Stripe Billing handles plans, proration, and invoices." },
      { title: "Pricing is hard to change", body: "Change plans in the Dashboard without a deploy." },
    ],
    services: ["billing", "checkout", "care"],
  },
];
