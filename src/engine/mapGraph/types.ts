import type { GenericLocation, SpecificArea } from '../../db/schema';

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
  getDistanceToMap(
    locations: GenericLocation[],
    areas: SpecificArea[],
    currentMapId: number,
    targetAid: number,
  ): MapDistanceResult | null;
  resolveOutdoorMapId(locations: GenericLocation[], mapId: number): number;
}
