export interface Gen3TrickHouse {
  level: number;
  entranceState: number;
  enterFromCorridor: number;
  prizePickup: number;
  puzzles: {
    puzzle1: number;
    puzzle2: number;
    puzzle3: number;
    puzzle4: number;
    puzzle5: number;
    puzzle6: number;
    puzzle7: number;
    puzzle8: number;
  };
  landmarkFlag: boolean;
}

export const SAVE_BLOCK_1_VARS_OFFSET = 0x139c;
export const SAVE_BLOCK_1_FLAGS_OFFSET = 0x1270;

export const VAR_TRICK_HOUSE_LEVEL_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x4044 - 0x4000) * 2;
export const VAR_TRICK_HOUSE_ENTRANCE_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x40a7 - 0x4000) * 2;
export const VAR_TRICK_HOUSE_ENTER_FROM_CORRIDOR_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x40b5 - 0x4000) * 2;
export const VAR_TRICK_HOUSE_PRIZE_PICKUP_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x40c1 - 0x4000) * 2;

export const VAR_TRICK_HOUSE_PUZZLE_1_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x40ab - 0x4000) * 2;
export const VAR_TRICK_HOUSE_PUZZLE_2_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x40ac - 0x4000) * 2;
export const VAR_TRICK_HOUSE_PUZZLE_3_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x40ad - 0x4000) * 2;
export const VAR_TRICK_HOUSE_PUZZLE_4_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x40ae - 0x4000) * 2;
export const VAR_TRICK_HOUSE_PUZZLE_5_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x40af - 0x4000) * 2;
export const VAR_TRICK_HOUSE_PUZZLE_6_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x40b0 - 0x4000) * 2;
export const VAR_TRICK_HOUSE_PUZZLE_7_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x40b1 - 0x4000) * 2;
export const VAR_TRICK_HOUSE_PUZZLE_8_STATE_OFFSET = SAVE_BLOCK_1_VARS_OFFSET + (0x40b2 - 0x4000) * 2;

export const FLAG_LANDMARK_TRICK_HOUSE = 0x8a2;
export const FLAG_LANDMARK_TRICK_HOUSE_BYTE_OFFSET =
  SAVE_BLOCK_1_FLAGS_OFFSET + Math.floor(FLAG_LANDMARK_TRICK_HOUSE / 8);
export const FLAG_LANDMARK_TRICK_HOUSE_BIT = FLAG_LANDMARK_TRICK_HOUSE % 8;

export function parseTrickHouse(view: DataView, saveBlock1Offset: number): Gen3TrickHouse {
  try {
    const level = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_LEVEL_OFFSET, true);
    const entranceState = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_ENTRANCE_STATE_OFFSET, true);
    const enterFromCorridor = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_ENTER_FROM_CORRIDOR_OFFSET, true);
    const prizePickup = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PRIZE_PICKUP_OFFSET, true);

    const puzzle1 = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_1_STATE_OFFSET, true);
    const puzzle2 = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_2_STATE_OFFSET, true);
    const puzzle3 = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_3_STATE_OFFSET, true);
    const puzzle4 = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_4_STATE_OFFSET, true);
    const puzzle5 = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_5_STATE_OFFSET, true);
    const puzzle6 = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_6_STATE_OFFSET, true);
    const puzzle7 = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_7_STATE_OFFSET, true);
    const puzzle8 = view.getUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_8_STATE_OFFSET, true);

    const flagByte = view.getUint8(saveBlock1Offset + FLAG_LANDMARK_TRICK_HOUSE_BYTE_OFFSET);
    const landmarkFlag = (flagByte & (1 << FLAG_LANDMARK_TRICK_HOUSE_BIT)) !== 0;

    return {
      level,
      entranceState,
      enterFromCorridor,
      prizePickup,
      puzzles: {
        puzzle1,
        puzzle2,
        puzzle3,
        puzzle4,
        puzzle5,
        puzzle6,
        puzzle7,
        puzzle8,
      },
      landmarkFlag,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
