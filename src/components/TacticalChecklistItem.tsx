import { Check, CircleDot } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { LcdGrid } from './LcdGrid';

export interface TacticalChecklistItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  acquired?: boolean;
  subtitle?: React.ReactNode;
  interactive?: boolean;
  showCrosshairs?: boolean;
  strikethroughWhenAcquired?: boolean;
  customIcon?: React.ReactNode;
  codeTag?: string;
}

export const TacticalChecklistItem = React.forwardRef<HTMLDivElement, TacticalChecklistItemProps>(
  (
    {
      label,
      acquired = false,
      subtitle,
      interactive = false,
      showCrosshairs = false,
      strikethroughWhenAcquired = true,
      customIcon,
      codeTag,
      className,
      ...props
    },
    ref,
  ) => {
    const statusText = codeTag || (acquired ? '[OK]' : '[PENDING]');

    return (
      <div
        ref={ref}
        className={cn(
          'group relative flex items-center justify-between gap-3 overflow-hidden rounded-none border border-dashed p-3 transition-all duration-200',
          acquired
            ? cn(
                'border-emerald-900/50 border-l-2 border-l-emerald-500 bg-emerald-950/20 text-emerald-100',
                interactive && 'hover:border-emerald-500/60 hover:bg-emerald-950/30',
              )
            : cn(
                'border-zinc-800/80 border-l-2 border-l-zinc-700/60 bg-zinc-950/60 text-zinc-400',
                interactive && 'hover:border-zinc-700 hover:border-l-zinc-500 hover:bg-zinc-900/50',
              ),
          className,
        )}
        {...props}
      >
        {/* Subtle LCD background texture */}
        <LcdGrid className="pointer-events-none opacity-[0.02]" />

        {/* Corner Crosshairs */}
        {showCrosshairs && (
          <CornerCrosshairs
            className={cn(
              'h-1.5 w-1.5 transition-colors',
              acquired
                ? 'border-emerald-800/60 group-hover:border-emerald-400'
                : 'border-zinc-700/50 group-hover:border-zinc-500',
            )}
          />
        )}

        <div className="z-10 flex min-w-0 flex-1 items-center gap-3">
          {/* LED indicator + Icon */}
          <div className="relative flex shrink-0 items-center justify-center">
            {/* LED Status Dot */}
            <span
              className={cn(
                'absolute -top-1 -left-1 h-1.5 w-1.5 rounded-full transition-all duration-300',
                acquired
                  ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]'
                  : 'bg-zinc-700/60 group-hover:bg-amber-500/70',
              )}
            />

            {customIcon ? (
              customIcon
            ) : acquired ? (
              <Check className="h-4 w-4 shrink-0 text-emerald-400 transition-transform group-hover:scale-110" />
            ) : (
              <CircleDot className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-zinc-400" />
            )}
          </div>

          <div className="flex min-w-0 flex-col">
            <span
              className={cn(
                'truncate font-bold font-mono text-xs uppercase tracking-wider transition-colors',
                acquired && strikethroughWhenAcquired
                  ? 'text-zinc-400 line-through decoration-emerald-800/80'
                  : acquired
                    ? 'text-emerald-200'
                    : 'text-zinc-300 group-hover:text-zinc-100',
              )}
            >
              {label}
            </span>
            {subtitle && <span className="tactical-text font-mono text-[10px] text-zinc-500">{subtitle}</span>}
          </div>
        </div>

        {/* Telemetry Status Badge */}
        <div className="z-10 flex shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest">
          <span
            className={cn(
              'border border-dashed px-1.5 py-0.5 transition-colors',
              acquired
                ? 'border-emerald-800/60 bg-emerald-950/40 text-emerald-400/90'
                : 'border-zinc-800 bg-zinc-900/50 text-zinc-500 group-hover:border-zinc-700 group-hover:text-zinc-400',
            )}
          >
            {statusText}
          </span>
        </div>
      </div>
    );
  },
);

TacticalChecklistItem.displayName = 'TacticalChecklistItem';
