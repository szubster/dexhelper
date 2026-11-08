import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { ScanlineOverlay } from './ScanlineOverlay';

export const iconButtonVariants = cva(
  'tactical-icon-button group relative inline-flex shrink-0 items-center justify-center overflow-hidden transition-all duration-200 outline-none focus-visible:tactical-focus disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100',
  {
    variants: {
      variant: {
        default:
          'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-900 hover:text-white',
        primary:
          'border-[var(--theme-primary)]/40 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/20 hover:text-white',
        danger:
          'border-red-900/60 bg-red-950/20 text-red-500 hover:border-red-500 hover:bg-red-900/30 hover:text-red-300',
        secondary:
          'border-zinc-700/60 bg-zinc-900/60 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white',
        amber:
          'border-amber-900/60 bg-amber-950/20 text-amber-500 hover:border-amber-500 hover:bg-amber-900/30 hover:text-amber-300',
        emerald:
          'border-emerald-900/60 bg-emerald-950/20 text-emerald-500 hover:border-emerald-500 hover:bg-emerald-900/30 hover:text-emerald-300',
        purple:
          'border-purple-900/60 bg-purple-950/20 text-purple-400 hover:border-purple-500 hover:bg-purple-900/30 hover:text-purple-300',
      },
      size: {
        sm: 'h-6 w-6 p-1 text-xs',
        md: 'h-8 w-8 p-1.5 text-sm',
        lg: 'h-10 w-10 p-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const ledColorStyles = {
  default: 'border-zinc-500 bg-zinc-400 shadow-[0_0_6px_rgba(161,161,170,0.6)]',
  primary:
    'border-[var(--theme-primary)] bg-[var(--theme-primary)] shadow-[0_0_6px_var(--theme-primary)]',
  danger: 'border-red-500 bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]',
  secondary: 'border-zinc-400 bg-zinc-300 shadow-[0_0_6px_rgba(212,212,216,0.6)]',
  amber: 'border-amber-500 bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.7)]',
  emerald: 'border-emerald-500 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]',
  purple: 'border-purple-500 bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.7)]',
} as const;

const crosshairStyles = {
  default: 'border-zinc-700 group-hover:border-zinc-400',
  primary: 'border-[var(--theme-primary)]/40 group-hover:border-[var(--theme-primary)]',
  danger: 'border-red-800/60 group-hover:border-red-500',
  secondary: 'border-zinc-600/60 group-hover:border-zinc-400',
  amber: 'border-amber-800/60 group-hover:border-amber-500',
  emerald: 'border-emerald-800/60 group-hover:border-emerald-500',
  purple: 'border-purple-800/60 group-hover:border-purple-500',
} as const;

type IconButtonVariant = keyof typeof ledColorStyles;

export interface TacticalIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  children: React.ReactNode;
  hasCrosshairs?: boolean;
  showScanlines?: boolean;
  ledStatus?: 'none' | 'active' | 'warning' | 'danger';
}

export const TacticalIconButton = React.forwardRef<HTMLButtonElement, TacticalIconButtonProps>(
  (
    {
      className,
      children,
      type = 'button',
      variant = 'default',
      size = 'md',
      hasCrosshairs = true,
      showScanlines = true,
      ledStatus = 'none',
      ...props
    },
    ref,
  ) => {
    const title = props.title || props['aria-label'];
    const { title: _title, ...restProps } = props;
    const selectedVariant: IconButtonVariant =
      variant && variant in ledColorStyles ? (variant as IconButtonVariant) : 'default';
    const effectiveLedColor =
      ledStatus === 'danger'
        ? ledColorStyles.danger
        : ledStatus === 'warning'
          ? ledColorStyles.amber
          : ledColorStyles[selectedVariant];

    return (
      <button
        ref={ref}
        type={type}
        aria-label={title}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...restProps}
      >
        {hasCrosshairs && (
          <CornerCrosshairs
            className={cn(
              'h-1 w-1 transition-colors pointer-events-none',
              crosshairStyles[selectedVariant],
            )}
          />
        )}

        {showScanlines && (
          <ScanlineOverlay className="opacity-0 transition-opacity duration-200 group-hover:opacity-20" />
        )}

        {ledStatus !== 'none' && (
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute top-1 right-1 h-1 w-1 rounded-full animate-pulse border',
              effectiveLedColor,
            )}
          />
        )}

        <span className="relative z-10 flex items-center justify-center pointer-events-none">
          {children}
        </span>

        {title && (
          <span aria-hidden="true" className="tactical-tooltip">
            {title}
          </span>
        )}
      </button>
    );
  },
);

TacticalIconButton.displayName = 'TacticalIconButton';
