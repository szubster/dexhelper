import type { PokemonInstance } from '../../parsers/common';
import { iterateGen2PCBoxes } from '../../parsers/gen2';
import { groupBoxPokemonBySpecies } from '../../utils/boxGrouping';

/**
 * Extracts and groups Gen 2 PC Box Pokémon by species.
 *
 * @param view - The raw save file DataView.
 * @param offsets - The dynamically resolved start offsets for the active WRAM box.
 * @param isCrystal - Whether the save is from Pokémon Crystal.
 * @returns A record grouping `speciesId` to an array of `PokemonInstance`s.
 * @throws Error - "The save file is corrupted or incomplete." on invalid data.
 */
export function extractGen2PCBoxes(
  view: DataView,
  offsets: { currentBoxNum: number; currentBoxCount: number; currentBoxSpecies: number },
  isCrystal: boolean,
): Record<number, PokemonInstance[]> {
  const pcDetails: PokemonInstance[] = [];

  try {
    for (const { pcDetails: pokemon } of iterateGen2PCBoxes(view, offsets, isCrystal)) {
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
