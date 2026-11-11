import type { BillingModel } from "@/content/schema";

const labels: Record<BillingModel, string> = { fixed: "Fixed", usage: "Usage-based" };

export function BillingModelTag({ models }: { models?: readonly BillingModel[] }) {
  if (!models?.length) return null;
  return (
    <p data-billing-callout="tag" className="mb-3 flex items-center font-mono text-xs tracking-[0.02em] text-stone-700">
      <span className="sr-only">Billing models: </span>
      <span aria-hidden className="mr-2 size-[7px] rounded-full bg-muted0" />
      {models.map((m) => labels[m]).join(" · ")}
    </p>
  );
}
