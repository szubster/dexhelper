import { describe, expect, it } from 'vitest';
import { parseGen2Pokegear } from './parser';

describe('Gen 2 Pokegear Parser', () => {
  it('should parse GS data correctly', () => {
    const buffer = new ArrayBuffer(0x4000);
    const view = new DataView(buffer);

    view.setUint8(0xd9c6 - 0xa000, 1);
    view.setUint8(0xd9c6 - 0xa000 + 1, 2);
    view.setUint8(0xd97b - 0xa000, 42);

    const data = parseGen2Pokegear(view, false);
    expect(data.phoneList[0]).toBe(1);
    expect(data.phoneList[1]).toBe(2);
    expect(data.specialPhoneCallID).toBe(42);
    expect(data.swarmFlags).toBe(0);
  });

  it('should parse Crystal data correctly', () => {
    const buffer = new ArrayBuffer(0x4000);
    const view = new DataView(buffer);

    view.setUint8(0xdc7c - 0xa000, 3);
    view.setUint8(0xdc7c - 0xa000 + 1, 4);
    view.setUint8(0xdc31 - 0xa000, 99);
    view.setUint8(0xdc20 - 0xa000, 1);
    view.setUint32(0xdc50 - 0xa000, 1234, true);
    view.setUint32(0xdc54 - 0xa000, 5678, true);

    const data = parseGen2Pokegear(view, true);
    expect(data.phoneList[0]).toBe(3);
    expect(data.phoneList[1]).toBe(4);
    expect(data.specialPhoneCallID).toBe(99);
    expect(data.swarmFlags).toBe(1);
    expect(data.dailyPhoneItemFlags).toBe(1234);
    expect(data.dailyPhoneTimeOfDayFlags).toBe(5678);
  });

  it('should handle out of bounds reads with proper error', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen2Pokegear(view, false)).toThrow('The save file is corrupted or incomplete.');
  });
});
