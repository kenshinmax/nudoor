import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ProductTags } from "@/components/marketing/product-tags";
import type { CaseStudy } from "@/content/schema";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const lead = study.metrics[0]!;
  return (
    <Card className="h-full gap-0 rounded-xl p-6 text-base ring-line">
      <p className="font-mono text-xs font-semibold tracking-[0.06em] text-foreground uppercase">{study.industryLabel}</p>
      <h3 className="mt-2 text-lg leading-snug font-bold">
        <Link href={`/work/${study.slug}`} className="hover:text-foreground">
          {study.headline}
        </Link>
      </h3>
      <p className="mt-2 text-neutral-500">{study.summary}</p>
      <ProductTags products={study.products} className="mt-4" />
      <p className="mt-auto pt-5 font-mono text-2xl font-bold text-neutral-700">
        {lead.value} <span className="font-sans text-sm font-normal text-neutral-500">{lead.label}</span>
      </p>
    </Card>
  );
}
