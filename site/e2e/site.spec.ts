import { expect, test } from "@playwright/test";

test.describe("site-wide checks", () => {
  test.beforeEach(({ isMobile }) => test.skip(isMobile, "Desktop only; no viewport dependence"));

  test("every sitemap page returns 200, has no broken internal links, and makes no partner claims", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const paths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
    expect(paths.length).toBeGreaterThan(20);
    for (const required of ["/", "/services", "/services/billing", "/health-check", "/work", "/pricing", "/about", "/contact", "/legal/privacy"]) {
      expect(paths).toContain(required);
    }

    const linked = new Set<string>();
    const partnerClaims: string[] = [];
    for (const path of paths) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      const html = await res.text();
      const visible = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
      if (/Stripe Partner/.test(visible)) partnerClaims.push(path);
      for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
        const href = m[1]!.replace(/&amp;/g, "&");
        if (href.startsWith("/_next/") || href.startsWith("//")) continue;
        linked.add(href.split("#")[0]!.split("?")[0]! || "/");
      }
    }
    expect(partnerClaims, 'Pages mentioning "Stripe Partner" while partnerStatus is "none"').toEqual([]);

    const broken: string[] = [];
    for (const href of linked) {
      if (/\.(png|ico|svg|webmanifest|xml|txt)$/.test(href) || href.startsWith("/api/")) continue;
      const res = await request.get(href);
      if (res.status() !== 200) broken.push(`${href} -> ${res.status()}`);
    }
    expect(broken).toEqual([]);
  });

  test("unknown pages return the 404 page", async ({ request, page }) => {
    expect((await request.get("/this-page-does-not-exist")).status()).toBe(404);
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByRole("link", { name: "See our services" })).toHaveAttribute("href", "/services");
  });

  test("security headers are set", async ({ request }) => {
    const res = await request.get("/");
    const headers = res.headers();
    expect(headers["content-security-policy"]).toContain("frame-ancestors");
    expect(headers["x-content-type-options"]).toBe("nosniff");
  });
});
