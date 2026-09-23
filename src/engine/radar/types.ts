/**
 * Output structure for the Smart Route Radar.
 * Maps an areaId to a heatmap data object.
 */
export interface RouteRadarHeatmap {
  [areaId: number]: {
    density: number;
    requiresMachBike: boolean;
    requiresAcroBike: boolean;
  };
}
