import { TacticalBadge } from '@dexhelper/ui';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { useSafariZoneMissingEncounters } from '../../hooks/safariZone/useSafariZoneMissingEncounters';
import { useStore } from '../../store';
import { pokemonListQueryOptions } from '../../utils/pokemonQueries';
import { EmptyState } from '../EmptyState';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalCard } from '../TacticalCard';
import { TacticalPanel } from '../TacticalPanel';

export function SafariBountyBoard() {
  const saveData = useStore((state) => state.saveData);
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);
  const missingAreas = useSafariZoneMissingEncounters();

  const pokemonMap = React.useMemo(() => {
    const map = new Map<number, string>();
    pokemonList.forEach((p) => {
      map.set(p.id, p.name);
    });
    return map;
  }, [pokemonList]);

  if (!saveData || missingAreas.length === 0) {
    return (
      <TacticalPanel className="flex h-full flex-col p-4" variant="default">
        <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
          <h2 className="font-bold font-mono text-sm text-white uppercase tracking-tight">BOUNTY BOARD</h2>
          <TacticalBadge variant="emerald" dot pulse>
            [ ALL SECURED ]
          </TacticalBadge>
        </div>
        <div className="flex flex-1 items-center justify-center p-4">
          <EmptyState label="NO BOUNTIES ACTIVE" variant="default" />
        </div>
      </TacticalPanel>
    );
  }

  const gameVersion = saveData.gameVersion;
  const totalMissing = missingAreas.reduce((sum, area) => sum + (area.encounters[gameVersion]?.length || 0), 0);

  return (
    <TacticalPanel className="flex h-full flex-col p-4" variant="default">
      <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
        <h2 className="font-bold font-mono text-sm text-white uppercase tracking-tight">BOUNTY BOARD</h2>
        <TacticalBadge variant="amber" dot pulse>
          [ {totalMissing} TARGETS ]
        </TacticalBadge>
      </div>

      <div className="custom-scrollbar mt-4 flex flex-1 flex-col gap-6 overflow-y-auto pr-2">
        {missingAreas.map((area) => {
          const encounters = area.encounters[gameVersion] || [];
          if (encounters.length === 0) return null;

          return (
            <div key={area.name} className="flex flex-col gap-3">
              <h3 className="font-bold font-mono text-xs text-zinc-400 uppercase tracking-widest">
                {area.name} <span className="text-zinc-600">[{encounters.length}]</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {encounters.map((enc, idx) => {
                  const pokemonName = pokemonMap.get(enc.pokemon) || `Pokémon #${enc.pokemon}`;
                  return (
                    <TacticalCard
                      // biome-ignore lint/suspicious/noArrayIndexKey: Duplicate encounters exist
                      key={`${area.name}-${enc.pokemon}-${enc.method}-${idx}`}
                      variant="storage-amber"
                      className="p-2"
                    >
                      <div className="flex flex-col items-center text-center">
                        <PokemonSprite
                          pokemonId={enc.pokemon}
                          generation={saveData.generation}
                          alt={pokemonName}
                          className="h-12 w-12 object-contain"
                        />
                        <span className="mt-1 truncate font-bold font-mono text-[10px] text-white uppercase">
                          {pokemonName}
                        </span>
                        <div className="mt-0.5 flex items-center gap-1 font-mono text-[9px] text-amber-500/80">
                          <span>{enc.chance}%</span>
                          {enc.minLevel && <span>• L{enc.minLevel}</span>}
                        </div>
                      </div>
                    </TacticalCard>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </TacticalPanel>
  );
}
