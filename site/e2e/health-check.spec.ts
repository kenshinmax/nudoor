import { expect, test } from "@playwright/test";

const stripeConfigured = Boolean(process.env.E2E_STRIPE);

test.describe("Health Check purchase", () => {
  test("Buy goes to Stripe Checkout, or to the fallback page without keys", async ({ page }) => {
    await page.goto("/health-check");
    await page.getByRole("button", { name: /Buy/ }).first().click();
    if (stripeConfigured) {
      await expect(page).toHaveURL(/checkout\.stripe\.com|buy\.stripe\.com/, { timeout: 20_000 });
    } else {
      await expect(page).toHaveURL(/\/health-check\/unavailable$/);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("completes a test-mode purchase", async ({ page }) => {
    test.skip(!stripeConfigured, "Set E2E_STRIPE=1 with Stripe test keys to run");
    await page.goto("/health-check");
    await page.getByRole("button", { name: /Buy/ }).first().click();
    await page.waitForURL(/checkout\.stripe\.com/);
    await page.getByLabel("Email").fill(`e2e+${Date.now()}@example.com`);
    await page.getByPlaceholder("1234 1234 1234 1234").fill("4242424242424242");
    await page.getByPlaceholder("MM / YY").fill("12 / 34");
    await page.getByPlaceholder("CVC").fill("123");
    await page.getByLabel(/Cardholder name|Name on card/).fill("E2E Buyer");
    await page.getByLabel("Company name").fill("E2E Co");
    await page.getByTestId("hosted-payment-submit-button").click();
    await page.waitForURL(/\/health-check\/success/, { timeout: 60_000 });
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/booked|confirmed|thank/i);
  });

  test("success page without a session explains what happened", async ({ page }) => {
    const res = await page.goto("/health-check/success");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("webhook rejects unsigned requests", async ({ request }) => {
    const res = await request.post("/api/stripe/webhook", { data: { id: "evt_fake", type: "checkout.session.completed" } });
    expect([400, 503]).toContain(res.status());
  });
});
