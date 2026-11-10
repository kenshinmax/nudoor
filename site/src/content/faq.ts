import type { PartnerStatus } from "./site";
import type { FaqItem } from "./schema";

export function homeFaq(partnerStatus: PartnerStatus): FaqItem[] {
  return [
    {
      q: "Do you ever see or store our customers' card data?",
      a: "No. We use Stripe-hosted payment fields (Checkout, Elements, Terminal), so card data goes straight to Stripe. That keeps you in the lightest PCI scope.",
    },
    { q: "Who owns the Stripe account?", a: "You do, always. We work with restricted, revocable access and hand over full documentation at the end." },
    {
      q: "Do you work with Shopify, WooCommerce, or custom apps?",
      a: "Yes. We work with custom web and mobile apps, popular commerce platforms, and the accounting and CRM tools you already use.",
    },
    { q: "How fast can we get started?", a: "Usually within two weeks of signing. Health Checks start within three business days." },
    {
      q: "Are you affiliated with Stripe?",
      a:
        partnerStatus === "none"
          ? "We're an independent company that builds on Stripe. We aren't employed by or endorsed by Stripe, Inc."
          : "We're an independent company and a member of the Stripe Partner Ecosystem.",
    },
  ];
}

export const pricingFaq: FaqItem[] = [
  { q: "Are your prices really fixed?", a: "Yes. After a free call we send a written scope and a fixed quote. If the scope changes, we agree on it in writing first." },
  { q: "How do we pay?", a: "Health Checks are paid up front by card. Projects are 50% to start and 50% at launch, by Stripe invoice." },
  { q: "Do Stripe's own fees change?", a: "No. You pay Stripe's standard processing fees directly to Stripe. We often find ways to lower them." },
];
