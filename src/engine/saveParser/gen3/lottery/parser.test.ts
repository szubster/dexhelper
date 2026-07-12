import { describe, expect, it } from 'vitest';
import { EMERALD_LOTTERY_LOW_OFFSET, parseGen3LotteryNumber, RS_LOTTERY_LOW_OFFSET } from './parser';

describe('parseGen3LotteryNumber', () => {
  it('should parse lottery number for emerald', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0x0;

    // Set low 16 bits of lottery number
    view.setUint16(saveBlock1Offset + EMERALD_LOTTERY_LOW_OFFSET, 12345, true);

    const result = parseGen3LotteryNumber(view, saveBlock1Offset, 'emerald');
    expect(result).toBe(12345);
  });

  it('should parse lottery number for ruby/sapphire', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0x100;

    // Set low 16 bits of lottery number
    view.setUint16(saveBlock1Offset + RS_LOTTERY_LOW_OFFSET, 54321, true);

    const result = parseGen3LotteryNumber(view, saveBlock1Offset, 'ruby');
    expect(result).toBe(54321);

    const result2 = parseGen3LotteryNumber(view, saveBlock1Offset, 'sapphire');
    expect(result2).toBe(54321);
  });

  it('should throw error for unsupported game version', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0x0;

    expect(() => parseGen3LotteryNumber(view, saveBlock1Offset, 'firered')).toThrow(
      'Unsupported game version for lottery extraction.',
    );
  });

  it('should throw error for out of bounds read', () => {
    const buffer = new ArrayBuffer(0x10);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0x0;

    expect(() => parseGen3LotteryNumber(view, saveBlock1Offset, 'emerald')).toThrow(
      'The save file is corrupted or incomplete.',
    );
  });
});
