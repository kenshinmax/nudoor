// @vitest-environment node
import { beforeAll, describe, expect, it } from "vitest";

let POST: (request: Request) => Promise<Response>;

beforeAll(async () => {
  delete process.env.STRIPE_SECRET_KEY;
  delete process.env.STRIPE_PAYMENT_LINK_HEALTH_CHECK;
  delete process.env.NEXT_PUBLIC_SITE_URL;
  ({ POST } = await import("@/app/api/checkout/route"));
});

const request = (ip: string) => new Request("http://localhost:3000/api/checkout", { method: "POST", headers: { "x-forwarded-for": ip } });

describe("checkout route without Stripe keys", () => {
  it("sends buyers to the unavailable page", async () => {
    const res = await POST(request("10.0.0.1"));
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("http://localhost:3000/health-check/unavailable");
  });

  it("rate limits repeated attempts from one IP", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 11; i++) statuses.push((await POST(request("10.0.0.2"))).status);
    expect(statuses.slice(0, 10).every((s) => s === 303)).toBe(true);
    expect(statuses[10]).toBe(429);
  });
});
