import { CheckCircle2, Database, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export function SyncProgress() {
  const [progress, setProgress] = useState<{ current: number; total: number; stage: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleProgress = (event: Event) => {
      const customEvent = event as CustomEvent<{ current: number; total: number; stage: string }>;
      const { current, total, stage } = customEvent.detail;
      setProgress({ current, total, stage });
      if (current === total) {
        setIsComplete(true);
        setTimeout(() => setIsComplete(false), 3000);
      }
    };

    window.addEventListener('pokedata-sync-progress', handleProgress);
    return () => window.removeEventListener('pokedata-sync-progress', handleProgress);
  }, []);

  if (!progress && !isComplete) return null;

  const percentage = progress ? Math.round((progress.current / progress.total) * 100) : 100;

  return (
    <div
      data-testid="sync-status"
      className="slide-in-from-right-10 fixed right-6 bottom-6 z-[100] flex animate-in items-center gap-4 rounded-3xl border border-white/10 bg-zinc-950/80 p-4 shadow-2xl backdrop-blur-xl duration-500"
    >
      <div className="relative flex h-12 w-12 items-center justify-center">
        {isComplete ? (
          <CheckCircle2 className="zoom-in-50 animate-in text-emerald-500" size={24} />
        ) : (
          <>
            <Database className="text-blue-500/50" size={20} />
            <Loader2 className="absolute inset-0 animate-spin text-blue-500" size={48} strokeWidth={1} />
          </>
        )}
      </div>

      <div className="flex flex-col gap-1 pr-4">
        <span className="font-black text-[10px] text-zinc-500 uppercase tracking-widest">
          {isComplete ? 'Database Ready' : `Syncing ${progress?.stage}...`}
        </span>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="font-black font-mono text-blue-400 text-xs">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}
