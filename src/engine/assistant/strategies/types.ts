import type { UnifiedLocation } from '../../../db/schema';
import type { SaveData } from '../../saveParser/index';

export type SuggestionCategory = 'Catch' | 'Evolve' | 'Breed' | 'Progress' | 'Event' | 'Utility' | 'Trade' | 'Gift';

export interface EncounterDetail {
  chance: number;
  method: string;
  minLevel: number;
  maxLevel: number;
  aid: number;
}

export interface Suggestion {
  id: string;
  category: SuggestionCategory;
  title: string;
  description: string;
  pokemonId?: number;
  pokemonIds?: number[];
  priority: number;
  encounterInfo?: Record<number, EncounterDetail[]>;
  warning?: string;
  debugInfo?: {
    priorityScore: number;
    reasoning?: string;
  };
}

export interface RejectedSuggestion {
  pokemonId: number;
  reason: string;
  code: 'VERSION_EXCLUSIVE' | 'GIFT_CLAIMED' | 'EVO_ALREADY_OWNED' | 'HOF_LOCKED' | 'CHOICE_TAKEN' | 'MISSING_DATA';
}

export interface AssistantStrategy {
  generation: number;
  resolveMapAid(saveData: SaveData, allLocations: UnifiedLocation[]): number | null;
  getMapDistance(
    currentMapId: number,
    targetAid: number,
    allLocations: UnifiedLocation[],
  ): { distance: number; name: string } | null;
  getUnobtainableReason(pokemonId: number, version: string, ownedCount: number, ownedSet: Set<number>): string | null;
  getSpecialSuggestions(saveData: SaveData, missingIds: number[]): Suggestion[];
  isInternallyObtainable(baseId: number, version: string): boolean;
  hasEvolutionItem(saveData: SaveData, itemId: number): boolean;
}
