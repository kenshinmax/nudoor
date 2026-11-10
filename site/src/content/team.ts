import type { z } from "zod";
import type { teamMemberSchema } from "./schema";

// Set `earned: true` only for certifications a person actually holds; unearned ones are never shown.
export const teamData: z.input<typeof teamMemberSchema>[] = [
  {
    name: "Alex Rivera",
    role: "Founder · Payments architect",
    initials: "AR",
    bio: "Ten years building payments for small businesses, from corner shops to subscription startups.",
    certifications: [{ name: "Stripe Certified Professional Architect", earned: true }],
  },
  {
    name: "Sam Okafor",
    role: "Lead engineer",
    initials: "SO",
    bio: "Builds the checkouts, webhooks, and integrations, and runs every go-live.",
    certifications: [{ name: "Stripe Certified Professional Developer", earned: true }],
  },
  {
    name: "Priya Nair",
    role: "Engineer · Billing",
    initials: "PN",
    bio: "Specializes in subscriptions, metering, and moving customers between processors.",
    certifications: [
      { name: "Stripe Certified Professional Developer", earned: true },
      { name: "Stripe Certified Professional Architect", earned: false },
    ],
  },
];
