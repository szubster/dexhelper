import { Check, CircleDot } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';

export interface TacticalChecklistItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  acquired?: boolean;
  subtitle?: React.ReactNode;
  interactive?: boolean;
  showCrosshairs?: boolean;
  strikethroughWhenAcquired?: boolean;
  customIcon?: React.ReactNode;
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
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative flex items-center gap-3 rounded-none border border-dashed p-3 transition-colors',
          acquired
            ? cn('border-emerald-900/50 bg-emerald-950/10', interactive && 'hover:border-emerald-500/50')
            : cn('border-zinc-800 bg-zinc-950/50', interactive && 'hover:border-zinc-700'),
          className,
        )}
        {...props}
      >
        {showCrosshairs && (
          <CornerCrosshairs
            className={cn(
              'h-1.5 w-1.5 transition-colors',
              acquired
                ? 'border-emerald-900/50 group-hover:border-emerald-500/80'
                : 'border-zinc-700/50 group-hover:border-zinc-500',
            )}
          />
        )}

        {customIcon ? (
          customIcon
        ) : acquired ? (
          <Check className="h-4 w-4 shrink-0 text-emerald-500" />
        ) : (
          <CircleDot className="h-4 w-4 shrink-0 text-zinc-600" />
        )}

        <div className="flex min-w-0 flex-col">
          <span
            className={cn(
              'truncate font-bold font-mono text-xs uppercase tracking-wider',
              acquired && strikethroughWhenAcquired ? 'text-zinc-500 line-through' : 'text-zinc-300',
            )}
          >
            {label}
          </span>
          {subtitle && <span className="tactical-text text-[10px] text-zinc-500">{subtitle}</span>}
        </div>
      </div>
    );
  },
);

TacticalChecklistItem.displayName = 'TacticalChecklistItem';
