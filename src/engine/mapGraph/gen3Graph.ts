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
 * Retrieves a location by ID using a cached Map to ensure O(1) lookup performance.
 * The cache is automatically invalidated and rebuilt if the `allLocations` array reference changes.
 * This optimization is necessary because the suggestion engine frequently looks up locations
 * by ID during graph traversal, and O(N) `Array.find` calls would degrade performance and lock the UI thread.
 *
 * @param allLocations - The unified list of all map locations.
 * @param id - The ID of the location to retrieve.
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
 * The Floyd-Warshall distance matrix is only computed between major outdoor hubs (e.g., Littleroot Town, Route 101)
 * to save build time and payload size. If a player saves inside a building, we must recursively traverse
 * the `prnt` property until we step outside to an outdoor map before we can use the O(1) distance lookup.
 *
 * @param allLocations - The unified list of all map locations.
 * @param mapId - The ID to resolve.
 * @returns The resolved top-level outdoor map ID.
 */
export function resolveOutdoorMapId(allLocations: UnifiedLocation[], mapId: number): number {
  let currentId = mapId;
  const visited = new Set<number>();

  while (true) {
    const loc = getLocation(allLocations, currentId);
    if (!loc) break;
    if (loc.prnt === undefined) break;

    // Cycle detection
    if (visited.has(currentId)) break;
    visited.add(currentId);

    currentId = loc.prnt;
  }
  return currentId;
}

/**
 * Calculates the shortest path distance (in graph edges/hops) between the player's
 * current location and a target area.
 *
 * @param allLocations - The unified list of all map locations, pre-populated with Floyd-Warshall distances (`dist`).
 * @param startMapId - The internal Map ID where the player is currently standing.
 * @param targetAid - The location Area ID (aid) where the target Pokémon can be found.
 * @returns An object containing the `distance` (number of hops) and the `name` of the target area, or `null` if unreachable.
 *
 * @remarks
 * **Architecture Note:**
 * This function does NOT perform real-time pathfinding (e.g., BFS or Dijkstra).
 * Instead, it relies on the `dist` property of the `UnifiedLocation` objects, which contains
 * a precomputed lookup table generated at build-time using the Floyd-Warshall algorithm.
 * This ensures O(1) distance lookups during runtime, which is critical since the suggestion
 * engine evaluates hundreds of potential encounters simultaneously without locking the UI thread.
 */
export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  const targetLocation = getLocation(allLocations, targetAid);

  if (!targetLocation) {
    return null;
  }

  // Resolve start map to an outdoor map if it's indoor
  let startOutdoorId = resolveOutdoorMapId(allLocations, startMapId);
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
    return { distance: 0, name: targetLocation.n };
  }

  const dist = startLocation.dist?.[targetAid];
  if (dist === undefined) {
    return null;
  }

  return { distance: dist, name: targetLocation.n };
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
