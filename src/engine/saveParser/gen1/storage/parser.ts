import type { PokemonInstance } from '../../parsers/common';
import { iterateGen1PCBoxes } from '../../parsers/gen1';
import { groupBoxPokemonBySpecies } from '../../utils/boxGrouping';

/**
 * Extracts and groups Gen 1 PC Box Pokémon by species.
 *
 * @param view - The raw save file DataView.
 * @param offsetShift - The `+1` shift applied if the save is Pokémon Yellow.
 * @returns A record grouping `speciesId` to an array of `PokemonInstance`s.
 * @throws Error - "The save file is corrupted or incomplete." on invalid data.
 */
export function extractGen1PCBoxes(view: DataView, offsetShift: number): Record<number, PokemonInstance[]> {
  const pcDetails: PokemonInstance[] = [];

  try {
    for (const { pcDetails: pokemon } of iterateGen1PCBoxes(view, offsetShift)) {
      pcDetails.push(pokemon);
    }
  } catch (e) {
    if (e instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw e;
  }

  return groupBoxPokemonBySpecies(pcDetails);
}
