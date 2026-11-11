import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/marketing/section";
import { ProductTags } from "@/components/marketing/product-tags";
import type { CaseStudy } from "@/content/schema";

export function MetricGrid({ metrics }: { metrics: CaseStudy["metrics"] }) {
  return (
    <dl className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col-reverse rounded-[14px] border border-white/10 bg-white/5 p-5">
          <dt className="text-sm text-stone-300">{m.label}</dt>
          <dd className="font-mono text-[34px] leading-tight font-bold text-brand">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseStudyFeature({ study }: { study: CaseStudy }) {
  return (
    <div className="grid items-center gap-12 rounded-3xl bg-ink p-8 text-stone-200 md:p-14 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <Eyebrow className="text-stone-300">Case study · {study.industryLabel}</Eyebrow>
        <h2 className="mt-2 text-[clamp(28px,3.2vw,40px)] leading-tight font-bold tracking-tight text-white">{study.headline}</h2>
        <p className="mt-3">{study.summary}</p>
        <ProductTags products={study.products} dark className="mt-4" />
        {study.quote ? (
          <blockquote className="mt-5 border-l-[3px] border-brand pl-4 text-stone-300 italic">
            <p>&ldquo;{study.quote.text}&rdquo;</p>
            <footer className="mt-1 text-sm not-italic">
              — {study.quote.name}, {study.quote.role}
            </footer>
          </blockquote>
        ) : null}
        <Button asChild size="pill" variant="outline" className="mt-6 bg-white text-ink hover:bg-stone-100">
          <Link href={`/work/${study.slug}`}>Read the case study →</Link>
        </Button>
      </div>
      <MetricGrid metrics={study.metrics} />
    </div>
  );
}
