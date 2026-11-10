import "server-only";
import { env } from "@/lib/env";

export type Lead = {
  email: string;
  name?: string;
  company?: string;
  website?: string;
  source: "project_brief" | "health_check";
  tags: string[];
  notes?: string;
};

// The two brightline_* contact properties must exist in HubSpot (Settings → Properties) before going live.
export async function upsertLead(lead: Lead): Promise<{ saved: boolean }> {
  if (!env.HUBSPOT_TOKEN) {
    console.info(`[crm] skipped (not configured): ${lead.source} tags=${lead.tags.join(",")}`);
    return { saved: false };
  }
  const [firstname, ...rest] = (lead.name ?? "").split(" ");
  const properties = {
    email: lead.email,
    firstname: firstname || undefined,
    lastname: rest.join(" ") || undefined,
    company: lead.company,
    website: lead.website,
    brightline_source: lead.source,
    brightline_interests: lead.tags.join(";"),
  };
  const headers = { Authorization: `Bearer ${env.HUBSPOT_TOKEN}`, "Content-Type": "application/json" };
  const create = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify({ properties }),
    signal: AbortSignal.timeout(8000),
  });
  if (create.ok) return { saved: true };
  if (create.status === 409) {
    const update = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(lead.email)}?idProperty=email`,
      { method: "PATCH", headers, body: JSON.stringify({ properties }), signal: AbortSignal.timeout(8000) },
    );
    if (update.ok) return { saved: true };
    throw new Error(`HubSpot update responded ${update.status}`);
  }
  throw new Error(`HubSpot create responded ${create.status}`);
}
