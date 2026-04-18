import type { UnifiedLocation } from '../../../db/schema';
import { getGenerationConfig } from '../../../utils/generationConfig';
import { GEN1_ITEMS } from '../../data/gen1/assistantData';
import { getUnobtainableReason } from '../../exclusives/gen1Exclusives';
import { getDistanceToMap } from '../../mapGraph/gen1Graph';
import type { SaveData } from '../../saveParser/index';
import type { AssistantStrategy, Suggestion } from './types';

const POKEAPI_TO_GEN1_ITEM: Record<number, number> = {
  81: GEN1_ITEMS.MOON_STONE,
  82: GEN1_ITEMS.FIRE_STONE,
  83: GEN1_ITEMS.THUNDER_STONE,
  84: GEN1_ITEMS.WATER_STONE,
  85: GEN1_ITEMS.LEAF_STONE,
};

export const gen1Strategy: AssistantStrategy = {
  generation: 1,

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

  hasEvolutionItem(inventory: { id: number; quantity: number }[], pokeApiItemId: number): boolean {
    const internalId = POKEAPI_TO_GEN1_ITEM[pokeApiItemId];
    if (internalId === undefined) return false;
    return inventory.some((item) => item.id === internalId && item.quantity > 0);
  },
};
