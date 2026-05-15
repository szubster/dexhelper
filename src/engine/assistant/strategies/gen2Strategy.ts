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

  isInternallyObtainable(baseId: number, _version: string): boolean {
    // Gen 2 trade evolutions and mythicals
    const unobtainableInternally = new Set([
      65, // Alakazam
      68, // Machamp
      76, // Golem
      94, // Gengar
      186, // Politoed
      199, // Slowking
      208, // Steelix
      212, // Scizor
      230, // Kingdra
      233, // Porygon2
      251, // Celebi
    ]);

    return !unobtainableInternally.has(baseId);
  },
};
