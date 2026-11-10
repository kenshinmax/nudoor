"use server";

import { headers } from "next/headers";
import {
  briefInputFromFormData,
  budgetOptions,
  businessTypeOptions,
  interestOptions,
  labelFor,
  processorOptions,
  timelineOptions,
  validateBrief,
  volumeOptions,
  type Brief,
  type BriefState,
} from "@/lib/brief";
import { upsertLead } from "@/lib/crm";
import { notifyTeam, sendEmail } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

function summarize(brief: Brief) {
  return [
    `Name: ${brief.name}`,
    `Email: ${brief.email}`,
    `Company: ${brief.company}`,
    `Website: ${brief.website ?? "-"}`,
    `Business type: ${labelFor(businessTypeOptions, brief.businessType)}`,
    `Current processor: ${labelFor(processorOptions, brief.processor)}`,
    `Monthly volume: ${labelFor(volumeOptions, brief.volume)}`,
    `Interested in: ${brief.interests.map((i) => labelFor(interestOptions, i)).join(", ") || "-"}`,
    `Timeline: ${labelFor(timelineOptions, brief.timeline)}`,
    `Budget: ${labelFor(budgetOptions, brief.budget)}`,
    "",
    brief.notes ?? "",
  ].join("\n");
}

const successMessage = "Thanks! We've got your brief and will reply within one business day.";

export async function submitBrief(_prev: BriefState, formData: FormData): Promise<BriefState> {
  const result = validateBrief(briefInputFromFormData(formData));
  if (!result.ok) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors: result.fieldErrors };
  }
  const brief = result.data;

  const ip = clientIp(await headers());
  if (!rateLimit(`brief:${ip}`, 5, 10 * 60_000).ok) {
    return { status: "error", message: `Too many submissions. Please try again in a few minutes or email ${site.email}.` };
  }

  const token = formData.get("cf-turnstile-response");
  if (!(await verifyTurnstile(typeof token === "string" ? token : null, ip))) {
    return { status: "error", message: "We couldn't verify the form. Please refresh the page and try again." };
  }

  // A second submit with the same email inside 30 seconds is treated as a double click.
  if (!rateLimit(`brief-dup:${brief.email.toLowerCase()}`, 1, 30_000).ok) {
    return { status: "success", message: successMessage };
  }

  const summary = summarize(brief);
  const results = await Promise.allSettled([
    upsertLead({
      email: brief.email,
      name: brief.name,
      company: brief.company,
      website: brief.website,
      source: "project_brief",
      tags: brief.interests,
      notes: brief.notes,
    }),
    notifyTeam(`New project brief: ${brief.company}`, summary),
    sendEmail({
      to: brief.email,
      subject: `We got your project brief, ${brief.name.split(" ")[0]}`,
      replyTo: site.email,
      text: [
        `Hi ${brief.name.split(" ")[0]},`,
        "",
        "Thanks for telling us about your project. We'll reply within one business day with next steps.",
        "",
        "Want quick wins sooner? Our Payments Health Check reviews your Stripe setup in a week:",
        absoluteUrl("/health-check"),
        "",
        `— The ${site.name} team`,
      ].join("\n"),
    }),
  ]);

  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  for (const f of failures) console.error("[brief] delivery failed:", f.reason);
  if (failures.length === results.length) {
    return { status: "error", message: `Something went wrong sending your brief. Please email us at ${site.email}.` };
  }
  return { status: "success", message: successMessage };
}
