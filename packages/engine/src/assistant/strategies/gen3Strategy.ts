import type { UnifiedLocation } from '@/db/schema';
import { getGen3UnobtainableReason } from '../../exclusives/gen3Exclusives';
import { getDistanceToMap, resolveOutdoorMapId } from '../../mapGraph/gen3Graph';
import type { SaveData } from '../../saveParser/index';
import type { AssistantStrategy, Suggestion } from './types';
import { getMatchCallSuggestions } from '@/utils/matchCall';
import { getRoamerSuggestions } from '@/utils/roamer';

export const gen3Strategy: AssistantStrategy = {
  generation: 3,

  resolveMapAid(saveData: SaveData, allLocations: UnifiedLocation[]): number | null {
    return resolveOutdoorMapId(allLocations, saveData.currentMapId);
  },

  getMapDistance(currentMapId: number, targetAid: number, allLocations: UnifiedLocation[]) {
    return getDistanceToMap(allLocations, currentMapId, targetAid);
  },

  getUnobtainableReason(pokemonId: number, version: string, _ownedCount: number, ownedSet: Set<number>) {
    return getGen3UnobtainableReason(pokemonId, version, _ownedCount, ownedSet);
  },

  getSpecialSuggestions(saveData: SaveData, missingIds: number[]): Suggestion[] {
    const suggestions: Suggestion[] = [];
    const missingSet = new Set(missingIds);

    const roamers = [
      { id: 380, name: 'Latias' },
      { id: 381, name: 'Latios' },
    ];
    suggestions.push(...getRoamerSuggestions(saveData, missingSet, roamers));
    suggestions.push(...getMatchCallSuggestions(saveData));

    return suggestions;
  },

  isInternallyObtainable(baseId: number, _version: string): boolean {
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
      367, // Huntail
      368, // Gorebyss
      385, // Jirachi
      386, // Deoxys
    ]);

    return !unobtainableInternally.has(baseId);
  },
};
