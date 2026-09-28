import { describe, expect, it } from 'vitest';
import {
  parseRSBattleTowerWinStreaks,
  RS_TOWER_CURRENT_L50_OFFSET,
  RS_TOWER_CURRENT_L100_OFFSET,
  RS_TOWER_RECORD_L50_OFFSET,
  RS_TOWER_RECORD_L100_OFFSET,
} from './parser';

describe('Ruby/Sapphire Battle Tower Data Extraction', () => {
  it('should parse win streaks and records correctly', () => {
    // Total size needs to cover the offsets. The max offset is 0x0576, which is 1398 in decimal.
    // + 2 bytes for the Uint16 = 1400.
    const buffer = new ArrayBuffer(1500);
    const view = new DataView(buffer);
    const offset = 0; // Test with saveBlock2Offset = 0

    view.setUint16(offset + RS_TOWER_RECORD_L50_OFFSET, 105, true);
    view.setUint16(offset + RS_TOWER_RECORD_L100_OFFSET, 50, true);
    view.setUint16(offset + RS_TOWER_CURRENT_L50_OFFSET, 42, true);
    view.setUint16(offset + RS_TOWER_CURRENT_L100_OFFSET, 12, true);

    const result = parseRSBattleTowerWinStreaks(view, offset);

    expect(result).toEqual({
      level50: {
        current: 42,
        record: 105,
      },
      level100: {
        current: 12,
        record: 50,
      },
    });
  });

  it('should throw an error for out-of-bounds reads', () => {
    // Create a buffer that is too small
    const buffer = new ArrayBuffer(500);
    const view = new DataView(buffer);

    expect(() => parseRSBattleTowerWinStreaks(view, 0)).toThrow('The save file is corrupted or incomplete.');
  });
});
