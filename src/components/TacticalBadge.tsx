import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../utils/cn';

export const badgeVariants = cva('tactical-badge inline-flex flex-row px-2 py-1 text-[8px]', {
  variants: {
    variant: {
      primary: 'border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]',
      amber: 'border-amber-500/10 bg-amber-500/5 text-amber-500/60',
      red: 'border-red-500/10 bg-red-500/5 text-red-500/60',
      zinc: 'border-zinc-800 bg-zinc-950 text-zinc-500',
      blue: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
      emerald: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
      rose: 'border-rose-500/50 bg-rose-500/10 text-rose-400',
      pink: 'border-pink-500/10 bg-pink-500/5 text-pink-400/60',
    },
  },
  defaultVariants: {
    variant: 'zinc',
  },
});

export interface TacticalBadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  /**
   * If true, displays a small LED status indicator dot.
   */
  dot?: boolean;
  /**
   * If true, adds a gentle pulsing animation to the badge/dot.
   */
  pulse?: boolean;
}

export const TacticalBadge = React.forwardRef<HTMLSpanElement, TacticalBadgeProps>(
  ({ variant, className, children, dot, pulse, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          badgeVariants({ variant, className }),
          'relative inline-flex items-center gap-1.5 overflow-hidden transition-all duration-200 hover:border-opacity-100 hover:shadow-[0_0_8px_rgba(255,255,255,0.05)]',
          pulse && 'animate-pulse',
        )}
        {...props}
      >
        {/* Hardware Corner Accent Ticks */}
        <span className="pointer-events-none absolute top-0 left-0 h-1 w-1 border-current border-t border-l opacity-40" />
        <span className="pointer-events-none absolute top-0 right-0 h-1 w-1 border-current border-t border-r opacity-40" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-1 w-1 border-current border-b border-l opacity-40" />
        <span className="pointer-events-none absolute right-0 bottom-0 h-1 w-1 border-current border-r border-b opacity-40" />

        {/* Dynamic LED Dot Indicator */}
        {dot && (
          <span className="relative flex h-1.5 w-1.5 items-center justify-center">
            {pulse && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          </span>
        )}

        {children}
      </span>
    );
  },
);

TacticalBadge.displayName = 'TacticalBadge';
