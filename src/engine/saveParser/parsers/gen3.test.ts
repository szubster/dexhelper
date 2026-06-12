import { describe, expect, it } from 'vitest';
import { extractMirageIslandValue, isGen3Save, parseGen3, parseGen3PersonalityValue } from './gen3';

describe('gen3 parser scaffolding', () => {
  it('isGen3Save should return false normally', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    expect(isGen3Save(view)).toBe(false);
  });

  it('parseGen3 should correctly find the latest save block and extract hidden item flags', () => {
    // A full Gen 3 save is typically 128KB
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Block A (offset 0) Setup - Section 2 with a lower save index
    view.setUint16(0x2000 + 4084, 2, true); // Section ID 2
    view.setUint32(0x2000 + 4088, 0x08012025, true); // Signature
    view.setUint32(0x2000 + 4092, 10, true); // Save Index 10

    // Block B (offset 0xE000) Setup - Section 2 with a higher save index
    const blockBSection2Offset = 0xe000 + 2 * 4096; // using index 2 for section 2 offset (it can be anywhere, but let's place it at index 2)
    view.setUint16(blockBSection2Offset + 4084, 2, true); // Section ID 2
    view.setUint32(blockBSection2Offset + 4088, 0x08012025, true); // Signature
    view.setUint32(blockBSection2Offset + 4092, 25, true); // Save Index 25

    // Write mock flags data at Block B, Section 2, offset 0x02F0 + 62
    const flagsOffset = blockBSection2Offset + 0x02f0;

    // Create a scenario where bits shift correctly
    // Byte 62: 0b11110000 (top 4 bits are 1) -> maps to bottom 4 bits of extracted byte 0
    // Byte 63: 0b00001111 (bottom 4 bits are 1) -> maps to top 4 bits of extracted byte 0
    // Resulting extracted byte 0 should be 0b11111111 = 255
    view.setUint8(flagsOffset + 62, 0b11110000);
    view.setUint8(flagsOffset + 63, 0b00001111);

    // Let's set byte 64 as 0 to avoid bleeding into extracted byte 1
    view.setUint8(flagsOffset + 64, 0);

    const saveData = parseGen3(view);
    expect(saveData.hiddenItemFlags).toBeDefined();
    expect(saveData.hiddenItemFlags?.length).toBe(14);
    expect(saveData.hiddenItemFlags?.[0]).toBe(255);
    expect(saveData.hiddenItemFlags?.[1]).toBe(0);
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
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    const blockBSection2Offset = 0xe000 + 2 * 4096;
    view.setUint16(blockBSection2Offset + 4084, 2, true);
    view.setUint32(blockBSection2Offset + 4088, 0x08012025, true);
    view.setUint32(blockBSection2Offset + 4092, 25, true);

    // Mock getUint8 to throw RangeError during flag extraction
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

describe('extractMirageIslandValue', () => {
  it('extracts the Mirage Island value for Ruby/Sapphire', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Setup Section 3 at block A, index 3
    const sectionOffset = 0x0000 + 3 * 4096;
    view.setUint16(sectionOffset + 4084, 3, true); // Section ID 3
    view.setUint32(sectionOffset + 4088, 0x08012025, true); // Signature
    view.setUint32(sectionOffset + 4092, 10, true); // Save Index

    // Set Mirage Island value
    view.setUint16(sectionOffset + 0x0408, 0xabcd, true);

    expect(extractMirageIslandValue(view, 'ruby')).toBe(0xabcd);
    expect(extractMirageIslandValue(view, 'sapphire')).toBe(0xabcd);
  });

  it('extracts the Mirage Island value for Emerald', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Setup Section 3 at block B, index 0
    const sectionOffset = 0xe000 + 0;
    view.setUint16(sectionOffset + 4084, 3, true); // Section ID 3
    view.setUint32(sectionOffset + 4088, 0x08012025, true); // Signature
    view.setUint32(sectionOffset + 4092, 15, true); // Save Index

    // Set Mirage Island value
    view.setUint16(sectionOffset + 0x0464, 0x1234, true);

    expect(extractMirageIslandValue(view, 'emerald')).toBe(0x1234);
  });

  it('throws an error for unsupported game versions', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Setup Section 3
    const sectionOffset = 0x0000 + 3 * 4096;
    view.setUint16(sectionOffset + 4084, 3, true); // Section ID 3
    view.setUint32(sectionOffset + 4088, 0x08012025, true); // Signature
    view.setUint32(sectionOffset + 4092, 10, true); // Save Index

    expect(() => extractMirageIslandValue(view, 'firered')).toThrow('Unsupported game version');
    expect(() => extractMirageIslandValue(view, 'leafgreen')).toThrow('Unsupported game version');
  });

  it('throws corrupted file error if out of bounds', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Setup Section 3 near the end of the buffer, making the data access out of bounds
    // (Wait, actually if section is at the end, 0x0464 might be out of bounds if it's placed incorrectly,
    // let's just mock getUint16)
    const sectionOffset = 0xe000 + 13 * 4096;
    view.setUint16(sectionOffset + 4084, 3, true); // Section ID 3
    view.setUint32(sectionOffset + 4088, 0x08012025, true); // Signature
    view.setUint32(sectionOffset + 4092, 10, true); // Save Index

    const originalGetUint16 = view.getUint16.bind(view);
    view.getUint16 = (offset: number, littleEndian?: boolean) => {
      if (offset === sectionOffset + 0x0408) {
        throw new RangeError('Out of bounds');
      }
      return originalGetUint16(offset, littleEndian);
    };

    expect(() => extractMirageIslandValue(view, 'ruby')).toThrow('The save file is corrupted or incomplete.');

    // Restore
    view.getUint16 = originalGetUint16;
  });

  it('throws corrupted file error if block scan throws RangeError', () => {
    const buffer = new ArrayBuffer(10); // Too small for block scan
    const view = new DataView(buffer);

    expect(() => extractMirageIslandValue(view, 'emerald')).toThrow('The save file is corrupted or incomplete.');
  });
});
