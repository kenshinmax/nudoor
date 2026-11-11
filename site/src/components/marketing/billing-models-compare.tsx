import { Card } from "@/components/ui/card";

const models = [
  {
    key: "fixed",
    name: "Fixed",
    fits: "Customers pay the same amount every period.",
    examples: ["Studio memberships", "Monthly retainers", "Subscription boxes", "Tiered software plans"],
    setup: ["Plans and prices in Stripe Billing", "Trials, coupons, and plan changes", "Smart retries and card-update emails"],
    invoice: [
      ["Unlimited membership · Nov", "$129.00"],
      ["Total", "$129.00"],
    ],
  },
  {
    key: "usage",
    name: "Usage-based",
    fits: "Customers pay for what they use: sessions, seats, API calls, or hours.",
    examples: ["Pay-per-class or per-visit", "Per-seat software", "Metered API or credits", "Hourly support blocks"],
    setup: ["Billing meters connected to your app", "Usage reports and invoice previews", "Spending alerts and caps"],
    invoice: [
      ["Classes attended · 7 × $18", "$126.00"],
      ["Total", "$126.00"],
    ],
  },
  {
    key: "hybrid",
    name: "Hybrid",
    fits: "A base fee plus usage on top. Predictable revenue with room to grow.",
    examples: ["Base membership + extra classes", "Platform fee + per-seat", "Retainer + overage hours"],
    setup: ["A flat price and a metered price on one subscription", "Included usage and overage rates", "Clear invoices that show both"],
    invoice: [
      ["Base membership · Nov", "$79.00"],
      ["Extra classes · 3 × $15", "$45.00"],
      ["Total", "$124.00"],
    ],
  },
] as const;

const questions = [
  { q: "Does each customer get roughly the same value every month?", a: "Fixed is simplest." },
  { q: "Do some customers use far more than others?", a: "Usage-based keeps pricing fair." },
  { q: "Do you need predictable revenue but heavy users cost you more?", a: "Hybrid gives you both." },
];

export function BillingModelsCompare() {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3">
        {models.map((m) => (
          <Card key={m.key} className="gap-0 rounded-xl p-6 text-base ring-line" data-testid={`billing-model-${m.key}`}>
            <h3 className="text-xl font-bold">{m.name}</h3>
            <p className="mt-1 text-neutral-600">{m.fits}</p>
            <h4 className="mt-5 font-mono text-xs font-semibold tracking-[0.06em] text-neutral-500 uppercase">Good for</h4>
            <ul className="mt-2 list-disc pl-5 text-[15px] text-neutral-700">
              {m.examples.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <h4 className="mt-5 font-mono text-xs font-semibold tracking-[0.06em] text-neutral-500 uppercase">What we set up</h4>
            <ul className="mt-2 list-disc pl-5 text-[15px] text-neutral-700">
              {m.setup.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <h4 className="mt-5 font-mono text-xs font-semibold tracking-[0.06em] text-neutral-500 uppercase">Example invoice</h4>
            <table className="mt-2 w-full rounded-lg bg-surface font-mono text-[13px]">
              <tbody>
                {m.invoice.map(([label, amount], i) => (
                  <tr key={label} className={i === m.invoice.length - 1 ? "border-t border-line font-bold" : ""}>
                    <td className="px-3 py-2">{label}</td>
                    <td className="px-3 py-2 text-right">{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ))}
      </div>
      <div className="mt-10 rounded-xl border border-line bg-white p-6">
        <h3 className="text-lg font-bold">Which fits you?</h3>
        <ol className="mt-3 grid gap-3 md:grid-cols-3">
          {questions.map((x, i) => (
            <li key={x.q} className="rounded-lg bg-surface p-4">
              <span className="font-mono text-xs font-bold text-foreground">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-1 font-medium">{x.q}</p>
              <p className="text-sm text-neutral-500">{x.a}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-neutral-500">Not sure? We&apos;ll help you pick on a free call, and you can switch models later without moving customers.</p>
      </div>
    </div>
  );
}
