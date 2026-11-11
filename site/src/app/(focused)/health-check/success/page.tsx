import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/marketing/section";
import { site } from "@/content/site";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Thanks for your order", robots: { index: false, follow: false } };

type Lookup = { paid: true; email?: string } | { paid: false };

async function lookupSession(sessionId: string | undefined): Promise<Lookup> {
  const stripe = getStripe();
  if (!stripe || !sessionId || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return { paid: false };
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid" && session.metadata?.product === "health_check") {
      return { paid: true, email: session.customer_details?.email ?? undefined };
    }
  } catch (error) {
    console.error("[success] could not retrieve session:", error);
  }
  return { paid: false };
}

async function Confirmation({ searchParams }: { searchParams: PageProps<"/health-check/success">["searchParams"] }) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;
  const result = await lookupSession(sessionId);

  if (!result.paid) {
    return (
      <div role="status">
        <h1 className="text-3xl font-extrabold tracking-tight">We couldn&apos;t confirm this payment</h1>
        <p className="mt-3 text-stone-600">
          If you were charged, Stripe has emailed you a receipt and we&apos;ll be in touch. Questions? Email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-foreground hover:underline">
            {site.email}
          </a>
          .
        </p>
        <Button asChild size="pill" variant="outline" className="mt-6 bg-white">
          <Link href="/health-check">Back to the Health Check</Link>
        </Button>
      </div>
    );
  }

  return (
    <div role="status">
      <CheckCircle2Icon aria-hidden className="size-10 text-brand" />
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">You&apos;re booked. Thank you!</h1>
      <p className="mt-3 text-stone-600">
        We&apos;ve sent a confirmation{result.email ? ` to ${result.email}` : ""}. Here&apos;s what happens next:
      </p>
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-stone-700">
        <li>We&apos;ll email you within one business day to schedule a 20-minute kickoff.</li>
        <li>You&apos;ll grant us read-only access to your Stripe account. We&apos;ll show you how.</li>
        <li>Your report arrives within 5 business days, followed by a walkthrough call.</li>
      </ol>
      <Button asChild size="pill" className="mt-7">
        <Link href="/contact#book">Pick a kickoff time now</Link>
      </Button>
    </div>
  );
}

export default function SuccessPage({ searchParams }: PageProps<"/health-check/success">) {
  return (
    <Container className="max-w-2xl py-16 md:py-24">
      <Suspense fallback={<p className="text-stone-500">Confirming your payment…</p>}>
        <Confirmation searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}
