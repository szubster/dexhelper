import type { UnifiedLocation } from '@/db/schema';
import { resolveOutdoorMapId as commonResolveOutdoorMapId, getDistanceToMapBase } from './common';

export const resolveOutdoorMapId = commonResolveOutdoorMapId;

/**
 * Calculates the shortest path distance (in graph edges/hops) for Gen 3 games.
 *
 * **Architecture Note:**
 * Gen 3 has dynamic start maps depending on version, but the overall graph topologies
 * share Littleroot Town as the universal fallback hub. If the player is in an unknown
 * location (e.g., glitch map, unmapped interior), this function falls back to using
 * Littleroot Town (Map ID 0) as the routing origin to ensure suggestions continue to render
 * instead of crashing the UI.
 *
 * @param allLocations - The unified list of all map locations, pre-populated with distances.
 * @param startMapId - The internal Gen 3 Map ID where the player is currently standing.
 * @param targetAid - The location Area ID (aid) where the target Pokémon can be found.
 * @returns An object containing the distance and name of the target map, or null if unreachable.
 */
export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  // Littleroot Town (Map ID 0)
  return getDistanceToMapBase(allLocations, startMapId, targetAid, 0);
}
