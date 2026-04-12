export function EmptyLocation() {
  return (
    <div className="group flex min-h-[180px] flex-col items-center justify-center rounded-3xl border-2 border-zinc-800/30 border-dashed bg-zinc-900/20 p-5 text-center transition-all duration-300 hover:border-zinc-700/50">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800/50 bg-zinc-900/50 transition-transform group-hover:scale-110">
        <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-zinc-700/30 border-t-zinc-500/50" />
      </div>
      <span className="font-black text-[10px] text-zinc-600 uppercase italic tracking-[0.3em]">EMPTY</span>
    </div>
  );
}
