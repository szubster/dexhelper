import type { PokemonInstance } from '../parsers/common';

const BOX_LOCATION_PREFIX = 'Box';

/**
 * Groups an array of PokemonInstance by speciesId, filtering out any Pokemon
 * that are not stored in a PC Box (e.g., filtering out Pokemon in the Party or Daycare).
 *
 * @param pokemonList Array of PokemonInstance to filter and group
 * @returns Record grouping speciesId to an array of PokemonInstance
 * @example
 * const grouped = groupBoxPokemonBySpecies(saveData.allPokemon);
 * const pikachusInPC = grouped[25] || [];
 */
export function groupBoxPokemonBySpecies(pokemonList: PokemonInstance[]): Record<number, PokemonInstance[]> {
  const grouped: Record<number, PokemonInstance[]> = {};

  for (const pokemon of pokemonList) {
    if (pokemon.storageLocation?.startsWith(BOX_LOCATION_PREFIX)) {
      if (!grouped[pokemon.speciesId]) {
        grouped[pokemon.speciesId] = [];
      }
      const group = grouped[pokemon.speciesId];
      if (group) {
        group.push(pokemon);
      }
    }
  }

  return grouped;
}
