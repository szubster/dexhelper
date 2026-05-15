import React from 'react';
import { cn } from '../utils/cn';

export type TacticalBadgeVariant =
  | 'default'
  | 'primary'
  | 'amber'
  | 'red'
  | 'emerald'
  | 'blue'
  | 'rose'
  | 'secondary'
  | 'zinc';

interface TacticalBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TacticalBadgeVariant;
  children: React.ReactNode;
}

export const TacticalBadge = React.forwardRef<HTMLSpanElement, TacticalBadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    let variantClasses = '';

    switch (variant) {
      case 'primary':
        variantClasses = 'border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]';
        break;
      case 'amber':
        variantClasses = 'border-amber-500/10 bg-amber-500/5 text-amber-500/60';
        break;
      case 'red':
        variantClasses = 'border-red-500/10 bg-red-500/5 text-red-500/60';
        break;
      case 'emerald':
        variantClasses = 'border-emerald-500/30 bg-emerald-500/20 text-emerald-400';
        break;
      case 'blue':
        variantClasses = 'border-blue-500/50 bg-blue-500/10 text-blue-400';
        break;
      case 'rose':
        variantClasses = 'border-rose-500/20 bg-rose-500/10 text-rose-400';
        break;
      case 'secondary':
        variantClasses = 'border-white/10 bg-white/5 text-zinc-400';
        break;
      case 'zinc':
        variantClasses = 'border-white/5 bg-white/5 text-zinc-500';
        break;
      default:
        variantClasses = 'border-white/5 bg-white/5 text-zinc-500';
        break;
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-none border px-2 py-0.5 font-black text-[8px] uppercase tracking-widest',
          variantClasses,
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
