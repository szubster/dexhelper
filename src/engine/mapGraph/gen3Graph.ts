import { pokeDB } from '../../db/PokeDB';
import type { UnifiedLocation } from '../../db/schema';

/**
 * Gen 3 Map Graph module for determining precomputed distances between locations.
 * This function relies on the `dist` property of the `UnifiedLocation` objects, which contains
 * a pre-calculated distance mapping to other accessible locations.
 */

// A simple cache to avoid repeatedly finding the same location object by ID
const locationCache = new Map<number, UnifiedLocation>();
let lastLocationsRef: UnifiedLocation[] | null = null;

/**
 * Helper to fetch a location by ID efficiently.
 * @param allLocations The array of all locations.
 * @param id The ID to search for.
 * @returns The UnifiedLocation object, or undefined if not found.
 */
function getLocation(allLocations: UnifiedLocation[], id: number): UnifiedLocation | undefined {
  if (lastLocationsRef !== allLocations) {
    locationCache.clear();
    lastLocationsRef = allLocations;
    for (const loc of allLocations) {
      locationCache.set(loc.id, loc);
    }
  }
  return locationCache.get(id);
}

/**
 * Recursively resolves a map ID to its top-level (outdoor) parent map ID.
 * This is used to map indoor locations (houses, caves) back to their main hub.
 * @param mapId The ID to resolve.
 * @returns The resolved top-level outdoor map ID.
 */
export async function resolveOutdoorMapId(mapId: number): Promise<number> {
  const allLocations = await pokeDB.getAllAreas();
  let currentId = mapId;
  const visited = new Set<number>();

  while (true) {
    const loc = getLocation(allLocations, currentId);
    if (!loc) break;
    if (loc.parentId === undefined) break;

    // Cycle detection
    if (visited.has(currentId)) break;
    visited.add(currentId);

    currentId = loc.parentId;
  }
  return currentId;
}

/**
 * Calculates the distance between a starting map and a target map using precomputed dist mapping.
 * @param startMapId The ID of the starting map.
 * @param targetAid The ID of the target map.
 * @returns An object containing distance and target name, or null if unresolvable.
 */
export async function getDistanceToMap(
  startMapId: number,
  targetAid: number,
): Promise<{ distance: number; name: string } | null> {
  const allLocations = await pokeDB.getAllAreas();
  const targetLocation = getLocation(allLocations, targetAid);

  if (!targetLocation) {
    return null;
  }

  // Resolve start map to an outdoor map if it's indoor
  let startOutdoorId = await resolveOutdoorMapId(startMapId);
  let startLocation = getLocation(allLocations, startOutdoorId);

  // If the starting location isn't valid, try to default to Littleroot Town (0)
  if (!startLocation) {
    startOutdoorId = 0;
    startLocation = getLocation(allLocations, startOutdoorId);
    if (!startLocation) {
      return null;
    }
  }

  // Use the precomputed distance lookup table
  if (startOutdoorId === targetAid) {
    return { distance: 0, name: targetLocation.name };
  }

  const dist = startLocation.distances?.[targetAid];
  if (dist === undefined) {
    return null;
  }

  return { distance: dist, name: targetLocation.name };
}

/**
 * Exported Gen 3 Map Graph defining nodes and their connections.
 */
export interface MapGraphNode {
  name: string;
  connections: number[];
}

export const gen3HoennMapGraph: Record<number, MapGraphNode> = {};

export const gen3KantoMapGraph: Record<number, MapGraphNode> = {};
