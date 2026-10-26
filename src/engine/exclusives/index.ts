import type { SaveData } from '../saveParser/index';
import { formatVersionExclusiveReason } from './common';
import {
  GEN1_VERSION_EXCLUSIVES,
  getGen1SpecialUnobtainableReason,
  getUnobtainableReason as getUnobtainableReasonGen1,
} from './gen1Exclusives';
import { GEN2_VERSION_EXCLUSIVES, getGen2UnobtainableReason } from './gen2Exclusives';
import { GEN3_VERSION_EXCLUSIVES, getGen3UnobtainableReason } from './gen3Exclusives';

export { formatVersionExclusiveReason };

/**
 * Returns version exclusives map for a given generation or combined map if unstated.
 */
export function getVersionExclusivesMap(generation?: number): Record<string, number[]> {
  switch (generation) {
    case 1:
      return GEN1_VERSION_EXCLUSIVES;
    case 2:
      return GEN2_VERSION_EXCLUSIVES;
    case 3:
      return GEN3_VERSION_EXCLUSIVES;
    default:
      return { ...GEN1_VERSION_EXCLUSIVES, ...GEN2_VERSION_EXCLUSIVES, ...GEN3_VERSION_EXCLUSIVES };
  }
}

/**
 * Unified evaluator for version exclusive and special unobtainable Pokémon reasons.
 * Accepts both 3-arg (pokemonId, gameVersion, ownedSet, generation?)
 * and 4-arg (pokemonId, gameVersion, ownedCount, ownedSet, generation?) signatures for backward compatibility.
 */
export function getUnobtainableReason(
  pokemonId: number,
  gameVersion: string,
  arg3: Set<number> | number,
  arg4?: Set<number> | number,
  arg5?: number,
): string | null {
  let ownedSet: Set<number>;
  let generation: number | undefined;

  if (typeof arg3 === 'number') {
    ownedSet = (arg4 as Set<number>) ?? new Set();
    generation = arg5;
  } else {
    ownedSet = arg3;
    generation = typeof arg4 === 'number' ? arg4 : undefined;
  }

  if (generation === 1) {
    return getUnobtainableReasonGen1(pokemonId, gameVersion, ownedSet.size, ownedSet);
  }
  if (generation === 2) {
    return getGen2UnobtainableReason(pokemonId, gameVersion, ownedSet.size, ownedSet);
  }
  if (generation === 3) {
    return getGen3UnobtainableReason(pokemonId, gameVersion, ownedSet.size, ownedSet);
  }

  const versionKey = gameVersion.toLowerCase();
  const gen1Reason = getGen1SpecialUnobtainableReason(pokemonId, versionKey, ownedSet);
  if (gen1Reason) return gen1Reason;

  const exclusivesMap = getVersionExclusivesMap();
  const exclusives = exclusivesMap[versionKey] || [];

  if (exclusives.includes(pokemonId) && !ownedSet.has(pokemonId)) {
    return formatVersionExclusiveReason(versionKey);
  }

  return null;
}

/**
 * Extracts and maps game-exclusive Pokémon IDs based on the provided save file's generation and game version.
 *
 * @param saveData The parsed save data containing generation and gameVersion.
 * @returns An object containing arrays of missing and available exclusive Pokémon IDs for the game version.
 */
export function getGameExclusives(saveData: SaveData): { missing: number[]; available: number[] } {
  const version = saveData.gameVersion.toLowerCase();
  const exclusivesMap = getVersionExclusivesMap(saveData.generation);

  const missing = exclusivesMap[version] || [];

  const availableSet = new Set<number>();
  for (const [v, missingList] of Object.entries(exclusivesMap)) {
    if (v !== version) {
      for (const id of missingList) {
        if (!missing.includes(id)) {
          availableSet.add(id);
        }
      }
    }
  }

  return {
    missing,
    available: Array.from(availableSet),
  };
}
