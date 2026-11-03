import type { GameVersion } from '../saveParser/parsers/common';
import {
  FEEBAS_BOUNDARY,
  FEEBAS_SEED_RELATIVE_OFFSET_EMERALD,
  FEEBAS_SEED_RELATIVE_OFFSET_RS,
  FEEBAS_SPOT_BIT_SHIFT,
  FEEBAS_TOTAL_SPOTS,
  FEEBAS_VALID_SPOTS,
  LCG_ADDEND,
  LCG_MULTIPLIER,
  SPOT_COORDINATES,
} from './feebas/constants';

/**
 * Extracts the 16-bit Feebas seed from Gen 3 save files using the native DataView API.
 *
 * **Architecture Note:**
 * The Feebas seed is a 16-bit integer used as the starting value for a Linear Congruential Generator (LCG).
 * It dictates which 6 specific water tiles on Route 119 will spawn Feebas. The seed's memory offset changes
 * depending on whether the save is Ruby/Sapphire or Emerald.
 *
 * @param saveData - The DataView of the save file.
 * @param gameVersion - The detected GameVersion of the save file.
 * @param section1Offset - The resolved memory offset to the active SaveBlock1 section.
 * @returns The 16-bit Feebas seed.
 * @throws Error if the save file is corrupted or incomplete.
 *
 * @example
 * const seed = extractFeebasSeed(view, 'emerald', 0x1000);
 * console.log(`Feebas seed: ${seed}`);
 */
export function extractFeebasSeed(saveData: DataView, gameVersion: GameVersion, section1Offset: number): number {
  try {
    let offset = 0;

    if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
      offset = section1Offset + FEEBAS_SEED_RELATIVE_OFFSET_RS;
    } else if (gameVersion === 'emerald') {
      offset = section1Offset + FEEBAS_SEED_RELATIVE_OFFSET_EMERALD;
    } else {
      throw new Error(`Unsupported game version for Feebas seed extraction: ${gameVersion}`);
    }

    // Gen 3 save values are typically little-endian
    return saveData.getUint16(offset, true);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Calculates the 6 valid Feebas spot IDs based on the 16-bit seed using the Gen 3 LCG algorithm.
 *
 * **Architecture Note:**
 * The game uses a custom Linear Congruential Generator (LCG) with specific multipliers and addends.
 * The RNG sequence generates candidate spot IDs between 0 and 446. Spot IDs below 4 are boundary/invalid tiles
 * and are skipped by the do-while loop, mirroring the internal game logic.
 *
 * @param seed - The 16-bit Feebas seed.
 * @returns An array of 6 valid spot IDs (4 to 447).
 *
 * @example
 * const tiles = calculateFeebasTiles(12345);
 * // Returns [ 34, 128, 400, 15, 290, 88 ]
 */
export function calculateFeebasTiles(seed: number): number[] {
  let rng = seed;
  const spots: number[] = [];
  for (let i = 0; i < FEEBAS_VALID_SPOTS; i++) {
    let spot = 0;
    do {
      rng = Math.imul(rng, LCG_MULTIPLIER) + LCG_ADDEND;
      rng = rng >>> 0;
      spot = (rng >>> FEEBAS_SPOT_BIT_SHIFT) % FEEBAS_TOTAL_SPOTS;
      if (spot === 0) spot = FEEBAS_TOTAL_SPOTS;
    } while (spot < FEEBAS_BOUNDARY);
    spots.push(spot);
  }
  return spots;
}

/**
 * Maps an array of 1D spot IDs to their corresponding 2D map coordinates (x, y).
 *
 * **Architecture Note:**
 * Route 119 is internally divided into a 2D grid. The 1D spot IDs derived from the LCG
 * must be mapped to their explicit `(x, y)` coordinates to render correctly on the heatmap or radar UI.
 *
 * @param spotIds - An array of valid spot IDs.
 * @returns An array of coordinate pairs [x, y].
 *
 * @example
 * const coords = mapSpotIdsToCoordinates([ 34, 128 ]);
 * // Returns [ [16, 32], [22, 39] ]
 */
export function mapSpotIdsToCoordinates(spotIds: number[]): [number, number][] {
  return spotIds.map((spotId) => {
    const coords = SPOT_COORDINATES[spotId - 1];
    if (!coords) {
      throw new Error(`Invalid spot ID: ${spotId}`);
    }
    return coords;
  });
}

export {
  FEEBAS_BOUNDARY,
  FEEBAS_SEED_RELATIVE_OFFSET_EMERALD,
  FEEBAS_SEED_RELATIVE_OFFSET_RS,
  FEEBAS_SPOT_BIT_SHIFT,
  FEEBAS_TOTAL_SPOTS,
  FEEBAS_VALID_SPOTS,
  LCG_ADDEND,
  LCG_MULTIPLIER,
  SPOT_COORDINATES,
} from './feebas/constants';
