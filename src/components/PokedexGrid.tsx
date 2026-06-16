import { useSuspenseQuery } from '@tanstack/react-query';
import { SearchX } from 'lucide-react';
import React, { useMemo } from 'react';
import { pokeDB } from '../db/PokeDB';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';
import type { PokemonListItem } from '../utils/pokemonQueries';
import { PokedexCard } from './PokedexCard';
import { TacticalPanel } from './TacticalPanel';

export function PokedexGrid({ pokemonList }: { pokemonList: PokemonListItem[] }) {
  const saveData = useStore((s) => s.saveData);
  const isLivingDex = useStore((s) => s.isLivingDex);
  const searchTerm = useStore((s) => s.searchTerm);
  const filters = useStore((s) => s.filters);
  const selectedLocationId = useStore((s) => s.selectedLocationId);

  // ⚡ Bolt: Decouple rapid search typing from expensive grid re-renders
  const deferredSearchTerm = React.useDeferredValue(searchTerm);

  // Fetch pokemon IDs for the selected location if any
  const { data: locationIndex } = useSuspenseQuery({
    queryKey: ['locationIndex', selectedLocationId],
    queryFn: async () => {
      if (!selectedLocationId) return null;
      return pokeDB.getInverseIndex(selectedLocationId);
    },
    staleTime: Infinity,
  });

  const locationPokemonIds = useMemo(() => {
    if (!locationIndex) return null;
    return new Set(locationIndex);
  }, [locationIndex]);

  const filtersSet = React.useMemo(() => new Set(filters), [filters]);
  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;
  const displayLimit = genConfig?.maxDex ?? 151;

  const partySet = React.useMemo(() => new Set(saveData?.party || []), [saveData?.party]);
  const pcSet = React.useMemo(() => new Set(saveData?.pc || []), [saveData?.pc]);

  const finalPokemon = React.useMemo(() => {
    // ⚡ Bolt: Hoist string allocation outside the loop
    const term = deferredSearchTerm ? deferredSearchTerm.toLowerCase() : '';

    // ⚡ Bolt: Use a manual for-loop to prevent intermediate array allocation via slice().filter() overhead (O(N) -> O(1) memory)
    const result: PokemonListItem[] = [];
    const limit = Math.min(pokemonList.length, displayLimit);

    for (let i = 0; i < limit; i++) {
      const pokemon = pokemonList[i];
      if (pokemon === undefined || pokemon === null) continue;

      // 1. Search term check
      if (term) {
        const matchesTerm = pokemon.nameLower.includes(term) || pokemon.idString.includes(term);
        if (!matchesTerm) continue;
      }

      // 2. Location filter check
      if (locationPokemonIds && !locationPokemonIds.has(pokemon.id)) {
        continue;
      }

      // 3. Storage/Dex filters check
      if (!saveData || filtersSet.size === 0) {
        result.push(pokemon);
        continue;
      }

      const inParty = partySet.has(pokemon.id);
      const inPC = pcSet.has(pokemon.id);
      const hasInStorage = inParty || inPC;

      if (filtersSet.has('secured') && hasInStorage) {
        result.push(pokemon);
        continue;
      }
      if (filtersSet.has('missing') && !hasInStorage) {
        result.push(pokemon);
        continue;
      }
      if (filtersSet.has('dex-only') && saveData.owned.has(pokemon.id) && !hasInStorage) {
        result.push(pokemon);
      }
    }
    return result;
  }, [pokemonList, displayLimit, deferredSearchTerm, saveData, filtersSet, partySet, pcSet, locationPokemonIds]);

  const shinySpeciesIds = useMemo(() => {
    const set = new Set<number>();
    if (saveData) {
      // ⚡ Bolt: Replaced .forEach with for loops to avoid closure creation and function call overhead
      for (let i = 0; i < saveData.partyDetails.length; i++) {
        const p = saveData.partyDetails[i];
        if (p?.isShiny) set.add(p.speciesId);
      }
      for (let i = 0; i < saveData.pcDetails.length; i++) {
        const p = saveData.pcDetails[i];
        if (p?.isShiny) set.add(p.speciesId);
      }
    }
    return set;
  }, [saveData]);

  if (finalPokemon.length === 0) {
    return (
      <TacticalPanel className="fade-in mx-1 mt-4 flex animate-in flex-col items-center justify-center p-12 text-center duration-500">
        <SearchX className="mb-4 text-zinc-600" size={48} />
        <h3 className="font-bold font-mono text-lg text-zinc-400 uppercase tracking-wide">[ SYS.QUERY_FAILED ]</h3>
        <p className="mt-2 max-w-sm font-medium font-mono text-sm text-zinc-600">
          No matches found in database. Adjust search parameters or clear active filters.
        </p>
        <button
          type="button"
          title="Clear all filters"
          onClick={() => {
            useStore.getState().setSearchTerm('');
            useStore.getState().setFilters([]);
            useStore.getState().setSelectedLocationId(null);
          }}
          className="tactical-text mt-6 rounded-none border border-[var(--theme-primary)]/50 border-dashed bg-[var(--theme-primary)]/10 px-6 py-2.5 font-black text-[11px] text-[var(--theme-primary)] transition-all duration-300 hover:bg-[var(--theme-primary)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          Clear Filters
        </button>
      </TacticalPanel>
    );
  }

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
        />
      ))}
    </div>
  );
}
