import type { Gen3BattleFrontierSymbols, Gen3BattleFrontierWinStreaks } from '../../parsers/common';

export const TOWER_SILVER_OFFSET = 0x1388;
export const TOWER_SILVER_BIT = 4;
export const TOWER_GOLD_OFFSET = 0x1388;
export const TOWER_GOLD_BIT = 5;
export const DOME_SILVER_OFFSET = 0x1388;
export const DOME_SILVER_BIT = 6;
export const DOME_GOLD_OFFSET = 0x1388;
export const DOME_GOLD_BIT = 7;
export const PALACE_SILVER_OFFSET = 0x1389;
export const PALACE_SILVER_BIT = 0;
export const PALACE_GOLD_OFFSET = 0x1389;
export const PALACE_GOLD_BIT = 1;
export const ARENA_SILVER_OFFSET = 0x1389;
export const ARENA_SILVER_BIT = 2;
export const ARENA_GOLD_OFFSET = 0x1389;
export const ARENA_GOLD_BIT = 3;
export const FACTORY_SILVER_OFFSET = 0x1389;
export const FACTORY_SILVER_BIT = 4;
export const FACTORY_GOLD_OFFSET = 0x1389;
export const FACTORY_GOLD_BIT = 5;
export const PIKE_SILVER_OFFSET = 0x1389;
export const PIKE_SILVER_BIT = 6;
export const PIKE_GOLD_OFFSET = 0x1389;
export const PIKE_GOLD_BIT = 7;
export const PYRAMID_SILVER_OFFSET = 0x138a;
export const PYRAMID_SILVER_BIT = 0;
export const PYRAMID_GOLD_OFFSET = 0x138a;
export const PYRAMID_GOLD_BIT = 1;

export const TOWER_WIN_STREAKS_OFFSET = 0x0ce0;
export const TOWER_RECORD_WIN_STREAKS_OFFSET = 0x0cf0;
export const DOME_WIN_STREAKS_OFFSET = 0x0d0c;
export const DOME_RECORD_WIN_STREAKS_OFFSET = 0x0d14;
export const PALACE_WIN_STREAKS_OFFSET = 0x0dc8;
export const PALACE_RECORD_WIN_STREAKS_OFFSET = 0x0dd0;
export const ARENA_WIN_STREAKS_OFFSET = 0x0dda;
export const ARENA_RECORD_WIN_STREAKS_OFFSET = 0x0dde;
export const FACTORY_WIN_STREAKS_OFFSET = 0x0de2;
export const FACTORY_RECORD_WIN_STREAKS_OFFSET = 0x0dea;
export const PIKE_WIN_STREAKS_OFFSET = 0x0e04;
export const PIKE_RECORD_WIN_STREAKS_OFFSET = 0x0e08;
export const PYRAMID_WIN_STREAKS_OFFSET = 0x0e1a;
export const PYRAMID_RECORD_WIN_STREAKS_OFFSET = 0x0e1e;

export const TOTAL_BATTLE_POINTS_OFFSET = 0x0eb8;
export const BATTLE_POINTS_OFFSET = 0x1504;

/**
 * Parses the Gen 3 Battle Frontier symbols from the save file.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock1Offset - The resolved memory offset to the active SaveBlock1.
 * @returns An object containing the extracted symbols for all 7 facilities.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3BattleFrontierSymbols(view: DataView, saveBlock1Offset: number): Gen3BattleFrontierSymbols {
  try {
    return {
      tower: {
        silver: !!((view.getUint8(saveBlock1Offset + TOWER_SILVER_OFFSET) >> TOWER_SILVER_BIT) & 1),
        gold: !!((view.getUint8(saveBlock1Offset + TOWER_GOLD_OFFSET) >> TOWER_GOLD_BIT) & 1),
      },
      dome: {
        silver: !!((view.getUint8(saveBlock1Offset + DOME_SILVER_OFFSET) >> DOME_SILVER_BIT) & 1),
        gold: !!((view.getUint8(saveBlock1Offset + DOME_GOLD_OFFSET) >> DOME_GOLD_BIT) & 1),
      },
      palace: {
        silver: !!((view.getUint8(saveBlock1Offset + PALACE_SILVER_OFFSET) >> PALACE_SILVER_BIT) & 1),
        gold: !!((view.getUint8(saveBlock1Offset + PALACE_GOLD_OFFSET) >> PALACE_GOLD_BIT) & 1),
      },
      arena: {
        silver: !!((view.getUint8(saveBlock1Offset + ARENA_SILVER_OFFSET) >> ARENA_SILVER_BIT) & 1),
        gold: !!((view.getUint8(saveBlock1Offset + ARENA_GOLD_OFFSET) >> ARENA_GOLD_BIT) & 1),
      },
      factory: {
        silver: !!((view.getUint8(saveBlock1Offset + FACTORY_SILVER_OFFSET) >> FACTORY_SILVER_BIT) & 1),
        gold: !!((view.getUint8(saveBlock1Offset + FACTORY_GOLD_OFFSET) >> FACTORY_GOLD_BIT) & 1),
      },
      pike: {
        silver: !!((view.getUint8(saveBlock1Offset + PIKE_SILVER_OFFSET) >> PIKE_SILVER_BIT) & 1),
        gold: !!((view.getUint8(saveBlock1Offset + PIKE_GOLD_OFFSET) >> PIKE_GOLD_BIT) & 1),
      },
      pyramid: {
        silver: !!((view.getUint8(saveBlock1Offset + PYRAMID_SILVER_OFFSET) >> PYRAMID_SILVER_BIT) & 1),
        gold: !!((view.getUint8(saveBlock1Offset + PYRAMID_GOLD_OFFSET) >> PYRAMID_GOLD_BIT) & 1),
      },
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the BP (Battle Points) balance from the save file.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock2Offset - The resolved memory offset to the active SaveBlock2.
 * @returns The battle points balance.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */

export function parseGen3BattlePoints(view: DataView, saveBlock2Offset: number): number {
  try {
    return view.getUint16(saveBlock2Offset + BATTLE_POINTS_OFFSET, true);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the total accumulated BP (Battle Points) from the save file.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock2Offset - The resolved memory offset to the active SaveBlock2.
 * @returns The total battle points accumulated.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3TotalBattlePoints(view: DataView, saveBlock2Offset: number): number {
  try {
    return view.getUint16(saveBlock2Offset + TOTAL_BATTLE_POINTS_OFFSET, true);
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the Gen 3 Battle Frontier win streaks from the save file.
 *
 * @param view - The raw save file DataView.
 * @param saveBlock2Offset - The resolved memory offset to the active SaveBlock2.
 * @returns An object containing the extracted win streaks and records for all 7 facilities.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3BattleFrontierWinStreaks(
  view: DataView,
  saveBlock2Offset: number,
): Gen3BattleFrontierWinStreaks {
  try {
    const baseOffset = saveBlock2Offset; // Using relative offsets to SaveBlock2 start directly, rather than baseOffset + BATTLE_FRONTIER_OFFSET, because the task requirements list offsets relative to the start of SaveBlock2.

    return {
      tower: {
        current: view.getUint16(baseOffset + TOWER_WIN_STREAKS_OFFSET, true),
        record: view.getUint16(baseOffset + TOWER_RECORD_WIN_STREAKS_OFFSET, true),
      },
      dome: {
        current: view.getUint16(baseOffset + DOME_WIN_STREAKS_OFFSET, true),
        record: view.getUint16(baseOffset + DOME_RECORD_WIN_STREAKS_OFFSET, true),
      },
      palace: {
        current: view.getUint16(baseOffset + PALACE_WIN_STREAKS_OFFSET, true),
        record: view.getUint16(baseOffset + PALACE_RECORD_WIN_STREAKS_OFFSET, true),
      },
      arena: {
        current: view.getUint16(baseOffset + ARENA_WIN_STREAKS_OFFSET, true),
        record: view.getUint16(baseOffset + ARENA_RECORD_WIN_STREAKS_OFFSET, true),
      },
      factory: {
        current: view.getUint16(baseOffset + FACTORY_WIN_STREAKS_OFFSET, true),
        record: view.getUint16(baseOffset + FACTORY_RECORD_WIN_STREAKS_OFFSET, true),
      },
      pike: {
        current: view.getUint16(baseOffset + PIKE_WIN_STREAKS_OFFSET, true),
        record: view.getUint16(baseOffset + PIKE_RECORD_WIN_STREAKS_OFFSET, true),
      },
      pyramid: {
        current: view.getUint16(baseOffset + PYRAMID_WIN_STREAKS_OFFSET, true),
        record: view.getUint16(baseOffset + PYRAMID_RECORD_WIN_STREAKS_OFFSET, true),
      },
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
