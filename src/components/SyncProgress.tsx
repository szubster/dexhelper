import { ArrowRightCircle, CheckCircle2, Database, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { pokeDB } from '../db/PokeDB';
import { cn } from '../utils/cn';
import { EdgeLabel } from './EdgeLabel';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';
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
  // Create a 5x20 matrix for the data stream visualization
  const matrixBlocks = 100;
  const blocksToFill = Math.floor((percentage / 100) * matrixBlocks);

  return (
    <div
      data-testid="sync-progress-overlay"
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-700',
        isComplete ? 'pointer-events-none bg-black/40 backdrop-blur-sm' : 'bg-black/90 backdrop-blur-md',
      )}
    >
      <TacticalPanel
        data-testid="sync-progress"
        variant={isComplete ? 'emerald' : 'blue'}
        className={cn(
          'fade-in zoom-in-95 relative flex w-full max-w-4xl animate-in flex-col gap-0 p-0 shadow-2xl duration-500',
          isComplete && 'fade-out zoom-out-95 animate-out fill-mode-forwards',
        )}
      >
        <TelemetryDecoration label="SYS.SYNC_TERMINAL" className="top-0 left-4 bg-zinc-950" />

        {/* Terminal Header */}
        <div className="flex items-center justify-between border-white/5 border-b border-dashed bg-zinc-900/80 px-6 py-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center border border-dashed',
                isComplete
                  ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-400'
                  : 'animate-pulse border-blue-500/50 bg-blue-500/20 text-blue-400',
              )}
            >
              {isComplete ? <CheckCircle2 size={16} /> : <ArrowRightCircle size={16} />}
            </div>
            <div>
              <h3 className="font-black font-mono text-lg text-white uppercase leading-none tracking-tighter">
                {isComplete ? '[ DATABASE_PRIMED ]' : '[ INITIALIZING_UPLINK ]'}
              </h3>
              <p className="tactical-text mt-1 font-bold text-[9px] text-zinc-500 uppercase tracking-widest">
                {isComplete ? 'HANDSHAKE VERIFIED' : `PROCESSING: ${progress?.stage || 'WAITING'}`}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="tactical-text font-black text-[9px] text-zinc-600 tracking-widest">SYNC_RATE</span>
            <span
              className={cn(
                'font-black font-mono text-2xl tracking-tighter',
                isComplete ? 'text-emerald-500' : 'text-blue-500',
              )}
            >
              {percentage}%
            </span>
          </div>
        </div>

        <div className="flex flex-col bg-zinc-950/50 md:flex-row">
          {/* Left Pane: Uplink Status */}
          <div className="relative flex-1 border-white/5 border-r border-dashed p-6">
            <EdgeLabel className="-top-2 left-4">[ UPLINK_STATUS ]</EdgeLabel>

            <div className="relative mx-auto flex aspect-square w-full max-w-[240px] items-center justify-center overflow-hidden border border-white/5 bg-zinc-900/50">
              <LcdGrid className="opacity-[0.05]" />
              <ScanlineOverlay />

              {/* Faux Radar Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,var(--theme-primary)_100%)] opacity-5" />
              <div className="absolute top-1/2 left-0 h-[1px] w-full bg-white/5" />
              <div className="absolute top-0 left-1/2 h-full w-[1px] bg-white/5" />

              {isComplete ? (
                <div className="zoom-in-50 flex h-24 w-24 animate-in items-center justify-center border border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="text-emerald-500" size={48} />
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 scale-75 animate-ping rounded-full border border-blue-500/20 opacity-20" />
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center border border-blue-500/30 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                    <Database className="text-blue-400" size={32} />
                  </div>
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <Loader2 className="animate-spin text-blue-500/30" size={120} strokeWidth={0.5} />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Pane: Data Stream Matrix */}
          <div className="relative flex-[2] p-6">
            <EdgeLabel className="-top-2 left-4">[ DATA_STREAM ]</EdgeLabel>

            <div className="grid h-full min-h-[200px] grid-cols-[repeat(20,minmax(0,1fr))] content-start gap-1">
              {Array.from({ length: matrixBlocks }).map((_, i) => {
                const isFilled = i < blocksToFill;
                return (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable
                    key={`matrix-block-${i}`}
                    className={cn(
                      'aspect-square border border-dashed transition-colors duration-300',
                      isFilled
                        ? isComplete
                          ? 'border-emerald-500/50 bg-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                          : 'border-blue-500/50 bg-blue-500/30 shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                        : 'border-white/5 bg-black/40',
                    )}
                  />
                );
              })}
            </div>

            {!isComplete && (
              <div className="absolute right-6 bottom-6 flex items-center gap-2 border border-blue-500/30 border-dashed bg-blue-500/10 px-4 py-2">
                <div className="h-1.5 w-1.5 animate-pulse bg-blue-500" />
                <span className="font-black font-mono text-[9px] text-blue-400 uppercase tracking-wider">
                  RECEIVING PACKETS
                </span>
              </div>
            )}
          </div>
        </div>
      </TacticalPanel>
    </div>
  );
}
