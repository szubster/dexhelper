import { describe, expect, it } from 'vitest';
import { parseGen3FameChecker } from './parser';

describe('parseGen3FameChecker', () => {
  it('correctly parses Fame Checker data', () => {
    // 16 entries, 2 bytes each = 32 bytes
    const buffer = new ArrayBuffer(0x3a54 + 32);
    const view = new DataView(buffer);

    // Entry 0 (Oak)
    // pickState: 2 (COLORED) -> 0b10 (0x2)
    // flavorTextFlags (Entry 1 and 3 unlocked) -> bits 0 and 2 set -> 0b0101 (0x5)
    // rawValue = (0x5 << 2) | 0x2 = 0x14 | 0x2 = 0x16
    view.setUint16(0x3a54, 0x16, true);

    // Entry 2 (Brock)
    // pickState: 1 (SILHOUETTE) -> 0b01 (0x1)
    // flavorTextFlags (Entry 1, 2, 6 unlocked) -> bits 0, 1, 5 set -> 0b100011 (0x23)
    // rawValue = (0x23 << 2) | 0x1 = 0x8c | 0x1 = 0x8d
    view.setUint16(0x3a54 + 4, 0x8d, true);

    const result = parseGen3FameChecker(view, 0);

    expect(result).toHaveLength(16);

    // Entry 0 tests
    expect(result[0]?.pickState).toBe(2);
    expect(result[0]?.flavorTextFlags).toEqual([true, false, true, false, false, false]);

    // Entry 2 tests
    expect(result[2]?.pickState).toBe(1);
    expect(result[2]?.flavorTextFlags).toEqual([true, true, false, false, false, true]);

    // Empty entry tests
    expect(result[1]?.pickState).toBe(0);
    expect(result[1]?.flavorTextFlags).toEqual([false, false, false, false, false, false]);
  });
});
