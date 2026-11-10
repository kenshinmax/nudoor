import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BillingModelTag } from "@/components/marketing/billing-model-tag";

describe("BillingModelTag", () => {
  it('renders "Fixed · Usage-based" for both models', () => {
    const { container } = render(<BillingModelTag models={["fixed", "usage"]} />);
    const tag = container.querySelector('[data-billing-callout="tag"]');
    expect(tag).toHaveTextContent("Fixed · Usage-based");
    expect(screen.getByText("Billing models:")).toHaveClass("sr-only");
  });

  it("renders a single model", () => {
    const { container } = render(<BillingModelTag models={["usage"]} />);
    expect(container).toHaveTextContent("Usage-based");
    expect(container).not.toHaveTextContent("Fixed");
  });

  it("renders nothing for an empty list or no models", () => {
    expect(render(<BillingModelTag models={[]} />).container).toBeEmptyDOMElement();
    expect(render(<BillingModelTag />).container).toBeEmptyDOMElement();
  });
});
