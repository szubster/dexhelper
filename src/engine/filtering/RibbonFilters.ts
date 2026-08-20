import type { ContestCondition } from '../gen3/contests/types';
import type { PokemonInstance } from '../saveParser/parsers/common';

export interface RibbonFilterState {
  categories?: ContestCondition[]; // Which categories to check (e.g. ['cool', 'beauty'])
  targetRank?: number; // Target rank required to not be considered "missing" (default 4)
}

export interface RibbonSortState {
  direction: 'asc' | 'desc';
}

const ALL_CATEGORIES: ContestCondition[] = ['cool', 'beauty', 'cute', 'smart', 'tough'];

/**
 * Calculates the number of missing ribbons for a Pokemon based on the filter state.
 */
export function getMissingRibbonCount(pokemon: PokemonInstance, filterState: RibbonFilterState = {}): number {
  const ribbons = pokemon.ribbons || { cool: 0, beauty: 0, cute: 0, smart: 0, tough: 0 };
  const categoriesToCheck = filterState.categories || ALL_CATEGORIES;
  const targetRank = filterState.targetRank ?? 4; // Default to Master rank (4)

  let missingCount = 0;
  for (const category of categoriesToCheck) {
    const rank = ribbons[category] || 0;
    if (rank < targetRank) {
      missingCount += 1;
    }
  }

  return missingCount;
}

/**
 * Filters a list of Pokémon to only those that are missing at least one ribbon
 * according to the provided filter state.
 */
export function filterByMissingRibbons(
  pokemonList: PokemonInstance[],
  filterState: RibbonFilterState = {},
): PokemonInstance[] {
  return pokemonList.filter((pokemon) => getMissingRibbonCount(pokemon, filterState) > 0);
}

/**
 * Sorts a list of Pokémon based on the count of missing ribbons.
 */
export function sortByMissingRibbonCount(
  pokemonList: PokemonInstance[],
  sortState: RibbonSortState = { direction: 'desc' },
  filterState: RibbonFilterState = {},
): PokemonInstance[] {
  return [...pokemonList].sort((a, b) => {
    const missingA = getMissingRibbonCount(a, filterState);
    const missingB = getMissingRibbonCount(b, filterState);

    if (sortState.direction === 'asc') {
      return missingA - missingB;
    } else {
      return missingB - missingA;
    }
  });
}
