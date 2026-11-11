import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container, Eyebrow } from "@/components/marketing/section";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Container className="max-w-2xl py-20 md:py-28">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight">We couldn&apos;t find that page</h1>
          <p className="mt-3 text-stone-600">It may have moved. These are good places to start:</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="pill">
              <Link href="/services">See our services</Link>
            </Button>
            <Button asChild size="pill" variant="outline" className="bg-white">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
