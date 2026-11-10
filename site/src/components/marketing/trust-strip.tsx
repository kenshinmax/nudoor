import { Container } from "@/components/marketing/section";
import { PartnerBadge } from "@/components/brand/partner-badge";
import { earnedCertifications } from "@/lib/content";
import { site } from "@/content/site";

export function TrustStrip() {
  const certs = earnedCertifications();
  return (
    <div className="border-y border-line bg-white py-7">
      <Container className="flex flex-wrap items-center justify-between gap-6">
        <ul className="flex flex-wrap gap-3" aria-label="Credentials">
          <li>
            <PartnerBadge />
          </li>
          {certs.map((c) => (
            <li key={c.name} className="rounded-lg border border-line bg-surface px-3 py-2 text-[13px] font-semibold text-slate-600">
              {c.name}
              {c.count > 1 ? ` ×${c.count}` : ""}
            </li>
          ))}
          <li className="rounded-lg px-1 py-2 text-[13px] text-slate-500">
            <b className="text-ink">{site.stats.value}</b> {site.stats.label}
          </li>
        </ul>
        <ul className="flex flex-wrap gap-8 font-extrabold tracking-[0.02em] text-slate-400" aria-label="Clients">
          {site.clientLogos.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
