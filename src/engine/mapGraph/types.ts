export interface MapNode {
  id: number;
  slug: string;
  name: string;
  connections: number[];
}

export interface MapDistanceResult {
  distance: number;
  name: string;
}

export interface MapGraph {
  getDistanceToMap(currentMapId: number, targetAid: number): MapDistanceResult | null;
  resolveOutdoorMapId(mapId: number): number;
}
