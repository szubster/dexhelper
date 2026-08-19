import React from 'react';
import { cn } from '../utils/cn';

interface InlineDataPointProps {
  label: React.ReactNode;
  value?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary re-renders
export const InlineDataPoint = React.memo(function InlineDataPoint({
  label,
  value,
  children,
  className,
  labelClassName,
  valueClassName,
}: InlineDataPointProps) {
  return (
    <div className={cn('relative flex items-center gap-2 border-zinc-800/50 border-b border-dashed pb-0.5', className)}>
      <div className="absolute top-1.5 -left-1.5 h-0.5 w-0.5 bg-[var(--theme-primary)] opacity-50 shadow-[0_0_2px_var(--theme-primary)]" />
      <span className={cn('tactical-text font-black text-[8px] text-zinc-500 tracking-widest', labelClassName)}>
        [ {label} ]
      </span>
      <span
        className={cn(
          'bg-black/40 px-1 font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-tight',
          valueClassName,
        )}
      >
        {value || children}
      </span>
    </div>
  );
});
