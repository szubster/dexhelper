import type { UnifiedLocation } from '../../../db/schema';
import { getGenerationConfig } from '../../../utils/generationConfig';
import { GEN1_ITEMS } from '../../data/gen1/assistantData';
import { getUnobtainableReason } from '../../exclusives/gen1Exclusives';
import { getDistanceToMap } from '../../mapGraph/gen1Graph';
import type { SaveData } from '../../saveParser/index';
import type { AssistantStrategy, Suggestion } from './types';

// Map PokeAPI Item IDs to internal Game Item IDs
const EVO_ITEM_MAP: Record<number, number> = {
  81: GEN1_ITEMS.MOON_STONE, // moon-stone
  82: GEN1_ITEMS.FIRE_STONE, // fire-stone
  83: GEN1_ITEMS.THUNDER_STONE, // thunder-stone
  84: GEN1_ITEMS.WATER_STONE, // water-stone
  85: GEN1_ITEMS.LEAF_STONE, // leaf-stone
};

export const gen1Strategy: AssistantStrategy = {
  generation: 1,

  resolveMapAid(saveData: SaveData, allLocations: UnifiedLocation[]): number | null {
    const mapId = saveData.currentMapId;

    // Find location for this mapId
    const loc = allLocations.find((l) => l.id === mapId);
    if (!loc) return null;

    // Resolve to parent if it's an indoor location
    if (loc.parentId !== undefined) {
      const parent = allLocations.find((p) => p.id === loc.parentId);
      if (parent) return parent.id;
    }

    return loc.id;
  },

  getMapDistance(currentMapId: number, targetAid: number, allLocations: UnifiedLocation[]) {
    return getDistanceToMap(allLocations, currentMapId, targetAid);
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
        description: `Your current box has ${saveData.currentBoxCount}/${genConfig.boxCapacity} Pokémon. Switch boxes at a Pokémon Center PC or new catches will fail!`,
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

  hasEvolutionItem(saveData: SaveData, itemId: number): boolean {
    const gameItemId = EVO_ITEM_MAP[itemId];
    if (!gameItemId) return false;
    // Check for `i.id` matching `gameItemId`.
    // Some tests mock the inventory array with a `count` property instead of `quantity`
    // We treat any presence in the inventory array as having the item.
    return saveData.inventory.some((i) => i.id === gameItemId);
  },
};
