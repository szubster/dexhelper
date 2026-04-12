import React, { useMemo } from 'react';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';
import { PokedexCard } from './PokedexCard';

export function PokedexGrid({ pokemonList }: { pokemonList: { id: number; name: string }[] }) {
  const saveData = useStore((s) => s.saveData);
  const isLivingDex = useStore((s) => s.isLivingDex);
  const searchTerm = useStore((s) => s.searchTerm);
  const filters = useStore((s) => s.filters);

  // ⚡ Bolt: Decouple rapid search typing from expensive grid re-renders
  const deferredSearchTerm = React.useDeferredValue(searchTerm);

  const filtersSet = React.useMemo(() => new Set(filters), [filters]);
  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;
  const displayLimit = genConfig?.maxDex ?? 151;

  const partySet = React.useMemo(() => new Set(saveData?.party || []), [saveData?.party]);
  const pcSet = React.useMemo(() => new Set(saveData?.pc || []), [saveData?.pc]);
  // ⚡ Bolt: Removed redundant shinyPartySet and shinyPcSet which were unused and doing O(N) operations.

  const finalPokemon = React.useMemo(() => {
    // ⚡ Bolt: Hoist string allocation outside the loop
    const term = deferredSearchTerm ? deferredSearchTerm.toLowerCase() : '';

    return pokemonList.slice(0, displayLimit).filter((pokemon) => {
      // ⚡ Bolt: Combined filters into single pass to reduce O(N) iterations
      // 1. Search term check
      if (term) {
        const matchesTerm = pokemon.name.toLowerCase().includes(term) || pokemon.id.toString().includes(term);
        if (!matchesTerm) return false;
      }

      // 2. Storage/Dex filters check
      if (!saveData || filtersSet.size === 0) return true;

      const inParty = partySet.has(pokemon.id);
      const inPC = pcSet.has(pokemon.id);
      const hasInStorage = inParty || inPC;

      if (filtersSet.has('secured') && hasInStorage) return true;
      if (filtersSet.has('missing') && !hasInStorage) return true;
      if (filtersSet.has('dex-only') && saveData.owned.has(pokemon.id) && !hasInStorage) return true;

      return false;
    });
  }, [pokemonList, displayLimit, deferredSearchTerm, saveData, filtersSet, partySet, pcSet]);

  const shinySpeciesIds = useMemo(() => {
    const set = new Set<number>();
    if (saveData) {
      saveData.partyDetails.forEach((p) => {
        if (p.isShiny) set.add(p.speciesId);
      });
      saveData.pcDetails.forEach((p) => {
        if (p.isShiny) set.add(p.speciesId);
      });
    }
    return set;
  }, [saveData]);

  return (
    <div className="fade-in grid animate-in grid-cols-2 gap-5 px-1 pb-10 duration-500 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {finalPokemon.map((pokemon, idx) => (
        <PokedexCard
          key={pokemon.id}
          pokemon={pokemon}
          idx={idx}
          saveData={saveData}
          isLivingDex={isLivingDex}
          partySet={partySet}
          pcSet={pcSet}
          shinySpeciesIds={shinySpeciesIds}
          genConfig={genConfig}
        />
      ))}
    </div>
  );
}
