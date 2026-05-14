import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';

interface TacticalCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  title?: string;
  testId?: string;
  pokemonId?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'emerald' | 'amber' | 'storage-default' | 'storage-emerald' | 'storage-amber' | 'storage-red';
}

export const TacticalCard = React.forwardRef<HTMLButtonElement, TacticalCardProps>(
  ({ children, onClick, ariaLabel, title, testId, pokemonId, className, style, variant = 'default' }, ref) => {
    let variantClasses = '';

    switch (variant) {
      case 'emerald':
        variantClasses = 'border-emerald-500/50 bg-emerald-950/20 hover:border-emerald-400 hover:bg-emerald-900/30';
        break;
      case 'amber':
        variantClasses = 'border-amber-500/50 bg-amber-950/20 hover:border-amber-400 hover:bg-amber-900/30';
        break;
      case 'default':
        variantClasses = 'border-white/20 bg-zinc-900/50 hover:border-white/40 hover:bg-zinc-800/80';
        break;
      case 'storage-amber':
        variantClasses =
          'rounded-none bg-amber-900/5 border border-dashed border-amber-500/30 hover:bg-amber-900/20 hover:border-amber-400';
        break;
      case 'storage-red':
        variantClasses =
          'rounded-none bg-red-900/5 border border-dashed border-red-500/30 hover:bg-red-900/20 hover:border-red-400';
        break;
      case 'storage-emerald':
        variantClasses =
          'rounded-none bg-emerald-900/5 border border-dashed border-emerald-500/30 hover:bg-emerald-900/20 hover:border-emerald-400';
        break;
      case 'storage-default':
        variantClasses =
          'rounded-none bg-zinc-900/50 border border-dashed border-white/10 hover:border-white/30 hover:bg-zinc-800/80';
        break;
    }

    const isStorageVariant = variant.startsWith('storage-');

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        title={title}
        data-testid={testId}
        data-pokemon-id={pokemonId}
        onClick={onClick}
        className={cn(
          'group relative w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
          isStorageVariant
            ? 'flex flex-col items-center p-5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
            : 'rounded-none border border-dashed p-4 font-mono transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]',
          variantClasses,
          className,
        )}
        style={style}
      >
        {/* LCD Grid Background (Storage Variants) */}
        {isStorageVariant && (
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '4px 4px',
            }}
          />
        )}

        {/* Scanline overlay (Storage Variants) */}
        {isStorageVariant && <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-[0.05]" />}

        {/* Corner Crosshairs */}
        <CornerCrosshairs
          thickness={2}
          className={cn(
            'h-2 w-2 transition-colors',
            isStorageVariant
              ? 'border-white/20 group-hover:border-white/60'
              : 'border-white/40 group-hover:border-[var(--theme-primary)]',
          )}
        />
        {children}
      </button>
    );
  },
);

TacticalCard.displayName = 'TacticalCard';
