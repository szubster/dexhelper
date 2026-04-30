import { CheckCircle2, Database, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { pokeDB } from '../db/PokeDB';
import { cn } from '../utils/cn';

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
      const customEvent = event as CustomEvent<{ current: number; total: number; stage: string }>;
      const { current, total, stage } = customEvent.detail;
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
      <div
        data-testid="sync-progress"
        className={cn(
          'fade-in zoom-in-95 relative flex w-full max-w-sm animate-in flex-col items-center gap-6 border border-zinc-800 border-dashed bg-zinc-950 p-8 shadow-2xl duration-500',
          isComplete && 'fade-out zoom-out-95 animate-out fill-mode-forwards',
        )}
      >
        <div className="absolute top-0 left-0 h-2 w-2 border-zinc-600 border-t-2 border-l-2" />
        <div className="absolute top-0 right-0 h-2 w-2 border-zinc-600 border-t-2 border-r-2" />
        <div className="absolute bottom-0 left-0 h-2 w-2 border-zinc-600 border-b-2 border-l-2" />
        <div className="absolute right-0 bottom-0 h-2 w-2 border-zinc-600 border-r-2 border-b-2" />

        <div className="absolute top-0 left-4 flex gap-1 rounded-b border border-zinc-800 border-t-0 border-dashed bg-zinc-900 px-3 py-1 font-black text-[8px] text-zinc-600 tracking-widest">
          <span className="animate-pulse text-[var(--theme-primary)]">●</span> SYS.SYNC_ACTIVE
        </div>

        <div className="relative mt-4 flex h-24 w-24 items-center justify-center border border-white/5 bg-zinc-900/50">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '4px 4px',
            }}
          />
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
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500/20" size={80} strokeWidth={0.5} />
              </div>
            </>
          )}
        </div>

        <div className="flex w-full flex-col items-center gap-4 text-center">
          <div className="space-y-1">
            <h3 className="font-black font-mono text-white text-xl uppercase tracking-tighter">
              {isComplete ? 'SYSTEM PRIMED' : 'INITIALIZING DATA'}
            </h3>
            <p className="font-bold font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              {isComplete ? 'DATABASE HANDSHAKE SUCCESSFUL' : `PROCESSING ${progress?.stage}...`}
            </p>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between font-black font-mono text-[10px] uppercase tracking-widest">
              <span className="text-zinc-500">TRANSFER</span>
              <span className={isComplete ? 'text-emerald-500' : 'text-[var(--theme-primary)]'}>{percentage}%</span>
            </div>
            <div className="h-2 w-full border border-zinc-800 bg-zinc-900/50 p-0.5">
              <div
                className={cn(
                  'h-full transition-all duration-500 ease-out',
                  isComplete ? 'bg-emerald-500' : 'bg-[var(--theme-primary)]',
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {!isComplete && (
          <div className="flex items-center gap-2 border border-zinc-800 border-dashed bg-zinc-900/50 px-4 py-2">
            <div className="h-1.5 w-1.5 animate-pulse bg-[var(--theme-primary)]" />
            <span className="font-black font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
              SYNCING PROTOCOL
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
