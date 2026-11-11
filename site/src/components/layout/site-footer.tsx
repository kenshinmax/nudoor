import Link from "next/link";
import { Container } from "@/components/marketing/section";
import { Logo } from "@/components/brand/logo";
import { partnerDisclaimer } from "@/components/brand/partner-badge";
import { site } from "@/content/site";

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "Health Check", href: "/health-check" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Trademarks", href: "/legal/trademarks" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-12 text-sm text-neutral-500">
      <Container>
        <div className="flex flex-wrap justify-between gap-6">
          <div>
            <Logo className="text-ink" />
            <p className="mt-2.5">
              <a href={`mailto:${site.email}`} className="hover:text-foreground">
                {site.email}
              </a>{" "}
              · {site.hours}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex max-w-xl flex-wrap gap-x-5 gap-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-6 max-w-[820px] text-xs">{partnerDisclaimer()}</p>
      </Container>
    </footer>
  );
}

export function FocusedFooter() {
  return (
    <footer className="border-t border-line py-8 text-xs text-neutral-500">
      <Container className="flex flex-wrap justify-between gap-4">
        <p className="max-w-[720px]">{partnerDisclaimer()}</p>
        <p className="flex gap-4">
          <Link href="/legal/privacy" className="hover:text-foreground">Privacy</Link>
          <Link href="/legal/terms" className="hover:text-foreground">Terms</Link>
        </p>
      </Container>
    </footer>
  );
}
