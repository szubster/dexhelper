import type React from 'react';
import { useConcurrentGame } from '../../contexts/ConcurrentGameContext';

export const GameSwitcher: React.FC = () => {
  const { state, setActivePlaythrough } = useConcurrentGame();

  if (state.playthroughs.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 rounded-none border border-zinc-800 border-dashed bg-zinc-950/80 px-3 py-1.5">
      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Active PT</span>
      <select
        className="bg-transparent font-mono text-[11px] text-[var(--theme-primary)] outline-none"
        value={state.activePlaythroughId || ''}
        onChange={(e) => setActivePlaythrough(e.target.value || null)}
      >
        <option value="" className="bg-zinc-900">
          None
        </option>
        {state.playthroughs.map((pt) => (
          <option key={pt.id} value={pt.id} className="bg-zinc-900 text-white">
            {pt.name} ({pt.gameVersion})
          </option>
        ))}
      </select>
    </div>
  );
};
