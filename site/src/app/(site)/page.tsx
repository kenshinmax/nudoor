import { CaseStudyFeature } from "@/components/marketing/case-study-feature";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqList } from "@/components/marketing/faq-list";
import { Hero } from "@/components/marketing/hero";
import { PricingCard } from "@/components/marketing/pricing-card";
import { ProblemGrid } from "@/components/marketing/problem-grid";
import { Container, Section, SectionHeader } from "@/components/marketing/section";
import { ServiceGrid } from "@/components/marketing/service-card";
import { StepsTimeline } from "@/components/marketing/steps-timeline";
import { TeamCard } from "@/components/marketing/team-card";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { homeFaq } from "@/content/faq";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { featuredCaseStudy, packages, services, team } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <div data-section="hero">
        <Hero />
      </div>
      <div data-section="trust">
        <TrustStrip />
      </div>
      <div data-section="problems">
        <Section tone="white" labelledBy="problems-title">
          <Container>
            <SectionHeader id="problems-title" eyebrow={home.problems.eyebrow} title={home.problems.title} subtitle={home.problems.subtitle} />
            <ProblemGrid items={home.problems.items} />
          </Container>
        </Section>
      </div>
      <div data-section="services">
        <Section id="services" labelledBy="services-title">
          <Container>
            <SectionHeader id="services-title" eyebrow="Services" title="Everything a small business needs to get paid" />
            <ServiceGrid services={services} />
          </Container>
        </Section>
      </div>
      <div data-section="process">
        <Section tone="white" labelledBy="process-title">
          <Container>
            <SectionHeader id="process-title" eyebrow="How we work" title="Clear scope, fixed price, no surprises" />
            <StepsTimeline steps={home.steps} />
          </Container>
        </Section>
      </div>
      {featuredCaseStudy ? (
        <div data-section="case-study">
          <Section id="work">
            <Container>
              <CaseStudyFeature study={featuredCaseStudy} />
            </Container>
          </Section>
        </div>
      ) : null}
      <div data-section="pricing">
        <Section id="pricing" tone="white" labelledBy="pricing-title">
          <Container>
            <SectionHeader id="pricing-title" eyebrow="Packages" title="Small-business prices, published up front" subtitle="Every project gets a fixed quote. These are typical starting points." />
            <div className="grid gap-5 md:grid-cols-3">
              {packages.map((p) => (
                <PricingCard key={p.id} pkg={p} />
              ))}
            </div>
          </Container>
        </Section>
      </div>
      <div data-section="team">
        <Section id="team" labelledBy="team-title">
          <Container>
            <SectionHeader id="team-title" eyebrow="The team" title="Small team. Senior people. Real names." />
            <div className="grid gap-5 md:grid-cols-3">
              {team.map((m) => (
                <TeamCard key={m.name} member={m} />
              ))}
            </div>
          </Container>
        </Section>
      </div>
      <div data-section="faq">
        <Section id="faq" tone="white" labelledBy="faq-title">
          <Container>
            <SectionHeader id="faq-title" eyebrow="FAQ" title="Common questions" />
            <FaqList items={homeFaq(site.partnerStatus)} />
          </Container>
        </Section>
      </div>
      <div data-section="cta">
        <CtaSection />
      </div>
    </>
  );
}
