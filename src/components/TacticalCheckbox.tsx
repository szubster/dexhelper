import { CornerCrosshairs } from '@dexhelper/ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check } from 'lucide-react';
import React from 'react';
import { cn } from '../utils/cn';
import { ScanlineOverlay } from './ScanlineOverlay';

export const checkboxBoxVariants = cva(
  'relative flex h-4 w-4 shrink-0 items-center justify-center rounded-none border border-dashed transition-all duration-200 select-none',
  {
    variants: {
      variant: {
        default:
          'border-zinc-700 bg-zinc-950/80 group-focus-within:border-[var(--theme-primary)] group-hover:border-zinc-500 group-has-checked:border-[var(--theme-primary)] group-has-checked:bg-[var(--theme-primary)]/15 group-has-checked:text-[var(--theme-primary)]',
        emerald:
          'border-emerald-800/80 bg-zinc-950/80 group-focus-within:border-emerald-500 group-hover:border-emerald-600 group-has-checked:border-emerald-500 group-has-checked:bg-emerald-950/40 group-has-checked:text-emerald-400',
        amber:
          'border-amber-800/80 bg-zinc-950/80 group-focus-within:border-amber-500 group-hover:border-amber-600 group-has-checked:border-amber-500 group-has-checked:bg-amber-950/40 group-has-checked:text-amber-400',
        red: 'border-red-800/80 bg-zinc-950/80 group-focus-within:border-red-500 group-hover:border-red-600 group-has-checked:border-red-500 group-has-checked:bg-red-950/40 group-has-checked:text-red-400',
        blue: 'border-blue-800/80 bg-zinc-950/80 group-focus-within:border-blue-500 group-hover:border-blue-600 group-has-checked:border-blue-500 group-has-checked:bg-blue-950/40 group-has-checked:text-blue-400',
        purple:
          'border-purple-800/80 bg-zinc-950/80 group-focus-within:border-purple-500 group-hover:border-purple-600 group-has-checked:border-purple-500 group-has-checked:bg-purple-950/40 group-has-checked:text-purple-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const crosshairsVariantStyles: Record<string, string> = {
  default: 'border-zinc-700/60 group-hover:border-zinc-400 group-has-checked:border-[var(--theme-primary)]',
  emerald: 'border-emerald-800/60 group-hover:border-emerald-500 group-has-checked:border-emerald-400',
  amber: 'border-amber-800/60 group-hover:border-amber-500 group-has-checked:border-amber-400',
  red: 'border-red-800/60 group-hover:border-red-500 group-has-checked:border-red-400',
  blue: 'border-blue-800/60 group-hover:border-blue-500 group-has-checked:border-blue-400',
  purple: 'border-purple-800/60 group-hover:border-purple-500 group-has-checked:border-purple-400',
};

const ledVariantStyles: Record<string, string> = {
  default:
    'bg-zinc-700/60 group-hover:bg-zinc-500 group-has-checked:bg-[var(--theme-primary)] group-has-checked:shadow-[0_0_6px_var(--theme-primary)]',
  emerald:
    'bg-zinc-700/60 group-hover:bg-emerald-600 group-has-checked:bg-emerald-400 group-has-checked:shadow-[0_0_6px_rgba(52,211,153,0.8)]',
  amber:
    'bg-zinc-700/60 group-hover:bg-amber-600 group-has-checked:bg-amber-400 group-has-checked:shadow-[0_0_6px_rgba(251,191,36,0.8)]',
  red: 'bg-zinc-700/60 group-hover:bg-red-600 group-has-checked:bg-red-400 group-has-checked:shadow-[0_0_6px_rgba(248,113,113,0.8)]',
  blue: 'bg-zinc-700/60 group-hover:bg-blue-600 group-has-checked:bg-blue-400 group-has-checked:shadow-[0_0_6px_rgba(96,165,250,0.8)]',
  purple:
    'bg-zinc-700/60 group-hover:bg-purple-600 group-has-checked:bg-purple-400 group-has-checked:shadow-[0_0_6px_rgba(192,132,252,0.8)]',
};

const labelVariantStyles: Record<string, string> = {
  default: 'group-hover:text-zinc-100 group-has-checked:text-zinc-100',
  emerald: 'group-hover:text-emerald-200 group-has-checked:text-emerald-300',
  amber: 'group-hover:text-amber-200 group-has-checked:text-amber-300',
  red: 'group-hover:text-red-200 group-has-checked:text-red-300',
  blue: 'group-hover:text-blue-200 group-has-checked:text-blue-300',
  purple: 'group-hover:text-purple-200 group-has-checked:text-purple-300',
};

const codeTagVariantStyles: Record<string, string> = {
  default:
    'border-zinc-800 bg-zinc-900/60 text-zinc-500 group-has-checked:border-zinc-700 group-has-checked:text-zinc-400',
  emerald:
    'border-emerald-900/60 bg-emerald-950/40 text-emerald-500 group-has-checked:border-emerald-800 group-has-checked:text-emerald-400',
  amber:
    'border-amber-900/60 bg-amber-950/40 text-amber-500 group-has-checked:border-amber-800 group-has-checked:text-amber-400',
  red: 'border-red-900/60 bg-red-950/40 text-red-500 group-has-checked:border-red-800 group-has-checked:text-red-400',
  blue: 'border-blue-900/60 bg-blue-950/40 text-blue-500 group-has-checked:border-blue-800 group-has-checked:text-blue-400',
  purple:
    'border-purple-900/60 bg-purple-950/40 text-purple-500 group-has-checked:border-purple-800 group-has-checked:text-purple-400',
};

export const checkboxVariants = cva('peer sr-only cursor-pointer disabled:cursor-not-allowed', {
  variants: {
    variant: {
      default: '',
      emerald: '',
      amber: '',
      red: '',
      blue: '',
      purple: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface TacticalCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  codeTag?: string;
  showLed?: boolean;
  showCrosshairs?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

export const TacticalCheckbox = React.forwardRef<HTMLInputElement, TacticalCheckboxProps>(
  (
    {
      className,
      variant = 'default',
      containerClassName,
      label,
      sublabel,
      codeTag,
      showLed = true,
      showCrosshairs = true,
      labelClassName,
      id: customId,
      disabled,
      ...props
    },
    ref,
  ) => {
    const defaultId = React.useId();
    const inputId = customId || defaultId;
    const selectedVariant = variant || 'default';

    const inputNode = (
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        className={cn(checkboxVariants({ variant }), className)}
        {...props}
      />
    );

    const checkIndicator = (
      <div
        className={cn(checkboxBoxVariants({ variant: selectedVariant }), disabled && 'cursor-not-allowed opacity-50')}
      >
        {/* Subtle hover scanline overlay */}
        <ScanlineOverlay className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        {/* 4-corner crosshair accents */}
        {showCrosshairs && (
          <CornerCrosshairs className={cn('h-1 w-1 transition-colors', crosshairsVariantStyles[selectedVariant])} />
        )}

        {/* SVG Check icon indicator visible when peer is checked */}
        <Check
          strokeWidth={3}
          className="h-3 w-3 scale-0 text-current transition-transform duration-150 ease-out group-has-checked:scale-100"
        />
      </div>
    );

    if (!label && !sublabel && !codeTag) {
      return (
        <label
          htmlFor={inputId}
          className={cn(
            'group relative inline-flex cursor-pointer items-center select-none',
            disabled && 'cursor-not-allowed opacity-50',
            containerClassName,
          )}
        >
          {inputNode}
          {checkIndicator}
        </label>
      );
    }

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'group relative flex cursor-pointer items-start justify-between gap-3 overflow-hidden rounded-none border border-dashed border-zinc-800/80 bg-zinc-950/70 p-2.5 transition-all duration-200 select-none hover:border-zinc-700 hover:bg-zinc-900/50',
          disabled && 'cursor-not-allowed opacity-50 hover:border-zinc-800/80 hover:bg-zinc-950/70',
          containerClassName,
        )}
      >
        {inputNode}

        <div className="z-10 flex min-w-0 flex-1 items-center gap-2.5">
          {/* LED Indicator Dot + Box */}
          <div className="relative flex shrink-0 items-center justify-center">
            {showLed && (
              <span
                className={cn(
                  'absolute -top-1 -left-1 h-1.5 w-1.5 rounded-full transition-all duration-300',
                  ledVariantStyles[selectedVariant],
                  disabled && 'opacity-40 shadow-none',
                )}
              />
            )}
            {checkIndicator}
          </div>

          {/* Label and Sublabel */}
          <div className="flex min-w-0 flex-col">
            {label && (
              <span
                className={cn(
                  'tactical-text text-zinc-300 transition-colors',
                  labelVariantStyles[selectedVariant],
                  labelClassName,
                )}
              >
                {label}
              </span>
            )}
            {sublabel && (
              <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">{sublabel}</span>
            )}
          </div>
        </div>

        {/* Telemetry Tag Badge */}
        {codeTag && (
          <div className="z-10 flex shrink-0 items-center">
            <span
              className={cn(
                'border border-dashed px-1.5 py-0.5 font-mono text-[9px] tracking-widest uppercase transition-colors',
                codeTagVariantStyles[selectedVariant],
              )}
            >
              [{codeTag}]
            </span>
          </div>
        )}
      </label>
    );
  },
);

TacticalCheckbox.displayName = 'TacticalCheckbox';
