import React from 'react';
import { cn } from '../utils/cn';

interface TacticalCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  title?: string;
  testId?: string;
  pokemonId?: number;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  variant?:
    | 'default'
    | 'emerald'
    | 'amber'
    | 'storage-default'
    | 'storage-emerald'
    | 'storage-amber'
    | 'storage-red'
    | 'storage-cyan';
}

// ⚡ Bolt: Wrapped TacticalCard in React.memo to prevent unnecessary DOM re-renders of up to 400 PC boxes when parent states change
export const TacticalCard = React.memo(
  React.forwardRef<HTMLButtonElement, TacticalCardProps>(
    (
      { children, onClick, ariaLabel, title, testId, pokemonId, className, style, disabled, variant = 'default' },
      ref,
    ) => {
      let variantClasses = '';
      let highlightClasses = '';

      switch (variant) {
        case 'emerald':
          variantClasses =
            'bg-emerald-950/20 shadow-[inset_0_0_15px_rgba(16,185,129,0.05),0_4px_0_rgba(0,0,0,0.8)] enabled:hover:bg-emerald-900/30';
          highlightClasses = 'bg-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.5)]';
          break;
        case 'amber':
          variantClasses =
            'bg-amber-950/20 shadow-[inset_0_0_15px_rgba(245,158,11,0.05),0_4px_0_rgba(0,0,0,0.8)] enabled:hover:bg-amber-900/30';
          highlightClasses = 'bg-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.5)]';
          break;
        case 'default':
          variantClasses =
            'bg-zinc-900/80 shadow-[inset_0_0_15px_rgba(0,0,0,0.5),0_4px_0_rgba(0,0,0,0.8)] enabled:hover:bg-zinc-800';
          highlightClasses = 'bg-cyan-500/20 shadow-[0_0_8px_rgba(34,211,238,0.5)]';
          break;
        case 'storage-cyan':
          variantClasses =
            'bg-cyan-900/20 shadow-[inset_0_0_10px_rgba(34,211,238,0.05),0_3px_0_rgba(0,0,0,0.8)] enabled:hover:bg-cyan-900/30';
          highlightClasses = 'bg-cyan-500/30 shadow-[0_0_5px_rgba(34,211,238,0.4)]';
          break;
        case 'storage-amber':
          variantClasses =
            'bg-amber-900/20 shadow-[inset_0_0_10px_rgba(245,158,11,0.05),0_3px_0_rgba(0,0,0,0.8)] enabled:hover:bg-amber-900/30';
          highlightClasses = 'bg-amber-500/30 shadow-[0_0_5px_rgba(245,158,11,0.4)]';
          break;
        case 'storage-red':
          variantClasses =
            'bg-red-900/20 shadow-[inset_0_0_10px_rgba(239,68,68,0.05),0_3px_0_rgba(0,0,0,0.8)] enabled:hover:bg-red-900/30';
          highlightClasses = 'bg-red-500/30 shadow-[0_0_5px_rgba(239,68,68,0.4)]';
          break;
        case 'storage-emerald':
          variantClasses =
            'bg-emerald-900/20 shadow-[inset_0_0_10px_rgba(16,185,129,0.05),0_3px_0_rgba(0,0,0,0.8)] enabled:hover:bg-emerald-900/30';
          highlightClasses = 'bg-emerald-500/30 shadow-[0_0_5px_rgba(16,185,129,0.4)]';
          break;
        case 'storage-default':
          variantClasses =
            'bg-zinc-900/80 shadow-[inset_0_0_10px_rgba(0,0,0,0.2),0_3px_0_rgba(0,0,0,0.8)] enabled:hover:bg-zinc-800';
          highlightClasses = 'bg-white/10';
          break;
      }

      const isStorageVariant = variant.startsWith('storage-');
      const depressionDistance = isStorageVariant
        ? 'enabled:active:translate-y-[3px] enabled:active:shadow-[inset_0_0_10px_rgba(0,0,0,0.2),0_0px_0_rgba(0,0,0,0.8)]'
        : 'enabled:active:translate-y-[4px] enabled:active:shadow-[inset_0_0_15px_rgba(0,0,0,0.5),0_0px_0_rgba(0,0,0,0.8)]';

      return (
        <button
          ref={ref}
          type="button"
          aria-label={ariaLabel}
          title={title}
          data-testid={testId}
          data-pokemon-id={pokemonId}
          onClick={onClick}
          disabled={disabled}
          className={cn(
            'group focus-visible:tactical-focus relative w-full cursor-pointer text-left disabled:cursor-not-allowed disabled:opacity-50',
            'border-2 border-t-white/10 border-r-black/80 border-b-black/80 border-l-white/10',
            'transition-all duration-100 ease-in-out',
            depressionDistance,
            isStorageVariant ? 'tactical-card items-center p-3' : 'tactical-card',
            variantClasses,
            className,
          )}
          style={style}
        >
          {/* Mechanical Hardware Screws */}
          <div className="absolute top-1 left-1 h-1.5 w-1.5 rounded-full bg-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
          <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
          <div className="absolute bottom-1 left-1 h-1.5 w-1.5 rounded-full bg-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
          <div className="absolute right-1 bottom-1 h-1.5 w-1.5 rounded-full bg-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />

          {/* Activity Status Indicator */}
          <div
            className={cn(
              'absolute top-1.5 left-1/2 h-0.5 w-8 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100',
              highlightClasses,
            )}
          />

          {children}
        </button>
      );
    },
  ),
);

TacticalCard.displayName = 'TacticalCard';
