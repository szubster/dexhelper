import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../utils/cn';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';

export const dataPointVariants = cva(
  'group relative flex flex-col justify-between overflow-hidden rounded-none border border-dashed transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'border-zinc-800/80 bg-zinc-950/60 hover:border-[var(--theme-primary)]/50 hover:bg-zinc-900/80',
        emerald: 'border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-500/60 hover:bg-emerald-950/40',
        amber: 'border-amber-500/30 bg-amber-950/20 hover:border-amber-500/60 hover:bg-amber-950/40',
        red: 'border-red-500/30 bg-red-950/20 hover:border-red-500/60 hover:bg-red-950/40',
        blue: 'border-blue-500/30 bg-blue-950/20 hover:border-blue-500/60 hover:bg-blue-950/40',
        purple: 'border-purple-500/30 bg-purple-950/20 hover:border-purple-500/60 hover:bg-purple-950/40',
      },
      size: {
        default: 'p-3',
        sm: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const crosshairsVariantStyles: Record<string, string> = {
  default: 'border-zinc-700/80 group-hover:border-[var(--theme-primary)]',
  emerald: 'border-emerald-500/50 group-hover:border-emerald-400',
  amber: 'border-amber-500/50 group-hover:border-amber-400',
  red: 'border-red-500/50 group-hover:border-red-400',
  blue: 'border-blue-500/50 group-hover:border-blue-400',
  purple: 'border-purple-500/50 group-hover:border-purple-400',
};

const ledStatusStyles: Record<string, string> = {
  online: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
  busy: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]',
  offline: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]',
  warning: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
};

const promptColorStyles: Record<string, string> = {
  default: 'text-[var(--theme-primary)]/60 group-hover:text-[var(--theme-primary)]',
  emerald: 'text-emerald-400/60 group-hover:text-emerald-400',
  amber: 'text-amber-400/60 group-hover:text-amber-400',
  red: 'text-red-400/60 group-hover:text-red-400',
  blue: 'text-blue-400/60 group-hover:text-blue-400',
  purple: 'text-purple-400/60 group-hover:text-purple-400',
};

const labelColorStyles: Record<string, string> = {
  default: 'text-zinc-500 group-hover:text-[var(--theme-primary)]',
  emerald: 'text-zinc-400 group-hover:text-emerald-400',
  amber: 'text-zinc-400 group-hover:text-amber-400',
  red: 'text-zinc-400 group-hover:text-red-400',
  blue: 'text-zinc-400 group-hover:text-blue-400',
  purple: 'text-zinc-400 group-hover:text-purple-400',
};

const borderAccentStyles: Record<string, string> = {
  default: 'bg-[var(--theme-primary)]',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
};

export interface DataPointProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dataPointVariants> {
  label: React.ReactNode;
  value?: React.ReactNode;
  children?: React.ReactNode;
  sublabel?: React.ReactNode;
  codeTag?: string;
  showLed?: boolean;
  ledStatus?: 'online' | 'busy' | 'offline' | 'warning';
  labelClassName?: string;
  valueClassName?: string;
}

// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary re-renders
export const DataPoint = React.memo(
  React.forwardRef<HTMLDivElement, DataPointProps>(function DataPoint(
    {
      label,
      value,
      children,
      sublabel,
      codeTag,
      showLed,
      ledStatus = 'online',
      variant = 'default',
      size = 'default',
      className,
      labelClassName,
      valueClassName,
      ...props
    },
    ref,
  ) {
    const selectedVariant = variant || 'default';
    const crosshairClass = crosshairsVariantStyles[selectedVariant] ?? crosshairsVariantStyles['default'];

    return (
      <div ref={ref} className={cn(dataPointVariants({ variant, size, className }))} {...props}>
        {/* Subtle LCD Grid Background */}
        <LcdGrid className="opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06]" />

        {/* Scanline overlay */}
        <ScanlineOverlay opacityClass="opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

        {/* 4-Corner Crosshairs */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-0 left-0 h-2 w-2 border-t border-l transition-colors duration-300',
            crosshairClass,
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-0 right-0 h-2 w-2 border-t border-r transition-colors duration-300',
            crosshairClass,
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l transition-colors duration-300',
            crosshairClass,
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-r border-b transition-colors duration-300',
            crosshairClass,
          )}
        />

        {/* Left vertical status indicator strip */}
        <div
          className={cn(
            'absolute top-0 bottom-0 left-0 w-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            borderAccentStyles[selectedVariant] ?? borderAccentStyles['default'],
          )}
        />

        <div className="relative z-10 flex h-full w-full flex-col justify-between gap-2">
          {/* Header Row: Label, codeTag, and Status LED */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                'tactical-text text-[9px] font-black transition-colors',
                labelColorStyles[selectedVariant] ?? labelColorStyles['default'],
                labelClassName,
              )}
            >
              {label}
            </span>

            <div className="flex shrink-0 items-center gap-1.5">
              {codeTag && (
                <span className="tactical-text border border-dashed border-zinc-800 bg-zinc-950/80 px-1 py-0.5 text-[8px] font-bold text-zinc-500">
                  [{codeTag}]
                </span>
              )}

              {showLed ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-1.5 w-1.5 rounded-full transition-all duration-300',
                    ledStatusStyles[ledStatus] ?? ledStatusStyles['online'],
                  )}
                />
              ) : (
                <span
                  className={cn(
                    'h-1 w-1 rounded-full bg-zinc-700 transition-colors group-hover:shadow-[0_0_4px_currentColor]',
                    promptColorStyles[selectedVariant] ?? promptColorStyles['default'],
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>

          {/* Main Value Display */}
          <div className="flex items-center gap-2 overflow-hidden">
            <span
              className={cn(
                'shrink-0 font-mono text-[10px] font-bold transition-colors',
                promptColorStyles[selectedVariant] ?? promptColorStyles['default'],
              )}
              aria-hidden="true"
            >
              {'>>'}
            </span>
            <span
              className={cn(
                'truncate font-mono text-[13px] font-bold tracking-tight text-zinc-200 uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.05)] transition-colors group-hover:text-white',
                valueClassName,
              )}
            >
              {value ?? children}
            </span>
          </div>

          {/* Optional Telemetry Sublabel Row */}
          {sublabel && (
            <div className="flex items-center gap-1.5 border-t border-dashed border-zinc-800/60 pt-1 font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
              <span className="h-[1px] w-2 bg-zinc-700/80 group-hover:bg-zinc-500" />
              <span className="truncate">{sublabel}</span>
            </div>
          )}
        </div>
      </div>
    );
  }),
);

DataPoint.displayName = 'DataPoint';
