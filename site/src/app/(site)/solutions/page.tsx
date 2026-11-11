import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CtaSection } from "@/components/marketing/cta-section";
import { Container, PageHero, Section } from "@/components/marketing/section";
import { segments } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Stripe solutions by business type",
  description: "How we help local service businesses, online shops, memberships, and small SaaS teams get more from Stripe.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow="Solutions" title="Built for the way your business gets paid" subtitle="Small businesses aren't all alike. Pick the one that sounds most like you." />
      <Section>
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2">
            {segments.map((s) => (
              <li key={s.slug}>
                <Card className="h-full gap-0 rounded-xl p-6 text-base ring-line">
                  <p className="font-mono text-xs font-semibold tracking-[0.06em] text-foreground uppercase">{s.short}</p>
                  <h2 className="mt-2 text-xl font-bold">
                    <Link href={`/solutions/${s.slug}`} className="hover:text-foreground">
                      {s.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-neutral-500">{s.intro}</p>
                  <Link href={`/solutions/${s.slug}`} className="mt-4 font-semibold text-foreground hover:text-foreground" aria-hidden tabIndex={-1}>
                    See how we help →
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CtaSection />
    </>
  );
}
