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

  const targetDisplayName = targetLoc.name;

  // 2. Resolve start location (where the player is)
  const outdoorStartMapId = resolveOutdoorMapId(allLocations, startMapId);
  let startLoc = getLocation(allLocations, outdoorStartMapId);

  // Fallback if unknown
  if (!startLoc) {
    // Goldenrod City (Map Group 3, Map ID 6 -> 0x0306)
    startLoc = getLocation(allLocations, 0x0306);
  }

  if (!startLoc) return null;

  // 3. Precomputed lookup
  if (startLoc.id === targetLoc.id) {
    return { distance: 0, name: targetDisplayName };
  }

  const distance = startLoc.distances?.[targetLoc.id];
  if (distance !== undefined) {
    return { distance, name: targetDisplayName };
  }

  return null;
}

/**
 * Resolves an indoor map to its connected outdoor parent map.
 * Handles multi-level indoor maps by recursively traversing the `prnt` property.
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
export function resolveOutdoorMapId(allLocations: UnifiedLocation[], mapId: number): number {
  let currentMapId = mapId;
  let loc = getLocation(allLocations, currentMapId);
  const visited = new Set<number>();

  while (loc?.parentId !== undefined && !visited.has(currentMapId)) {
    visited.add(currentMapId);
    currentMapId = loc.parentId;
    loc = getLocation(allLocations, currentMapId);
  }

  return currentMapId;
}

/**
 * Exported Gen 2 Map Graph defining nodes and their connections across Johto and Kanto.
 * Keys are encoded map IDs `(group << 8) | id`.
 */
export interface MapGraphNode {
  name: string;
  connections: number[];
}

export const gen2MapGraph: Record<number, MapGraphNode> = {
  // Johto (extracted from mapping.ts)
  0x0301: { name: 'New Bark Town', connections: [0x1803] }, // Rd 29
  0x1803: { name: 'Route 29', connections: [0x0301, 0x1802, 0x0302] }, // Cherrygrove, New Bark, Route 46
  0x0302: { name: 'Cherrygrove City', connections: [0x1803, 0x1a01] }, // Rd 29, Rd 30
  0x1a01: { name: 'Route 30', connections: [0x0302, 0x1a02] }, // Cherrygrove, Route 31
  0x1a02: { name: 'Route 31', connections: [0x1a01, 0x0303, 0x034e] }, // Route 30, Violet, Dark Cave
  0x0303: { name: 'Violet City', connections: [0x1a02, 0x0a02] }, // Rd 31, Rd 32
  0x0a02: { name: 'Route 32', connections: [0x0303, 0x0316, 0x0325] }, // Violet, Ruins of Alph, Union Cave
  0x0316: { name: 'Ruins of Alph', connections: [0x0a02] }, // Route 32
  0x0325: { name: 'Union Cave', connections: [0x0a02, 0x0a03] }, // Route 32, Route 33
  0x0a03: { name: 'Route 33', connections: [0x0325, 0x0304] }, // Union Cave, Azalea Town
  0x0304: { name: 'Azalea Town', connections: [0x0a03, 0x0334, 0x0328] }, // Rd 33, Ilex Forest, Slowpoke Well
  0x0328: { name: 'Slowpoke Well', connections: [0x0304] }, // Azalea Town
  0x0334: { name: 'Ilex Forest', connections: [0x0304, 0x0a04] }, // Azalea, Rd 34
  0x0a04: { name: 'Route 34', connections: [0x0334, 0x0306] }, // Ilex Forest, Goldenrod City
  0x0306: { name: 'Goldenrod City', connections: [0x0a04, 0x0b01, 0x0a] }, // Rd 34, Rd 35, Magnet Train to Saffron
  0x0b01: { name: 'Route 35', connections: [0x0306, 0x030f] }, // Goldenrod, National Park
  0x030f: { name: 'National Park', connections: [0x0b01] }, // Rd 35
  0x0109: { name: 'Route 38', connections: [0x0308, 0x010a] }, // Ecruteak, Route 39
  0x010a: { name: 'Route 39', connections: [0x0109, 0x0307] }, // Route 38, Olivine
  0x0307: { name: 'Olivine City', connections: [0x010a, 0x1601, 0x05] }, // Rd 39, Rd 40, S.S. Aqua to Vermilion
  0x1601: { name: 'Route 40', connections: [0x0307, 0x1602] }, // Olivine, Route 41
  0x1602: { name: 'Route 41', connections: [0x1601, 0x0305, 0x0342] }, // Route 40, Cianwood, Whirl Islands
  0x0342: { name: 'Whirl Islands', connections: [0x1602] }, // Route 41
  0x0305: { name: 'Cianwood City', connections: [0x1602] }, // Rd 41
  0x0308: { name: 'Ecruteak City', connections: [0x0109, 0x0204] }, // Rd 38, Rd 42
  0x0204: { name: 'Route 42', connections: [0x0308, 0x0339, 0x0309] }, // Ecruteak, Mt. Mortar, Mahogany
  0x0339: { name: 'Mt. Mortar', connections: [0x0204] }, // Route 42
  0x0309: { name: 'Mahogany Town', connections: [0x0204, 0x0903, 0x0205] }, // Rd 42, Rd 43, Rd 44
  0x0903: { name: 'Route 43', connections: [0x0309, 0x030a] }, // Mahogany, Lake of Rage
  0x030a: { name: 'Lake of Rage', connections: [0x0903] }, // Route 43
  0x0205: { name: 'Route 44', connections: [0x0309, 0x033d] }, // Mahogany, Ice Path
  0x033d: { name: 'Ice Path', connections: [0x0205, 0x030b] }, // Route 44, Blackthorn
  0x030b: { name: 'Blackthorn City', connections: [0x033d, 0x0508] }, // Ice Path, Rd 45
  0x0508: { name: 'Route 45', connections: [0x030b, 0x034e, 0x0509] }, // Blackthorn, Dark Cave, Route 46
  0x034e: { name: 'Dark Cave', connections: [0x1a02, 0x0508] }, // Route 31, Route 45
  0x0509: { name: 'Route 46', connections: [0x0508, 0x1803] }, // Route 45, Route 29

  // Kanto / Johto Connections
  0x1802: { name: 'Route 27', connections: [0x1803, 0x0353, 0x1801] }, // New Bark/29, Tohjo Falls, Route 26
  0x0353: { name: 'Tohjo Falls', connections: [0x1802] }, // Route 27
  0x1801: { name: 'Route 26', connections: [0x1802, 0x20] }, // Route 27, Route 22 (Reception Gate)
  0x1301: { name: 'Route 28', connections: [0x1801, 0x034a] }, // Route 26, Silver Cave
  0x034a: { name: 'Silver Cave', connections: [0x1301] }, // Route 28

  // Kanto Hubs (for cross-region distance resolution)
  0x0a: { name: 'Saffron City', connections: [0x0306] },
  0x05: { name: 'Vermilion City', connections: [0x0307] },
  0x20: { name: 'Route 22', connections: [0x1801] },
};
