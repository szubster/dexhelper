import { useSuspenseQuery } from '@tanstack/react-query';
import { SearchX } from 'lucide-react';
import React, { useMemo } from 'react';
import { pokeDB } from '../db/PokeDB';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';
import type { PokemonListItem } from '../utils/pokemonQueries';
import { PokedexCard } from './PokedexCard';
import { TacticalButton } from './TacticalButton';
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
      const isOwnedInDex = saveData.owned.has(pokemon.id);

      const isOwned = isLivingDex ? hasInStorage : isOwnedInDex || hasInStorage;

      if (filtersSet.has('secured') && isOwned) {
        result.push(pokemon);
        continue;
      }
      if (filtersSet.has('missing') && !isOwned) {
        result.push(pokemon);
        continue;
      }
      if (filtersSet.has('dex-only') && isOwnedInDex && !hasInStorage) {
        result.push(pokemon);
      }
    }
    return result;
  }, [
    pokemonList,
    displayLimit,
    deferredSearchTerm,
    saveData,
    filtersSet,
    partySet,
    pcSet,
    locationPokemonIds,
    isLivingDex,
  ]);

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
        <TacticalButton
          type="button"
          title="Clear all filters"
          aria-label="Clear all filters"
          variant="primary"
          onClick={() => {
            useStore.getState().setSearchTerm('');
            useStore.getState().setFilters([]);
            useStore.getState().setSelectedLocationId(null);
          }}
          className="mt-6 px-6 py-2.5"
        >
          Clear Filters
        </TacticalButton>
      </TacticalPanel>
    );
  }

  return (
    <div className="fade-in animate-in pb-10 duration-500">
      <div className="mb-4 flex items-center justify-between border-[var(--theme-primary)]/30 border-b border-dashed bg-[var(--theme-primary)]/5 px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-[0.2em]">
            SYS.SECTOR_SCAN
          </span>
          <div className="h-4 w-px border-r border-dashed bg-[var(--theme-primary)]/30" />
          <span className="font-bold font-mono text-white text-xs uppercase tracking-wider">Pokedex Matrix</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400">
          <span>ENTITIES:</span>
          <span className="font-bold text-[var(--theme-primary)]">
            {finalPokemon.length.toString().padStart(3, '0')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    </div>
  );
}
