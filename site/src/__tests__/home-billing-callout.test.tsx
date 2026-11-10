import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/(site)/page";

const PHRASE = "Fixed and usage-based billing";

function textNodes(root: Node) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  return nodes;
}

describe("home page billing callout", () => {
  it("puts the phrase in the hero note and nowhere else", () => {
    const { container } = render(<HomePage />);
    const hero = container.querySelector('[data-billing-callout="hero"]');
    expect(hero).toHaveTextContent(PHRASE);
    expect(hero).toHaveAttribute("href", "/services/billing");

    const matches = textNodes(container).filter((n) => n.textContent?.includes(PHRASE));
    expect(matches).toHaveLength(1);
    expect(hero?.contains(matches[0]!)).toBe(true);
  });

  it("only mentions usage-based billing inside approved callouts", () => {
    const { container } = render(<HomePage />);
    const stray = textNodes(container).filter(
      (n) => /usage-based/i.test(n.textContent ?? "") && !n.parentElement?.closest("[data-billing-callout]"),
    );
    expect(stray.map((n) => n.textContent)).toEqual([]);
  });

  it("has one billing tag and at most two footnotes", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll('[data-billing-callout="tag"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-billing-callout="footnote"]').length).toBeLessThanOrEqual(2);
  });

  it('never says "Stripe Partner" while partnerStatus is "none"', () => {
    const { container } = render(<HomePage />);
    expect(container.textContent).not.toMatch(/Stripe Partner/);
  });
});
