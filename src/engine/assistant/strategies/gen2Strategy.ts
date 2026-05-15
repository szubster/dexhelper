import type { UnifiedLocation } from '../../../db/schema';
import { getGenerationConfig } from '../../../utils/generationConfig';
import { getGen2UnobtainableReason } from '../../exclusives/gen2Exclusives';
import { getDistanceToMap } from '../../mapGraph/gen2Graph';
import type { SaveData } from '../../saveParser/index';
import type { AssistantStrategy, Suggestion } from './types';

export const gen2Strategy: AssistantStrategy = {
  generation: 2,

  resolveMapAid(saveData: SaveData, allLocations: UnifiedLocation[]): number | null {
    const mapId = saveData.currentMapId;

    // Find location for this mapId
    const loc = allLocations.find((l) => l.id === mapId);
    if (!loc) return null;

    // Resolve to parent if it's an indoor location
    if (loc.prnt !== undefined) {
      const parent = allLocations.find((p) => p.id === loc.prnt);
      if (parent) return parent.id;
    }

    return loc.id;
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
        description: `Your current box has ${saveData.currentBoxCount}/${genConfig.boxCapacity} Pokémon. Switch boxes at a Pokémon Center PC or new catches will fail!`,
      });
    }

    return suggestions;
  },

  isInternallyObtainable(_baseId: number, _version: string): boolean {
    // Gen 2 has breeding, so most things are obtainable.
    return true;
  },
};
