import { GEN1_MAPS, getDistanceToMap, INDOOR_TO_PARENT_MAP } from "./gen1Graph";
import type { MapDistanceResult, MapGraph } from "./types";

// Re-export for backward compat
export { GEN1_MAPS, getDistanceToMap, INDOOR_TO_PARENT_MAP } from "./gen1Graph";
export type { MapDistanceResult, MapGraph, MapNode } from "./types";

const gen1MapGraph: MapGraph = {
  getDistanceToMap: (
    currentMapId: number,
    targetSlug: string,
  ): MapDistanceResult | null => {
    return getDistanceToMap(currentMapId, targetSlug);
  },
  resolveOutdoorMapId: (mapId: number): number => {
    return INDOOR_TO_PARENT_MAP[mapId] ?? mapId;
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
