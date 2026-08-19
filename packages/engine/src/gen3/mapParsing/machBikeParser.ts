export const MB_MUDDY_SLOPE = 0xd4;
export const MB_CRACKED_FLOOR = 0xd6;

/**
 * Parses a map grid for Mach Bike required tiles.
 *
 * @param metatiles The grid of metatiles (assuming behavior IDs are extracted)
 * @returns true if the map requires a Mach Bike, false otherwise.
 */
export function hasMachBikeRequirement(metatiles: number[]): boolean {
  for (let i = 0; i < metatiles.length; i++) {
    const tile = metatiles[i];
    if (tile === undefined) continue;

    if (tile === MB_MUDDY_SLOPE || tile === MB_CRACKED_FLOOR) {
      return true;
    }
  }
  return false;
}
