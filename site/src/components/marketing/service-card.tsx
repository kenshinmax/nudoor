import Link from "next/link";
import { Card } from "@/components/ui/card";
import { BillingModelTag } from "@/components/marketing/billing-model-tag";
import { ProductTags } from "@/components/marketing/product-tags";
import type { Service } from "@/content/schema";
import { formatPrice } from "@/lib/utils";

export function servicePriceLabel(service: Pick<Service, "priceFrom" | "priceUnit">) {
  return `From ${formatPrice(service.priceFrom)}${service.priceUnit === "month" ? "/mo" : ""}`;
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Card
      data-testid={`service-card-${service.slug}`}
      className="h-full gap-0 rounded-xl p-6 text-base shadow-[0_1px_2px_rgba(11,27,58,0.06),0_8px_24px_rgba(11,27,58,0.06)] ring-line"
    >
      <div className="mb-4 grid size-10 place-items-center rounded-[10px] bg-indigo-50 font-mono text-sm font-extrabold text-indigo-600">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="text-[19px] leading-snug font-bold">{service.title}</h3>
      <p className="mt-2 text-slate-500">{service.summary}</p>
      <ProductTags products={service.stripeProducts} className="mt-3.5 mb-4" />
      <BillingModelTag models={service.billingModels} />
      {service.footnote ? (
        <p data-billing-callout="footnote" className="mb-3 text-[13px] text-slate-500">
          {service.footnote}
        </p>
      ) : null}
      <p className="mt-auto font-bold">{servicePriceLabel(service)}</p>
      <Link href={`/services/${service.slug}`} className="mt-2 font-semibold text-indigo-600 hover:text-indigo-700">
        Learn more <span className="sr-only">about {service.title}</span>
        <span aria-hidden>→</span>
      </Link>
    </Card>
  );
}

export function ServiceGrid({ services }: { services: readonly Service[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <ServiceCard key={s.slug} service={s} index={i} />
      ))}
    </div>
  );
}
