import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/marketing/section";
import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur-md">
      <Container className="flex h-[68px] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-7 text-[15px]">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-neutral-700 hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="pill-sm" className="hidden sm:inline-flex sm:h-11 sm:px-5 sm:text-[15px]">
            <Link href={site.bookCallHref} data-track="cta_book_call">
              Book a call
            </Link>
          </Button>
          <MobileNav links={site.nav} />
        </div>
      </Container>
    </header>
  );
}

export function FocusedHeader() {
  return (
    <header className="border-b border-line bg-white">
      <Container className="flex h-[68px] items-center justify-between">
        <Logo />
        <Link href="/contact" className="text-sm font-medium text-neutral-600 hover:text-foreground">
          Questions? Talk to us
        </Link>
      </Container>
    </header>
  );
}
