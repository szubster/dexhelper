export const EMERALD_LOTTERY_LOW_OFFSET = 0x1434;
export const RS_LOTTERY_LOW_OFFSET = 0x13d6;

/**
 * Parses the daily lottery number from a Gen 3 save file.
 * The daily lottery PRNG seed is a 32-bit number, but the winning lottery number
 * itself is the lower 16 bits of this seed. We reconstruct the 16-bit number.
 *
 * @param view The raw save file DataView
 * @param saveBlock1Offset The offset to SaveBlock1
 * @param gameVersion The game version ('emerald', 'ruby', 'sapphire')
 * @returns The 16-bit daily lottery number
 */
export function parseGen3LotteryNumber(view: DataView, saveBlock1Offset: number, gameVersion: string): number {
  try {
    if (gameVersion === 'emerald') {
      return view.getUint16(saveBlock1Offset + EMERALD_LOTTERY_LOW_OFFSET, true);
    } else if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
      return view.getUint16(saveBlock1Offset + RS_LOTTERY_LOW_OFFSET, true);
    }
    throw new Error('Unsupported game version for lottery extraction.');
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
