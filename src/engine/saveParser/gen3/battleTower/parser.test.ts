import { describe, expect, it } from 'vitest';
import {
  parseRSBattleTowerWinStreaks,
  RS_TOWER_CURRENT_L50_OFFSET,
  RS_TOWER_CURRENT_L100_OFFSET,
  RS_TOWER_RECORD_L50_OFFSET,
  RS_TOWER_RECORD_L100_OFFSET,
} from './parser';

describe('parseRSBattleTowerWinStreaks', () => {
  it('parses Battle Tower data correctly from SaveBlock2', () => {
    // Gen 3 save block sections are 4096 bytes long, we mock a 14-section buffer
    const buffer = new Uint8Array(14 * 4096 * 2);
    const view = new DataView(buffer.buffer);
    const saveBlock2Offset = 0x2000;

    view.setUint16(saveBlock2Offset + RS_TOWER_RECORD_L50_OFFSET, 105, true);
    view.setUint16(saveBlock2Offset + RS_TOWER_RECORD_L100_OFFSET, 42, true);
    view.setUint16(saveBlock2Offset + RS_TOWER_CURRENT_L50_OFFSET, 14, true);
    view.setUint16(saveBlock2Offset + RS_TOWER_CURRENT_L100_OFFSET, 7, true);

    const result = parseRSBattleTowerWinStreaks(view, saveBlock2Offset);

    expect(result.level50.record).toBe(105);
    expect(result.level100.record).toBe(42);
    expect(result.level50.current).toBe(14);
    expect(result.level100.current).toBe(7);
  });

  it('throws an error for out of bounds read', () => {
    // Small buffer to trigger RangeError
    const buffer = new Uint8Array(10);
    const view = new DataView(buffer.buffer);
    const saveBlock2Offset = 0;

    expect(() => parseRSBattleTowerWinStreaks(view, saveBlock2Offset)).toThrowError(
      'The save file is corrupted or incomplete.',
    );
  });
});
