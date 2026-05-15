import type { UnifiedLocation } from '../../../db/schema';
import { getGenerationConfig } from '../../../utils/generationConfig';
import { getGen2UnobtainableReason } from '../../exclusives/gen2Exclusives';
import { getDistanceToMap, resolveOutdoorMapId } from '../../mapGraph/gen2Graph';
import type { SaveData } from '../../saveParser/index';
import type { AssistantStrategy, Suggestion } from './types';

export const gen2Strategy: AssistantStrategy = {
  generation: 2,

  resolveMapAid(saveData: SaveData, allLocations: UnifiedLocation[]): number | null {
    const mapId = saveData.currentMapId;
    return resolveOutdoorMapId(allLocations, mapId);
  },

  getMapDistance(currentMapId: number, targetAid: number, allLocations: UnifiedLocation[]) {
    return getDistanceToMap(allLocations, currentMapId, targetAid);
  },

  getUnobtainableReason(pokemonId: number, version: string, ownedCount: number, ownedSet: Set<number>) {
    return getGen2UnobtainableReason(pokemonId, version, ownedCount, ownedSet);
  },

  getSpecialSuggestions(saveData: SaveData, _missingIds: number[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    const genConfig = getGenerationConfig(2);

    // Box full warning
    if (saveData.currentBoxCount >= genConfig.boxWarningThreshold) {
      suggestions.push({
        id: 'box-full-warning',
        pokemonId: 0,
        title: 'Current Box Almost Full',
        category: 'Event',
        priority: 1000,
        description: `Your current box has ${saveData.currentBoxCount}/${genConfig.boxCapacity} Pokémon. Switch boxes at a Pokémon Center PC or you won't be able to catch more!`,
      });
    }

    return suggestions;
  },

  isInternallyObtainable(_baseId: number, _version: string): boolean {
    // Gen 2 has breeding, so most base forms are obtainable if you have an evolution.
    return true;
  },
};
