import { describe, expect, it } from "vitest";
import { briefInputFromFormData, validateBrief } from "@/lib/brief";

const valid = {
  name: "Sam Rivera",
  email: "sam@example.com",
  company: "Lumen Yoga",
  website: "lumenyoga.com",
  businessType: "memberships",
  processor: "square",
  volume: "10k-50k",
  interests: ["billing_fixed", "billing_usage"],
  timeline: "1-3-months",
  budget: "1.5k-5k",
  notes: "We bill a monthly membership plus drop-in classes.",
};

describe("brief schema", () => {
  it("accepts a complete brief and normalizes the website", () => {
    const result = validateBrief(valid);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.website).toBe("https://lumenyoga.com");
  });

  it("accepts a brief without optional fields", () => {
    const required: Record<string, unknown> = { ...valid };
    for (const key of ["website", "notes", "interests"]) delete required[key];
    const result = validateBrief(required);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.interests).toEqual([]);
  });

  it("keeps an explicit https website", () => {
    const result = validateBrief({ ...valid, website: "https://shop.example.com/path" });
    expect(result.ok && result.data.website).toBe("https://shop.example.com/path");
  });

  const invalidCases: [string, unknown, RegExp][] = [
    ["name", "", /enter your name/],
    ["name", "A", /enter your name/],
    ["name", "x".repeat(81), /under 80/],
    ["email", "not-an-email", /valid work email/],
    ["email", "", /valid work email/],
    ["company", "", /company name/],
    ["company", "x".repeat(121), /.+/],
    ["website", "not a url", /valid website/],
    ["businessType", undefined, /business type/],
    ["businessType", "casino", /business type/],
    ["processor", undefined, /processor/],
    ["processor", "venmo", /processor/],
    ["volume", undefined, /monthly volume/],
    ["volume", "1m", /monthly volume/],
    ["interests", ["crypto"], /.+/],
    ["interests", "billing_fixed", /.+/],
    ["timeline", undefined, /timeline/],
    ["timeline", "someday", /timeline/],
    ["budget", undefined, /budget/],
    ["budget", "free", /budget/],
    ["notes", "x".repeat(2001), /under 2,000/],
  ];

  it.each(invalidCases)("rejects an invalid %s (%j)", (field, value, message) => {
    const result = validateBrief({ ...valid, [field]: value });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      const errors = result.fieldErrors[field as keyof typeof result.fieldErrors];
      expect(errors?.[0]).toMatch(message);
      expect(Object.keys(result.fieldErrors)).toEqual([field]);
    }
  });
});

describe("briefInputFromFormData", () => {
  it("trims values, drops blanks, and collects every interest", () => {
    const fd = new FormData();
    fd.set("name", "  Sam Rivera ");
    fd.set("email", "sam@example.com");
    fd.set("company", "Lumen");
    fd.set("website", "   ");
    fd.append("interests", "checkout");
    fd.append("interests", "billing_usage");
    const input = briefInputFromFormData(fd);
    expect(input.name).toBe("Sam Rivera");
    expect(input.website).toBeUndefined();
    expect(input.notes).toBeUndefined();
    expect(input.interests).toEqual(["checkout", "billing_usage"]);
  });
});
