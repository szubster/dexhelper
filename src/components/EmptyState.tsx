import type React from 'react';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';

interface EmptyStateProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  labelClassName?: string;
}

export function EmptyState({ label, icon, className, labelClassName }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'group relative col-span-full flex w-full flex-col overflow-hidden rounded-none border border-zinc-800/80 border-dashed bg-black/40 p-6 transition-colors duration-500 hover:border-zinc-700 hover:bg-zinc-950/60',
        className,
      )}
    >
      <LcdGrid className="opacity-[0.03]" />
      <ScanlineOverlay opacityClass="opacity-10" />
      <CornerCrosshairs className="h-2 w-2 border-zinc-700/50 transition-colors group-hover:border-[var(--theme-primary)]/50" />

      <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        {/* Warning Indicator Block */}
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-red-900/30 bg-red-950/20">
          {/* Diagonal Warning Stripes */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #7f1d1d 4px, #7f1d1d 8px)',
            }}
          />

          <div className="relative z-10 text-red-500/80 group-hover:animate-pulse group-hover:text-red-400">
            {icon ? (
              icon
            ) : (
              <div className="flex items-center gap-1">
                <div className="h-4 w-1 bg-red-500/80" />
                <div className="flex h-4 w-4 items-center justify-center rounded-none border-2 border-red-500/80">
                  <div className="h-1 w-1 bg-red-500/80" />
                </div>
              </div>
            )}
          </div>

          <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-red-500/50 border-r border-b" />
        </div>

        {/* Diagnostic Text Sequence */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2 border-zinc-800/80 border-b border-dashed pb-2">
            <div className="h-2 w-2 rounded-none bg-red-900/50 transition-colors duration-500 group-hover:bg-red-500 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="font-bold font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em] transition-colors group-hover:text-zinc-400">
              [ DIAGNOSTIC_FAULT ]
            </span>
          </div>

          <span
            className={cn(
              'font-black font-mono text-base text-zinc-300 uppercase tracking-widest transition-colors group-hover:text-white',
              labelClassName,
            )}
          >
            {label}
          </span>

          <div className="mt-1 flex flex-col gap-1 font-mono text-[9px] text-zinc-600 uppercase">
            <div className="flex items-center gap-2">
              <span className="text-red-900/80">{'>'}</span>
              <span className="overflow-hidden whitespace-nowrap">ERR_CODE: 0x00000404 - ENTITY_NOT_FOUND</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-900/80">{'>'}</span>
              <span className="animate-[pulse_2s_ease-in-out_infinite] overflow-hidden whitespace-nowrap">
                AWAITING NEW PARAMETERS...
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-zinc-900/50">
        <div className="h-full w-1/3 bg-red-900/20 transition-colors group-hover:bg-red-900/40" />
      </div>
    </div>
  );
}
