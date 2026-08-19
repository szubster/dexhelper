import type React from 'react';
import { useConcurrentGame } from '../../contexts/ConcurrentGameContext';

export const ProgressionTimeline: React.FC = () => {
  const { state } = useConcurrentGame();

  if (state.playthroughs.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-none border border-zinc-800 border-dashed bg-zinc-950/50 p-4 font-mono text-zinc-500">
        NO SIGNAL - NO ACTIVE PLAYTHROUGHS
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-none border border-zinc-800 border-dashed bg-zinc-950 p-4 font-mono text-zinc-300">
      <div className="mb-4 flex items-center gap-2 border-zinc-800 border-b border-dashed pb-2 font-bold text-xs text-zinc-400 uppercase tracking-widest">
        Progression History
      </div>
      <div className="flex flex-col gap-3">
        {state.playthroughs.map((playthrough, index) => {
          const isActive = state.activePlaythroughId === playthrough.id;
          return (
            <div
              key={playthrough.id}
              className={`flex items-center gap-4 rounded-none border border-dashed p-3 transition-colors duration-200 ${
                isActive
                  ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400'
                  : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none border border-current border-dashed bg-black/50 text-xs">
                {index + 1}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold">{playthrough.name}</span>
                  <span className="text-[10px] uppercase">{playthrough.gameVersion}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] opacity-70">
                  {new Date(playthrough.lastPlayed).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
