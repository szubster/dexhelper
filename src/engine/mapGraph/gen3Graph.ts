import { pokeDB } from '../../db/PokeDB';

/**
 * Calculates the shortest path distance (in graph edges/hops) between the player's
 * current location and a target area.
 *
 * @param startMapId - The internal Map ID where the player is currently standing.
 * @param targetAid - The location Area ID (aid) where the target Pokémon can be found.
 * @returns A Promise resolving to an object containing the `distance` (number of hops) and the `name` of the target area, or `null` if unreachable.
 *
 * @remarks
 * **Architecture Note:**
 * This function relies on the `dist` property of the `UnifiedLocation` objects, which contains
 * a precomputed lookup table generated at build-time using the Floyd-Warshall algorithm.
 * This ensures O(1) distance lookups during runtime.
 */
export async function getDistanceToMap(
  startMapId: number,
  targetAid: number,
): Promise<{ distance: number; name: string } | null> {
  const allLocations = await pokeDB.getAllAreas();

  // 1. Resolve target location (where the Pokémon is found)
  const targetLoc = allLocations.find((loc) => loc.id === targetAid);
  if (!targetLoc) return null;

  const targetDisplayName = targetLoc.n;

  // 2. Resolve start location (where the player is)
  const outdoorStartMapId = await resolveOutdoorMapId(startMapId);
  let startLoc = allLocations.find((loc) => loc.id === outdoorStartMapId);

  // Fallback if unknown (e.g. 0 for Littleroot / Pallet, but we will just return null if not found)
  // We can use Littleroot Town map id 0x0000 as a placeholder fallback
  if (!startLoc) {
    startLoc = allLocations.find((loc) => loc.id === 0);
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
 * Handles multi-level indoor maps by recursively traversing the `prnt` property.
 *
 * @param mapId - The Map ID to resolve.
 * @returns A Promise resolving to the parent outdoor Map ID, or the original ID if it is already an outdoor map.
 */
export async function resolveOutdoorMapId(mapId: number): Promise<number> {
  const allLocations = await pokeDB.getAllAreas();
  let currentMapId = mapId;
  let loc = allLocations.find((l) => l.id === currentMapId);
  const visited = new Set<number>();

  while (loc?.prnt !== undefined && !visited.has(currentMapId)) {
    visited.add(currentMapId);
    currentMapId = loc.prnt;
    loc = allLocations.find((l) => l.id === currentMapId);
  }

  return currentMapId;
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
