import type { CatchSuggestion, Suggestion } from '../assistant/strategies/types';
import type { RouteRadarHeatmap } from './types';

export interface AreaBikeRequirements {
  mach: boolean;
  acro: boolean;
}

export interface ExtractedAreaRequirements {
  uniqueAreaIds: Set<number>;
  areaBikeReqs: Map<number, AreaBikeRequirements>;
}

/**
 * Extracts unique area IDs and aggregates bike prerequisites across all encounters
 * in a catch suggestion's encounter info mapping.
 *
 * @param encounterInfo - Map of mapId to array of encounter details.
 * @returns An object containing the set of unique areaIds and their aggregated bike requirements.
 */
export function extractEncounterAreaRequirements(
  encounterInfo: CatchSuggestion['encounterInfo'],
): ExtractedAreaRequirements {
  const uniqueAreaIds = new Set<number>();
  const areaBikeReqs = new Map<number, AreaBikeRequirements>();

  if (!encounterInfo) {
    return { uniqueAreaIds, areaBikeReqs };
  }

  for (const mapId in encounterInfo) {
    const encounters = encounterInfo[mapId];
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

  return { uniqueAreaIds, areaBikeReqs };
}

/**
 * Updates a heatmap entry for a specific area, incrementing its density and merging bike requirements.
 *
 * @param heatmap - The mutable heatmap object to update.
 * @param areaId - The target area ID being updated.
 * @param bikeReqs - Optional bike requirements associated with encounters in this area.
 */
export function updateHeatmapForArea(
  heatmap: RouteRadarHeatmap,
  areaId: number,
  bikeReqs?: AreaBikeRequirements,
): void {
  if (!heatmap[areaId]) {
    heatmap[areaId] = { density: 0, requiresMachBike: false, requiresAcroBike: false };
  }

  heatmap[areaId].density += 1;

  if (bikeReqs?.mach) heatmap[areaId].requiresMachBike = true;
  if (bikeReqs?.acro) heatmap[areaId].requiresAcroBike = true;
}

/**
 * RouteRadarController bridges the dynamic suggestionEngine output
 * with the static map UI components by structuring the raw suggestion
 * output into heatmap data.
 *
 * @example
 * ```ts
 * const controller = new RouteRadarController();
 * const heatmap = controller.calculateHeatmap(suggestions);
 * ```
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
   *
   * @example
   * ```ts
   * const heatmap = controller.calculateHeatmap([
   *   {
   *     id: 1,
   *     category: 'Catch',
   *     title: 'Catch Bulbasaur',
   *     encounterInfo: {
   *       10: [{ areaId: 100, requiresMachBike: false, requiresAcroBike: false }]
   *     }
   *   }
   * ]);
   * // heatmap[100] -> { density: 1, requiresMachBike: false, requiresAcroBike: false }
   * ```
   */
  public calculateHeatmap(suggestions: Suggestion[]): RouteRadarHeatmap {
    const heatmap: RouteRadarHeatmap = {};

    for (const suggestion of suggestions) {
      if (suggestion.category === 'Catch' && suggestion.encounterInfo) {
        const { uniqueAreaIds, areaBikeReqs } = extractEncounterAreaRequirements(suggestion.encounterInfo);

        for (const areaId of uniqueAreaIds) {
          updateHeatmapForArea(heatmap, areaId, areaBikeReqs.get(areaId));
        }
      }
    }

    return heatmap;
  }
}
