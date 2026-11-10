type Node = { title: string; subtitle: string; pill: string };
type Metric = { value: string; label: string };

export function FlowDiagram({ nodes, metrics }: { nodes: readonly Node[]; metrics: readonly Metric[] }) {
  return (
    <div
      role="img"
      aria-label="Illustration of a payment flow from checkout through fraud screening and billing to payouts"
      className="relative overflow-hidden rounded-[20px] bg-ink p-7 text-slate-200 shadow-[0_30px_60px_rgba(11,27,58,0.25)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[40%] -right-[20%] size-80 bg-[radial-gradient(circle,rgba(79,70,229,0.55),transparent_70%)]"
      />
      <div className="relative mb-4 font-mono text-xs text-slate-400">{"// what we build for you"}</div>
      <div className="relative">
        {nodes.map((node, i) => (
          <div key={node.title}>
            {i > 0 ? <div aria-hidden className="mb-1 ml-7 h-3 w-0.5 -translate-y-1.5 bg-white/20" /> : null}
            <div className="mb-2.5 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5">
              <div>
                <strong className="text-[15px] text-white">{node.title}</strong>
                <div className="font-mono text-xs text-slate-400">{node.subtitle}</div>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-xs text-emerald-300">
                {node.pill}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-4 grid grid-cols-3 gap-2.5">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-[10px] bg-white/5 p-3">
            <b className="block text-[17px] text-white sm:text-xl">{m.value}</b>
            <small className="text-xs text-slate-400">{m.label}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
