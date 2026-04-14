import type { GenericLocation, SpecificArea } from '../../db/schema';

/**
 * Find the distance between the starting map and a target area (aid).
 * Uses the provided list of locations as the graph.
 * Returns { distance, name } where distance is hops in the graph and name is target name.
 */
export function getDistanceToMap(
  allLocations: GenericLocation[],
  allAreas: SpecificArea[],
  startMapId: number,
  targetAid: number,
): { distance: number; name: string } | null {
  // 1. Resolve target location (where the Pokémon is found)
  const targetArea = allAreas.find((a) => a.id === targetAid);
  if (!targetArea) return null;

  let targetLoc = allLocations.find((l) => l.id === targetArea.lid);
  if (!targetLoc) return null;

  const targetDisplayName = targetLoc.n;

  // If target is inside (e.g. Cerulean Gym), resolve to its nearest outdoor area (Cerulean City)
  // for world-map graph traversal.
  const targetParentId = targetLoc.parentId;
  if (targetParentId !== undefined) {
    const parent = allLocations.find((l) => l.id === targetParentId);
    if (parent) targetLoc = parent;
  }

  // 2. Resolve start location (where the player is)
  let startLoc = allLocations.find((l) => l.id === startMapId);
  const startParentId = startLoc?.parentId;
  if (startParentId !== undefined) {
    const parent = allLocations.find((l) => l.id === startParentId);
    if (parent) startLoc = parent;
  }

  // Fallback if unknown
  if (!startLoc) {
    // Saffron City (Map ID 10 in Kanto)
    startLoc = allLocations.find((l) => l.id === 10);
  }

  if (!startLoc || !targetLoc) return null;

  // 3. BFS traversal on the Map ID connections
  const queue: Array<{ lid: number; dist: number }> = [{ lid: startLoc.id, dist: 0 }];
  const visited = new Set<number>();
  visited.add(startLoc.id);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;
    const { lid, dist } = current;

    if (lid === targetLoc.id) {
      return { distance: dist, name: targetDisplayName };
    }

    const loc = allLocations.find((l) => l.id === lid);
    if (!loc?.connections) continue;

    for (const connectedMapId of loc.connections) {
      if (!visited.has(connectedMapId)) {
        visited.add(connectedMapId);
        queue.push({ lid: connectedMapId, dist: dist + 1 });
      }
    }
  }

  return null;
}

/**
 * Resolves a potentially indoor map ID to its nearest outdoor equivalent.
 */
export function getOutdoorMapId(allLocations: GenericLocation[], mapId: number): number {
  const loc = allLocations.find((l) => l.id === mapId);
  if (loc?.parentId !== undefined) {
    const parent = allLocations.find((l) => l.id === loc.parentId);
    if (parent) {
      return parent.id;
    }
  }
  return mapId;
}
