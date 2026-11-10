import { Card } from "@/components/ui/card";
import type { TeamMember } from "@/content/schema";

export function TeamCard({ member, showBio = false }: { member: TeamMember; showBio?: boolean }) {
  const earned = member.certifications.filter((c) => c.earned);
  return (
    <Card className="h-full flex-row items-start gap-4 rounded-xl p-6 text-base ring-line">
      <div
        aria-hidden
        className="grid size-16 flex-none place-items-center rounded-full bg-linear-135 from-indigo-200 to-emerald-200 font-bold text-ink"
      >
        {member.initials}
      </div>
      <div>
        <b>{member.name}</b>
        <p className="text-slate-500">{member.role}</p>
        {earned.map((c) =>
          c.verifyUrl ? (
            <a key={c.name} href={c.verifyUrl} className="block font-mono text-xs text-indigo-600 hover:underline">
              {c.name}
            </a>
          ) : (
            <p key={c.name} className="font-mono text-xs text-indigo-600">
              {c.name}
            </p>
          ),
        )}
        {showBio ? <p className="mt-2 text-sm text-slate-600">{member.bio}</p> : null}
      </div>
    </Card>
  );
}
