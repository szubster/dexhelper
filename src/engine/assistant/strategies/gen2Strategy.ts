import type { UnifiedLocation } from '../../../db/schema';
import { getGen2UnobtainableReason } from '../../exclusives/gen2Exclusives';
import { getDistanceToMap, resolveOutdoorMapId } from '../../mapGraph/gen2Graph';
import type { SaveData } from '../../saveParser/parsers/common';
import type { AssistantStrategy, Suggestion } from './types';

export const gen2Strategy: AssistantStrategy = {
  generation: 2,

  resolveMapAid(_saveData: SaveData, allLocations: UnifiedLocation[], currentMapId: number): number | null {
    // Verify the map exists in our database first
    const exists = allLocations.some((l) => l.id === currentMapId);
    if (!exists) return null;

    return resolveOutdoorMapId(allLocations, currentMapId);
  },

  getMapDistance(currentMapId: number, targetAid: number, allLocations: UnifiedLocation[]) {
    return getDistanceToMap(allLocations, currentMapId, targetAid);
  },

  getUnobtainableReason(pokemonId: number, version: string, ownedCount: number, ownedSet: Set<number>) {
    return getGen2UnobtainableReason(pokemonId, version, ownedCount, ownedSet);
  },

  getSpecialSuggestions(_saveData: SaveData, _missingIds: number[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    // Gen 2 specific suggestions (e.g., roaming beasts, daily events) can be added here
    return suggestions;
  },

  isInternallyObtainable(_baseId: number, _version: string): boolean {
    // Gen 2 supports breeding, but encounter-based suggestions are the primary driver.
    return true;
  },
};
