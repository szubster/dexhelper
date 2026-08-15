export const MB_BUMPY_SLOPE = 0xd5;
export const MB_ISOLATED_VERTICAL_RAIL = 0xd7;
export const MB_ISOLATED_HORIZONTAL_RAIL = 0xd8;
export const MB_VERTICAL_RAIL = 0xd9;
export const MB_HORIZONTAL_RAIL = 0xda;

/**
 * Parses a map grid for Acro Bike required tiles.
 *
 * @param metatiles The grid of metatiles (assuming behavior IDs are extracted)
 * @returns true if the map requires an Acro Bike, false otherwise.
 */
export function hasAcroBikeRequirement(metatiles: number[]): boolean {
  for (let i = 0; i < metatiles.length; i++) {
    const tile = metatiles[i];
    if (tile === undefined) continue;

    if (
      tile === MB_BUMPY_SLOPE ||
      tile === MB_ISOLATED_VERTICAL_RAIL ||
      tile === MB_ISOLATED_HORIZONTAL_RAIL ||
      tile === MB_VERTICAL_RAIL ||
      tile === MB_HORIZONTAL_RAIL
    ) {
      return true;
    }
  }
  return false;
}
