import { describe, expect, it } from 'vitest';
import { isGen3Save, parseGen3, parseGen3PersonalityValue } from './gen3';

describe('gen3 parser scaffolding', () => {
  it('isGen3Save should return false normally', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    expect(isGen3Save(view)).toBe(false);
  });

  it('parseGen3 should throw not implemented error normally', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    expect(() => parseGen3(view)).toThrowError('Gen 3 parsing not implemented yet');
  });

  it('isGen3Save should catch RangeError and return false', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);

    // Mock getUint8 to throw RangeError
    const originalGetUint8 = view.getUint8.bind(view);
    view.getUint8 = () => {
      throw new RangeError('Out of bounds');
    };

    expect(isGen3Save(view)).toBe(false);

    // Restore
    view.getUint8 = originalGetUint8;
  });

  it('parseGen3 should catch RangeError and throw corrupted error', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);

    // Mock getUint8 to throw RangeError
    const originalGetUint8 = view.getUint8.bind(view);
    view.getUint8 = () => {
      throw new RangeError('Out of bounds');
    };

    expect(() => parseGen3(view)).toThrowError('The save file is corrupted or incomplete.');

    // Restore
    view.getUint8 = originalGetUint8;
  });
});

describe('parseGen3PersonalityValue', () => {
  it('should extract a 32-bit little-endian value correctly', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);

    // Set up a 32-bit value at offset 2: 0x12345678 (little endian)
    // 0x78, 0x56, 0x34, 0x12
    view.setUint8(2, 0x78);
    view.setUint8(3, 0x56);
    view.setUint8(4, 0x34);
    view.setUint8(5, 0x12);

    const result = parseGen3PersonalityValue(view, 2);

    expect(result).toBe(0x12345678);
  });

  it('should explicitly catch RangeError on out-of-bounds reads and throw a corrupted file error', () => {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    // Attempting to read a 32-bit integer (4 bytes) starting at offset 2 will exceed the 4-byte buffer
    expect(() => parseGen3PersonalityValue(view, 2)).toThrowError('The save file is corrupted or incomplete.');
  });
});
