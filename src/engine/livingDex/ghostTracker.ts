import type { PokemonMetadata } from '../../db/schema';
import { getGenerationConfig } from '../../utils/generationConfig';
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

/**
 * Identifies which Pokémon the player possesses duplicates of within their physical Living Dex.
 *
 * @param saveData - The parsed binary save data indicating the player's progress and inventory.
 * @returns A Set of Pokémon species IDs that the player possesses more than one of.
 */
export function getLivingDexDuplicates(saveData: SaveData): Set<number> {
  const genConfig = getGenerationConfig(saveData.generation);
  const maxDex = genConfig.maxDex;

  const seen = new Set<number>();
  const duplicates = new Set<number>();

  for (const id of saveData.party) {
    if (id > 0 && id <= maxDex) {
      if (seen.has(id)) {
        duplicates.add(id);
      } else {
        seen.add(id);
      }
    }
  }

  for (const id of saveData.pc) {
    if (id > 0 && id <= maxDex) {
      if (seen.has(id)) {
        duplicates.add(id);
      } else {
        seen.add(id);
      }
    }
  }

  return duplicates;
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

export interface EvolvableDuplicate {
  missingSpeciesId: number;
  duplicateSpeciesId: number;
}

/**
 * Cross-references missing Living Dex slots with available duplicates to determine
 * if a missing Pokemon can be obtained by evolving a duplicate pre-evolution.
 *
 * @param ghosts - Array of missing Pokemon species IDs.
 * @param duplicates - Set of duplicate Pokemon species IDs possessed by the player.
 * @param pokemonMetadata - A dictionary of Pokemon metadata to look up evolution chains.
 * @returns An array of objects linking the missing species ID to the duplicate pre-evolution species ID.
 */
export function getMissingEvolutionsFromDuplicates(
  ghosts: number[],
  duplicates: Set<number>,
  pokemonMetadata: Record<number, PokemonMetadata | null>,
): EvolvableDuplicate[] {
  const results: EvolvableDuplicate[] = [];

  for (const ghostId of ghosts) {
    const meta = pokemonMetadata[ghostId];
    if (!meta) continue;

    for (const preEvoId of meta.efrm) {
      if (duplicates.has(preEvoId)) {
        results.push({
          missingSpeciesId: ghostId,
          duplicateSpeciesId: preEvoId,
        });
        break; // Only map to one available duplicate pre-evolution
      }
    }
  }

  return results;
}
