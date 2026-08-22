import type { UnifiedLocation } from '../../db/schema';
import { resolveOutdoorMapId as commonResolveOutdoorMapId, getDistanceToMapBase } from './common';

export const resolveOutdoorMapId = commonResolveOutdoorMapId;

/**
 * Calculates the shortest path distance (in graph edges/hops) for Gen 2 games.
 *
 * **Architecture Note:**
 * Gen 2 graphs share Goldenrod City as a universal fallback hub. If the player is in an unknown
 * location (e.g., glitch map, unmapped interior), this function falls back to using Goldenrod City
 * (Map Group 3, Map ID 6 -> 0x0306) as the routing origin. Goldenrod is a major hub connecting
 * multiple key routes in Johto, ensuring suggestions continue to render instead of crashing the UI.
 *
 * @param allLocations - The unified list of all map locations, pre-populated with distances.
 * @param startMapId - The internal Gen 2 Map ID (Group and ID) where the player is currently standing.
 * @param targetAid - The location Area ID (aid) where the target Pokémon can be found.
 * @returns An object containing the distance and name of the target map, or null if unreachable.
 *
 * @example
 * const dist = getDistanceToMap(allLocations, 0x0306, 0x0a04);
 * if (dist) {
 *   console.log(`Target is ${dist.distance} hops away at ${dist.name}.`);
 * }
 */
export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  // Goldenrod City (Map Group 3, Map ID 6 -> 0x0306)
  return getDistanceToMapBase(allLocations, startMapId, targetAid, 0x0306);
}
