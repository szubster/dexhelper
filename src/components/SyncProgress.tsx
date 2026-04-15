import { CheckCircle2, Database, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { pokeDB } from '../db/PokeDB';
import { cn } from '../utils/cn';

export function SyncProgress() {
  const [progress, setProgress] = useState<{ current: number; total: number; stage: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check initial status
    pokeDB.getStatus().then((status) => {
      if (status.isComplete) {
        setIsComplete(true);
        setShouldRender(true); // Show "System Primed" briefly
        setTimeout(() => setShouldRender(false), 800);
      } else if (status.isSyncing) {
        setShouldRender(true);
      }
    });

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
        isComplete ? 'pointer-events-none bg-zinc-950/40 backdrop-blur-sm' : 'bg-zinc-950/80 backdrop-blur-xl',
      )}
    >
      <div
        data-testid="sync-progress"
        className={cn(
          'fade-in zoom-in-95 flex w-full max-w-sm animate-in flex-col items-center gap-8 rounded-[2rem] border border-white/10 bg-zinc-900/50 p-10 shadow-2xl duration-500',
          isComplete && 'fade-out zoom-out-95 animate-out fill-mode-forwards',
        )}
      >
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-full bg-blue-500/10 blur-2xl" />
          {isComplete ? (
            <div className="zoom-in-50 flex h-20 w-20 animate-in items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
              <CheckCircle2 className="text-emerald-500" size={40} />
            </div>
          ) : (
            <>
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10">
                <Database className="text-blue-500/50" size={32} />
              </div>
              <svg className="absolute inset-0 h-24 w-24 -rotate-90">
                <title>Synchronization Progress</title>
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white/5"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={276}
                  strokeDashoffset={276 - (276 * percentage) / 100}
                  className="text-blue-500 transition-all duration-500 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500/20" size={80} strokeWidth={0.5} />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-1">
            <h3 className="font-black text-2xl text-white tracking-tight">
              {isComplete ? 'System Primed' : 'Initializing Core Data'}
            </h3>
            <p className="font-black font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              {isComplete ? 'Database Handshake Successful' : `Processing ${progress?.stage}...`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-white/5">
              <div
                className={cn(
                  'h-full transition-all duration-500 ease-out',
                  isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-blue-400',
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span
              className={cn(
                'font-black font-mono text-sm leading-none',
                isComplete ? 'text-emerald-500' : 'text-blue-400',
              )}
            >
              {percentage}%
            </span>
          </div>
        </div>

        {!isComplete && (
          <div className="flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-500/5 px-4 py-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
            <span className="font-bold text-[9px] text-blue-500/80 uppercase tracking-wider">
              Syncing Pokedex Protocol
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
