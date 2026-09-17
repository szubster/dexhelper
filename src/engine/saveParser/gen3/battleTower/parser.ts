export const RS_TOWER_RECORD_L50_OFFSET = 0x0560;
export const RS_TOWER_RECORD_L100_OFFSET = 0x0562;
export const RS_TOWER_CURRENT_L50_OFFSET = 0x0574;
export const RS_TOWER_CURRENT_L100_OFFSET = 0x0576;

export interface Gen3RSBattleTowerWinStreaks {
  level50: { current: number; record: number };
  level100: { current: number; record: number };
}

/**
 * Parses the Ruby/Sapphire Battle Tower win streaks from the save file.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock2Offset - The resolved memory offset to the active SaveBlock2.
 * @returns An object containing the extracted win streaks and records for Level 50 and Level 100.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseRSBattleTowerWinStreaks(view: DataView, saveBlock2Offset: number): Gen3RSBattleTowerWinStreaks {
  try {
    const baseOffset = saveBlock2Offset;
    if (baseOffset + RS_TOWER_CURRENT_L100_OFFSET + 2 > view.byteLength) {
      throw new RangeError('Out of bounds');
    }

    return {
      level50: {
        current: view.getUint16(baseOffset + RS_TOWER_CURRENT_L50_OFFSET, true),
        record: view.getUint16(baseOffset + RS_TOWER_RECORD_L50_OFFSET, true),
      },
      level100: {
        current: view.getUint16(baseOffset + RS_TOWER_CURRENT_L100_OFFSET, true),
        record: view.getUint16(baseOffset + RS_TOWER_RECORD_L100_OFFSET, true),
      },
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
