import React from 'react';
import { cn } from '../utils/cn';

interface TelemetryDecorationProps {
  label: string;
  className?: string;
  dotClassName?: string;
  textClassName?: string;
}

// ⚡ Bolt: Wrapped TelemetryDecoration in React.memo as it is used heavily and its props rarely change.
export const TelemetryDecoration = React.memo(function TelemetryDecoration({
  label,
  className,
  dotClassName,
  textClassName,
}: TelemetryDecorationProps) {
  return (
    <div
      className={cn(
        'absolute flex gap-1 rounded-none border border-t-0 border-dashed border-zinc-800 bg-zinc-900 px-3 py-1 text-[8px] font-black tracking-widest text-zinc-600',
        className,
      )}
    >
      <span className={cn('animate-pulse text-[var(--theme-primary)]', dotClassName)}>●</span>
      <span className={textClassName}>{label}</span>
    </div>
  );
});
