import { Badge } from "@/components/ui/badge";
import { site, type PartnerStatus } from "@/content/site";

// Swap the text badge for Stripe's official badge artwork (from the partner portal) once accepted.
export function PartnerBadge({ status = site.partnerStatus }: { status?: PartnerStatus }) {
  if (status === "none") return null;
  return (
    <Badge variant="outline" className="h-8 rounded-lg border-border bg-muted px-3 text-[13px] font-semibold text-foreground">
      {status === "premier" ? "Stripe Premier Partner" : "Stripe Partner"}
    </Badge>
  );
}

export function partnerDisclaimer(status: PartnerStatus = site.partnerStatus) {
  const base = `Stripe and Stripe product names are trademarks of Stripe, Inc. ${site.name} is an independent company`;
  return status === "none"
    ? `${base} and is not affiliated with or endorsed by Stripe, Inc.`
    : `${base} and a member of the Stripe Partner Ecosystem. It is not otherwise affiliated with or endorsed by Stripe, Inc.`;
}
