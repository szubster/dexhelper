import type { GenericLocation, SpecificArea } from '../../db/schema';

/**
 * Find the distance between the starting map and a target area (aid).
 * Uses the provided list of locations as the graph.
 * Returns { distance, name } where distance is hops in the graph and name is target name.
 */
export function getDistanceToMap(
  allLocations: GenericLocation[],
  allAreas: SpecificArea[],
  startMapId: number | string,
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
  if (targetParentId) {
    const parent = allLocations.find((l) => l.id === targetParentId);
    if (parent) targetLoc = parent;
  }

  // 2. Resolve start location (where the player is)
  let startLoc = allLocations.find((l) => l.gameId === startMapId);
  const startParentId = startLoc?.parentId;
  if (startParentId) {
    const parent = allLocations.find((l) => l.id === startParentId);
    if (parent) startLoc = parent;
  }

  // Fallback if unknown
  if (!startLoc) {
    // Saffron City (gameId 0x0a in Kanto)
    startLoc = allLocations.find((l) => l.gameId === 10); // 0x0a = 10
  }

  if (!startLoc || !targetLoc) return null;

  // 3. BFS traversal on the gameId-to-gameId connections
  // Note: connections are stored as gameId[] in GenericLocation
  const queue: Array<{ lid: number; dist: number }> = [{ lid: startLoc.id, dist: 0 }];
  const visited = new Set<number>();
  visited.add(startLoc.id);

  // Pre-create gameId to Location lookup for efficiency
  const gameIdToLocId = new Map<number, number>();
  for (const loc of allLocations) {
    if (loc.gameId !== undefined) gameIdToLocId.set(loc.gameId, loc.id);
  }

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;
    const { lid, dist } = current;

    if (lid === targetLoc.id) {
      return { distance: dist, name: targetDisplayName };
    }

    const loc = allLocations.find((l) => l.id === lid);
    if (!loc?.connections) continue;

    for (const connectedGameId of loc.connections) {
      const nextLid = gameIdToLocId.get(connectedGameId);
      if (nextLid !== undefined && !visited.has(nextLid)) {
        visited.add(nextLid);
        queue.push({ lid: nextLid, dist: dist + 1 });
      }
    }
  }

  return null;
}

/**
 * Resolves a potentially indoor map ID to its nearest outdoor equivalent.
 */
export function getOutdoorMapId(allLocations: GenericLocation[], mapId: number): number {
  const loc = allLocations.find((l) => l.gameId === mapId);
  if (loc?.parentId) {
    const parent = allLocations.find((l) => l.id === loc.parentId);
    if (parent && parent.gameId !== undefined) {
      return parent.gameId;
    }
  }
  return mapId;
}
