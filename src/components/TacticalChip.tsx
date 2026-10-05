import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';

export const chipVariants = cva(
  'inline-flex items-center gap-2 rounded-none border border-dashed px-2 py-1 font-mono text-xs transition-colors',
  {
    variants: {
      variant: {
        primary: 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]',
        zinc: 'border-zinc-800 bg-zinc-950 text-zinc-400',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export interface TacticalChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
  children: React.ReactNode;
  /**
   * Optional callback when the clear/remove X button is clicked.
   */
  onRemove?: () => void;
  /**
   * Accessible title / label for the remove button.
   */
  removeButtonTitle?: string;
}

export const TacticalChip = React.forwardRef<HTMLDivElement, TacticalChipProps>(
  ({ variant, className, children, onRemove, removeButtonTitle = 'Remove item', ...props }, ref) => {
    return (
      <div ref={ref} className={cn(chipVariants({ variant, className }))} {...props}>
        <span>{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="focus-visible:tactical-focus rounded-none text-current opacity-80 transition-opacity hover:text-white hover:opacity-100"
            title={removeButtonTitle}
            aria-label={removeButtonTitle}
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  },
);

TacticalChip.displayName = 'TacticalChip';
