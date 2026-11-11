import Link from "next/link";

export function HeroNote({ billing, items }: { billing: string; items: readonly string[] }) {
  return (
    <p className="mt-5 text-sm leading-relaxed text-stone-500">
      <Link
        href="/services/billing"
        data-billing-callout="hero"
        data-track="billing_note_click"
        className="underline-offset-4 hover:text-stone-700 hover:underline"
      >
        <span aria-hidden className="relative -top-px mr-2 inline-block size-[7px] rounded-full bg-muted0 align-middle" />
        {billing}
      </Link>
      {items.map((item) => (
        <span key={item}>
          {" · "}
          {item}
        </span>
      ))}
    </p>
  );
}
