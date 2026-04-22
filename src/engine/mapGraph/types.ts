import type { UnifiedLocation } from '../../db/schema';

export interface MapDistanceResult {
  distance: number;
  name: string;
}

export interface MapGraph {
  getDistanceToMap(locations: UnifiedLocation[], currentMapId: number, targetAid: number): MapDistanceResult | null;
  resolveOutdoorMapId(locations: UnifiedLocation[], mapId: number): number;
}
