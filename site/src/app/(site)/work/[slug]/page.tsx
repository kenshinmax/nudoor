import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MetricGrid } from "@/components/marketing/case-study-feature";
import { CtaSection } from "@/components/marketing/cta-section";
import { ProductTags } from "@/components/marketing/product-tags";
import { Container, PageHero, Section } from "@/components/marketing/section";
import { caseStudies, getCaseStudy } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({ title: study.headline, description: study.summary.slice(0, 160), path: `/work/${study.slug}` });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return (
    <>
      <PageHero eyebrow={`Case study · ${study.industryLabel}`} title={study.headline} subtitle={study.summary} />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-2xl font-bold">The challenge</h2>
            {study.challenge.map((p) => (
              <p key={p} className="mt-3 text-neutral-700">
                {p}
              </p>
            ))}
            <h2 className="mt-10 text-2xl font-bold">What we built</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-700">
              {study.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <h2 className="mt-10 text-lg font-bold">Stripe products used</h2>
            <ProductTags products={study.products} className="mt-3" />
            {study.quote ? (
              <blockquote className="mt-10 border-l-[3px] border-neutral-900 pl-4 text-lg text-neutral-700 italic">
                <p>&ldquo;{study.quote.text}&rdquo;</p>
                <footer className="mt-2 text-sm text-neutral-500 not-italic">
                  — {study.quote.name}, {study.quote.role}
                </footer>
              </blockquote>
            ) : null}
          </div>
          <div className="h-fit rounded-3xl bg-ink p-6 md:p-8">
            <h2 className="mb-4 font-mono text-xs font-semibold tracking-[0.06em] text-neutral-300 uppercase">Results</h2>
            <MetricGrid metrics={study.metrics} />
          </div>
        </Container>
      </Section>
      <CtaSection title="Start a similar project" />
    </>
  );
}
