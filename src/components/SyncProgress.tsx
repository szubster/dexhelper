import { CheckCircle2, Database, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { pokeDB } from '../db/PokeDB';
import { cn } from '../utils/cn';
import { LcdGrid } from './LcdGrid';
import { TacticalPanel } from './TacticalPanel';
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

  return (
    <div
      data-testid="sync-progress-overlay"
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center p-6 transition-all duration-700',
        isComplete ? 'pointer-events-none bg-black/40 backdrop-blur-sm' : 'bg-black/80 backdrop-blur-xl',
      )}
    >
      <TacticalPanel
        data-testid="sync-progress"
        variant={isComplete ? 'emerald' : 'blue'}
        className={cn(
          'fade-in zoom-in-95 relative flex w-full max-w-sm animate-in flex-col items-center gap-6 bg-zinc-950 p-8 shadow-2xl duration-500',
          isComplete && 'fade-out zoom-out-95 animate-out fill-mode-forwards',
        )}
      >
        <TelemetryDecoration label="SYS.SYNC_ACTIVE" className="top-0 left-4" />

        <div className="relative mt-4 flex h-24 w-24 items-center justify-center border border-white/5 bg-zinc-900/50">
          <LcdGrid className="opacity-[0.05]" />
          <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-20" />

          {isComplete ? (
            <div className="zoom-in-50 flex h-16 w-16 animate-in items-center justify-center border border-emerald-500/20 bg-emerald-500/10">
              <CheckCircle2 className="text-emerald-500" size={32} />
            </div>
          ) : (
            <>
              <div className="flex h-16 w-16 items-center justify-center border border-blue-500/20 bg-blue-500/10">
                <Database className="text-blue-500/50" size={28} />
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center" // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
                role="status"
                aria-live="polite"
              >
                <Loader2 className="animate-spin text-blue-500/20" size={80} strokeWidth={0.5} />
                <span className="sr-only">Syncing data...</span>
              </div>
            </>
          )}
        </div>

        <div className="flex w-full flex-col items-center gap-4 text-center">
          <div className="space-y-1">
            <h3 className="font-black font-mono text-white text-xl uppercase tracking-tighter">
              {isComplete ? 'SYSTEM PRIMED' : 'INITIALIZING DATA'}
            </h3>
            <p className="tactical-text font-bold text-[10px] text-zinc-500">
              {isComplete ? 'DATABASE HANDSHAKE SUCCESSFUL' : `PROCESSING ${progress?.stage}...`}
            </p>
          </div>

          <div className="w-full space-y-2">
            <div className="tactical-text flex justify-between font-black text-[10px]">
              <span className="text-zinc-500">TRANSFER</span>
              <span className={isComplete ? 'text-emerald-500' : 'text-blue-500'}>{percentage}%</span>
            </div>

            {/* Tactical segmented progress bar */}
            <div className="flex h-4 w-full gap-1 p-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Array has no unique values
                  key={i}
                  className={cn(
                    'h-full flex-1 border transition-colors duration-300',
                    i < Math.floor(percentage / 10)
                      ? isComplete
                        ? 'border-emerald-500 bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : 'border-blue-500 bg-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                      : 'border-zinc-800 bg-zinc-900/50',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {!isComplete && (
          <div className="flex items-center gap-2 border border-blue-500/30 border-dashed bg-blue-500/10 px-4 py-2">
            <div className="h-1.5 w-1.5 animate-pulse bg-blue-500" />
            <span className="font-black font-mono text-[9px] text-blue-400 uppercase tracking-wider">
              SYNCING PROTOCOL
            </span>
          </div>
        )}
      </TacticalPanel>
    </div>
  );
}
