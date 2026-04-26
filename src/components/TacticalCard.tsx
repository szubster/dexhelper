import React from 'react';
import { cn } from '../utils/cn';

interface TacticalCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  testId?: string;
  pokemonId?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'emerald' | 'amber' | 'storage-default' | 'storage-emerald' | 'storage-amber' | 'storage-red';
}

export const TacticalCard = React.forwardRef<HTMLButtonElement, TacticalCardProps>(
  ({ children, onClick, ariaLabel, testId, pokemonId, className, style, variant = 'default' }, ref) => {
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
        variantClasses = 'rounded-2xl bg-amber-900/10 border border-amber-500/30 hover:bg-amber-900/20';
        break;
      case 'storage-red':
        variantClasses = 'rounded-2xl bg-red-900/10 border border-red-900/30 hover:bg-red-900/20';
        break;
      case 'storage-emerald':
        variantClasses = 'rounded-2xl bg-emerald-900/10 border border-emerald-900/30 hover:bg-emerald-900/20';
        break;
      case 'storage-default':
        variantClasses = 'rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 shadow-sm';
        break;
    }

    const isStorageVariant = variant.startsWith('storage-');

    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        data-testid={testId}
        data-pokemon-id={pokemonId}
        onClick={onClick}
        className={cn(
          'group relative w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
          isStorageVariant
            ? 'flex flex-col items-center p-5 transition-all duration-200 hover:-translate-y-1 active:scale-95'
            : 'rounded-none border border-dashed p-4 font-mono transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]',
          variantClasses,
          className,
        )}
        style={style}
      >
        {!isStorageVariant && (
          <>
            {/* Corner Crosshairs */}
            <div className="absolute top-0 left-0 h-2 w-2 border-white/40 border-t-2 border-l-2 transition-colors group-hover:border-[var(--theme-primary)]" />
            <div className="absolute top-0 right-0 h-2 w-2 border-white/40 border-t-2 border-r-2 transition-colors group-hover:border-[var(--theme-primary)]" />
            <div className="absolute bottom-0 left-0 h-2 w-2 border-white/40 border-b-2 border-l-2 transition-colors group-hover:border-[var(--theme-primary)]" />
            <div className="absolute right-0 bottom-0 h-2 w-2 border-white/40 border-r-2 border-b-2 transition-colors group-hover:border-[var(--theme-primary)]" />
          </>
        )}
        {children}
      </button>
    );
  },
);

TacticalCard.displayName = 'TacticalCard';
