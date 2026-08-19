import React from 'react';
import { cn } from '../utils/cn';

interface TacticalBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'amber' | 'red' | 'zinc' | 'blue' | 'emerald' | 'rose' | 'pink';
  children: React.ReactNode;
}

export const TacticalBadge = React.forwardRef<HTMLSpanElement, TacticalBadgeProps>(
  ({ variant = 'zinc', className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-none border border-dashed px-2 py-1 font-black text-[8px] uppercase tracking-widest',
          {
            'border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]':
              variant === 'primary',
            'border-amber-500/10 bg-amber-500/5 text-amber-500/60': variant === 'amber',
            'border-red-500/10 bg-red-500/5 text-red-500/60': variant === 'red',
            'border-zinc-800 bg-zinc-950 text-zinc-500': variant === 'zinc',
            'border-blue-500/50 bg-blue-500/10 text-blue-400': variant === 'blue',
            'border-emerald-500/50 bg-emerald-500/10 text-emerald-400': variant === 'emerald',
            'border-rose-500/50 bg-rose-500/10 text-rose-400': variant === 'rose',
            'border-pink-500/10 bg-pink-500/5 text-pink-400/60': variant === 'pink',
          },
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

TacticalBadge.displayName = 'TacticalBadge';
