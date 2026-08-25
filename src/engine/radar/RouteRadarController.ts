import type { Suggestion } from '../assistant/strategies/types';

/**
 * Output structure for the Smart Route Radar.
 * Maps an areaId (formerly areaId) to a heatmap data object.
 */
export interface RouteRadarHeatmap {
  [areaId: number]: {
    density: number;
    requiresMachBike: boolean;
    requiresAcroBike: boolean;
  };
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
        const areaBikeReqs = new Map<number, { mach: boolean; acro: boolean }>();

        // Iterate through all map IDs (keys) and extract areaIds (areaId) from the encounter details
        for (const mapId in suggestion.encounterInfo) {
          const encounters = suggestion.encounterInfo[mapId];
          if (encounters) {
            for (const encounter of encounters) {
              uniqueAreaIds.add(encounter.areaId);

              let reqs = areaBikeReqs.get(encounter.areaId);
              if (!reqs) {
                reqs = { mach: false, acro: false };
                areaBikeReqs.set(encounter.areaId, reqs);
              }
              if (encounter.requiresMachBike) reqs.mach = true;
              if (encounter.requiresAcroBike) reqs.acro = true;
            }
          }
        }

        // Increment the density score for each unique areaId found for this suggestion
        for (const areaId of uniqueAreaIds) {
          if (!heatmap[areaId]) {
            heatmap[areaId] = { density: 0, requiresMachBike: false, requiresAcroBike: false };
          }
          heatmap[areaId].density += 1;

          const reqs = areaBikeReqs.get(areaId);
          if (reqs?.mach) heatmap[areaId].requiresMachBike = true;
          if (reqs?.acro) heatmap[areaId].requiresAcroBike = true;
        }
      }
    }

    return heatmap;
  }
}
