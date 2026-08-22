import type { UnifiedLocation } from '../../db/schema';
import { resolveOutdoorMapId as commonResolveOutdoorMapId, getDistanceToMapBase } from './common';

export const resolveOutdoorMapId = commonResolveOutdoorMapId;

/**
 * Calculates the shortest path distance (in graph edges/hops) for Gen 1 games.
 *
 * **Architecture Note:**
 * Gen 1 graphs share Saffron City as a highly central universal fallback hub. If the player is
 * in an unknown location (e.g., glitch map, unmapped interior) or if their current outdoor location
 * isn't well connected, this function falls back to using Saffron City (Map ID 10) as the routing
 * origin. Saffron is situated at the center of the Kanto map, ensuring suggestions continue to
 * render realistically instead of crashing the UI or returning a null route.
 *
 * @param allLocations - The unified list of all map locations, pre-populated with distances.
 * @param startMapId - The internal Gen 1 Map ID where the player is currently standing.
 * @param targetAid - The location Area ID (aid) where the target Pokémon can be found.
 * @returns An object containing the distance and name of the target map, or null if unreachable.
 *
 * @example
 * const dist = getDistanceToMap(allLocations, 0x00, 10);
 * if (dist) {
 *   console.log(`Target is ${dist.distance} hops away at ${dist.name}.`);
 * }
 */
export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  // Saffron City (Map ID 10 in Kanto)
  return getDistanceToMapBase(allLocations, startMapId, targetAid, 10);
}
