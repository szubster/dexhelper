import type { UnifiedLocation } from '../../db/schema';

/**
 * Find the distance between the starting map and a target area (aid).
 * Uses the provided list of locations as the graph.
 * Returns { distance, name } where distance is hops in the graph and name is target name.
 */
export function getDistanceToMap(
  allLocations: UnifiedLocation[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  // 1. Resolve target location (where the Pokémon is found)
  const targetLoc = allLocations.find((l) => l.id === targetAid);
  if (!targetLoc) return null;

  const targetDisplayName = targetLoc.n;

  // 2. Resolve start location (where the player is)
  const outdoorStartMapId = getOutdoorMapId(allLocations, startMapId);
  let startLoc = allLocations.find((l) => l.id === outdoorStartMapId);

  // Fallback if unknown
  if (!startLoc) {
    // Saffron City (Map ID 10 in Kanto)
    startLoc = allLocations.find((l) => l.id === 10);
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
 * Resolves a potentially indoor map ID to its nearest outdoor equivalent.
 */
export function getOutdoorMapId(allLocations: UnifiedLocation[], mapId: number): number {
  const loc = allLocations.find((l) => l.id === mapId);
  if (loc?.parentId !== undefined) {
    return loc.parentId;
  }
  return mapId;
}
