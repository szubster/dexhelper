import { Activity, CheckCircle2, Key, Server } from 'lucide-react';
import { useEffect, useState } from 'react';
import { pokeDB } from '../db/PokeDB';
import { cn } from '../utils/cn';
import { EdgeLabel } from './EdgeLabel';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';
import { TelemetryDecoration } from './TelemetryDecoration';

interface SyncProgressDetail {
  current: number;
  total: number;
  stage: string;
}

function isSyncProgressDetail(detail: unknown): detail is SyncProgressDetail {
  if (typeof detail !== 'object' || detail === null) return false;

  return (
    'current' in detail &&
    typeof detail.current === 'number' &&
    'total' in detail &&
    typeof detail.total === 'number' &&
    'stage' in detail &&
    typeof detail.stage === 'string'
  );
}

export function SyncProgress() {
  const [progress, setProgress] = useState<{ current: number; total: number; stage: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    pokeDB
      .getStatus()
      .then((status) => {
        if (status.isComplete) {
          setIsComplete(true);
          setShouldRender(true);
          setTimeout(() => setShouldRender(false), 800);
        } else if (status.isSyncing) {
          setShouldRender(true);
        }
      })
      .catch(() => console.error('System: sync failed'));

    const handleProgress = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      if (!isSyncProgressDetail(event.detail)) return;

      const { current, total, stage } = event.detail;
      setProgress({ current, total, stage });
      setShouldRender(true);

      if (current === total) {
        setIsComplete(true);
        setTimeout(() => setShouldRender(false), 500);
      }
    };

    window.addEventListener('pokedata-sync-progress', handleProgress);
    return () => window.removeEventListener('pokedata-sync-progress', handleProgress);
  }, []);

  if (!shouldRender) return null;

  const percentage = progress ? Math.round((progress.current / progress.total) * 100) : 100;
  // Create a 5x20 matrix for the data stream visualization
  const matrixBlocks = 100;
  const blocksToFill = Math.floor((percentage / 100) * matrixBlocks);

  return (
    <div
      data-testid="sync-progress-overlay"
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center p-2 transition-all duration-700 md:p-6',
        isComplete ? 'pointer-events-none bg-black/80 backdrop-blur-md' : 'bg-black/95 backdrop-blur-xl',
      )}
    >
      <div
        data-testid="sync-progress"
        className={cn(
          'fade-in zoom-in-95 relative flex h-full max-h-[800px] w-full max-w-6xl animate-in flex-col shadow-2xl duration-500',
          isComplete && 'fade-out zoom-out-95 animate-out fill-mode-forwards',
          isComplete ? 'border-emerald-500/50' : 'border-[var(--theme-primary)]/50',
          'border-[4px] border-dashed bg-zinc-950',
        )}
      >
        {/* Hardware Bezel Top Hazard Stripes */}
        <div
          className={cn(
            'h-2 w-full',
            isComplete
              ? 'bg-[repeating-linear-gradient(45deg,rgba(16,185,129,0.2),rgba(16,185,129,0.2)_10px,transparent_10px,transparent_20px)]'
              : 'bg-[repeating-linear-gradient(45deg,rgba(var(--theme-primary-rgb),0.2),rgba(var(--theme-primary-rgb),0.2)_10px,transparent_10px,transparent_20px)]',
          )}
        />

        <TelemetryDecoration label="SYS.HARDWARE_UPLINK" className="top-2 left-6 bg-zinc-950 px-4 py-2 text-[10px]" />

        {/* Heavy Hardware Console Header */}
        <div className="flex flex-col items-start justify-between border-zinc-800 border-b-[2px] border-dashed bg-zinc-900 px-6 pt-10 pb-4 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            {/* LED Status Indicator */}
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center border-2 border-dashed shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]',
                isComplete
                  ? 'border-emerald-500 bg-emerald-950 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'border-[var(--theme-primary)] bg-[rgba(var(--theme-primary-rgb),0.2)] text-[var(--theme-primary)] shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.4)]',
              )}
            >
              {isComplete ? <Key size={24} /> : <Activity size={24} className="animate-pulse" />}
            </div>
            <div className="flex flex-col">
              <h3 className="font-black font-mono text-white text-xl uppercase leading-none tracking-tight">
                {isComplete ? '[ LINK_ESTABLISHED ]' : '[ INITIALIZING_UPLINK ]'}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-zinc-600" />
                <p className="tactical-text font-bold text-[10px] text-zinc-500 uppercase tracking-widest">
                  {isComplete ? 'HANDSHAKE VERIFIED // SECURED' : `OP: ${progress?.stage || 'AWAITING_SIGNAL'}`}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex w-full flex-col gap-2 md:mt-0 md:w-auto md:items-end">
            <div className="flex items-center gap-3">
              <span className="tactical-text font-black text-[10px] text-zinc-600 tracking-widest">
                UPLINK_CAPACITY
              </span>
              <span
                className={cn(
                  'font-black font-mono text-3xl tracking-tighter',
                  isComplete ? 'text-emerald-500' : 'text-[var(--theme-primary)]',
                )}
              >
                {percentage}%
              </span>
            </div>
            {/* Digital Capacity Gauge */}
            <div className="flex h-3 w-full gap-0.5 md:w-48">
              {Array.from({ length: 10 }).map((_, i) => {
                const threshold = (i + 1) * 10;
                let colorClass = 'bg-zinc-800';
                if (percentage >= threshold) {
                  if (i < 3) colorClass = 'bg-red-500';
                  else if (i < 7) colorClass = 'bg-amber-500';
                  else colorClass = 'bg-emerald-500';
                }
                return (
                  <div
                    key={`gauge-${threshold}`}
                    className={cn('h-full flex-1 transition-colors duration-300', colorClass)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden bg-zinc-950 md:flex-row">
          {/* Left Pane: Handshake Log Stream */}
          <div className="relative flex flex-1 flex-col border-zinc-800 border-b-[2px] border-dashed p-6 md:border-r-[2px] md:border-b-0">
            <EdgeLabel className="-top-3 left-6 bg-zinc-950 px-2 text-[10px]">[ TERMINAL_LOG ]</EdgeLabel>
            <LcdGrid className="opacity-[0.03]" />
            <ScanlineOverlay opacityClass="opacity-10" />

            <div className="custom-scrollbar relative flex flex-1 flex-col justify-end overflow-y-auto pt-4 font-mono text-[10px] leading-relaxed tracking-wider">
              {/* Fake Hex Dump background */}
              <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-end opacity-20">
                <div className="select-none break-all font-mono text-[9px] text-zinc-700 leading-tight">
                  {/* Hex dump pattern is static to avoid React impurity on render */}
                  {'0123456789ABCDEF'
                    .repeat(50)
                    .split('')
                    .map((_, i) => (i % 2 === 0 ? '1' : '0'))
                    .join('')}
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-2 pb-2">
                <div className="text-zinc-500">{'> INITIALIZING HARDWARE UPLINK...'}</div>
                <div className="text-zinc-500">{'> MOUNTING SECURE VOLUME... [OK]'}</div>
                {percentage > 20 && (
                  <div className="text-[var(--theme-primary)]">{`> PARSING BIOMETRIC OFFSETS... [${percentage}%]`}</div>
                )}
                {percentage > 50 && (
                  <div className="text-amber-500">{'> WARNING: ENCRYPTED PACKETS DETECTED. DECRYPTING...'}</div>
                )}
                {percentage > 80 && <div className="text-emerald-500">{'> SYNC_RATE OPTIMAL. FINALIZING...'}</div>}
                {isComplete && (
                  <div className="mt-2 animate-pulse font-bold text-emerald-400">
                    {'> UPLINK SECURED. HANDSHAKE COMPLETE.'}
                  </div>
                )}
                {!isComplete && (
                  <div className="flex items-center gap-2 text-[var(--theme-primary)]">
                    {'> AWAITING_DATA'}
                    <span className="inline-block h-3 w-2 animate-pulse bg-current" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center Pane: Hardware Targeting Array */}
          <div className="relative flex flex-1 items-center justify-center border-zinc-800 border-b-[2px] border-dashed bg-zinc-900/30 p-8 md:border-r-[2px] md:border-b-0">
            <EdgeLabel className="-top-3 left-6 bg-zinc-950 px-2 text-[10px]">[ DIAGNOSTIC_ARRAY ]</EdgeLabel>
            <LcdGrid className="opacity-[0.05]" />

            <div className="relative flex aspect-square w-full max-w-[280px] items-center justify-center">
              {/* Outer Dashed Ring */}
              <div
                className={cn(
                  'absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border-[2px] border-dashed transition-colors duration-700',
                  isComplete ? 'border-emerald-500/30' : 'border-[var(--theme-primary)]/30',
                )}
              />
              {/* Inner Solid Ring */}
              <div
                className={cn(
                  'absolute inset-4 rounded-full border-[1px] transition-colors duration-700',
                  isComplete ? 'border-emerald-500/20' : 'border-[var(--theme-primary)]/20',
                )}
              />
              {/* Targeting Crosshairs */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-zinc-800" />
              <div className="absolute top-1/2 right-0 left-0 h-[1px] -translate-y-1/2 bg-zinc-800" />

              <div
                className={cn(
                  'relative z-10 flex h-24 w-24 items-center justify-center bg-zinc-950 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]',
                  isComplete
                    ? 'border-2 border-emerald-500 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.3)]',
                )}
              >
                {isComplete ? (
                  <CheckCircle2 size={40} className="zoom-in-50 animate-in" />
                ) : (
                  <Server size={40} className="animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {/* Right Pane: Physical Memory Banks */}
          <div className="relative flex flex-1 flex-col p-6">
            <EdgeLabel className="-top-3 left-6 bg-zinc-950 px-2 text-[10px]">[ MEMORY_BANKS ]</EdgeLabel>
            <LcdGrid className="opacity-[0.02]" />

            <div className="grid flex-1 grid-cols-4 grid-rows-[repeat(25,minmax(0,1fr))] gap-1 md:grid-cols-[repeat(10,minmax(0,1fr))] md:grid-rows-[repeat(10,minmax(0,1fr))]">
              {Array.from({ length: matrixBlocks }).map((_, i) => {
                const isFilled = i < blocksToFill;
                return (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable
                    key={`memory-bank-${i}`}
                    className={cn(
                      'relative border-[1px] transition-all duration-300',
                      isFilled
                        ? isComplete
                          ? 'border-emerald-400 bg-emerald-500/40 shadow-[0_0_5px_rgba(16,185,129,0.5)]'
                          : 'border-[var(--theme-primary)] bg-[rgba(var(--theme-primary-rgb),0.4)] shadow-[0_0_5px_rgba(var(--theme-primary-rgb),0.5)]'
                        : 'border-zinc-800 bg-zinc-900/50',
                    )}
                  >
                    {isFilled && <div className="absolute top-0.5 right-0.5 h-0.5 w-0.5 bg-white opacity-50" />}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-zinc-800 border-t border-dashed pt-4">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    isComplete ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-zinc-700',
                  )}
                />
                <span className="tactical-text text-[9px] text-zinc-500">PWR_OK</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    !isComplete
                      ? 'animate-pulse bg-[var(--theme-primary)] shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.8)]'
                      : 'bg-zinc-700',
                  )}
                />
                <span className="tactical-text text-[9px] text-zinc-500">ACT_RX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hazard Stripes */}
        <div
          className={cn(
            'h-2 w-full',
            isComplete
              ? 'bg-[repeating-linear-gradient(-45deg,rgba(16,185,129,0.2),rgba(16,185,129,0.2)_10px,transparent_10px,transparent_20px)]'
              : 'bg-[repeating-linear-gradient(-45deg,rgba(var(--theme-primary-rgb),0.2),rgba(var(--theme-primary-rgb),0.2)_10px,transparent_10px,transparent_20px)]',
          )}
        />
      </div>
    </div>
  );
}
