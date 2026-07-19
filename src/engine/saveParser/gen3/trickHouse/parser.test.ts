import { describe, expect, it } from 'vitest';
import {
  FLAG_LANDMARK_TRICK_HOUSE_BIT,
  FLAG_LANDMARK_TRICK_HOUSE_BYTE_OFFSET,
  parseTrickHouse,
  VAR_TRICK_HOUSE_ENTER_FROM_CORRIDOR_OFFSET,
  VAR_TRICK_HOUSE_ENTRANCE_STATE_OFFSET,
  VAR_TRICK_HOUSE_LEVEL_OFFSET,
  VAR_TRICK_HOUSE_PRIZE_PICKUP_OFFSET,
  VAR_TRICK_HOUSE_PUZZLE_1_STATE_OFFSET,
  VAR_TRICK_HOUSE_PUZZLE_2_STATE_OFFSET,
  VAR_TRICK_HOUSE_PUZZLE_3_STATE_OFFSET,
  VAR_TRICK_HOUSE_PUZZLE_4_STATE_OFFSET,
  VAR_TRICK_HOUSE_PUZZLE_5_STATE_OFFSET,
  VAR_TRICK_HOUSE_PUZZLE_6_STATE_OFFSET,
  VAR_TRICK_HOUSE_PUZZLE_7_STATE_OFFSET,
  VAR_TRICK_HOUSE_PUZZLE_8_STATE_OFFSET,
} from './parser';

describe('parseTrickHouse', () => {
  it('correctly parses Trick House data', () => {
    // 0x1500 + 2 is the maximum offset used (for puzzle 8) -> 0x1502
    // Let's allocate 0x3000 to be safe with section offsets.
    const buffer = new ArrayBuffer(0x3000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0x1000;

    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_LEVEL_OFFSET, 3, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_ENTRANCE_STATE_OFFSET, 1, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_ENTER_FROM_CORRIDOR_OFFSET, 0, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PRIZE_PICKUP_OFFSET, 2, true);

    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_1_STATE_OFFSET, 2, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_2_STATE_OFFSET, 2, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_3_STATE_OFFSET, 1, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_4_STATE_OFFSET, 0, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_5_STATE_OFFSET, 0, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_6_STATE_OFFSET, 0, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_7_STATE_OFFSET, 0, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PUZZLE_8_STATE_OFFSET, 0, true);

    view.setUint8(saveBlock1Offset + FLAG_LANDMARK_TRICK_HOUSE_BYTE_OFFSET, 1 << FLAG_LANDMARK_TRICK_HOUSE_BIT);

    const result = parseTrickHouse(view, saveBlock1Offset);

    expect(result).toEqual({
      level: 3,
      entranceState: 1,
      enterFromCorridor: 0,
      prizePickup: 2,
      puzzles: {
        puzzle1: 2,
        puzzle2: 2,
        puzzle3: 1,
        puzzle4: 0,
        puzzle5: 0,
        puzzle6: 0,
        puzzle7: 0,
        puzzle8: 0,
      },
      landmarkFlag: true,
    });
  });

  it('correctly parses Trick House data with false landmark flag', () => {
    const buffer = new ArrayBuffer(0x3000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0x1000;

    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_LEVEL_OFFSET, 1, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_ENTRANCE_STATE_OFFSET, 0, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_ENTER_FROM_CORRIDOR_OFFSET, 0, true);
    view.setUint16(saveBlock1Offset + VAR_TRICK_HOUSE_PRIZE_PICKUP_OFFSET, 0, true);

    // Explicitly zero out the byte (which it already is, but for completeness)
    view.setUint8(saveBlock1Offset + FLAG_LANDMARK_TRICK_HOUSE_BYTE_OFFSET, 0);

    const result = parseTrickHouse(view, saveBlock1Offset);

    expect(result.landmarkFlag).toBe(false);
  });

  it('throws an error on corrupted save file', () => {
    const buffer = new ArrayBuffer(0x10);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0x1000;

    expect(() => parseTrickHouse(view, saveBlock1Offset)).toThrow('The save file is corrupted or incomplete.');
  });
});
