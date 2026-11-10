import { expect, test, type Page } from "@playwright/test";

async function choose(page: Page, label: string, option: string) {
  await page.getByLabel(label, { exact: true }).click();
  await page.getByRole("option", { name: option }).click();
}

test.describe("project brief form", () => {
  test("an empty submit shows inline errors and focuses the first one", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send project brief" }).click();
    await expect(page.getByText("Please enter your name")).toBeVisible();
    await expect(page.getByText("Enter a valid work email")).toBeVisible();
    await expect(page.getByText("Choose a business type")).toBeVisible();
    await expect(page.getByText("Please fix the highlighted fields.")).toBeVisible();
    await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
    await expect(page.getByLabel("Name", { exact: true })).toHaveAttribute("aria-invalid", "true");
  });

  test("a valid submit shows the confirmation", async ({ page }, testInfo) => {
    await page.goto("/contact");
    await page.getByLabel("Name", { exact: true }).fill("Sam Rivera");
    await page.getByLabel("Work email").fill(`e2e+${testInfo.project.name}-${Date.now()}@example.com`);
    await page.getByLabel("Company", { exact: true }).fill("Lumen Yoga");
    await page.getByLabel(/Website/).fill("lumenyoga.example");
    await choose(page, "Business type", "Memberships");
    await choose(page, "Current processor", "Square");
    await choose(page, "Monthly volume", "$10k–50k / month");
    await choose(page, "Timeline", "1–3 months");
    await choose(page, "Budget", "$1.5k–5k");
    await page.getByLabel("Billing (usage-based)").check();
    await page.getByLabel(/Anything else/).fill("Monthly membership plus drop-in classes.");
    await page.getByRole("button", { name: "Send project brief" }).click();
    await expect(page.getByTestId("brief-success")).toContainText("We've got your brief");
  });
});
