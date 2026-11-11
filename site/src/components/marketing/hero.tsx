import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/marketing/section";
import { FlowDiagram } from "@/components/marketing/flow-diagram";
import { HeroNote } from "@/components/marketing/hero-note";
import { home } from "@/content/home";
import { site } from "@/content/site";

export function Hero() {
  const { hero, flow } = home;
  return (
    <section className="py-16 md:py-20">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-3 text-[clamp(36px,5vw,58px)] leading-[1.08] font-extrabold tracking-tight text-balance">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-[540px] text-lg leading-relaxed text-neutral-700 md:text-[19px]">{hero.lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="pill">
              <Link href={site.bookCallHref} data-track="cta_book_call">
                Book a free 20-min call <span aria-hidden>→</span>
              </Link>
            </Button>
            <Button asChild size="pill" variant="outline" className="bg-white">
              <Link href="/health-check" data-track="cta_health_check">
                Get a Payments Health Check
              </Link>
            </Button>
          </div>
          <HeroNote billing={hero.noteBilling} items={hero.noteItems} />
        </div>
        <FlowDiagram nodes={flow.nodes} metrics={flow.metrics} />
      </Container>
    </section>
  );
}
