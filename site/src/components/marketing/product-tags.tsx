import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProductTags({ products, className, dark = false }: { products: readonly string[]; className?: string; dark?: boolean }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Stripe products">
      {products.map((p) => (
        <li key={p}>
          <Badge
            variant="outline"
            className={cn(
              "h-6 rounded-md px-2 font-mono text-xs font-normal",
              dark ? "border-white/20 text-neutral-300" : "border-line bg-surface text-neutral-600",
            )}
          >
            {p}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
