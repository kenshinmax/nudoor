import type { Metadata } from "next";
import { ShieldCheckIcon } from "lucide-react";
import { PartnerBadge } from "@/components/brand/partner-badge";
import { CtaSection } from "@/components/marketing/cta-section";
import { Container, PageHero, Section, SectionHeader } from "@/components/marketing/section";
import { StepsTimeline } from "@/components/marketing/steps-timeline";
import { TeamCard } from "@/components/marketing/team-card";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { team } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description: "A small team of certified Stripe developers helping small businesses get paid. Meet the team and see how we work.",
  path: "/about",
});

const security = [
  "We never see or store card numbers. Stripe-hosted fields send card data straight to Stripe.",
  "We use restricted, least-privilege API keys that you can revoke at any time.",
  "You own your Stripe account and data, always.",
  "NDAs available on request, and project access is removed at handover.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Small team. Senior people. Real names."
        subtitle={`${site.name} started because small businesses kept getting enterprise-sized quotes for simple payment problems. We fix them with flat prices, plain English, and the same senior engineer from start to finish.`}
      />
      <Section labelledBy="team-title">
        <Container>
          <SectionHeader id="team-title" eyebrow="The team" title="Who you'll work with" />
          <div className="grid gap-5 md:grid-cols-3">
            {team.map((m) => (
              <TeamCard key={m.name} member={m} showBio />
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white" labelledBy="process-title">
        <Container>
          <SectionHeader id="process-title" eyebrow="How we work" title="Clear scope, fixed price, no surprises" />
          <StepsTimeline steps={home.steps} />
        </Container>
      </Section>
      <Section labelledBy="security-title">
        <Container className="max-w-3xl">
          <h2 id="security-title" className="text-2xl font-bold">Security and trust</h2>
          <ul className="mt-5 space-y-3">
            {security.map((s) => (
              <li key={s} className="flex gap-3">
                <ShieldCheckIcon aria-hidden className="mt-0.5 size-5 flex-none text-emerald-600" />
                {s}
              </li>
            ))}
          </ul>
          {site.partnerStatus !== "none" ? (
            <div className="mt-10 rounded-xl border border-line bg-white p-6">
              <PartnerBadge />
              <p className="mt-3 text-slate-600">We&apos;re a member of the Stripe Partner Ecosystem on the Services track.</p>
            </div>
          ) : null}
          <p className="mt-10 text-slate-600">
            Based in the {site.areaServed}. Available {site.hours}. Email{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-indigo-600 hover:underline">
              {site.email}
            </a>
            .
          </p>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
