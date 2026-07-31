import React from 'react';
import { cn } from '../utils/cn';
import { TacticalPanel } from './TacticalPanel';
import { TelemetryDecoration } from './TelemetryDecoration';

export interface ContestConditionStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  cool?: number;
  beauty?: number;
  cute?: number;
  smart?: number;
  tough?: number;
}

// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary re-renders, lifted invariant calculations out of the loop, and replaced Array.from().map() with a manual loop to eliminate intermediate array allocations (O(N) -> O(1) memory overhead).
const StatBar = React.memo(
  ({
    label,
    value,
    max = 255,
    colorClass,
    emptyColorClass,
  }: {
    label: string;
    value: number;
    max?: number;
    colorClass: string;
    emptyColorClass: string;
  }) => {
    const segmentCount = 15;
    const segments = [];
    const ratio = value / max;

    for (let i = 0; i < segmentCount; i++) {
      const threshold = (i + 1) / segmentCount;
      const isActive = ratio >= threshold;
      segments.push(
        <div key={`stat-segment-${i}`} className={cn('h-full flex-1', isActive ? colorClass : emptyColorClass)} />,
      );
    }

    return (
      <div className="flex flex-col gap-1.5 border-zinc-800 border-l border-dashed pl-3 transition-colors hover:border-zinc-500">
        <div className="tactical-text flex justify-between text-[9px] text-zinc-400">
          <span className="font-black uppercase tracking-widest">[ {label} ]</span>
          <span className="font-mono text-zinc-500">{value}</span>
        </div>
        {/* oxlint-disable jsx-a11y/prefer-tag-over-role */}
        <div
          className="flex h-2 w-full gap-px bg-black p-px"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemax={max}
        >
          {segments}
        </div>
      </div>
    );
  },
);

export const ContestConditionStats = React.forwardRef<HTMLDivElement, ContestConditionStatsProps>(
  ({ cool = 0, beauty = 0, cute = 0, smart = 0, tough = 0, className, ...props }, ref) => {
    return (
      <TacticalPanel
        ref={ref}
        variant="default"
        className={cn('relative flex flex-col gap-6 p-6 pt-8', className)}
        {...props}
      >
        <TelemetryDecoration label="SYS.CONTEST_STATS" className="-top-1 left-4" />

        <div className="flex flex-col gap-4">
          <StatBar
            label="Cool"
            value={cool}
            colorClass="bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"
            emptyColorClass="bg-red-950/30"
          />
          <StatBar
            label="Beauty"
            value={beauty}
            colorClass="bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]"
            emptyColorClass="bg-blue-950/30"
          />
          <StatBar
            label="Cute"
            value={cute}
            colorClass="bg-pink-500 shadow-[0_0_5px_rgba(236,72,153,0.8)]"
            emptyColorClass="bg-pink-950/30"
          />
          <StatBar
            label="Smart"
            value={smart}
            colorClass="bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"
            emptyColorClass="bg-emerald-950/30"
          />
          <StatBar
            label="Tough"
            value={tough}
            colorClass="bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.8)]"
            emptyColorClass="bg-amber-950/30"
          />
        </div>
      </TacticalPanel>
    );
  },
);

ContestConditionStats.displayName = 'ContestConditionStats';
