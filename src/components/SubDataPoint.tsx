import React from 'react';
import { cn } from '../utils/cn';

export interface SubDataPointProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value?: React.ReactNode;
  children?: React.ReactNode;
  labelClassName?: string;
  valueClassName?: string;
}

export const SubDataPoint = React.forwardRef<HTMLDivElement, SubDataPointProps>(function SubDataPoint(
  { label, value, children, className, labelClassName, valueClassName, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden border border-zinc-800/80 border-dashed bg-zinc-950/90 p-2.5 transition-all duration-300 hover:border-[var(--theme-primary)]/50 hover:bg-zinc-900/90',
        className,
      )}
      {...props}
    >
      {/* Hardware Mounting Corner Ticks */}
      <div className="absolute top-0 left-0 h-1 w-1 border-zinc-700/80 border-t border-l transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute top-0 right-0 h-1 w-1 border-zinc-700/80 border-t border-r transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute bottom-0 left-0 h-1 w-1 border-zinc-700/80 border-b border-l transition-colors group-hover:border-[var(--theme-primary)]" />
      <div className="absolute right-0 bottom-0 h-1 w-1 border-zinc-700/80 border-r border-b transition-colors group-hover:border-[var(--theme-primary)]" />

      {/* Subtle Scan Overlay on Hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[var(--theme-primary)]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex w-full flex-col gap-1">
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'font-mono text-[8px] text-zinc-500 uppercase tracking-widest transition-colors group-hover:text-[var(--theme-primary)]/90',
              labelClassName,
            )}
          >
            {label}
          </span>
          <span
            className="h-1 w-1 rounded-full bg-zinc-700/80 transition-colors group-hover:bg-[var(--theme-primary)] group-hover:shadow-[0_0_4px_var(--theme-primary)]"
            aria-hidden="true"
          />
        </div>

        {value !== undefined || children !== undefined ? (
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span
              className={cn(
                'truncate font-mono text-[11px] text-zinc-200 uppercase tracking-tight transition-colors group-hover:text-white',
                valueClassName,
              )}
            >
              {value ?? children}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
});

SubDataPoint.displayName = 'SubDataPoint';
