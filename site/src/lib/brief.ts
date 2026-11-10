import { z } from "zod";

const option = <T extends string>(value: T, label: string) => ({ value, label });

export const businessTypeOptions = [
  option("local-services", "Local services"),
  option("online-shop", "Online shop"),
  option("memberships", "Memberships"),
  option("small-saas", "Small SaaS"),
  option("other", "Other"),
];
export const processorOptions = [
  option("none", "None yet"),
  option("stripe", "Stripe"),
  option("square", "Square"),
  option("paypal", "PayPal"),
  option("other", "Other"),
];
export const volumeOptions = [
  option("under-10k", "Under $10k / month"),
  option("10k-50k", "$10k–50k / month"),
  option("50k-250k", "$50k–250k / month"),
  option("250k-plus", "$250k+ / month"),
];
export const interestOptions = [
  option("checkout", "Get paid online"),
  option("billing_fixed", "Billing (fixed)"),
  option("billing_usage", "Billing (usage-based)"),
  option("invoicing", "Invoicing"),
  option("terminal", "In-person payments"),
  option("migration", "Switch to Stripe"),
  option("care", "Care plan"),
];
export const timelineOptions = [option("asap", "ASAP"), option("1-3-months", "1–3 months"), option("exploring", "Just exploring")];
export const budgetOptions = [
  option("under-1.5k", "Under $1.5k"),
  option("1.5k-5k", "$1.5k–5k"),
  option("5k-15k", "$5k–15k"),
  option("15k-plus", "$15k+"),
];

const values = (opts: { value: string }[]) => opts.map((o) => o.value) as [string, ...string[]];

const withProtocol = (v: unknown) => {
  if (typeof v !== "string") return v;
  const t = v.trim();
  if (!t) return undefined;
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
};

export const briefSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Keep your name under 80 characters"),
  email: z.email("Enter a valid work email"),
  company: z.string().trim().min(1, "Please enter your company name").max(120),
  website: z.preprocess(withProtocol, z.url("Enter a valid website, like example.com").optional()),
  businessType: z.enum(values(businessTypeOptions), { error: "Choose a business type" }),
  processor: z.enum(values(processorOptions), { error: "Choose your current processor" }),
  volume: z.enum(values(volumeOptions), { error: "Choose a monthly volume" }),
  interests: z.array(z.enum(values(interestOptions))).default([]),
  timeline: z.enum(values(timelineOptions), { error: "Choose a timeline" }),
  budget: z.enum(values(budgetOptions), { error: "Choose a budget range" }),
  notes: z.string().trim().max(2000, "Keep notes under 2,000 characters").optional(),
});

export type BriefInput = z.input<typeof briefSchema>;
export type Brief = z.output<typeof briefSchema>;
export type BriefField = keyof Brief;
export type BriefFieldErrors = Partial<Record<BriefField, string[]>>;

export type BriefState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: BriefFieldErrors };

export const initialBriefState: BriefState = { status: "idle" };

export const briefFieldOrder: BriefField[] = [
  "name",
  "email",
  "company",
  "website",
  "businessType",
  "processor",
  "volume",
  "interests",
  "timeline",
  "budget",
  "notes",
];

function text(fd: FormData, key: string): string | undefined {
  const v = fd.get(key);
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t === "" ? undefined : t;
}

export function briefInputFromFormData(fd: FormData): Record<string, unknown> {
  return {
    name: text(fd, "name") ?? "",
    email: text(fd, "email") ?? "",
    company: text(fd, "company") ?? "",
    website: text(fd, "website"),
    businessType: text(fd, "businessType"),
    processor: text(fd, "processor"),
    volume: text(fd, "volume"),
    interests: fd.getAll("interests").filter((v): v is string => typeof v === "string"),
    timeline: text(fd, "timeline"),
    budget: text(fd, "budget"),
    notes: text(fd, "notes"),
  };
}

export function validateBrief(input: Record<string, unknown>) {
  const parsed = briefSchema.safeParse(input);
  if (parsed.success) return { ok: true as const, data: parsed.data };
  return { ok: false as const, fieldErrors: z.flattenError(parsed.error).fieldErrors as BriefFieldErrors };
}

export function labelFor(options: { value: string; label: string }[], value?: string) {
  return options.find((o) => o.value === value)?.label ?? value ?? "";
}
