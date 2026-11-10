import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqList } from "@/components/marketing/faq-list";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Container, PageHero, Section, SectionHeader } from "@/components/marketing/section";
import { servicePriceLabel } from "@/components/marketing/service-card";
import { StepsTimeline } from "@/components/marketing/steps-timeline";
import { pricingFaq } from "@/content/faq";
import { packages, services } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description: "Published, fixed prices for Stripe setup and support for small businesses. Health Checks from $495, projects from $750.",
  path: "/pricing",
});

const quoting = [
  { title: "Free call", body: "20 minutes to understand what you need." },
  { title: "Written scope", body: "What we'll build, how long it takes, and what it costs." },
  { title: "Fixed quote", body: "50% to start, 50% at launch. No hourly surprises." },
  { title: "Change orders", body: "If the scope changes, we agree on it in writing first." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Small-business prices, published up front" subtitle="Start with a Health Check or go straight to a project. You'll always know the price before we start." />
      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {packages.map((p) => (
              <PricingCard key={p.id} pkg={p} />
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="white" labelledBy="all-services">
        <Container>
          <SectionHeader id="all-services" eyebrow="All services" title="Starting prices" />
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[560px] text-left">
              <thead className="bg-surface text-sm text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Service</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Price</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Timeline</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.slug} className="border-t border-line">
                    <th scope="row" className="px-5 py-3.5 font-semibold">
                      <Link href={`/services/${s.slug}`} className="hover:text-indigo-600">
                        {s.title}
                      </Link>
                    </th>
                    <td className="px-5 py-3.5">{servicePriceLabel(s)}</td>
                    <td className="px-5 py-3.5 text-slate-600">{s.timeline}</td>
                  </tr>
                ))}
                <tr className="border-t border-line text-slate-500">
                  <th scope="row" className="px-5 py-3.5 font-normal">Marketplaces (Connect) add-on</th>
                  <td className="px-5 py-3.5">Quoted</td>
                  <td className="px-5 py-3.5">4–8 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
      <Section labelledBy="quoting-title">
        <Container>
          <SectionHeader id="quoting-title" eyebrow="How quoting works" title="No hourly billing, no surprises" />
          <StepsTimeline steps={quoting} />
        </Container>
      </Section>
      <Section tone="white" labelledBy="pricing-faq">
        <Container>
          <SectionHeader id="pricing-faq" eyebrow="FAQ" title="Pricing questions" />
          <FaqList items={pricingFaq} />
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
