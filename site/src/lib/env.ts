import "server-only";
import { z } from "zod";

const optionalString = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().optional(),
);

const schema = z
  .object({
    NEXT_PUBLIC_SITE_URL: z.preprocess(
      (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
      z.url().optional(),
    ),
    STRIPE_SECRET_KEY: optionalString.refine(
      (v) => v === undefined || /^(sk|rk)_(test|live)_/.test(v),
      "STRIPE_SECRET_KEY must start with sk_test_, sk_live_, rk_test_, or rk_live_",
    ),
    STRIPE_WEBHOOK_SECRET: optionalString,
    STRIPE_PRICE_HEALTH_CHECK: optionalString,
    STRIPE_PAYMENT_LINK_HEALTH_CHECK: optionalString,
    STRIPE_TAX_ENABLED: z.enum(["true", "false"]).default("false"),
    RESEND_API_KEY: optionalString,
    EMAIL_FROM: optionalString,
    TEAM_EMAIL: optionalString,
    HUBSPOT_TOKEN: optionalString,
    TURNSTILE_SECRET_KEY: optionalString,
    REQUIRE_INTEGRATIONS: z.enum(["true", "false"]).default("false"),
  })
  .superRefine((env, ctx) => {
    if (env.REQUIRE_INTEGRATIONS !== "true") return;
    const required = [
      "NEXT_PUBLIC_SITE_URL",
      "STRIPE_SECRET_KEY",
      "STRIPE_WEBHOOK_SECRET",
      "STRIPE_PRICE_HEALTH_CHECK",
      "RESEND_API_KEY",
      "EMAIL_FROM",
      "TEAM_EMAIL",
      "HUBSPOT_TOKEN",
      "TURNSTILE_SECRET_KEY",
    ] as const;
    for (const key of required) {
      if (!env[key]) {
        ctx.addIssue({ code: "custom", path: [key], message: `${key} is required when REQUIRE_INTEGRATIONS=true` });
      }
    }
  });

export type ServerEnv = z.infer<typeof schema>;

export function readEnv(source: NodeJS.ProcessEnv = process.env): ServerEnv {
  const parsed = schema.safeParse(source);
  if (!parsed.success) {
    const details = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Invalid environment variables:\n${details}`);
  }
  return parsed.data;
}

export const env = readEnv();
