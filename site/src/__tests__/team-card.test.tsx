import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TeamCard } from "@/components/marketing/team-card";
import { earnedCertifications, team } from "@/lib/content";
import type { TeamMember } from "@/content/schema";

const member: TeamMember = {
  name: "Ada Example",
  role: "Lead engineer",
  initials: "AE",
  bio: "Builds payment flows.",
  certifications: [
    { name: "Stripe Certified Professional Developer", earned: true, verifyUrl: "https://example.com/verify" },
    { name: "Stripe Certified Architect", earned: false },
  ],
};

describe("TeamCard", () => {
  it("shows earned certifications and hides unearned ones", () => {
    render(<TeamCard member={member} />);
    expect(screen.getByRole("link", { name: "Stripe Certified Professional Developer" })).toHaveAttribute(
      "href",
      "https://example.com/verify",
    );
    expect(screen.queryByText("Stripe Certified Architect")).not.toBeInTheDocument();
  });

  it("never renders an unearned certification from site content", () => {
    for (const m of team) {
      const { container, unmount } = render(<TeamCard member={m} showBio />);
      for (const cert of m.certifications.filter((c) => !c.earned)) {
        const stillEarnedElsewhere = m.certifications.some((c) => c.earned && c.name === cert.name);
        if (!stillEarnedElsewhere) expect(container).not.toHaveTextContent(cert.name);
      }
      unmount();
    }
  });

  it("counts only earned certifications", () => {
    const earned = earnedCertifications();
    const total = team.flatMap((m) => m.certifications).filter((c) => c.earned).length;
    expect(earned.reduce((sum, c) => sum + c.count, 0)).toBe(total);
  });
});
