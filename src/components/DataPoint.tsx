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
        'group relative flex flex-col justify-between overflow-hidden border border-zinc-800/80 border-dashed bg-zinc-950/60 p-3 transition-all duration-300 hover:border-[var(--theme-primary)]/50 hover:bg-zinc-900/80',
        className,
      )}
    >
      <div className="absolute top-0 left-0 h-1.5 w-1.5 border-zinc-700/80 border-t-[1.5px] border-l-[1.5px] transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute top-0 right-0 h-1.5 w-1.5 border-zinc-700/80 border-t-[1.5px] border-r-[1.5px] transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-zinc-700/80 border-b-[1.5px] border-l-[1.5px] transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-zinc-700/80 border-r-[1.5px] border-b-[1.5px] transition-colors group-hover:border-[var(--theme-primary)]" />

      <div className="absolute top-0 bottom-0 left-0 w-0 bg-[var(--theme-primary)]/10 opacity-0 transition-all duration-700 group-hover:w-full group-hover:opacity-100" />

      <div className="relative z-10 flex w-full flex-col">
        <div className="mb-1.5 flex items-center justify-between">
          <span
            className={cn(
              'font-black font-mono text-[9px] text-zinc-500 uppercase tracking-widest transition-colors group-hover:text-[var(--theme-primary)]',
              labelClassName,
            )}
          >
            {label}
          </span>
          <span className="h-0.5 w-0.5 rounded-full bg-zinc-700 transition-colors group-hover:bg-[var(--theme-primary)]" />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold font-mono text-[10px] text-[var(--theme-primary)]/60" aria-hidden="true">
            {'>>'}
          </span>
          <span
            className={cn(
              'font-bold font-mono text-[13px] text-zinc-200 uppercase tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] transition-colors group-hover:text-white',
              valueClassName,
            )}
          >
            {value || children}
          </span>
        </div>
      </div>
    </div>
  );
});
