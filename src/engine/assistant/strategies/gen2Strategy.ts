import type { UnifiedLocation } from '../../../db/schema';
import { getGen2UnobtainableReason } from '../../exclusives/gen2Exclusives';
import { getDistanceToMap, resolveOutdoorMapId } from '../../mapGraph/gen2Graph';
import type { SaveData } from '../../saveParser/index';
import type { AssistantStrategy, Suggestion } from './types';

export const gen2Strategy: AssistantStrategy = {
  generation: 2,

  resolveMapAid(saveData: SaveData, allLocations: UnifiedLocation[]): number | null {
    return resolveOutdoorMapId(allLocations, saveData.currentMapId);
  },

  getMapDistance(currentMapId: number, targetAid: number, allLocations: UnifiedLocation[]) {
    return getDistanceToMap(allLocations, currentMapId, targetAid);
  },

  getUnobtainableReason(pokemonId: number, version: string, _ownedCount: number, ownedSet: Set<number>) {
    return getGen2UnobtainableReason(pokemonId, version, _ownedCount, ownedSet);
  },

  getSpecialSuggestions(_saveData: SaveData, _missingIds: number[]): Suggestion[] {
    return [];
  },

  isInternallyObtainable(_baseId: number, _version: string): boolean {
    return true;
  },
};
