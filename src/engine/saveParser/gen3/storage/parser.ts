import type { PokemonInstance } from '../../parsers/common';
import {
  calculateGen3HiddenPower,
  calculateGen3Shiny,
  parseGen3PCBoxes,
  parseGen3PokemonPVAndIVs,
} from '../../parsers/gen3';
import { groupBoxPokemonBySpecies } from '../../utils/boxGrouping';

/**
 * Parses Gen 3 PC Box data, enriching it with calculated stats (IVs, Nature, Shiny, Hidden Power).
 * It then groups the processed Pokémon by species using `groupBoxPokemonBySpecies`.
 *
 * @param pcBufferView - A DataView of the reconstructed PC Buffer (from sections 5-13).
 * @returns A record grouping `speciesId` to an array of enriched `PokemonInstance`s.
 * @throws Error - "The save file is corrupted or incomplete." on invalid data.
 */
export function parseGen3PCBoxesWithStats(pcBufferView: DataView): Record<number, PokemonInstance[]> {
  const baseResult = parseGen3PCBoxes(pcBufferView);
  const pcDetails = baseResult.pcDetails;

  for (const pokemon of pcDetails) {
    if (pokemon.personalityValue !== undefined && pokemon.slot !== undefined && pokemon.storageLocation) {
      // The offset within the PC buffer for this specific pokemon:
      // We parse the exact offset using Box and Slot math since PC_BOX_POKEMON_LIST_OFFSET = 4 and GEN3_PC_POKEMON_STRUCT_SIZE = 80
      // location is "Box N" where N is 1-indexed.
      const boxIndex = parseInt(pokemon.storageLocation.split(' ')[1] as string, 10) - 1;
      const pokemonIndex = boxIndex * 30 + pokemon.slot; // 30 is PC_BOX_CAPACITY
      const offset = 4 + pokemonIndex * 80; // 4 is PC_BOX_POKEMON_LIST_OFFSET, 80 is GEN3_PC_POKEMON_STRUCT_SIZE

      try {
        const ivs = parseGen3PokemonPVAndIVs(pcBufferView, offset);

        // Re-read OT ID to check for shininess, it's at offset + 4 (GEN3_POKEMON_OT_ID_OFFSET)
        const otId = pcBufferView.getUint32(offset + 4, true);

        pokemon.dvs = {
          hp: ivs.hp,
          atk: ivs.attack,
          def: ivs.defense,
          spd: ivs.speed,
          spc: ivs.specialAttack, // Legacy interface usage, we'll map both for safety
        };

        pokemon.ivs = {
          hp: ivs.hp,
          atk: ivs.attack,
          def: ivs.defense,
          spd: ivs.speed,
          spatk: ivs.specialAttack,
          spdef: ivs.specialDefense,
        };

        // We also calculate Nature: PV % 25
        pokemon.nature = pokemon.personalityValue % 25;

        // Shiny status
        pokemon.isShiny = calculateGen3Shiny(pokemon.personalityValue, otId);

        // Hidden Power
        pokemon.hiddenPower = calculateGen3HiddenPower(
          ivs.hp,
          ivs.attack,
          ivs.defense,
          ivs.speed,
          ivs.specialAttack,
          ivs.specialDefense,
        );
      } catch (e) {
        // RangeError or corruption handled by original parsing
        if (e instanceof RangeError) {
          throw new Error('The save file is corrupted or incomplete.');
        }
        throw e;
      }
    }
  }

  return groupBoxPokemonBySpecies(pcDetails);
}
