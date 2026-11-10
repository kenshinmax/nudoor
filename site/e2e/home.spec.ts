import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders every section in order", async ({ page }) => {
    await page.goto("/");
    const sections = await page.locator("main [data-section]").evaluateAll((els) => els.map((e) => e.getAttribute("data-section")));
    expect(sections).toEqual(["hero", "trust", "problems", "services", "process", "case-study", "pricing", "team", "faq", "cta"]);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Stripe, set up right the first time.");
  });

  test("keeps the billing callout subtle", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator('[data-billing-callout="hero"]');
    await expect(hero).toHaveText(/Fixed and usage-based billing, set up in Stripe/);
    await expect(hero).toHaveAttribute("href", "/services/billing");
    await expect(page.locator('[data-billing-callout="tag"]')).toHaveCount(1);
    await expect(page.locator('[data-section="services"] [data-billing-callout="tag"]')).toHaveText(/Fixed · Usage-based/);

    const stray = await page.evaluate(() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const found: string[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const parent = node.parentElement;
        if (!parent || parent.closest("script, style")) continue;
        if (/usage-based/i.test(node.textContent ?? "") && !parent.closest("[data-billing-callout]")) found.push(node.textContent!.trim());
      }
      return found;
    });
    expect(stray).toEqual([]);
    // The callout dot is small text, not a styled button.
    const fontSize = await hero.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(fontSize).toBeGreaterThanOrEqual(13);
    expect(fontSize).toBeLessThanOrEqual(14);
  });

  test("hero note link opens the billing service page", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-billing-callout="hero"]').click();
    await expect(page).toHaveURL(/\/services\/billing$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("mobile menu", () => {
  test.beforeEach(({ isMobile }) => test.skip(!isMobile, "Mobile viewport only"));

  test("opens, traps focus, and closes on Escape", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Pricing" })).toBeVisible();

    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("navigates and closes after a link is chosen", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("has no horizontal scroll", async ({ page }) => {
    for (const path of ["/", "/services/billing", "/contact", "/pricing", "/health-check"]) {
      await page.goto(path);
      const width = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(width, path).toBeLessThanOrEqual(0);
    }
  });
});
