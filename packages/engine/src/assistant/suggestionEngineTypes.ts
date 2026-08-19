import type { LocationAreaEncounters, PokemonMetadata, UnifiedLocation } from '@/db/schema';

/**
 * A comprehensive, pre-fetched data payload supplied to the Assistant Engine.
 *
 * **Architecture Note:**
 * The recommendation engine evaluates hundreds of missing Pokémon across thousands of
 * potential encounters simultaneously. If it relied on async database queries during
 * this process, the UI thread would block heavily (N+1 query problem).
 *
 * `AssistantApiData` represents the solution: a massive, synchronous, in-memory
 * lookup table populated by `dexDataLoader` *before* the generator loop begins.
 * By utilizing Maps and Records, sub-generators can perform O(1) lookups for any
 * evolution rule, map distance, or encounter rate instantly.
 */
export interface AssistantApiData {
  /**
   * The Area ID (AID) corresponding to the player's exact current location.
   * Used as the anchor point for all local encounter suggestions and pathfinding distances.
   */
  localAid: number | null;
  /**
   * Pre-filtered encounter tables specific to the player's current `localAid`.
   * Used to generate top-priority (Priority 120) 'Local Map' catch suggestions.
   */
  localEncounters: LocationAreaEncounters[] | null;
  /**
   * A dictionary of encounter tables keyed by Pokémon Species ID.
   * Used by the Catch generator to find where missing Pokémon spawn in the wild.
   */
  missingEncounters: Record<number, LocationAreaEncounters | null>;
  /**
   * A dictionary of core metadata keyed by Pokémon Species ID.
   * Includes evolution trees (`eto`, `efrm`) and obtain methods required by the Evolution and Breed generators.
   */
  pokemonMetadata: Record<number, PokemonMetadata | null>;
  /**
   * Pre-fetched encounter tables for the evolutionary ancestors of missing Pokémon.
   * Used when a missing Pokémon cannot be caught directly, but its pre-evolution can be.
   */
  ancestralEncounters: Record<number, Record<number, LocationAreaEncounters | null>>;
  /**
   * A flat dictionary mapping Area IDs (AID) to human-readable area names.
   * Ensures string interpolations in suggestions are synchronous and don't require DB lookups.
   */
  areaNames: Record<number, string>;
  /**
   * The complete array of all location nodes in the game's map graph.
   * Used heavily by the generation-specific strategies to run the pre-computed Floyd-Warshall distance lookups.
   */
  allLocations: UnifiedLocation[];
}
