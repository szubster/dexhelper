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
  variant?: 'default' | 'warning';
}

export function EmptyState({ label, icon, className, labelClassName, variant = 'warning' }: EmptyStateProps) {
  const isWarning = variant === 'warning';

  return (
    <div
      className={cn(
        'group relative col-span-full flex min-h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-none border border-dashed bg-black/40 transition-colors duration-500 hover:bg-zinc-950/60 sm:min-h-[400px]',
        isWarning ? 'border-red-900/30 hover:border-red-900/50' : 'border-zinc-800/80 hover:border-zinc-700',
        className,
      )}
    >
      <LcdGrid className="opacity-[0.03]" />
      <ScanlineOverlay opacityClass="opacity-10" />
      <CornerCrosshairs
        className={cn(
          'h-2 w-2 transition-colors',
          isWarning
            ? 'border-red-700/50 group-hover:border-red-500/50'
            : 'border-zinc-700/50 group-hover:border-[var(--theme-primary)]/50',
        )}
      />

      <div className="relative z-10 flex w-full flex-col items-center justify-center p-8">
        {/* Reticle & Icon */}
        <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
          {/* Outer dashed circle */}
          <div className="absolute inset-0 rounded-full border border-zinc-700/30 border-dashed transition-colors duration-700 group-hover:border-zinc-600/50" />
          {/* Inner solid circle */}
          <div className="absolute inset-6 rounded-full border border-zinc-800/80" />
          {/* Crosshairs */}
          <div className="absolute top-[-20%] left-1/2 h-[140%] w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-zinc-800/80 to-transparent" />
          <div className="absolute top-1/2 left-[-20%] h-[1px] w-[140%] -translate-y-1/2 bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" />

          {/* Icon */}
          <div
            className={cn(
              'relative z-10 flex items-center justify-center text-zinc-500 transition-colors duration-500',
              isWarning ? 'group-hover:text-red-500/80' : 'group-hover:text-zinc-400',
            )}
          >
            {icon ? (
              icon
            ) : (
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    'h-0.5 w-4',
                    isWarning ? 'bg-red-900/50 group-hover:bg-red-500/80' : 'bg-zinc-700/80 group-hover:bg-zinc-500',
                  )}
                />
                <div
                  className={cn(
                    'flex h-4 w-4 items-center justify-center border transition-colors',
                    isWarning
                      ? 'border-red-900/50 group-hover:border-red-500/80'
                      : 'border-zinc-700/80 group-hover:border-zinc-500',
                  )}
                >
                  <div
                    className={cn(
                      'h-1 w-1 transition-colors',
                      isWarning ? 'bg-red-900/50 group-hover:bg-red-500/80' : 'bg-zinc-700/80 group-hover:bg-zinc-500',
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Text Area */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'h-2 w-2 rounded-none border transition-colors duration-500',
                isWarning
                  ? 'border-red-900 bg-transparent group-hover:border-red-500 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                  : 'border-zinc-700 bg-transparent group-hover:border-zinc-500',
              )}
            />
            <span
              className={cn(
                'font-bold font-mono text-[10px] uppercase tracking-[0.25em] transition-colors',
                isWarning ? 'text-zinc-500 group-hover:text-zinc-400' : 'text-zinc-600 group-hover:text-zinc-500',
              )}
            >
              [ {isWarning ? 'SIGNAL_LOST' : 'DATA_STREAM_EMPTY'} ]
            </span>
          </div>

          <span
            className={cn(
              'font-black font-mono text-base uppercase tracking-[0.15em] transition-colors sm:text-lg',
              isWarning ? 'text-zinc-400 group-hover:text-zinc-300' : 'text-zinc-500 group-hover:text-zinc-400',
              labelClassName,
            )}
          >
            {label}
          </span>

          {/* Bottom decorative blocks */}
          <div className="mt-2 flex gap-1.5">
            <div
              className={cn(
                'h-[3px] w-6 transition-colors',
                isWarning ? 'bg-zinc-800/80 group-hover:bg-red-900/30' : 'bg-zinc-800/80',
              )}
            />
            <div
              className={cn(
                'h-[3px] w-1.5 transition-colors',
                isWarning ? 'bg-zinc-800/80 group-hover:bg-red-900/30' : 'bg-zinc-800/80',
              )}
            />
            <div
              className={cn(
                'h-[3px] w-1.5 transition-colors',
                isWarning ? 'bg-zinc-800/80 group-hover:bg-red-900/30' : 'bg-zinc-800/80',
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
