import React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { ScanlineOverlay } from './ScanlineOverlay';

export type TacticalProgressBarVariant = 'default' | 'emerald' | 'amber' | 'red' | 'blue' | 'purple';

export interface TacticalProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: number;
  max?: number;
  valueDisplay?: React.ReactNode;
  segments?: number;
  colorClass?: string;
  emptyColorClass?: string;
  codeTag?: string;
  variant?: TacticalProgressBarVariant;
  showDot?: boolean;
}

const VARIANT_STYLES: Record<
  TacticalProgressBarVariant,
  {
    border: string;
    leftBar: string;
    dot: string;
    codeTag: string;
    labelColor: string;
    activeSegment: string;
    emptySegment: string;
    crosshairs: string;
  }
> = {
  default: {
    border: 'border-zinc-800 hover:border-zinc-700',
    leftBar: 'bg-[var(--theme-primary)]',
    dot: 'bg-[var(--theme-primary)] shadow-[0_0_6px_var(--theme-primary)]',
    codeTag: 'text-zinc-500 border-zinc-800 bg-zinc-900/60',
    labelColor: 'text-zinc-300',
    activeSegment: 'bg-[var(--theme-primary)] shadow-[0_0_5px_rgba(var(--theme-primary-rgb),0.8)]',
    emptySegment: 'bg-zinc-900/50',
    crosshairs: 'border-zinc-700/60',
  },
  emerald: {
    border: 'border-emerald-900/60 hover:border-emerald-700/60',
    leftBar: 'bg-emerald-500',
    dot: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]',
    codeTag: 'text-emerald-400 border-emerald-900/80 bg-emerald-950/40',
    labelColor: 'text-emerald-300',
    activeSegment: 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]',
    emptySegment: 'bg-emerald-950/30',
    crosshairs: 'border-emerald-700/60',
  },
  amber: {
    border: 'border-amber-900/60 hover:border-amber-700/60',
    leftBar: 'bg-amber-500',
    dot: 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]',
    codeTag: 'text-amber-400 border-amber-900/80 bg-amber-950/40',
    labelColor: 'text-amber-300',
    activeSegment: 'bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.8)]',
    emptySegment: 'bg-amber-950/30',
    crosshairs: 'border-amber-700/60',
  },
  red: {
    border: 'border-red-900/60 hover:border-red-700/60',
    leftBar: 'bg-red-500',
    dot: 'bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.8)]',
    codeTag: 'text-red-400 border-red-900/80 bg-red-950/40',
    labelColor: 'text-red-300',
    activeSegment: 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]',
    emptySegment: 'bg-red-950/30',
    crosshairs: 'border-red-700/60',
  },
  blue: {
    border: 'border-blue-900/60 hover:border-blue-700/60',
    leftBar: 'bg-blue-500',
    dot: 'bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]',
    codeTag: 'text-blue-400 border-blue-900/80 bg-blue-950/40',
    labelColor: 'text-blue-300',
    activeSegment: 'bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]',
    emptySegment: 'bg-blue-950/30',
    crosshairs: 'border-blue-700/60',
  },
  purple: {
    border: 'border-purple-900/60 hover:border-purple-700/60',
    leftBar: 'bg-purple-500',
    dot: 'bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,0.8)]',
    codeTag: 'text-purple-400 border-purple-900/80 bg-purple-950/40',
    labelColor: 'text-purple-300',
    activeSegment: 'bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.8)]',
    emptySegment: 'bg-purple-950/30',
    crosshairs: 'border-purple-700/60',
  },
};

export const TacticalProgressBar = React.memo(
  React.forwardRef<HTMLDivElement, TacticalProgressBarProps>(
    (
      {
        label,
        value,
        max = 255,
        valueDisplay,
        segments = 15,
        colorClass,
        emptyColorClass,
        codeTag,
        variant = 'default',
        showDot = true,
        className,
        ...props
      },
      ref,
    ) => {
      const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.default;
      const activeSegmentClass = colorClass || styles.activeSegment;
      const emptySegmentClass = emptyColorClass || styles.emptySegment;

      const segmentElements = [];
      const ratio = max > 0 ? value / max : 0;

      for (let i = 0; i < segments; i++) {
        const threshold = (i + 1) / segments;
        const isActive = ratio >= threshold;
        segmentElements.push(
          <div
            key={`progress-segment-${i}`}
            className={cn(
              'h-full flex-1 transition-colors duration-200',
              isActive ? activeSegmentClass : emptySegmentClass,
            )}
          />,
        );
      }

      return (
        <div
          ref={ref}
          className={cn(
            'group relative flex flex-col gap-2 rounded-none border border-dashed bg-zinc-950/90 p-2.5 transition-all duration-200',
            styles.border,
            className,
          )}
          {...props}
        >
          {/* Hardware Corner Crosshairs */}
          <CornerCrosshairs className={cn('h-1.5 w-1.5', styles.crosshairs)} />

          {/* Left Telemetry Accent Bar */}
          <div className={cn('absolute top-0 bottom-0 left-0 w-0.5', styles.leftBar)} />

          {/* Header Row */}
          <div className="tactical-text flex items-center justify-between text-[9px]">
            <div className="flex items-center gap-1.5">
              {showDot && <span className={cn('inline-block h-1.5 w-1.5 rounded-full', styles.dot)} />}
              {codeTag && (
                <span
                  className={cn('border px-1 py-0.5 font-mono text-[8px] uppercase tracking-wider', styles.codeTag)}
                >
                  [{codeTag}]
                </span>
              )}
              <span className={cn('font-black uppercase tracking-widest', styles.labelColor)}>[ {label} ]</span>
            </div>

            <div className="font-mono text-zinc-400">
              {valueDisplay !== undefined ? (
                valueDisplay
              ) : (
                <span className="text-zinc-400">
                  <span className="font-bold text-zinc-200">{value}</span>
                  <span className="text-zinc-600">/{max}</span>
                </span>
              )}
            </div>
          </div>

          {/* Progress Segment Bar Container */}
          {/* oxlint-disable jsx-a11y/prefer-tag-over-role */}
          <div
            className="relative flex h-2.5 w-full gap-px border border-zinc-900 bg-black p-0.5"
            role="progressbar"
            aria-valuenow={value}
            aria-valuemax={max}
          >
            {segmentElements}
          </div>

          {/* Scanline hover overlay effect */}
          <ScanlineOverlay className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>
      );
    },
  ),
);

TacticalProgressBar.displayName = 'TacticalProgressBar';
