// @vitest-environment node
import Stripe from "stripe";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const secret = "whsec_test_secret";
const handleHealthCheckPaid = vi.fn(async () => {});
vi.mock("@/lib/fulfillment", () => ({ handleHealthCheckPaid }));

let POST: (request: Request) => Promise<Response>;
const stripe = new Stripe("sk_test_unit");

function event(id: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    object: "event",
    type: "checkout.session.completed",
    data: { object: { id: `cs_${id}`, object: "checkout.session", metadata: { product: "health_check" }, payment_status: "paid", ...overrides } },
  };
}

function signedRequest(body: object, signingSecret = secret) {
  const payload = JSON.stringify(body);
  const signature = stripe.webhooks.generateTestHeaderString({ payload, secret: signingSecret });
  return new Request("http://localhost/api/stripe/webhook", { method: "POST", body: payload, headers: { "stripe-signature": signature } });
}

beforeAll(async () => {
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_unit");
  vi.stubEnv("STRIPE_WEBHOOK_SECRET", secret);
  ({ POST } = await import("@/app/api/stripe/webhook/route"));
});
afterAll(() => vi.unstubAllEnvs());
beforeEach(() => handleHealthCheckPaid.mockClear());

describe("Stripe webhook", () => {
  it("rejects a request without a signature", async () => {
    const res = await POST(new Request("http://localhost/api/stripe/webhook", { method: "POST", body: "{}" }));
    expect(res.status).toBe(400);
  });

  it("rejects a bad signature", async () => {
    const res = await POST(signedRequest(event("evt_bad"), "whsec_wrong"));
    expect(res.status).toBe(400);
    expect(handleHealthCheckPaid).not.toHaveBeenCalled();
  });

  it("fulfills a paid Health Check once and ignores the duplicate", async () => {
    const first = await POST(signedRequest(event("evt_once")));
    expect(first.status).toBe(200);
    expect(await first.json()).toEqual({ received: true });
    expect(handleHealthCheckPaid).toHaveBeenCalledTimes(1);

    const second = await POST(signedRequest(event("evt_once")));
    expect(await second.json()).toEqual({ received: true, duplicate: true });
    expect(handleHealthCheckPaid).toHaveBeenCalledTimes(1);
  });

  it("skips unpaid or unrelated sessions", async () => {
    await POST(signedRequest(event("evt_unpaid", { payment_status: "unpaid" })));
    await POST(signedRequest(event("evt_other", { metadata: { product: "something-else" } })));
    expect(handleHealthCheckPaid).not.toHaveBeenCalled();
  });

  it("returns 500 so Stripe retries when fulfillment fails, then succeeds on retry", async () => {
    handleHealthCheckPaid.mockRejectedValueOnce(new Error("email down"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await POST(signedRequest(event("evt_retry")))).status).toBe(500);
    expect((await POST(signedRequest(event("evt_retry")))).status).toBe(200);
    expect(handleHealthCheckPaid).toHaveBeenCalledTimes(2);
  });
});
