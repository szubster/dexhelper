export function RematchDashboard() {
  return (
    <div className="flex min-h-screen flex-col gap-4 bg-[var(--theme-bg)] p-4 font-mono text-zinc-100">
      <header className="flex items-center justify-between border-b border-dashed border-[var(--theme-border)] pb-4">
        <h1 className="tactical-text text-xl font-bold tracking-widest whitespace-nowrap text-[var(--theme-primary)]">
          [REMATCH_DASHBOARD]
        </h1>
        <div className="flex gap-2">
          <span className="tactical-text text-xs whitespace-nowrap text-zinc-500">[STATUS: ONLINE]</span>
        </div>
      </header>

      <main className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <section className="tactical-panel flex min-h-[300px] flex-col gap-2 p-4">
          <h2 className="tactical-text border-b border-dashed border-[var(--theme-border)] pb-2 text-sm whitespace-nowrap">
            [AVAILABLE_REMATCHES]
          </h2>
          <div className="tactical-text flex flex-1 items-center justify-center text-xs whitespace-nowrap text-zinc-600">
            [AWAITING_DATA]
          </div>
        </section>

        <section className="tactical-panel flex min-h-[300px] flex-col gap-2 p-4 lg:col-span-2">
          <h2 className="tactical-text border-b border-dashed border-[var(--theme-border)] pb-2 text-sm whitespace-nowrap">
            [LOCATION_DATA]
          </h2>
          <div className="tactical-text flex flex-1 items-center justify-center text-xs whitespace-nowrap text-zinc-600">
            [AWAITING_DATA]
          </div>
        </section>
      </main>
    </div>
  );
}
