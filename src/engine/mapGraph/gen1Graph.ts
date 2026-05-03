import type { UnifiedLocation } from '../../db/schema';

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
 * engine evaluates hundreds of potential encounters simultaneously.
 */
// ⚡ Bolt: Cache locations map to prevent O(N) Array.find calls on every lookup
const locationCache = new Map<number, UnifiedLocation>();
let lastLocationsRef: UnifiedLocation[] | null = null;

/**
 * Retrieves a location by ID using a cached Map to ensure O(1) lookup performance.
 * The cache is automatically invalidated and rebuilt if the `allLocations` array reference changes.
 * This optimization is necessary because the suggestion engine frequently looks up locations
 * by ID during graph traversal, and O(N) `Array.find` calls would degrade performance.
 *
 * @param allLocations - The unified list of all map locations.
 * @param id - The ID of the location to retrieve.
 * @returns The UnifiedLocation object, or undefined if not found.
 */
function getLocation(allLocations: UnifiedLocation[], id: number): UnifiedLocation | undefined {
  if (lastLocationsRef !== allLocations) {
    locationCache.clear();
    for (const loc of allLocations) {
      locationCache.set(loc.id, loc);
    }
    lastLocationsRef = allLocations;
  }
  return locationCache.get(id);
}

export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  // 1. Resolve target location (where the Pokémon is found)
  const targetLoc = getLocation(allLocations, targetAid);
  if (!targetLoc) return null;

  const targetDisplayName = targetLoc.n;

  // 2. Resolve start location (where the player is)
  const outdoorStartMapId = getOutdoorMapId(allLocations, startMapId);
  let startLoc = getLocation(allLocations, outdoorStartMapId);

  // Fallback if unknown
  if (!startLoc) {
    // Saffron City (Map ID 10 in Kanto)
    startLoc = getLocation(allLocations, 10);
  }

  if (!startLoc) return null;

  // 3. Precomputed lookup
  if (startLoc.id === targetLoc.id) {
    return { distance: 0, name: targetDisplayName };
  }

  const distance = startLoc.dist?.[targetLoc.id];
  if (distance !== undefined) {
    return { distance, name: targetDisplayName };
  }

  return null;
}

/**
 * Resolves an indoor map to its connected outdoor parent map.
 *
 * @param allLocations - The unified list of all map locations.
 * @param mapId - The Map ID to resolve.
 * @returns The parent outdoor Map ID, or the original ID if it is already an outdoor map.
 *
 * @remarks
 * **Why this is needed:**
 * The map graph distance matrix (`dist`) is only computed between major outdoor hubs and routes.
 * Indoor maps (houses, caves, buildings) are structurally represented as children of these hubs via
 * the `prnt` property. To calculate the distance to a target from inside a building, we must first
 * "step outside" by resolving the current location to its parent map.
 */
export function getOutdoorMapId(allLocations: UnifiedLocation[], mapId: number): number {
  const loc = getLocation(allLocations, mapId);
  if (loc?.prnt !== undefined) {
    return loc.prnt;
  }
  return mapId;
}
