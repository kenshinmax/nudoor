type Problem = { title: string; body: string };

export function ProblemGrid({ items }: { items: readonly Problem[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <li key={p.title} className="flex gap-3.5 rounded-xl border border-line bg-surface p-5">
          <span aria-hidden className="mt-2 size-2.5 flex-none rounded-full bg-muted0" />
          <div>
            <b className="mb-1 block">{p.title}</b>
            <span className="text-neutral-500">{p.body}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
