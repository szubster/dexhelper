import type { Suggestion } from '../assistant/strategies/types';

/**
 * Output structure for the Smart Route Radar.
 * Maps an areaId (formerly aid) to a density score.
 */
export interface RouteRadarHeatmap {
  [areaId: number]: number;
}

/**
 * RouteRadarController bridges the dynamic suggestionEngine output
 * with the static map UI components by structuring the raw suggestion
 * output into heatmap data.
 */
export class RouteRadarController {
  /**
   * Calculates the heatmap density data from the provided suggestions.
   *
   * @param _suggestions The raw output from the suggestionEngine.
   * @returns Heatmap data mapping areaId to density score.
   */
  public calculateHeatmap(_suggestions: Suggestion[]): RouteRadarHeatmap {
    throw new Error('Not implemented');
  }
}
