import type React from 'react';
import { useConcurrentGame } from '../../../contexts/ConcurrentGameContext';
import { TacticalPanel } from '../../TacticalPanel';

export const ProgressionTimeline: React.FC = () => {
  const { state } = useConcurrentGame();
  const { playthroughs, activePlaythroughId } = state;

  const activePlaythrough = playthroughs.find((p) => p.id === activePlaythroughId);

  if (!activePlaythrough) {
    return (
      <TacticalPanel className="p-4 text-center">
        <span className="tactical-text font-mono text-zinc-500">NO ACTIVE PLAYTHROUGH FOUND</span>
      </TacticalPanel>
    );
  }

  return (
    <TacticalPanel className="flex flex-col gap-4 rounded-none border-zinc-700 border-dashed p-4">
      <div className="mb-2 border-zinc-700 border-b border-dashed pb-2">
        <h3 className="font-black font-mono text-lg text-white uppercase">
          PROGRESSION TIMELINE: {activePlaythrough.name}
        </h3>
        <p className="font-mono text-xs text-zinc-500">SYS.VERSION: {activePlaythrough.gameVersion.toUpperCase()}</p>
      </div>

      <div className="flex flex-col gap-2">
        {/* Placeholder timeline entries until SaveHistory is integrated */}
        <div className="flex items-start gap-4 font-mono">
          <div className="w-24 text-xs text-zinc-400">INIT</div>
          <div className="flex-1 border-zinc-700 border-l border-dashed pl-4 text-sm text-zinc-300">
            Adventure started.
          </div>
        </div>
      </div>
    </TacticalPanel>
  );
};
