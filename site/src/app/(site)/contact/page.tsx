import type { Metadata } from "next";
import { CalendarDaysIcon, MailIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BriefForm } from "@/components/forms/brief-form";
import { Container, PageHero, Section } from "@/components/marketing/section";
import { site } from "@/content/site";
import { publicEnv } from "@/lib/public-env";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Book a free 20-minute call or send a project brief. We reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what you're building" subtitle="Book a free 20-minute call, or send a brief and we'll reply within one business day with a scope and a fixed quote." />
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section id="book" aria-labelledby="book-title" className="scroll-mt-24">
            <Card className="gap-0 rounded-xl p-6 text-base ring-line">
              <h2 id="book-title" className="flex items-center gap-2 text-xl font-bold">
                <CalendarDaysIcon aria-hidden className="size-5 text-foreground" /> Book a free call
              </h2>
              <p className="mt-1 text-stone-500">20 minutes. You&apos;ll leave with at least one concrete improvement.</p>
              {publicEnv.calLink ? (
                <iframe
                  src={`https://cal.com/${publicEnv.calLink}?embed=true&theme=light`}
                  title="Book a 20-minute call"
                  loading="lazy"
                  className="mt-5 h-[640px] w-full rounded-lg border border-line"
                />
              ) : (
                <div className="mt-5 rounded-lg bg-surface p-5">
                  <p className="font-medium">Email us to pick a time</p>
                  <p className="mt-1 text-sm text-stone-500">We&apos;ll reply with a few slots within one business day.</p>
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent("Book a free call")}`}
                    className="mt-3 inline-flex items-center gap-2 font-semibold text-foreground hover:underline"
                    data-track="cta_book_call_email"
                  >
                    <MailIcon aria-hidden className="size-4" /> {site.email}
                  </a>
                </div>
              )}
            </Card>
          </section>
          <section id="brief" aria-labelledby="brief-title" className="scroll-mt-24">
            <Card className="gap-0 rounded-xl p-6 text-base ring-line">
              <h2 id="brief-title" className="text-xl font-bold">Send a project brief</h2>
              <p className="mt-1 mb-6 text-stone-500">A few details help us come back with a useful quote.</p>
              <BriefForm />
            </Card>
          </section>
        </Container>
      </Section>
    </>
  );
}
