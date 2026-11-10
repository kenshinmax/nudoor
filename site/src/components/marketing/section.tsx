import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-6", className)}>{children}</div>;
}

export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("font-mono text-[13px] font-semibold tracking-[0.06em] text-indigo-600 uppercase", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  tone = "default",
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  tone?: "default" | "white";
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-16 md:py-[88px]", tone === "white" && "bg-white", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-12 max-w-[680px] text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className="mt-2 text-[clamp(28px,3.2vw,40px)] leading-tight font-bold tracking-tight text-balance">
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-slate-500 text-pretty">{subtitle}</p> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-white py-14 md:py-20">
      <Container>
        <div className="max-w-3xl">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="mt-3 text-[clamp(32px,4.4vw,52px)] leading-[1.1] font-extrabold tracking-tight text-balance">
            {title}
          </h1>
          {subtitle ? <p className="mt-4 max-w-2xl text-lg text-slate-600 text-pretty">{subtitle}</p> : null}
          {children ? <div className="mt-7 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
