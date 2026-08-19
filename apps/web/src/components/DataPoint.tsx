import React from 'react';
import { cn } from '../utils/cn';

interface DataPointProps {
  label: React.ReactNode;
  value?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary re-renders
export const DataPoint = React.memo(function DataPoint({
  label,
  value,
  children,
  className,
  labelClassName,
  valueClassName,
}: DataPointProps) {
  return (
    <div
      className={cn(
        'group relative flex flex-col border-zinc-800 border-l border-dashed pl-3 transition-colors hover:border-zinc-500 hover:bg-black/20',
        className,
      )}
    >
      <div className="absolute top-1.5 left-[-2px] h-1.5 w-1.5 border border-zinc-500 bg-zinc-950 transition-colors group-hover:border-[var(--theme-primary)] group-hover:bg-[var(--theme-primary)]" />
      <span
        className={cn(
          'tactical-text mb-0.5 font-black text-[9px] text-zinc-500 tracking-widest transition-colors group-hover:text-zinc-400',
          labelClassName,
        )}
      >
        <span aria-hidden="true">[ </span>
        {label}
        <span aria-hidden="true"> ]</span>
      </span>
      <span className={cn('font-bold font-mono text-[11px] text-zinc-300 uppercase tracking-tight', valueClassName)}>
        {value || children}
      </span>
    </div>
  );
});
