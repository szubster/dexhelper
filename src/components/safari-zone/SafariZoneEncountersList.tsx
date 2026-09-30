import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { getMissingGen1SafariEncounters } from '../../engine/safariZone/gen1/missingEncounters';
import { getMissingGen3SafariEncounters } from '../../engine/safariZone/gen3/missingEncounters';
import type { SaveData } from '../../engine/saveParser/parsers/common';
import { pokemonListQueryOptions } from '../../utils/pokemonQueries';
import { EmptyState } from '../EmptyState';
import { PokemonSprite } from '../pokemon/PokemonSprite';
import { TacticalBadge } from '../TacticalBadge';
import { TacticalCard } from '../TacticalCard';
import { TacticalPanel } from '../TacticalPanel';

interface Props {
  saveData: SaveData;
}

export default function SafariZoneEncountersList({ saveData }: Props) {
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);

  const pokemonMap = React.useMemo(() => {
    const map = new Map<number, string>();
    pokemonList.forEach((p) => {
      map.set(p.id, p.name);
    });
    return map;
  }, [pokemonList]);

  const missingAreas =
    saveData.generation === 1
      ? getMissingGen1SafariEncounters(saveData)
      : saveData.generation === 3
        ? getMissingGen3SafariEncounters(saveData)
        : [];

  const gameVersion = saveData.gameVersion;

  if (missingAreas.length === 0) {
    return <EmptyState label="ALL SAFARI ENCOUNTERS SECURED" variant="default" />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {missingAreas.map((area) => {
        const encounters = area.encounters[gameVersion] || [];
        return (
          <TacticalPanel key={area.name} className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-2">
              <h2 className="font-bold font-mono text-lg text-white uppercase tracking-tight">{area.name}</h2>
              <TacticalBadge variant="zinc">[ {encounters.length} MISSING ]</TacticalBadge>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {encounters.map((enc, idx) => {
                const pokemonName = pokemonMap.get(enc.pokemon) || `Pokémon #${enc.pokemon}`;
                return (
                  <TacticalCard
                    // biome-ignore lint/suspicious/noArrayIndexKey: Disambiguate duplicate encounters in area tables
                    key={`${area.name}-${enc.pokemon}-${enc.method}-${idx}`}
                    variant="storage-cyan"
                    className="p-3"
                  >
                    <div className="flex flex-col items-center text-center">
                      <PokemonSprite
                        pokemonId={enc.pokemon}
                        generation={saveData.generation}
                        alt={pokemonName}
                        className="h-16 w-16 object-contain"
                      />
                      <span className="mt-2 truncate font-bold font-mono text-white text-xs uppercase">
                        {pokemonName}
                      </span>
                      <div className="mt-1 flex items-center gap-1 font-mono text-[10px] text-zinc-400">
                        <span>RATE: {enc.chance}%</span>
                        {enc.minLevel && <span>• LV.{enc.minLevel}</span>}
                      </div>
                    </div>
                  </TacticalCard>
                );
              })}
            </div>
          </TacticalPanel>
        );
      })}
    </div>
  );
}
