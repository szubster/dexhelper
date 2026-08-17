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
        'group relative col-span-full flex w-full flex-col overflow-hidden rounded-none border border-dashed bg-black/40 transition-colors duration-500 hover:bg-zinc-950/60',
        isWarning ? 'border-red-900/50 hover:border-red-800' : 'border-zinc-800/80 hover:border-zinc-700',
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

      <div className="relative z-10 flex w-full flex-row">
        {/* Left Side Warning Stripes */}
        <div
          className={cn(
            'flex w-12 shrink-0 flex-col items-center justify-center border-r border-dashed opacity-40 transition-opacity group-hover:opacity-80',
            isWarning ? 'border-red-900/50 bg-red-950/20' : 'border-zinc-800/50 bg-zinc-900/30',
          )}
          style={{
            background: isWarning
              ? 'repeating-linear-gradient(45deg, transparent, transparent 4px, #7f1d1d 4px, #7f1d1d 8px)'
              : 'repeating-linear-gradient(45deg, transparent, transparent 4px, #3f3f46 4px, #3f3f46 8px)',
          }}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="flex flex-col items-start gap-4">
            {/* Header / Icon / Status Indicator */}
            <div
              className="flex w-full flex-row items-center gap-4 border-b border-dashed pb-4"
              style={{ borderColor: isWarning ? 'rgba(185, 28, 28, 0.3)' : 'rgba(63, 63, 70, 0.5)' }}
            >
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center border',
                  isWarning
                    ? 'border-red-900/50 bg-red-950/20 text-red-500/80 group-hover:text-red-400'
                    : 'border-zinc-800/50 bg-zinc-900/30 text-zinc-500/80 group-hover:text-[var(--theme-primary)]',
                )}
              >
                {icon ? (
                  icon
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn('h-0.5 w-4', isWarning ? 'bg-red-500/80' : 'bg-zinc-500/80')} />
                    <div
                      className={cn(
                        'flex h-4 w-4 items-center justify-center border',
                        isWarning ? 'border-red-500/80' : 'border-zinc-500/80',
                      )}
                    >
                      <div className={cn('h-1 w-1', isWarning ? 'bg-red-500/80' : 'bg-zinc-500/80')} />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'h-2 w-2 rounded-none transition-colors duration-500',
                      isWarning
                        ? 'bg-red-900/50 group-hover:bg-red-500 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                        : 'bg-zinc-700/50 group-hover:bg-[var(--theme-primary)] group-hover:shadow-[0_0_8px_var(--theme-primary)]',
                    )}
                  />
                  <span
                    className={cn(
                      'font-bold font-mono text-[10px] uppercase tracking-[0.2em] transition-colors',
                      isWarning
                        ? 'text-red-900/80 group-hover:text-red-400'
                        : 'text-zinc-500 group-hover:text-zinc-400',
                    )}
                  >
                    {isWarning ? '[ DIAGNOSTIC_FAULT ]' : '[ DATA_STREAM_EMPTY ]'}
                  </span>
                </div>
                <span
                  className={cn(
                    'font-black font-mono text-lg uppercase tracking-widest transition-colors',
                    isWarning ? 'text-zinc-300 group-hover:text-white' : 'text-zinc-400 group-hover:text-zinc-200',
                    labelClassName,
                  )}
                >
                  {label}
                </span>
              </div>
            </div>

            {/* Diagnostic Details */}
            <div className="flex w-full flex-col font-mono text-[10px] uppercase tracking-wider">
              {isWarning ? (
                <>
                  <div className="flex items-center gap-2 text-red-900/80">
                    <span>{'>'}</span>
                    <span className="overflow-hidden whitespace-nowrap">ERR_CODE: 0x00000404 - ENTITY_NOT_FOUND</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-900/80">
                    <span>{'>'}</span>
                    <span className="overflow-hidden whitespace-nowrap">TRACE: ABORTED_AT_0x2E66</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-red-500/80">
                    <span className="animate-pulse">{'>'}</span>
                    <span className="animate-[pulse_2s_ease-in-out_infinite] overflow-hidden whitespace-nowrap">
                      AWAITING NEW PARAMETERS...
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <span>{'>'}</span>
                    <span className="overflow-hidden whitespace-nowrap">SYS_STATUS: NOMINAL</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <span>{'>'}</span>
                    <span className="overflow-hidden whitespace-nowrap">QUERY_RESULT: 0_ENTRIES</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-zinc-400">
                    <span className="animate-pulse">{'>'}</span>
                    <span className="animate-[pulse_2s_ease-in-out_infinite] overflow-hidden whitespace-nowrap">
                      NO TARGETS DETECTED IN SECTOR
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-zinc-900/50">
        <div
          className={cn(
            'h-full w-1/3 transition-colors',
            isWarning ? 'bg-red-900/20 group-hover:bg-red-900/40' : 'bg-zinc-800/40 group-hover:bg-zinc-700/60',
          )}
        />
      </div>
    </div>
  );
}
