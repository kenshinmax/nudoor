import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CtaSection } from "@/components/marketing/cta-section";
import { Container, PageHero, Section } from "@/components/marketing/section";
import { posts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resources",
  description: "Plain-English guides and checklists for small businesses running payments on Stripe.",
  path: "/resources",
});

const dateFmt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });

export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Guides for getting paid" subtitle="Plain-English guides and checklists for small businesses on Stripe." />
      <Section>
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Card className="h-full gap-0 rounded-xl p-6 text-base ring-line">
                  <p className="font-mono text-xs font-semibold tracking-[0.06em] text-indigo-600 uppercase">{p.kind}</p>
                  <h2 className="mt-2 text-lg leading-snug font-bold">
                    <Link href={`/resources/${p.slug}`} className="hover:text-indigo-600">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-slate-500">{p.description}</p>
                  <p className="mt-auto pt-4 text-sm text-slate-500">
                    <time dateTime={p.date}>{dateFmt.format(new Date(`${p.date}T00:00:00Z`))}</time> · {p.readingMinutes} min read
                  </p>
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
