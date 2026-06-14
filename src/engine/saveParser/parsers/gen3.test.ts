import { describe, expect, it } from 'vitest';
import {
  isGen3Save,
  parseGen3,
  parseGen3ConditionStats,
  parseGen3MirageIslandValue,
  parseGen3PersonalityValue,
} from './gen3';

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

    // Block B (offset 0xE000) Setup - Section 1 with a higher save index
    const blockBSection1Offset = 0xe000 + 1 * 4096;
    view.setUint16(blockBSection1Offset + 4084, 1, true); // Section ID 1
    view.setUint32(blockBSection1Offset + 4088, 0x08012025, true); // Signature
    view.setUint32(blockBSection1Offset + 4092, 25, true); // Save Index 25

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

  it('parseGen3 should correctly extract berry patches data from section 1', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Section 1 setup
    const section1Offset = 0xe000 + 1 * 4096;
    view.setUint16(section1Offset + 4084, 1, true);
    view.setUint32(section1Offset + 4088, 0x08012025, true);
    view.setUint32(section1Offset + 4092, 25, true);

    // Section 2 setup (required by parseGen3)
    const section2Offset = 0xe000 + 2 * 4096;
    view.setUint16(section2Offset + 4084, 2, true);
    view.setUint32(section2Offset + 4088, 0x08012025, true);
    view.setUint32(section2Offset + 4092, 25, true);

    // Write mock berry data at Section 1, offset 0x169C + (0 * 8)
    const baseOffset = section1Offset + 0x169c;

    // Patch 0
    view.setUint8(baseOffset + 0, 15); // berryId
    view.setUint8(baseOffset + 1, 0x82); // stage=2, stopGrowth=true
    view.setUint16(baseOffset + 2, 120, true); // minutesUntilNextStage
    view.setUint8(baseOffset + 4, 3); // berryYield
    view.setUint8(baseOffset + 5, 0x51); // regrowthCount=1, watered1=true, watered3=true (0x50 = 01010000, 0x51 = 01010001)

    const saveData = parseGen3(view);
    expect(saveData.gen3BerryPatches).toBeDefined();
    expect(saveData.gen3BerryPatches?.length).toBe(128);

    const patch0 = saveData.gen3BerryPatches?.[0];
    expect(patch0?.mapId).toBe(0);
    expect(patch0?.berryId).toBe(15);
    expect(patch0?.stage).toBe(2);
    expect(patch0?.stopGrowth).toBe(true);
    expect(patch0?.minutesUntilNextStage).toBe(120);
    expect(patch0?.berryYield).toBe(3);
    expect(patch0?.regrowthCount).toBe(1);
    expect(patch0?.watered1).toBe(true);
    expect(patch0?.watered2).toBe(false);
    expect(patch0?.watered3).toBe(true);
    expect(patch0?.watered4).toBe(false);
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

  it('parseGen3 should catch RangeError when parsing berry patches and throw corrupted error', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    const section1Offset = 0xe000 + 1 * 4096;
    view.setUint16(section1Offset + 4084, 1, true);
    view.setUint32(section1Offset + 4088, 0x08012025, true);
    view.setUint32(section1Offset + 4092, 25, true);

    const section2Offset = 0xe000 + 2 * 4096;
    view.setUint16(section2Offset + 4084, 2, true);
    view.setUint32(section2Offset + 4088, 0x08012025, true);
    view.setUint32(section2Offset + 4092, 25, true);

    const originalGetUint8 = view.getUint8.bind(view);
    view.getUint8 = (offset: number) => {
      if (offset >= section1Offset + 0x169c) {
        throw new RangeError('Out of bounds reading berry patch');
      }
      return originalGetUint8(offset);
    };

    expect(() => parseGen3(view)).toThrowError('The save file is corrupted or incomplete.');

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

describe('parseGen3MirageIslandValue', () => {
  it('should extract a 16-bit little-endian value correctly', () => {
    // Verified by QA: Tests cover successful 16-bit little-endian reading
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    // Set up a 16-bit value at offset 2: 0x1234 (little endian)
    // 0x34, 0x12
    view.setUint8(2, 0x34);
    view.setUint8(3, 0x12);

    const result = parseGen3MirageIslandValue(view, 2);

    expect(result).toBe(0x1234);
  });

  it('should explicitly catch RangeError on out-of-bounds reads and throw a corrupted file error', () => {
    // Verified by QA: Tests cover RangeError handling with specific exception message
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);

    // Attempting to read a 16-bit integer (2 bytes) starting at offset 2 will exceed the 2-byte buffer
    expect(() => parseGen3MirageIslandValue(view, 2)).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3ConditionStats', () => {
  it('should extract the condition stats correctly', () => {
    const buffer = new ArrayBuffer(12);
    const view = new DataView(buffer);

    // Set up condition stats starting at offset 0
    // Cool, Beauty, Cute, Smart, Tough, Feel
    view.setUint8(0x06, 10);
    view.setUint8(0x07, 20);
    view.setUint8(0x08, 30);
    view.setUint8(0x09, 40);
    view.setUint8(0x0a, 50);
    view.setUint8(0x0b, 60);

    const result = parseGen3ConditionStats(view, 0);

    expect(result).toEqual({
      cool: 10,
      beauty: 20,
      cute: 30,
      smart: 40,
      tough: 50,
      feel: 60,
    });
  });

  it('should extract the condition stats correctly with an offset', () => {
    const buffer = new ArrayBuffer(24);
    const view = new DataView(buffer);

    // Set up condition stats starting at offset 12
    view.setUint8(12 + 0x06, 15);
    view.setUint8(12 + 0x07, 25);
    view.setUint8(12 + 0x08, 35);
    view.setUint8(12 + 0x09, 45);
    view.setUint8(12 + 0x0a, 55);
    view.setUint8(12 + 0x0b, 65);

    const result = parseGen3ConditionStats(view, 12);

    expect(result).toEqual({
      cool: 15,
      beauty: 25,
      cute: 35,
      smart: 45,
      tough: 55,
      feel: 65,
    });
  });

  it('should explicitly catch RangeError on out-of-bounds reads and throw a corrupted file error', () => {
    const buffer = new ArrayBuffer(10); // Not enough space for the full 12 bytes
    const view = new DataView(buffer);

    // Attempting to read up to offset 0x0B (11) will exceed the 10-byte buffer
    expect(() => parseGen3ConditionStats(view, 0)).toThrowError('The save file is corrupted or incomplete.');
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
