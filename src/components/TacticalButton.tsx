import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';

interface TacticalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger' | 'danger-outline' | 'secondary' | 'sidebar';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  hasCrosshairs?: boolean | 'corners';
}

export const TacticalButton = React.forwardRef<HTMLButtonElement, TacticalButtonProps>(
  ({ className, variant = 'default', size = 'default', hasCrosshairs = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden rounded-none border border-dashed font-black font-mono uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-50',
          {
            // Variants
            'border-white/20 bg-zinc-900/50 text-zinc-500 hover:border-white/40 hover:bg-zinc-800/80 hover:text-white focus-visible:ring-[var(--theme-primary)]':
              variant === 'default',
            'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-zinc-950 focus-visible:ring-[var(--theme-primary)]':
              variant === 'primary',
            'border-red-500 bg-red-950/50 text-red-500 hover:bg-red-900/50 focus-visible:ring-red-500':
              variant === 'danger',
            'border-red-900/50 bg-red-950/20 text-red-500/80 hover:border-red-500/50 hover:bg-red-950/40 hover:text-red-400 focus-visible:ring-red-500':
              variant === 'danger-outline',
            'border-zinc-700 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 focus-visible:ring-[var(--theme-primary)]':
              variant === 'secondary',
            'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10 hover:text-[var(--theme-primary)] focus-visible:ring-[var(--theme-primary)]':
              variant === 'sidebar',

            // Sizes
            'px-5 py-3 text-[10px]': size === 'default',
            'px-3 py-2 text-[9px]': size === 'sm',
            'px-6 py-4 text-[11px]': size === 'lg',
            'p-3': size === 'icon',
          },
          className,
        )}
        {...props}
      >
        {hasCrosshairs === 'corners' ? (
          <CornerCrosshairs
            corners={['top-left', 'bottom-right']}
            className={cn(
              'h-1.5 w-1.5 transition-colors',
              variant === 'primary' ? 'border-[var(--theme-primary)]' : 'border-white/40',
            )}
          />
        ) : hasCrosshairs ? (
          <CornerCrosshairs
            className={cn(
              'h-1.5 w-1.5 transition-colors',
              variant === 'primary'
                ? 'border-[var(--theme-primary)]'
                : variant === 'sidebar'
                  ? 'border-current opacity-0 group-hover:opacity-100'
                  : variant === 'danger'
                    ? 'border-red-500'
                    : variant === 'danger-outline'
                      ? 'border-red-900/50 group-hover:border-red-500'
                      : 'border-white/40 group-hover:border-[var(--theme-primary)]',
            )}
          />
        ) : null}

        <span className="relative z-10 flex items-center gap-2">{children}</span>

        {variant === 'primary' && <div className="absolute top-0 left-0 h-full w-1 bg-[var(--theme-primary)]" />}
      </button>
    );
  },
);
TacticalButton.displayName = 'TacticalButton';
