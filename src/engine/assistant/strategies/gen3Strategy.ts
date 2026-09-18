import type { UnifiedLocation } from '../../../db/schema';
import { getGen3UnobtainableReason } from '../../exclusives/gen3Exclusives';
import { getDistanceToMap, resolveOutdoorMapId } from '../../mapGraph/gen3Graph';
import type { SaveData } from '../../saveParser/index';
import {
  SPECIES_ALAKAZAM,
  SPECIES_DEOXYS,
  SPECIES_GENGAR,
  SPECIES_GOLEM,
  SPECIES_GOREBYSS,
  SPECIES_HUNTAIL,
  SPECIES_JIRACHI,
  SPECIES_KINGDRA,
  SPECIES_LATIAS,
  SPECIES_LATIOS,
  SPECIES_MACHAMP,
  SPECIES_POLITOED,
  SPECIES_PORYGON2,
  SPECIES_SCIZOR,
  SPECIES_SLOWKING,
  SPECIES_STEELIX,
} from '../constants';
import type { AssistantStrategy, Suggestion } from './types';
import { getMatchCallSuggestions } from './utils/matchCall';
import { getRoamerSuggestions } from './utils/roamer';

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
      { id: SPECIES_LATIAS, name: 'Latias' },
      { id: SPECIES_LATIOS, name: 'Latios' },
    ];
    suggestions.push(...getRoamerSuggestions(saveData, missingSet, roamers));
    suggestions.push(...getMatchCallSuggestions(saveData));

    return suggestions;
  },

  isInternallyObtainable(baseId: number, _version: string): boolean {
    const unobtainableInternally = new Set([
      SPECIES_ALAKAZAM,
      SPECIES_MACHAMP,
      SPECIES_GOLEM,
      SPECIES_GENGAR,
      SPECIES_POLITOED,
      SPECIES_SLOWKING,
      SPECIES_STEELIX,
      SPECIES_SCIZOR,
      SPECIES_KINGDRA,
      SPECIES_PORYGON2,
      SPECIES_HUNTAIL,
      SPECIES_GOREBYSS,
      SPECIES_JIRACHI,
      SPECIES_DEOXYS,
    ]);

    return !unobtainableInternally.has(baseId);
  },
};
