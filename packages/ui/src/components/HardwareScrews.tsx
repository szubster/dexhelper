export function HardwareScrews() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1 left-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1 right-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 left-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1 bottom-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
      />
    </>
  );
}
