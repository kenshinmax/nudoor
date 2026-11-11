import type { Metadata } from "next";
import { CheckIcon, ClockIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { FaqList } from "@/components/marketing/faq-list";
import { CheckoutButton } from "@/components/marketing/pricing-card";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/marketing/section";
import { healthCheck } from "@/content/health-check";
import { site } from "@/content/site";
import { getPackage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Payments Health Check",
  description: "A one-week, flat-price review of your Stripe account that finds lost revenue and wasted fees. $495.",
  path: "/health-check",
});

const faq = [
  { q: "What access do you need?", a: "Read-only access to your Stripe account. We'll walk you through granting it, and you can revoke it any time." },
  { q: "What if I'm not on Stripe yet?", a: "We'll review your current processor's setup and show what switching would change." },
  { q: "Can I put the fee toward a project?", a: "Yes. If you start a project within 60 days, the Health Check fee comes off the quote." },
];

export default function HealthCheckPage() {
  const pkg = getPackage("health-check");
  if (!pkg) throw new Error("Missing health-check package content");
  const price = formatPrice(pkg.price);
  return (
    <>
      <section className="bg-white py-14 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Fixed price · {healthCheck.turnaround}</Eyebrow>
            <h1 className="mt-3 text-[clamp(34px,4.6vw,54px)] leading-[1.08] font-extrabold tracking-tight">{healthCheck.title}</h1>
            <p className="mt-4 max-w-xl text-lg text-stone-600">{healthCheck.subtitle}</p>
            {site.flags.healthCheckGuarantee ? (
              <p className="mt-4 rounded-lg bg-muted px-4 py-3 text-sm font-medium text-stone-800">{healthCheck.guarantee}</p>
            ) : null}
          </div>
          <Card className="gap-0 rounded-2xl p-7 text-base shadow-[0_30px_60px_rgba(11,27,58,0.12)] ring-line">
            <p className="text-sm text-stone-500">One-time price</p>
            <p className="text-5xl font-extrabold">{price}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-stone-500">
              <ClockIcon aria-hidden className="size-4" /> {healthCheck.turnaround}
            </p>
            <ul className="mt-5 space-y-2">
              {pkg.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[15px]">
                  <CheckIcon aria-hidden className="mt-0.5 size-4 flex-none text-brand" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
            <CheckoutButton label={`Buy now · ${price}`} className="mt-6" />
            <p className="mt-3 text-center text-xs text-stone-500">Secure payment by Stripe. Card data never touches our servers.</p>
          </Card>
        </Container>
      </section>

      <Section labelledBy="checklist-title">
        <Container>
          <SectionHeader id="checklist-title" eyebrow="What we review" title="15 checks, one clear report" />
          <ol className="mx-auto grid max-w-4xl gap-x-8 gap-y-3 sm:grid-cols-2">
            {healthCheck.checklist.map((item, i) => (
              <li key={item} className="flex gap-3 rounded-lg border border-line bg-white px-4 py-3">
                <span className="font-mono text-sm font-bold text-foreground">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="white" labelledBy="sample-title">
        <Container>
          <SectionHeader id="sample-title" eyebrow="Sample report" title="Plain English, prioritized, with dollar estimates" />
          <div aria-hidden className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            {["Summary", "Top fixes", "Fee review"].map((title) => (
              <div key={title} className="rounded-xl border border-line bg-surface p-5">
                <p className="font-semibold">{title}</p>
                <div className="mt-3 space-y-2 blur-[3px] select-none">
                  <div className="h-2.5 w-full rounded bg-stone-300" />
                  <div className="h-2.5 w-5/6 rounded bg-stone-300" />
                  <div className="h-2.5 w-2/3 rounded bg-stone-300" />
                  <div className="h-8 w-1/2 rounded bg-stone-200" />
                  <div className="h-2.5 w-4/5 rounded bg-stone-300" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section labelledBy="hc-faq">
        <Container>
          <SectionHeader id="hc-faq" eyebrow="FAQ" title="Before you buy" />
          <FaqList items={faq} />
          <div className="mx-auto mt-10 max-w-sm">
            <CheckoutButton label={`Buy the Health Check · ${price}`} />
          </div>
        </Container>
      </Section>
    </>
  );
}
