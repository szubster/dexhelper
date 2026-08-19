import type { Suggestion } from '../assistant/strategies/types';

/**
 * Output structure for the Smart Route Radar.
 * Maps an areaId (formerly areaId) to a density score.
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
   * @remarks
   * **Why use a Set for `uniqueAreaIds`?**
   * A single Pokémon might have multiple distinct encounter entries on the exact same map.
   * If we naively incremented the density score for every raw encounter entry, the heatmap would
   * become distorted, artificially inflating the "density" of a map just because a Pokémon has many
   * sub-encounters there. By collecting `areaId`s into a `Set` first, we guarantee that each target
   * Pokémon only contributes a maximum of `+1` to any given area's density score, ensuring the heatmap
   * accurately reflects the number of distinct missing Pokémon available in that area.
   *
   * @param suggestions The raw output from the suggestionEngine.
   * @returns Heatmap data mapping areaId to density score.
   */
  public calculateHeatmap(suggestions: Suggestion[]): RouteRadarHeatmap {
    const heatmap: RouteRadarHeatmap = {};

    for (const suggestion of suggestions) {
      if (suggestion.category === 'Catch' && suggestion.encounterInfo) {
        const uniqueAreaIds = new Set<number>();

        // Iterate through all map IDs (keys) and extract areaIds (areaId) from the encounter details
        for (const mapId in suggestion.encounterInfo) {
          const encounters = suggestion.encounterInfo[mapId];
          if (encounters) {
            for (const encounter of encounters) {
              uniqueAreaIds.add(encounter.areaId);
            }
          }
        }

        // Increment the density score for each unique areaId found for this suggestion
        for (const areaId of uniqueAreaIds) {
          heatmap[areaId] = (heatmap[areaId] || 0) + 1;
        }
      }
    }

    return heatmap;
  }
}
