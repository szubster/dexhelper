import React from 'react';
import { cn } from '../utils/cn';

export interface TacticalProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: number;
  max?: number;
  valueDisplay?: React.ReactNode;
  segments?: number;
  colorClass?: string;
  emptyColorClass?: string;
}

export const TacticalProgressBar = React.memo(
  React.forwardRef<HTMLDivElement, TacticalProgressBarProps>(
    (
      {
        label,
        value,
        max = 255,
        valueDisplay,
        segments = 15,
        colorClass = 'bg-[var(--theme-primary)] shadow-[0_0_5px_rgba(var(--theme-primary-rgb),0.8)]',
        emptyColorClass = 'bg-zinc-950/30',
        className,
        ...props
      },
      ref,
    ) => {
      const segmentElements = [];
      const ratio = max > 0 ? value / max : 0;

      for (let i = 0; i < segments; i++) {
        const threshold = (i + 1) / segments;
        const isActive = ratio >= threshold;
        segmentElements.push(
          <div
            key={`progress-segment-${i}`}
            className={cn('h-full flex-1', isActive ? colorClass : emptyColorClass)}
          />,
        );
      }

      return (
        <div
          ref={ref}
          className={cn(
            'flex flex-col gap-1.5 border-zinc-800 border-l border-dashed pl-3 transition-colors hover:border-zinc-500',
            className,
          )}
          {...props}
        >
          <div className="tactical-text flex justify-between text-[9px] text-zinc-400">
            <span className="font-black uppercase tracking-widest">[ {label} ]</span>
            {valueDisplay !== undefined ? valueDisplay : <span className="font-mono text-zinc-500">{value}</span>}
          </div>
          {/* oxlint-disable jsx-a11y/prefer-tag-over-role */}
          <div
            className="flex h-2 w-full gap-px bg-black p-px"
            role="progressbar"
            aria-valuenow={value}
            aria-valuemax={max}
          >
            {segmentElements}
          </div>
        </div>
      );
    },
  ),
);

TacticalProgressBar.displayName = 'TacticalProgressBar';
