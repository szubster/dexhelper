import type { SaveData } from '../../saveParser/index';

/** A single suggestion the assistant can make to the player */
export interface Suggestion {
  id: string;
  pokemonId: number;
  title: string;
  category: 'Catch' | 'Evolve' | 'Trade' | 'Gift' | 'Event' | 'Breed';
  priority: number;
  details?: EncounterDetail[];
  tradeNote?: string;
  warning?: string;
}

/** Details about where/how an encounter happens */
export interface EncounterDetail {
  locationName: string;
  locationSlug: string;
  method: string;
  chance: number;
  minLevel: number;
  maxLevel: number;
  distance?: number;
  distanceName?: string;
}

/** A suggestion that was considered but rejected, with reasoning */
export interface RejectedSuggestion {
  pokemonId: number;
  name: string;
  reason: string;
}

/** Strategy interface that each generation must implement */
export interface AssistantStrategy {
  /** Generation number this strategy handles */
  generation: number;

  /** Resolve the current map location to a PokéAPI slug */
  resolveMapSlug(saveData: SaveData): string;

  /** Get the distance between current map and a target location slug */
  getMapDistance(currentMapId: number, targetSlug: string): { distance: number; name: string } | null;

  /** Check if a Pokémon is unobtainable in the current version */
  getUnobtainableReason(pokemonId: number, version: string, ownedCount: number, ownedSet: Set<number>): string | null;

  /** Generation-specific suggestion rules (box full warnings, special mechanics, etc.) */
  getSpecialSuggestions(saveData: SaveData, missingIds: number[]): Suggestion[];

  /** Custom filtering for "is this Pokémon internally obtainable in this version?" */
  isInternallyObtainable(baseId: number, version: string): boolean;
}
