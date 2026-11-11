import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BillingModelsCompare } from "@/components/marketing/billing-models-compare";
import { CaseStudyFeature } from "@/components/marketing/case-study-feature";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqList } from "@/components/marketing/faq-list";
import { ProductTags } from "@/components/marketing/product-tags";
import { Container, PageHero, Section, SectionHeader } from "@/components/marketing/section";
import { servicePriceLabel } from "@/components/marketing/service-card";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import { getCaseStudy, getService, services } from "@/lib/content";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seoTitle, description: service.seoDescription, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const study = service.relatedCaseStudy ? getCaseStudy(service.relatedCaseStudy) : undefined;

  return (
    <>
      <PageHero eyebrow={service.title} title={service.heroTitle} subtitle={service.heroSubtitle}>
        <Button asChild size="pill">
          <Link href={site.bookCallHref} data-track="cta_book_call">
            Book a free call →
          </Link>
        </Button>
        <Button asChild size="pill" variant="outline" className="bg-white">
          <Link href="/contact#brief">Get a fixed quote</Link>
        </Button>
      </PageHero>

      <Section tone="white">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold">What&apos;s included</h2>
            <ul className="mt-4 space-y-2.5">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon aria-hidden className="mt-1 size-4 flex-none text-brand" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-2xl font-bold">Who it&apos;s for</h2>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-stone-700">
              {service.audience.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <Card className="h-fit gap-0 rounded-xl p-6 text-base ring-line">
            <p className="font-mono text-xs font-semibold tracking-[0.06em] text-stone-500 uppercase">Price</p>
            <p className="mt-1 text-3xl font-extrabold">{servicePriceLabel(service)}</p>
            <p className="mt-4 font-mono text-xs font-semibold tracking-[0.06em] text-stone-500 uppercase">Timeline</p>
            <p className="mt-1 font-semibold">{service.timeline}</p>
            <p className="mt-4 font-mono text-xs font-semibold tracking-[0.06em] text-stone-500 uppercase">You get</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-700">
              {service.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-xs font-semibold tracking-[0.06em] text-stone-500 uppercase">Stripe products</p>
            <ProductTags products={service.stripeProducts} className="mt-2" />
            <Button asChild size="pill" className="mt-6">
              <Link href="/contact#brief">Start with a quote</Link>
            </Button>
          </Card>
        </Container>
      </Section>

      {service.slug === "billing" ? (
        <Section labelledBy="models-title">
          <Container>
            <SectionHeader
              id="models-title"
              eyebrow="Billing models"
              title="Fixed, usage-based, or both"
              subtitle="We set up whichever way you charge. Here's how the three models compare."
            />
            <BillingModelsCompare />
          </Container>
        </Section>
      ) : null}

      {study ? (
        <Section tone={service.slug === "billing" ? "white" : "default"}>
          <Container>
            <CaseStudyFeature study={study} />
          </Container>
        </Section>
      ) : null}

      {service.faq.length ? (
        <Section tone={service.slug === "billing" ? "default" : "white"} labelledBy="service-faq">
          <Container>
            <SectionHeader id="service-faq" eyebrow="FAQ" title="Questions about this service" />
            <FaqList items={service.faq} />
          </Container>
        </Section>
      ) : null}

      <CtaSection />
      <JsonLd data={serviceJsonLd(service)} />
    </>
  );
}
