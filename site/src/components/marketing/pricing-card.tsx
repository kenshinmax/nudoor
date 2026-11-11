import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Package } from "@/content/schema";
import { cn, formatPrice } from "@/lib/utils";

export function CheckoutButton({ label, className }: { label: string; className?: string }) {
  return (
    <form action="/api/checkout" method="post" className={className}>
      <Button type="submit" size="pill" className="w-full" data-track="checkout_started">
        {label}
      </Button>
    </form>
  );
}

export function PricingCard({ pkg }: { pkg: Package }) {
  return (
    <Card
      id={pkg.id}
      className={cn(
        "relative h-full gap-0 overflow-visible rounded-xl p-6 text-base ring-line",
        pkg.featured && "ring-2 ring-brand",
      )}
    >
      {pkg.featured ? (
        <Badge className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 text-xs font-bold">Most popular</Badge>
      ) : null}
      <h3 className="text-[19px] font-bold">{pkg.title}</h3>
      <p className="text-stone-500">{pkg.tagline}</p>
      <p className="mt-3 text-[34px] leading-tight font-extrabold">
        {formatPrice(pkg.price)}
        {pkg.plus ? "+" : ""}
      </p>
      <p className="text-sm text-stone-500">{pkg.priceSuffix}</p>
      <ul className="mt-4 mb-6 flex-1">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-2.5 border-b border-line py-2 text-[15px]">
            <CheckIcon aria-hidden className="mt-0.5 size-4 flex-none text-brand" strokeWidth={3} />
            {f}
          </li>
        ))}
      </ul>
      {"action" in pkg.cta ? (
        <CheckoutButton label={pkg.cta.label} />
      ) : (
        <Button asChild size="pill" variant={pkg.featured ? "default" : "outline"} className={cn(!pkg.featured && "bg-white")}>
          <Link href={pkg.cta.href}>{pkg.cta.label}</Link>
        </Button>
      )}
    </Card>
  );
}
