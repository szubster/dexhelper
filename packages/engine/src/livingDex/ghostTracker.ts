import { getGenerationConfig } from '@/utils/generationConfig';
import type { SaveData } from '../saveParser/parsers/common';

/**
 * Identifies which Pokémon are missing from a player's physical Living Dex.
 *
 * **Architecture Note:**
 * A Living Dex differs from a standard Pokédex in that it requires the player to physically
 * possess one of every Pokémon concurrently (e.g. holding a Bulbasaur, Ivysaur, and Venusaur,
 * rather than just registering their boolean flags in the Pokédex after evolving one).
 * To calculate this, the engine must ignore the game's native Pokédex "Owned" bitflags and instead
 * perform a full O(N) sweep across the player's active Party and PC box arrays to aggregate
 * physical possession.
 *
 * @param saveData - The parsed binary save data indicating the player's progress and inventory.
 * @param regionalOnly - Optional flag to limit the calculation to the regional Pokédex instead of the National Dex.
 * @returns An array of Pokémon species IDs that the player does not currently physically possess.
 */
export function getLivingDexGhosts(saveData: SaveData, regionalOnly = false): number[] {
  if (regionalOnly) {
    throw new Error('NotImplemented: Regional dex filtering is not yet supported.');
  }

  const genConfig = getGenerationConfig(saveData.generation);
  const maxDex = genConfig.maxDex;

  const physicalOwned = new Set<number>();

  for (const id of saveData.party) {
    if (id > 0 && id <= maxDex) {
      physicalOwned.add(id);
    }
  }

  for (const id of saveData.pc) {
    if (id > 0 && id <= maxDex) {
      physicalOwned.add(id);
    }
  }

  const ghosts: number[] = [];
  for (let i = 1; i <= maxDex; i++) {
    if (!physicalOwned.has(i)) {
      ghosts.push(i);
    }
  }

  return ghosts;
}

export interface PokemonLocation {
  speciesId: number;
  box: number;
  slot: number;
}

/**
 * Extracts PC Box and Slot locations for owned Pokémon.
 *
 * @param saveData - The parsed binary save data indicating the player's progress and inventory.
 * @returns An array of PokemonLocation objects indicating the box and slot for each Pokemon in the PC.
 */
export function getOwnedPokemonLocations(saveData: SaveData): PokemonLocation[] {
  const locations: PokemonLocation[] = [];

  for (const p of saveData.pcDetails) {
    if (p.speciesId > 0 && p.slot !== undefined && p.storageLocation?.startsWith('Box ')) {
      locations.push({
        speciesId: p.speciesId,
        box: parseInt(p.storageLocation.substring(4), 10),
        slot: p.slot,
      });
    }
  }

  return locations;
}
