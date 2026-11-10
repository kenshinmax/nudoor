import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PartnerBadge, partnerDisclaimer } from "@/components/brand/partner-badge";
import { site } from "@/content/site";

describe("PartnerBadge", () => {
  it("renders nothing when partnerStatus is none", () => {
    expect(render(<PartnerBadge status="none" />).container).toBeEmptyDOMElement();
  });

  it("uses the site setting by default", () => {
    expect(site.partnerStatus).toBe("none");
    expect(render(<PartnerBadge />).container).toBeEmptyDOMElement();
  });

  it("renders the right label once accepted", () => {
    render(<PartnerBadge status="partner" />);
    expect(screen.getByText("Stripe Partner")).toBeInTheDocument();
  });

  it("renders the premier label", () => {
    render(<PartnerBadge status="premier" />);
    expect(screen.getByText("Stripe Premier Partner")).toBeInTheDocument();
  });
});

describe("partnerDisclaimer", () => {
  it("states independence and avoids partner wording when status is none", () => {
    const text = partnerDisclaimer("none");
    expect(text).toContain("not affiliated with or endorsed by Stripe, Inc.");
    expect(text).not.toMatch(/Stripe Partner/);
  });

  it("mentions the partner ecosystem once accepted", () => {
    expect(partnerDisclaimer("partner")).toContain("member of the Stripe Partner Ecosystem");
  });
});
