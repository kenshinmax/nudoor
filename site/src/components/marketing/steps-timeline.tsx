type Step = { title: string; body: string };

export function StepsTimeline({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-muted px-3.5 py-2 font-mono text-sm font-bold text-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < steps.length - 1 ? <span aria-hidden className="hidden h-0.5 flex-1 bg-line lg:block" /> : null}
          </div>
          <h3 className="mt-4 text-[19px] font-bold">{step.title}</h3>
          <p className="mt-1 text-neutral-500">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
