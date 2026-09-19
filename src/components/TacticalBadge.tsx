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
}

export const TacticalBadge = React.forwardRef<HTMLSpanElement, TacticalBadgeProps>(
  ({ variant, className, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, className }))} {...props}>
        {children}
      </span>
    );
  },
);

TacticalBadge.displayName = 'TacticalBadge';
