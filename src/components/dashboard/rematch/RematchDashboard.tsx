export function RematchDashboard() {
  return (
    <div className="flex min-h-screen flex-col gap-4 bg-[var(--theme-bg)] p-4 font-mono text-zinc-100">
      <header className="flex items-center justify-between border-[var(--theme-border)] border-b border-dashed pb-4">
        <h1 className="tactical-text whitespace-nowrap font-bold text-[var(--theme-primary)] text-xl tracking-widest">
          [REMATCH_DASHBOARD]
        </h1>
        <div className="flex gap-2">
          <span className="tactical-text whitespace-nowrap text-xs text-zinc-500">[STATUS: ONLINE]</span>
        </div>
      </header>

      <main className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <section className="tactical-panel flex min-h-[300px] flex-col gap-2 p-4">
          <h2 className="tactical-text whitespace-nowrap border-[var(--theme-border)] border-b border-dashed pb-2 text-sm">
            [AVAILABLE_REMATCHES]
          </h2>
          <div className="tactical-text flex flex-1 items-center justify-center whitespace-nowrap text-xs text-zinc-600">
            [AWAITING_DATA]
          </div>
        </section>

        <section className="tactical-panel flex min-h-[300px] flex-col gap-2 p-4 lg:col-span-2">
          <h2 className="tactical-text whitespace-nowrap border-[var(--theme-border)] border-b border-dashed pb-2 text-sm">
            [LOCATION_DATA]
          </h2>
          <div className="tactical-text flex flex-1 items-center justify-center whitespace-nowrap text-xs text-zinc-600">
            [AWAITING_DATA]
          </div>
        </section>
      </main>
    </div>
  );
}
