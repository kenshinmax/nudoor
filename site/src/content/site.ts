export type PartnerStatus = "none" | "partner" | "premier";

export const site = {
  name: "Brightline Payments",
  tagline: "Stripe setup for small businesses",
  description:
    "Certified Stripe developers who help small businesses take payments online, in person, and on repeat, without the tech headaches.",
  email: "hello@brightline.example",
  hours: "Mon–Fri, 9–6",
  areaServed: "United States",
  // Flip to "partner" only after Stripe accepts the application; this controls every partner mention on the site.
  partnerStatus: "none" as PartnerStatus,
  // Shows the yellow "placeholder content" banner. Turn off once names, numbers, and logos are real.
  previewBanner: true,
  flags: {
    healthCheckGuarantee: false,
  },
  stats: { label: "small businesses launched", value: "40+" },
  clientLogos: ["NORTHWIND", "LUMEN", "PARCEL&CO", "FIELDKIT"],
  nav: [
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Resources", href: "/resources" },
  ],
  bookCallHref: "/contact#book",
} as const;
