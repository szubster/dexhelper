import type { UnifiedLocation } from '../../db/schema';
import { getDistanceToMap, getOutdoorMapId } from './gen1Graph';
import type { MapDistanceResult, MapGraph } from './types';

// Re-export for backward compat
export { getDistanceToMap, getOutdoorMapId as resolveOutdoorMapId } from './gen1Graph';
export type { MapDistanceResult, MapGraph, MapNode } from './types';

const gen1MapGraph: MapGraph = {
  getDistanceToMap: (
    locations: UnifiedLocation[],
    currentMapId: number,
    targetAid: number,
  ): MapDistanceResult | null => {
    return getDistanceToMap(locations, currentMapId, targetAid);
  },
  resolveOutdoorMapId: (locations: UnifiedLocation[], mapId: number): number => {
    return getOutdoorMapId(locations, mapId);
  },
};

const MAP_GRAPHS: Record<number, MapGraph> = {
  1: gen1MapGraph,
  // Future: 2: gen2MapGraph, 3: gen3MapGraph, etc.
};

/** Get the map graph for a generation. Returns null if no map graph is available. */
export function getMapGraph(generation: number): MapGraph | null {
  return MAP_GRAPHS[generation] ?? null;
}
