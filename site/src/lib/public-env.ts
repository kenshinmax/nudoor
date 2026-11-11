// NEXT_PUBLIC_* values must be referenced literally so Next.js can inline them in client bundles.
export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://nudoor.example",
  calLink: process.env.NEXT_PUBLIC_CAL_LINK || "",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
};
