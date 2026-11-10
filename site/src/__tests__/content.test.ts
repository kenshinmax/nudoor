import { describe, expect, it } from "vitest";
import { caseStudySchema, servicesSchema, serviceSchema } from "@/content/schema";
import { servicesData } from "@/content/services";
import { caseStudies, services } from "@/lib/content";

const baseStudy = {
  slug: "test-study",
  client: "Test Co",
  segment: "online-shops",
  industryLabel: "Retail",
  headline: "Headline",
  summary: "Summary",
  challenge: ["Challenge"],
  built: ["Built"],
  products: ["Checkout"],
  metrics: [
    { value: "1", label: "a" },
    { value: "2", label: "b" },
    { value: "3", label: "c" },
  ],
};

const billing = servicesData.find((s) => s.slug === "billing")!;
const others = servicesData.filter((s) => s.slug !== "billing");

describe("case study content", () => {
  it("rejects a published case study without client approval", () => {
    const result = caseStudySchema.safeParse({ ...baseStudy, approvedByClient: false });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["approvedByClient"]);
  });

  it("allows an unapproved case study when it is a draft", () => {
    expect(caseStudySchema.safeParse({ ...baseStudy, approvedByClient: false, draft: true }).success).toBe(true);
  });

  it("accepts an approved case study", () => {
    expect(caseStudySchema.safeParse({ ...baseStudy, approvedByClient: true }).success).toBe(true);
  });

  it("publishes only non-draft, approved studies", () => {
    expect(caseStudies.length).toBeGreaterThan(0);
    for (const c of caseStudies) {
      expect(c.draft).toBe(false);
      expect(c.approvedByClient).toBe(true);
    }
  });
});

describe("service content", () => {
  it("parses the real services content", () => {
    expect(servicesSchema.safeParse(servicesData).success).toBe(true);
    expect(services.map((s) => s.slug)).toEqual(["checkout", "billing", "invoicing", "terminal", "migration", "care"]);
  });

  it.each(["title", "summary", "priceFrom", "includes", "seoDescription"] as const)("fails when %s is missing", (field) => {
    const broken: Record<string, unknown> = { ...billing };
    delete broken[field];
    expect(serviceSchema.safeParse(broken).success).toBe(false);
  });

  it("fails when a non-billing service sets billingModels", () => {
    const data = [billing, ...others.map((s, i) => (i === 0 ? { ...s, billingModels: ["fixed"] } : s))];
    const result = servicesSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toMatch(/Only the billing service/);
  });

  it("fails when more than two non-billing services have a footnote", () => {
    const data = [billing, ...others.map((s) => ({ ...s, footnote: "A note." }))];
    const result = servicesSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((i) => /At most 2/.test(i.message))).toBe(true);
  });

  it("fails on duplicate slugs", () => {
    expect(servicesSchema.safeParse([billing, billing]).success).toBe(false);
  });
});
