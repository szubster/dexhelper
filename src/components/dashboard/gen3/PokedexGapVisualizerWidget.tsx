import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useGen3DashboardData } from '../../../contexts/Gen3DashboardDataContext';
import { pokemonListQueryOptions } from '../../../utils/pokemonQueries';
import { PokedexCard } from '../../PokedexCard';
import { TacticalHeaderDivider } from '../../TacticalHeaderDivider';

// ⚡ Bolt: Wrapped in React.memo and replaced O(M * N) array linear search (.find inside missingDex map)
// with an O(1) indexed Map lookup, transitioning gap item computation from O(M * N) to O(N + M).
const SimplePokedexGapVisualizer: React.FC<{ missingDex: Set<number> }> = React.memo(({ missingDex }) => {
  const { data: pokemonList } = useQuery(pokemonListQueryOptions);

  const pokemonMap = useMemo(() => {
    if (!pokemonList) return null;
    return new Map(pokemonList.map((p) => [p.id, p]));
  }, [pokemonList]);

  if (!pokemonList || !pokemonMap) return null;

  const dexItems = Array.from(missingDex)
    .map((id) => pokemonMap.get(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  if (dexItems.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {dexItems.map((pokemon, idx) => (
        <div
          key={pokemon.id}
          className="hover:filter-none relative opacity-60 grayscale filter transition-all duration-300 hover:opacity-100"
        >
          <PokedexCard
            pokemon={pokemon}
            idx={idx}
            isLivingDex={false}
            partySet={new Set()}
            pcSet={new Set()}
            shinySpeciesIds={new Set()}
          />
        </div>
      ))}
    </div>
  );
});

// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary re-renders when parent dashboard states update without gap data changing.
export const PokedexGapVisualizerWidget: React.FC = React.memo(() => {
  const { missingNational, missingHoenn } = useGen3DashboardData();

  if (missingNational.size === 0 && missingHoenn.size === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 border border-zinc-700 bg-zinc-900/50 p-4">
      <TacticalHeaderDivider className="mb-4 border-zinc-700">
        <h2 className="font-mono text-sm font-bold tracking-widest text-zinc-400">POKÉDEX GAP ANALYSIS</h2>
      </TacticalHeaderDivider>
      <div className="flex flex-col gap-4">
        {missingHoenn.size > 0 && (
          <div>
            <h3 className="mb-2 font-mono text-xs text-zinc-500">HOENN DEX GAPS ({missingHoenn.size})</h3>
            <SimplePokedexGapVisualizer missingDex={missingHoenn} />
          </div>
        )}
        {missingNational.size > 0 && (
          <div>
            <h3 className="mb-2 font-mono text-xs text-zinc-500">NATIONAL DEX GAPS ({missingNational.size})</h3>
            <SimplePokedexGapVisualizer missingDex={missingNational} />
          </div>
        )}
      </div>
    </div>
  );
});
