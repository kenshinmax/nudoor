import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/marketing/section";
import { site } from "@/content/site";

export function CtaSection({
  title = "Tell us what you're building",
  body = "Book a free 20-minute call. You'll leave with at least one concrete improvement, whether you hire us or not.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-16 md:py-[88px]" aria-labelledby="cta-title">
      <Container>
        <div className="rounded-3xl bg-linear-135 from-indigo-50 to-emerald-50 px-6 py-14 text-center md:p-16">
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <h2 id="cta-title" className="mt-2 text-[clamp(28px,3.2vw,40px)] font-bold tracking-tight">
            {title}
          </h2>
          <p className="mx-auto mt-3 mb-6 max-w-[560px] text-slate-500">{body}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="pill">
              <Link href={site.bookCallHref} data-track="cta_book_call">
                Book a call →
              </Link>
            </Button>
            <Button asChild size="pill" variant="outline" className="bg-white">
              <Link href="/contact#brief">Send a project brief</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
