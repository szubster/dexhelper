import React from 'react';

// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary re-renders when parent states change, and replaced Array.from().map() with a manual loop to eliminate intermediate array allocations (O(N) -> O(1) memory overhead).
export const CapacitySegmentedBar = React.memo(function CapacitySegmentedBar({
  current,
  max,
  segments = 15,
}: {
  current: number;
  max: number;
  segments?: number;
}) {
  const segmentElements = [];
  const ratio = max > 0 ? Math.min(current / max, 1) : 0;

  for (let i = 0; i < segments; i++) {
    const threshold = (i + 1) / segments;
    const isActive = ratio >= threshold;

    let colorClass = 'bg-zinc-800/60';
    if (isActive) {
      if (ratio > 0.9) colorClass = 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]';
      else if (ratio > 0.7) colorClass = 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]';
      else colorClass = 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]';
    }

    segmentElements.push(
      <div key={`capacity-segment-${i}`} className={`h-full flex-1 transition-colors duration-200 ${colorClass}`} />,
    );
  }

  const percentage = Math.round(ratio * 100);

  let statusLed = 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]';
  if (ratio > 0.9) {
    statusLed = 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)] animate-pulse';
  } else if (ratio > 0.7) {
    statusLed = 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]';
  }

  return (
    <div className="relative inline-flex items-center gap-2.5 rounded-none border border-zinc-800/80 border-dashed bg-zinc-950/90 px-2 py-1 font-mono text-[9px] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
      {/* Telemetry Tag */}
      <span className="select-none font-bold text-zinc-500 uppercase tracking-wider">[SYS.CAP]</span>

      {/* Cased Bar Track */}
      <div className="flex h-2.5 w-24 items-center gap-0.5 border border-zinc-800 bg-black p-[2px] shadow-inner sm:w-32">
        {segmentElements}
      </div>

      {/* Numerics & Percentage readout */}
      <div className="flex min-w-[68px] items-center justify-end gap-1.5">
        <span className="font-bold text-zinc-400">
          {current}/{max}
        </span>
        <span className="font-semibold text-[8px] text-zinc-600">({percentage}%)</span>
        <span className={`h-1.5 w-1.5 rounded-none border border-black ${statusLed}`} aria-hidden="true" />
      </div>
    </div>
  );
});
