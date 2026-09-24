import React from 'react';
import { useLivingDexState } from '../hooks/useLivingDexState';
import { LivingDexCell } from './LivingDexCell';
import { TacticalPanel } from './TacticalPanel';

// ⚡ Bolt: Wrapped LivingDexGrid in React.memo to prevent unnecessary re-renders of the 386 living dex cell items
// when parent dashboard or store states update without saveData changing.
export const LivingDexGrid = React.memo(function LivingDexGrid() {
  const { displayLimit, partySet, pcSet, shinySpeciesIds, totalSecured } = useLivingDexState();

  const cells = [];
  for (let id = 1; id <= displayLimit; id++) {
    const inParty = partySet.has(id);
    const inPC = pcSet.has(id);
    const isShiny = shinySpeciesIds.has(id);
    cells.push(<LivingDexCell key={id} id={id} inParty={inParty} inPC={inPC} isShiny={isShiny} />);
  }

  return (
    <div className="fade-in animate-in pb-10 duration-500">
      <div className="mb-4 flex items-center justify-between border-[var(--theme-primary)]/30 border-b border-dashed bg-[var(--theme-primary)]/5 px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-[0.2em]">
            SYS.LIVING_DEX
          </span>
          <div className="h-4 w-px border-r border-dashed bg-[var(--theme-primary)]/30" />
          <span className="font-bold font-mono text-white text-xs uppercase tracking-wider">Numerical Grid</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400">
          <span>SECURED:</span>
          <span className="font-bold text-[var(--theme-primary)]">
            {totalSecured.toString().padStart(3, '0')} / {displayLimit.toString().padStart(3, '0')}
          </span>
        </div>
      </div>

      <TacticalPanel className="p-4 sm:p-6" variant="cyan">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-16">
          {cells}
        </div>
      </TacticalPanel>
    </div>
  );
});
