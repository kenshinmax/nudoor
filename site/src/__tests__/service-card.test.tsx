import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ServiceCard, ServiceGrid, servicePriceLabel } from "@/components/marketing/service-card";
import { services } from "@/lib/content";
import type { Service } from "@/content/schema";

const billing = services.find((s) => s.slug === "billing")!;
const checkout = services.find((s) => s.slug === "checkout")!;

describe("ServiceCard", () => {
  it("shows the billing model tag only on the billing card", () => {
    render(<ServiceGrid services={services} />);
    for (const s of services) {
      const card = screen.getByTestId(`service-card-${s.slug}`);
      const tag = card.querySelector('[data-billing-callout="tag"]');
      if (s.slug === "billing") expect(tag).toHaveTextContent("Fixed · Usage-based");
      else expect(tag).toBeNull();
    }
  });

  it("shows a footnote only when the content sets one", () => {
    render(<ServiceGrid services={services} />);
    for (const s of services) {
      const footnote = screen.getByTestId(`service-card-${s.slug}`).querySelector('[data-billing-callout="footnote"]');
      if (s.footnote) expect(footnote).toHaveTextContent(s.footnote);
      else expect(footnote).toBeNull();
    }
  });

  it("shows no more than two footnotes on non-billing cards", () => {
    const { container } = render(<ServiceGrid services={services.filter((s) => s.slug !== "billing")} />);
    expect(container.querySelectorAll('[data-billing-callout="footnote"]').length).toBeLessThanOrEqual(2);
  });

  it("renders a footnote passed in content on any card", () => {
    const withNote: Service = { ...checkout, footnote: "Works for flat retainers or metered hours." };
    render(<ServiceCard service={withNote} index={0} />);
    expect(screen.getByText("Works for flat retainers or metered hours.")).toBeInTheDocument();
  });

  it("links to the service page with an accessible name", () => {
    render(<ServiceCard service={billing} index={1} />);
    const card = screen.getByTestId("service-card-billing");
    expect(within(card).getByRole("link", { name: /learn more about subscriptions & billing/i })).toHaveAttribute(
      "href",
      "/services/billing",
    );
  });

  it("formats monthly and one-time prices", () => {
    expect(servicePriceLabel({ priceFrom: 2500, priceUnit: "one-time" })).toBe("From $2,500");
    expect(servicePriceLabel({ priceFrom: 299, priceUnit: "month" })).toBe("From $299/mo");
  });
});
