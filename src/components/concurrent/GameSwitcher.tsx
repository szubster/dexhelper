import { TacticalSelect } from '@dexhelper/ui';
import type React from 'react';
import { useConcurrentGame } from '../../contexts/ConcurrentGameContext';

export const GameSwitcher: React.FC = () => {
  const { state, setActivePlaythrough } = useConcurrentGame();

  if (state.playthroughs.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 rounded-none border border-dashed border-zinc-800 bg-zinc-950/80 px-3 py-1.5">
      <span className="shrink-0 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">Active PT</span>
      <TacticalSelect
        containerClassName="w-auto min-w-[120px]"
        className="border-none bg-transparent py-0 pr-6 pl-1 font-mono text-[11px] text-[var(--theme-primary)]"
        value={state.activePlaythroughId || ''}
        onChange={(e) => setActivePlaythrough(e.target.value || null)}
      >
        <option value="" className="bg-zinc-900 text-zinc-400">
          None
        </option>
        {state.playthroughs.map((pt) => (
          <option key={pt.id} value={pt.id} className="bg-zinc-900 text-white">
            {pt.name} ({pt.gameVersion})
          </option>
        ))}
      </TacticalSelect>
    </div>
  );
};
