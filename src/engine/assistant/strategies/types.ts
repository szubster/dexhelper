import type { UnifiedLocation } from '../../../db/schema';
import type { SaveData } from '../../saveParser/index';

export type SuggestionCategory = 'Catch' | 'Evolve' | 'Breed' | 'Progress' | 'Event' | 'Utility' | 'Trade' | 'Gift';

export interface EncounterDetail {
  chance: number;
  method: string;
  minLevel: number;
  maxLevel?: number | undefined;
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

/**
 * Defines the generation-specific logic and rules for the Assistant recommendation engine.
 * Each generation (Gen 1, Gen 2, etc.) must implement this strategy to handle mechanical differences
 * such as map layouts, obtainability rules, and specific generation features.
 */
export interface AssistantStrategy {
  /**
   * The generation number (e.g. 1 for Gen 1).
   */
  generation: number;

  /**
   * Resolves the current map ID to the Area ID (AID) used by the database.
   *
   * @param saveData - The parsed save data containing the player's current map ID.
   * @param allLocations - The unified list of all map locations.
   * @returns The Area ID corresponding to the player's location, or null if unknown.
   *
   * @example
   * const aid = strategy.resolveMapAid(saveData, allLocations);
   */
  resolveMapAid(saveData: SaveData, allLocations: UnifiedLocation[]): number | null;

  /**
   * Calculates the shortest path distance (in graph edges/hops) between two locations.
   *
   * @param currentMapId - The internal Map ID where the player is currently standing.
   * @param targetAid - The location Area ID (AID) where the target Pokémon can be found.
   * @param allLocations - The unified list of all map locations.
   * @returns An object containing the distance and the name of the target area, or null if unreachable.
   *
   * @example
   * const distInfo = strategy.getMapDistance(saveData.currentMapId, encounter.aid, allLocations);
   */
  getMapDistance(
    currentMapId: number,
    targetAid: number,
    allLocations: UnifiedLocation[],
  ): { distance: number; name: string } | null;

  /**
   * Checks if a Pokémon is unobtainable in the given version and returns the reason.
   *
   * @param pokemonId - The Pokedex ID of the target Pokemon.
   * @param version - The current game version (e.g. 'red', 'gold').
   * @param ownedCount - The total number of Pokemon caught.
   * @param ownedSet - The set of Pokemon IDs the player currently owns.
   * @returns A string explaining why the Pokemon is unobtainable, or null if it is obtainable.
   *
   * @example
   * const reason = strategy.getUnobtainableReason(26, 'yellow', ownedSet.size, ownedSet);
   */
  getUnobtainableReason(pokemonId: number, version: string, ownedCount: number, ownedSet: Set<number>): string | null;

  /**
   * Generates generation-specific suggestions (e.g., Box full warning).
   *
   * @param saveData - The parsed save data.
   * @param missingIds - An array of Pokemon IDs the player is missing.
   * @returns An array of special suggestions.
   *
   * @example
   * const specialSuggestions = strategy.getSpecialSuggestions(saveData, Array.from(missingIds));
   */
  getSpecialSuggestions(saveData: SaveData, missingIds: number[]): Suggestion[];

  /**
   * Checks if a Pokémon is obtainable internally without trading (e.g. via breeding).
   *
   * @param baseId - The Pokedex ID of the base Pokemon.
   * @param version - The current game version.
   * @returns True if obtainable, false otherwise.
   *
   * @example
   * const canBreed = strategy.isInternallyObtainable(1, 'gold');
   */
  isInternallyObtainable(baseId: number, version: string): boolean;
}
