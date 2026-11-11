import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/marketing/section";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Checkout unavailable", robots: { index: false, follow: false } };

export default function CheckoutUnavailablePage() {
  return (
    <Container className="max-w-2xl py-16 md:py-24">
      <h1 className="text-3xl font-extrabold tracking-tight">Online checkout isn&apos;t available right now</h1>
      <p className="mt-3 text-stone-600">
        You haven&apos;t been charged. Book a quick call or email{" "}
        <a href={`mailto:${site.email}?subject=${encodeURIComponent("Payments Health Check")}`} className="font-semibold text-foreground hover:underline">
          {site.email}
        </a>{" "}
        and we&apos;ll send you a secure payment link.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button asChild size="pill">
          <Link href="/contact#book">Book a call</Link>
        </Button>
        <Button asChild size="pill" variant="outline" className="bg-white">
          <Link href="/health-check">Back to the Health Check</Link>
        </Button>
      </div>
    </Container>
  );
}
