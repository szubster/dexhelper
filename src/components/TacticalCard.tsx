import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';

const cardVariants = cva(
  'group focus-visible:tactical-focus relative w-full cursor-pointer text-left disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        emerald:
          'border-emerald-500/50 bg-emerald-950/20 hover:border-emerald-400 hover:bg-emerald-900/30 tactical-card',
        amber: 'border-amber-500/50 bg-amber-950/20 hover:border-amber-400 hover:bg-amber-900/30 tactical-card',
        default: 'border-white/20 bg-zinc-900/50 hover:border-white/40 hover:bg-zinc-800/80 tactical-card',
        'storage-cyan':
          'bg-cyan-900/10 border-cyan-500/50 border-dashed hover:bg-cyan-900/20 tactical-card items-center p-5 duration-200 enabled:active:scale-95 enabled:hover:-translate-y-1 enabled:hover:scale-100',
        'storage-amber':
          'bg-amber-900/10 border-amber-500/30 hover:bg-amber-900/20 tactical-card items-center p-5 duration-200 enabled:active:scale-95 enabled:hover:-translate-y-1 enabled:hover:scale-100',
        'storage-red':
          'bg-red-900/10 border-red-900/30 hover:bg-red-900/20 tactical-card items-center p-5 duration-200 enabled:active:scale-95 enabled:hover:-translate-y-1 enabled:hover:scale-100',
        'storage-emerald':
          'bg-emerald-900/10 border-emerald-900/30 hover:bg-emerald-900/20 tactical-card items-center p-5 duration-200 enabled:active:scale-95 enabled:hover:-translate-y-1 enabled:hover:scale-100',
        'storage-default':
          'bg-zinc-900 border-zinc-800 hover:border-zinc-700 shadow-sm tactical-card items-center p-5 duration-200 enabled:active:scale-95 enabled:hover:-translate-y-1 enabled:hover:scale-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

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
  variant?: VariantProps<typeof cardVariants>['variant'];
}

// ⚡ Bolt: Wrapped TacticalCard in React.memo to prevent unnecessary DOM re-renders of up to 400 PC boxes when parent states change
export const TacticalCard = React.memo(
  React.forwardRef<HTMLButtonElement, TacticalCardProps>(
    ({ children, onClick, ariaLabel, title, testId, pokemonId, className, style, disabled, variant }, ref) => {
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
          className={cn(cardVariants({ variant, className }))}
          style={style}
        >
          {/* Corner Crosshairs */}
          <CornerCrosshairs
            thickness={2}
            className="h-2 w-2 border-white/40 transition-colors group-hover:border-[var(--theme-primary)] group-focus-visible:border-[var(--theme-primary)]"
          />
          {children}
        </button>
      );
    },
  ),
);

TacticalCard.displayName = 'TacticalCard';
