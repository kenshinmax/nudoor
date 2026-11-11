import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 font-logo text-[19px] font-extrabold tracking-[-0.04em] whitespace-nowrap", className)}>
      <span aria-hidden className="size-6 rounded-none bg-linear-135 from-brand to-ink" />
      <span>
        NuDoor<span className="text-brand">Payments</span>
      </span>
    </Link>
  );
}
