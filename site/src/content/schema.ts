import { z } from "zod";

export const segmentSlugs = ["local-services", "online-shops", "memberships", "small-saas"] as const;
export const segmentSchema = z.enum(segmentSlugs);
export type SegmentSlug = z.infer<typeof segmentSchema>;

export const billingModelSchema = z.enum(["fixed", "usage"]);
export type BillingModel = z.infer<typeof billingModelSchema>;

export const faqItemSchema = z.object({ q: z.string().min(1), a: z.string().min(1) });
export type FaqItem = z.infer<typeof faqItemSchema>;

export const serviceSlugs = ["checkout", "billing", "invoicing", "terminal", "migration", "care"] as const;

export const serviceSchema = z.object({
  slug: z.enum(serviceSlugs),
  order: z.number().int(),
  title: z.string().min(1),
  summary: z.string().min(1),
  heroTitle: z.string().min(1),
  heroSubtitle: z.string().min(1),
  audience: z.array(z.string()).min(1),
  stripeProducts: z.array(z.string()).min(1),
  billingModels: z.array(billingModelSchema).optional(),
  footnote: z.string().optional(),
  priceFrom: z.number().positive(),
  priceUnit: z.enum(["one-time", "month"]).default("one-time"),
  timeline: z.string().min(1),
  includes: z.array(z.string()).min(3),
  deliverables: z.array(z.string()).min(1),
  faq: z.array(faqItemSchema),
  segments: z.array(segmentSchema).min(1),
  relatedCaseStudy: z.string().optional(),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1).max(170),
});
export type Service = z.infer<typeof serviceSchema>;

// Billing models are a quiet callout: only the billing service carries the tag,
// and at most two other cards may carry a footnote.
export const servicesSchema = z.array(serviceSchema).superRefine((services, ctx) => {
  const slugs = new Set<string>();
  for (const s of services) {
    if (slugs.has(s.slug)) ctx.addIssue({ code: "custom", message: `Duplicate service slug: ${s.slug}` });
    slugs.add(s.slug);
    if (s.billingModels?.length && s.slug !== "billing") {
      ctx.addIssue({ code: "custom", message: `Only the billing service may set billingModels (found on ${s.slug})` });
    }
  }
  const footnotes = services.filter((s) => s.slug !== "billing" && s.footnote).length;
  if (footnotes > 2) ctx.addIssue({ code: "custom", message: `At most 2 non-billing services may have a footnote (found ${footnotes})` });
});

const ctaLinkSchema = z.object({ label: z.string(), href: z.string().startsWith("/") });
const ctaCheckoutSchema = z.object({ label: z.string(), action: z.literal("checkout") });

export const packageSchema = z.object({
  id: z.enum(["health-check", "get-paid-online", "care-plan"]),
  title: z.string(),
  tagline: z.string(),
  price: z.number().positive(),
  plus: z.boolean().default(false),
  priceSuffix: z.string(),
  features: z.array(z.string()).min(3),
  cta: z.union([ctaCheckoutSchema, ctaLinkSchema]),
  featured: z.boolean().default(false),
});
export type Package = z.infer<typeof packageSchema>;

export const caseStudySchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    client: z.string(),
    segment: segmentSchema,
    industryLabel: z.string(),
    headline: z.string(),
    summary: z.string(),
    challenge: z.array(z.string()).min(1),
    built: z.array(z.string()).min(1),
    products: z.array(z.string()).min(1),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).min(3).max(4),
    quote: z.object({ text: z.string(), name: z.string(), role: z.string() }).optional(),
    approvedByClient: z.boolean(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  })
  .superRefine((study, ctx) => {
    if (!study.draft && !study.approvedByClient) {
      ctx.addIssue({
        code: "custom",
        path: ["approvedByClient"],
        message: `Case study "${study.slug}" must have written client approval (approvedByClient: true) or be marked draft`,
      });
    }
  });
export type CaseStudy = z.infer<typeof caseStudySchema>;

export const certificationSchema = z.object({ name: z.string(), earned: z.boolean(), verifyUrl: z.url().optional() });

export const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  initials: z.string().min(1).max(3),
  bio: z.string(),
  certifications: z.array(certificationSchema),
});
export type TeamMember = z.infer<typeof teamMemberSchema>;

export const segmentContentSchema = z.object({
  slug: segmentSchema,
  title: z.string(),
  short: z.string(),
  intro: z.string(),
  pains: z.array(z.object({ title: z.string(), body: z.string() })).min(2),
  services: z.array(z.enum(serviceSlugs)).min(1),
  caseStudy: z.string().optional(),
});
export type SegmentContent = z.infer<typeof segmentContentSchema>;

const postBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("p"), text: z.string() }),
  z.object({ type: z.literal("h2"), text: z.string() }),
  z.object({ type: z.literal("ul"), items: z.array(z.string()).min(1) }),
]);
export type PostBlock = z.infer<typeof postBlockSchema>;

export const postSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  description: z.string().max(170),
  date: z.iso.date(),
  readingMinutes: z.number().int().positive(),
  kind: z.enum(["guide", "checklist"]),
  body: z.array(postBlockSchema).min(1),
});
export type Post = z.infer<typeof postSchema>;

export const legalPageSchema = z.object({
  slug: z.enum(["privacy", "terms", "trademarks"]),
  title: z.string(),
  updated: z.iso.date(),
  sections: z.array(z.object({ heading: z.string(), body: z.array(z.string()).min(1) })).min(1),
});
export type LegalPage = z.infer<typeof legalPageSchema>;
