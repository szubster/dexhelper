import React from 'react';
import { cn } from '../utils/cn';
import { TacticalPanel } from './TacticalPanel';
import { TacticalProgressBar } from './TacticalProgressBar';
import { TelemetryDecoration } from './TelemetryDecoration';

export interface ContestConditionStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  cool?: number;
  beauty?: number;
  cute?: number;
  smart?: number;
  tough?: number;
}

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
          <TacticalProgressBar
            label="Cool"
            value={cool}
            colorClass="bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"
            emptyColorClass="bg-red-950/30"
          />
          <TacticalProgressBar
            label="Beauty"
            value={beauty}
            colorClass="bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]"
            emptyColorClass="bg-blue-950/30"
          />
          <TacticalProgressBar
            label="Cute"
            value={cute}
            colorClass="bg-pink-500 shadow-[0_0_5px_rgba(236,72,153,0.8)]"
            emptyColorClass="bg-pink-950/30"
          />
          <TacticalProgressBar
            label="Smart"
            value={smart}
            colorClass="bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"
            emptyColorClass="bg-emerald-950/30"
          />
          <TacticalProgressBar
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
