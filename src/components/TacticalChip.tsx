import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';

export const chipVariants = cva(
  'group relative inline-flex items-center gap-1.5 overflow-hidden rounded-none border border-dashed px-2.5 py-1 font-mono text-xs transition-all duration-200 select-none',
  {
    variants: {
      variant: {
        primary:
          'border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/20 hover:shadow-[0_0_8px_rgba(var(--theme-primary-rgb,16,185,129),0.2)]',
        zinc: 'border-zinc-800 bg-zinc-950/90 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-200',
        danger:
          'border-red-500/50 bg-red-950/20 text-red-400 hover:border-red-500 hover:bg-red-950/40 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]',
        amber:
          'border-amber-500/50 bg-amber-950/20 text-amber-400 hover:border-amber-500 hover:bg-amber-950/40 hover:shadow-[0_0_8px_rgba(245,158,11,0.2)]',
        emerald:
          'border-emerald-500/50 bg-emerald-950/20 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-950/40 hover:shadow-[0_0_8px_rgba(16,185,129,0.2)]',
        purple:
          'border-purple-500/50 bg-purple-950/20 text-purple-400 hover:border-purple-500 hover:bg-purple-950/40 hover:shadow-[0_0_8px_rgba(168,85,247,0.2)]',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface TacticalChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
  children: React.ReactNode;
  /**
   * Optional code tag badge displayed at the front (e.g. "TAG.01" or "SYS").
   */
  codeTag?: React.ReactNode;
  /**
   * Whether to display an active status LED dot.
   */
  showLed?: boolean;
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
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      children,
      codeTag,
      showLed = true,
      onRemove,
      removeButtonTitle = 'Remove item',
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn(chipVariants({ variant, size, className }))} {...props}>
        {/* Hardware Corner Accent Ticks */}
        <span
          className="pointer-events-none absolute top-0 left-0 h-1 w-1 border-current border-t border-l opacity-60 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute top-0 right-0 h-1 w-1 border-current border-t border-r opacity-60 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute bottom-0 left-0 h-1 w-1 border-current border-b border-l opacity-60 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute right-0 bottom-0 h-1 w-1 border-current border-r border-b opacity-60 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Hover Scanline Overlay */}
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-current/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* LED Status Indicator */}
        {showLed && (
          <span className="relative flex h-1.5 w-1.5 items-center justify-center" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-40" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_4px_currentColor]" />
          </span>
        )}

        {/* Optional Code Tag */}
        {codeTag && (
          <span className="font-mono text-[9px] uppercase tracking-wider opacity-75">
            <span aria-hidden="true">[</span>
            {codeTag}
            <span aria-hidden="true">]</span>
          </span>
        )}

        {/* Content */}
        <span className="relative z-10 truncate font-semibold tracking-tight">{children}</span>

        {/* Remove Button */}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="focus-visible:tactical-focus relative z-10 -mr-1 ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-none border border-current/30 border-dashed p-0.5 text-current opacity-80 transition-all hover:border-current hover:bg-current/20 hover:opacity-100 active:scale-95"
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
