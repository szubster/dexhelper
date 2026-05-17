import type { UnifiedLocation } from '../../db/schema';

// ⚡ Bolt: Cache locations map to prevent O(N) Array.find calls on every lookup
const locationCache = new Map<number, UnifiedLocation>();
let lastLocationsRef: UnifiedLocation[] | null = null;

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
  // 1. Resolve target location
  const targetLoc = getLocation(allLocations, targetAid);
  if (!targetLoc) return null;

  const targetDisplayName = targetLoc.n;

  // 2. Resolve start location
  const outdoorStartMapId = resolveOutdoorMapId(allLocations, startMapId);
  let startLoc = getLocation(allLocations, outdoorStartMapId);

  // Fallback if unknown - in Gen 3 we can default to Littleroot Town (0x0) or similar
  if (!startLoc) {
    // Littleroot Town mock fallback ID (usually group 0, id 0 in some internal structures)
    startLoc = getLocation(allLocations, 0);
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

export function resolveOutdoorMapId(allLocations: UnifiedLocation[], mapId: number): number {
  let currentMapId = mapId;
  let loc = getLocation(allLocations, currentMapId);
  const visited = new Set<number>();

  while (loc?.prnt !== undefined && !visited.has(currentMapId)) {
    visited.add(currentMapId);
    currentMapId = loc.prnt;
    loc = getLocation(allLocations, currentMapId);
  }

  return currentMapId;
}

export interface MapGraphNode {
  name: string;
  connections: number[];
}

export const gen3MapGraph: Record<number, MapGraphNode> = {
  // Hoenn structure will be populated here
  // For now, mock a few nodes
  0: { name: 'Littleroot Town', connections: [1] },
  1: { name: 'Route 101', connections: [0, 2] },
  2: { name: 'Oldale Town', connections: [1] },
};
