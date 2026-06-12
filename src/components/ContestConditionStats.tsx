import React from 'react';
import { cn } from '../utils/cn';
import { TacticalPanel } from './TacticalPanel';

export interface ContestConditionStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  cool?: number;
  beauty?: number;
  cute?: number;
  smart?: number;
  tough?: number;
}

const StatBar = ({
  label,
  value,
  max = 255,
  colorClass,
  bgClass,
}: {
  label: string;
  value: number;
  max?: number;
  colorClass: string;
  bgClass: string;
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="flex flex-col gap-1 font-mono text-sm">
      <div className="flex justify-between text-white/70">
        <span className="uppercase tracking-wider">{label}</span>
        <span>{value}</span>
      </div>
      <div className={cn('h-3 w-full rounded-none border border-dashed p-[1px]', borderClassMap[colorClass])}>
        <div
          className={cn('h-full rounded-none', bgClass)}
          style={{ width: `${percentage}%` }}
          data-role="progressbar"
          data-valuenow={value}
        />
      </div>
    </div>
  );
};

const borderClassMap: Record<string, string> = {
  'bg-red-500': 'border-red-500/50',
  'bg-blue-500': 'border-blue-500/50',
  'bg-pink-500': 'border-pink-500/50',
  'bg-emerald-500': 'border-emerald-500/50',
  'bg-amber-500': 'border-amber-500/50',
};

export const ContestConditionStats = React.forwardRef<HTMLDivElement, ContestConditionStatsProps>(
  ({ cool = 0, beauty = 0, cute = 0, smart = 0, tough = 0, className, ...props }, ref) => {
    return (
      <TacticalPanel ref={ref} variant="default" className={cn('flex flex-col gap-4 p-4', className)} {...props}>
        <div className="flex items-center gap-2 border-white/20 border-b border-dashed pb-2">
          <span className="font-bold font-mono text-sm text-white uppercase tracking-widest">Contest Conditions</span>
        </div>

        <div className="flex flex-col gap-3">
          <StatBar label="Cool" value={cool} colorClass="bg-red-500" bgClass="bg-red-500/60" />
          <StatBar label="Beauty" value={beauty} colorClass="bg-blue-500" bgClass="bg-blue-500/60" />
          <StatBar label="Cute" value={cute} colorClass="bg-pink-500" bgClass="bg-pink-500/60" />
          <StatBar label="Smart" value={smart} colorClass="bg-emerald-500" bgClass="bg-emerald-500/60" />
          <StatBar label="Tough" value={tough} colorClass="bg-amber-500" bgClass="bg-amber-500/60" />
        </div>
      </TacticalPanel>
    );
  },
);

ContestConditionStats.displayName = 'ContestConditionStats';
