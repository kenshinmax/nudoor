import type { Metadata } from "next";
import { CtaSection } from "@/components/marketing/cta-section";
import { Container, PageHero, Section } from "@/components/marketing/section";
import { ServiceGrid } from "@/components/marketing/service-card";
import { services } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Stripe services for small businesses",
  description: "Checkout, subscriptions, invoicing, in-person payments, processor switches, and care plans. Fixed prices for small businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything a small business needs to get paid"
        subtitle="Pick one service or combine a few. Every project gets a written scope and a fixed quote before we start."
      />
      <Section>
        <Container>
          <ServiceGrid services={services} />
          <p className="mt-8 text-sm text-slate-500">
            Running a marketplace or platform? We also set up Stripe Connect for seller onboarding and payouts, quoted per project.
          </p>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
