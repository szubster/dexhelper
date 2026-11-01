import { CornerCrosshairs } from '@dexhelper/ui';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../utils/cn';

const cardVariants = cva(
  'group focus-visible:tactical-focus relative w-full cursor-pointer text-left disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        emerald:
          'tactical-card border-emerald-500/50 bg-emerald-950/20 hover:border-emerald-400 hover:bg-emerald-900/30',
        amber: 'tactical-card border-amber-500/50 bg-amber-950/20 hover:border-amber-400 hover:bg-amber-900/30',
        default: 'tactical-card border-white/20 bg-zinc-900/50 hover:border-white/40 hover:bg-zinc-800/80',
        'storage-cyan':
          'tactical-card items-center border-dashed border-cyan-500/50 bg-cyan-900/10 p-5 duration-200 hover:bg-cyan-900/20 enabled:hover:-translate-y-1 enabled:hover:scale-100 enabled:active:scale-95',
        'storage-amber':
          'tactical-card items-center border-amber-500/30 bg-amber-900/10 p-5 duration-200 hover:bg-amber-900/20 enabled:hover:-translate-y-1 enabled:hover:scale-100 enabled:active:scale-95',
        'storage-red':
          'tactical-card items-center border-red-900/30 bg-red-900/10 p-5 duration-200 hover:bg-red-900/20 enabled:hover:-translate-y-1 enabled:hover:scale-100 enabled:active:scale-95',
        'storage-emerald':
          'tactical-card items-center border-emerald-900/30 bg-emerald-900/10 p-5 duration-200 hover:bg-emerald-900/20 enabled:hover:-translate-y-1 enabled:hover:scale-100 enabled:active:scale-95',
        'storage-default':
          'tactical-card items-center border-zinc-800 bg-zinc-900 p-5 shadow-sm duration-200 hover:border-zinc-700 enabled:hover:-translate-y-1 enabled:hover:scale-100 enabled:active:scale-95',
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
