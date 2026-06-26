export function CapacitySegmentedBar({
  current,
  max,
  segments = 15,
}: {
  current: number;
  max: number;
  segments?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="tactical-text min-w-[40px] text-right font-black text-[9px] text-zinc-500">
        {current} / {max}
      </span>
      <div className="flex h-1.5 w-24 gap-px bg-black p-px">
        {Array.from({ length: segments }).map((_, i) => {
          const ratio = current / max;
          const threshold = (i + 1) / segments;
          const isActive = ratio >= threshold;

          let colorClass = 'bg-zinc-800';
          if (isActive) {
            if (ratio > 0.9) colorClass = 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]';
            else if (ratio > 0.7) colorClass = 'bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.8)]';
            else colorClass = 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]';
          }
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: Fixed size static array
              key={`capacity-segment-${i}`}
              className={`flex-1 ${colorClass}`}
            />
          );
        })}
      </div>
    </div>
  );
}
