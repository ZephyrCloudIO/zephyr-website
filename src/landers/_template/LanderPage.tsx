export function __LANDER_COMPONENT_NAME__LanderPage() {
  return (
    <main className="lander-shell overflow-hidden text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-16 px-6 py-20 lg:px-10">
        <div className="max-w-3xl space-y-8">
          <p className="lander-eyebrow">Standalone lander</p>
          <div className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance md:text-7xl">
              __LANDER_TITLE__ gets its own shell, routing, and release toggle.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Swap this copy, swap the sections, keep the isolation. This page does not inherit the main website header,
              footer, or TanStack route tree.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5"
              href="mailto:founders@zephyr-cloud.io?subject=__LANDER_TITLE__"
            >
              Primary CTA
            </a>
            <a
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
              href="#proof"
            >
              Secondary CTA
            </a>
          </div>
        </div>

        <div
          id="proof"
          className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur md:grid-cols-3"
        >
          <article className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/80">Block one</p>
            <h2 className="text-2xl font-semibold">Hook</h2>
            <p className="text-sm leading-7 text-slate-300">
              Drop in the sharpest proof point or pain statement for this specific campaign.
            </p>
          </article>
          <article className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-300/80">Block two</p>
            <h2 className="text-2xl font-semibold">Offer</h2>
            <p className="text-sm leading-7 text-slate-300">
              Keep the message focused. The point of this template is fast iteration without app chrome coupling.
            </p>
          </article>
          <article className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-300/80">Block three</p>
            <h2 className="text-2xl font-semibold">Proof</h2>
            <p className="text-sm leading-7 text-slate-300">
              Add logos, quotes, or screenshots here. Anything campaign-specific lives inside this folder only.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
