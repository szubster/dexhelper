import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { pokeDB } from '../../../db/PokeDB';
import { getMirageIslandMatch } from '../../../engine/gen3/mirageIsland/selector';
import type { Gen3SaveData } from '../../../engine/saveParser/parsers/common';
import { DataPoint } from '../../DataPoint';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export interface Gen3MirageIslandTrackerProps {
  saveData: Gen3SaveData;
}

export const Gen3MirageIslandTracker = React.memo(({ saveData }: Gen3MirageIslandTrackerProps) => {
  const match = getMirageIslandMatch(saveData);

  const { data: pokemonData } = useQuery({
    queryKey: ['pokemon', match.speciesId],
    queryFn: async () => {
      if (match.speciesId === undefined) return null;
      return pokeDB.getPokemon(match.speciesId);
    },
    enabled: match.found && match.speciesId !== undefined,
  });

  const displaySpecies = pokemonData ? pokemonData.n.toUpperCase() : match.speciesId;

  return (
    <TacticalPanel
      className="mt-4 flex flex-col border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6"
      aria-label="Mirage Island Tracker"
    >
      <TelemetryDecoration label="SYS.MIRAGE_ISLAND" className="-top-[17px] left-[-1px]" />
      <span className="tactical-text z-10 mb-4 font-black text-lg text-white">MIRAGE ISLAND TRACKER</span>
      <div className="z-10 grid grid-cols-2 gap-4 sm:grid-cols-4" aria-live="polite">
        <DataPoint label="STATUS" value={match.found ? 'MATCH FOUND' : 'NO MATCH FOUND'} />
        {match.found && match.speciesId !== undefined && <DataPoint label="SPECIES" value={String(displaySpecies)} />}
        {match.found && match.location && <DataPoint label="LOCATION" value={match.location} />}
      </div>
    </TacticalPanel>
  );
});
