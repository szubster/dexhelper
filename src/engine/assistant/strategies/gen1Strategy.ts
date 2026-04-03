import type { AssistantStrategy, Suggestion } from './types';
import type { SaveData } from '../../saveParser/index';
import { GEN1_MAPS, INDOOR_TO_PARENT_MAP, getDistanceToMap } from '../../mapGraph/gen1Graph';
import { getUnobtainableReason } from '../../exclusives/gen1Exclusives';
import { GEN1_MAP_TO_SLUG } from '../../data/gen1/assistantData';
import { getGenerationConfig } from '../../../utils/generationConfig';

export const gen1Strategy: AssistantStrategy = {
  generation: 1,

  resolveMapSlug(saveData: SaveData): string {
    let mapId = saveData.currentMapId;

    // Resolve indoor maps to their parent outdoor area
    if (INDOOR_TO_PARENT_MAP[mapId] !== undefined) {
      mapId = INDOOR_TO_PARENT_MAP[mapId]!;
    }

    const node = GEN1_MAPS[mapId];
    if (node) return node.slug;

    // Fall back to the assistantData map-to-slug lookup
    return GEN1_MAP_TO_SLUG[saveData.currentMapId] ?? 'pallet-town-area';
  },

  getMapDistance(currentMapId: number, targetSlug: string) {
    return getDistanceToMap(currentMapId, targetSlug);
  },

  getUnobtainableReason(pokemonId: number, version: string, ownedCount: number, ownedSet: Set<number>) {
    return getUnobtainableReason(pokemonId, version, ownedCount, ownedSet);
  },

  getSpecialSuggestions(saveData: SaveData, _missingIds: number[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    const genConfig = getGenerationConfig(1);

    // Box full warning — use config values instead of magic numbers
    if (saveData.currentBoxCount >= genConfig.boxWarningThreshold) {
      suggestions.push({
        id: 'box-full-warning',
        pokemonId: 0,
        title: 'Current Box Almost Full',
        category: 'Event',
        priority: 1000,
        warning: `Your current box has ${saveData.currentBoxCount}/${genConfig.boxCapacity} Pokémon. Switch boxes at a Pokémon Center PC or new catches will fail!`,
      });
    }

    // Mewtwo lock check
    if (saveData.hallOfFameCount === 0 && !saveData.owned.has(150)) {
      // Mewtwo is locked behind beating E4 — not a suggestion but a rejection condition
      // This is handled by the main engine, not as a special suggestion
    }

    return suggestions;
  },

  isInternallyObtainable(_baseId: number, _version: string): boolean {
    // Gen 1 doesn't have breeding, so obtainability is purely based on
    // encounter data + static encounters. The main engine handles this.
    return true;
  },
};
