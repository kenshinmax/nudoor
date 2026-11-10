import type { Metadata } from "next";
import { CtaSection } from "@/components/marketing/cta-section";
import { Container, PageHero, Section } from "@/components/marketing/section";
import { WorkFilter } from "@/components/marketing/work-filter";
import { caseStudies, segmentLabels } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Case studies",
  description: "Real results from small businesses we've helped on Stripe: higher conversion, fewer failed renewals, and faster payment.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Our work" title="Small businesses, real results" subtitle="Every story here is shared with the client's written permission." />
      <Section>
        <Container>
          <WorkFilter studies={caseStudies} labels={segmentLabels} />
        </Container>
      </Section>
      <CtaSection title="Start a similar project" />
    </>
  );
}
