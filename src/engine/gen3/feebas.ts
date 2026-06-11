import type { GameVersion } from '../saveParser/parsers/common';

/**
 * Extracts the 16-bit Feebas seed from Gen 3 save files using the native DataView API.
 *
 * @param saveData - The DataView of the save file.
 * @param gameVersion - The detected GameVersion of the save file.
 * @returns The 16-bit Feebas seed.
 * @throws Error if the save file is corrupted or incomplete.
 */
export function extractFeebasSeed(saveData: DataView, gameVersion: GameVersion): number {
  try {
    let offset = 0;

    if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
      offset = 0x2dd6;
    } else if (gameVersion === 'emerald') {
      offset = 0x2e66;
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
