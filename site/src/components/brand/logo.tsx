import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 text-[17px] font-extrabold whitespace-nowrap", className)}>
      <span aria-hidden className="size-7 rounded-lg bg-linear-135 from-neutral-900 to-neutral-600" />
      {site.name}
    </Link>
  );
}
