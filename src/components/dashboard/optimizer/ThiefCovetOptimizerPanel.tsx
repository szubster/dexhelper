import { Crosshair, Search } from 'lucide-react';
import type React from 'react';
import { useMemo } from 'react';
import { findAllItemStealers, THIEF_MOVE_ID } from '../../../engine/moves/itemStealers';
import type { PokemonInstance } from '../../../engine/saveParser/parsers/common';
import { EmptyState } from '../../EmptyState';
import { PokemonSprite } from '../../pokemon/PokemonSprite';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

interface ThiefCovetOptimizerPanelProps {
  saveData: {
    generation: number;
    partyDetails: PokemonInstance[];
    pcDetails: PokemonInstance[];
  };
}

export const ThiefCovetOptimizerPanel: React.FC<ThiefCovetOptimizerPanelProps> = ({ saveData }) => {
  const itemStealers = useMemo(() => {
    return findAllItemStealers(saveData.partyDetails, saveData.pcDetails);
  }, [saveData.partyDetails, saveData.pcDetails]);

  const hasAnyStealers = itemStealers.party.length > 0 || itemStealers.pc.length > 0;

  if (!hasAnyStealers) {
    return (
      <TacticalPanel className="flex flex-col gap-4 border-t-2 border-[var(--theme-primary)]/50 p-4 pt-6">
        <TelemetryDecoration label="SYS.THIEF_OPTIMIZER" className="-top-[17px] left-[-1px]" />
        <div className="flex items-center gap-2">
          <Crosshair className="h-4 w-4 text-[var(--theme-primary)]" />
          <span className="font-mono font-bold text-[var(--theme-primary)]">THIEF/COVET OPTIMIZER</span>
        </div>
        <EmptyState icon={<Search size={24} />} label="NO CAPABLE POKEMON DETECTED" />
      </TacticalPanel>
    );
  }

  return (
    <TacticalPanel className="flex flex-col gap-4 border-t-2 border-[var(--theme-primary)]/50 p-4 pt-6">
      <TelemetryDecoration label="SYS.THIEF_OPTIMIZER" className="-top-[17px] left-[-1px]" />
      <div className="z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crosshair className="h-4 w-4 text-[var(--theme-primary)]" />
          <span className="font-mono font-bold text-[var(--theme-primary)]">THIEF/COVET OPTIMIZER</span>
        </div>
      </div>

      <div className="z-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {itemStealers.party.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-zinc-500">ACTIVE PARTY TEAM</span>
            <div className="flex flex-col gap-2">
              {itemStealers.party.map((stealer) => (
                <div
                  key={stealer.instance.personalityValue?.toString() ?? stealer.instance.nickname}
                  className="flex items-center gap-4 rounded-none border border-dashed border-zinc-700 bg-zinc-900/50 p-2"
                >
                  <PokemonSprite
                    pokemonId={stealer.instance.speciesId}
                    generation={saveData.generation}
                    isShiny={stealer.instance.isShiny}
                    className="h-12 w-12"
                  />
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-white">{stealer.instance.nickname || 'Unknown'}</span>
                    <span className="font-mono text-xs text-[var(--theme-primary)]">
                      {stealer.stealingMoveId === THIEF_MOVE_ID ? 'THIEF' : 'COVET'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {itemStealers.pc.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-zinc-500">AVAILABLE IN STORAGE</span>
            <div className="grid grid-cols-1 gap-2">
              {itemStealers.pc.slice(0, 4).map((stealer) => (
                <div
                  key={stealer.instance.personalityValue?.toString() ?? stealer.instance.nickname}
                  className="flex items-center gap-4 rounded-none border border-dashed border-zinc-700 bg-zinc-900/50 p-2"
                >
                  <PokemonSprite
                    pokemonId={stealer.instance.speciesId}
                    generation={saveData.generation}
                    isShiny={stealer.instance.isShiny}
                    className="h-12 w-12"
                  />
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-white">{stealer.instance.nickname || 'Unknown'}</span>
                    <span className="font-mono text-xs text-[var(--theme-primary)]">
                      {stealer.stealingMoveId === THIEF_MOVE_ID ? 'THIEF' : 'COVET'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </TacticalPanel>
  );
};
