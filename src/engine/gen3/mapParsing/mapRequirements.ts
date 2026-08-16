import { hasAcroBikeRequirement } from './acroBikeParser';
import { hasMachBikeRequirement } from './machBikeParser';

export interface MapRequirements {
  requiresMachBike: boolean;
  requiresAcroBike: boolean;
}

/**
 * Evaluates the required bikes for a given map grid based on metatiles.
 *
 * @param metatiles The grid of metatiles (assuming behavior IDs are extracted)
 * @returns An object containing boolean flags for Mach and Acro bike requirements.
 */
export function parseBikeRequirements(metatiles: number[]): MapRequirements {
  return {
    requiresMachBike: hasMachBikeRequirement(metatiles),
    requiresAcroBike: hasAcroBikeRequirement(metatiles),
  };
}
