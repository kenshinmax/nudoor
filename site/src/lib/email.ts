import "server-only";
import { env } from "@/lib/env";

type Email = { to: string; subject: string; text: string; replyTo?: string };

export async function sendEmail(message: Email): Promise<{ sent: boolean }> {
  if (!env.RESEND_API_KEY || !env.EMAIL_FROM) {
    console.info(`[email] skipped (not configured): "${message.subject}"`);
    return { sent: false };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [message.to],
      subject: message.subject,
      text: message.text,
      reply_to: message.replyTo,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  return { sent: true };
}

export async function notifyTeam(subject: string, text: string) {
  if (!env.TEAM_EMAIL) {
    console.info(`[email] team notification skipped (TEAM_EMAIL not set): "${subject}"`);
    return { sent: false };
  }
  return sendEmail({ to: env.TEAM_EMAIL, subject, text });
}
