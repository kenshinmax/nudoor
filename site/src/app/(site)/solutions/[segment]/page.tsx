import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyFeature } from "@/components/marketing/case-study-feature";
import { CtaSection } from "@/components/marketing/cta-section";
import { ProblemGrid } from "@/components/marketing/problem-grid";
import { Container, PageHero, Section, SectionHeader } from "@/components/marketing/section";
import { ServiceGrid } from "@/components/marketing/service-card";
import { getCaseStudy, getSegment, getService, segments } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return segments.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[segment]">): Promise<Metadata> {
  const { segment } = await params;
  const s = getSegment(segment);
  if (!s) return {};
  return pageMetadata({ title: `Stripe for ${s.title.toLowerCase()}`, description: s.intro, path: `/solutions/${s.slug}` });
}

export default async function SegmentPage({ params }: PageProps<"/solutions/[segment]">) {
  const { segment } = await params;
  const s = getSegment(segment);
  if (!s) notFound();
  const relevant = s.services.map((slug) => getService(slug)).filter((x) => x !== undefined);
  const study = s.caseStudy ? getCaseStudy(s.caseStudy) : undefined;
  return (
    <>
      <PageHero eyebrow={s.short} title={`Stripe for ${s.title.toLowerCase()}`} subtitle={s.intro} />
      <Section tone="white" labelledBy="pains-title">
        <Container>
          <SectionHeader id="pains-title" eyebrow="What we hear" title="Sound familiar?" />
          <ProblemGrid items={s.pains} />
        </Container>
      </Section>
      <Section labelledBy="seg-services">
        <Container>
          <SectionHeader id="seg-services" eyebrow="How we help" title="Services that fit" />
          <ServiceGrid services={relevant} />
        </Container>
      </Section>
      {study ? (
        <Section tone="white">
          <Container>
            <CaseStudyFeature study={study} />
          </Container>
        </Section>
      ) : null}
      <CtaSection />
    </>
  );
}
