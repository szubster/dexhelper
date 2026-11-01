import { useQuery } from '@tanstack/react-query';
import type React from 'react';
import { useGen3DashboardData } from '../../../contexts/Gen3DashboardDataContext';
import { pokemonListQueryOptions } from '../../../utils/pokemonQueries';
import { PokedexCard } from '../../PokedexCard';
import { TacticalHeaderDivider } from '../../TacticalHeaderDivider';

const SimplePokedexGapVisualizer: React.FC<{ missingDex: Set<number> }> = ({ missingDex }) => {
  const { data: pokemonList } = useQuery(pokemonListQueryOptions);

  if (!pokemonList) return null;

  const dexItems = Array.from(missingDex)
    .map((id) => pokemonList.find((p) => p.id === id))
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
};

export const PokedexGapVisualizerWidget: React.FC = () => {
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
};
