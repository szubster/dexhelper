import type { SaveData } from '../saveParser/index';
import { GEN1_VERSION_EXCLUSIVES } from './gen1Exclusives';
import { GEN2_VERSION_EXCLUSIVES } from './gen2Exclusives';
import { GEN3_VERSION_EXCLUSIVES } from './gen3Exclusives';

/**
 * Extracts and maps game-exclusive Pokémon IDs based on the provided save file's generation and game version.
 *
 * @param saveData The parsed save data containing generation and gameVersion.
 * @returns An object containing arrays of missing and available exclusive Pokémon IDs for the game version.
 */
export function getGameExclusives(saveData: SaveData): { missing: number[]; available: number[] } {
  const version = saveData.gameVersion.toLowerCase();

  let exclusivesMap: Record<string, number[]>;
  switch (saveData.generation) {
    case 1:
      exclusivesMap = GEN1_VERSION_EXCLUSIVES;
      break;
    case 2:
      exclusivesMap = GEN2_VERSION_EXCLUSIVES;
      break;
    case 3:
      exclusivesMap = GEN3_VERSION_EXCLUSIVES;
      break;
    default:
      return { missing: [], available: [] };
  }

  const missing = exclusivesMap[version] || [];

  // Available exclusives are those that are missing in other versions of the same generation
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
