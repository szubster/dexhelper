import { describe, expect, it } from 'vitest';
import {
  isGen3Save,
  parseGen3,
  parseGen3ConditionStats,
  parseGen3MirageIslandValue,
  parseGen3MixRecords,
  parseGen3PersonalityValue,
  parseGen3PokeNews,
  parseGen3Ribbons,
  parseGen3Roamer,
  parseGen3TVShows,
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

    // Write mock berry data at Section 1, offset 0x071c + (0 * 8)
    const baseOffset = section1Offset + 0x071c;

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
    expect(patch0).not.toHaveProperty('mapId');
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

    expect(saveData.gen3PokeNews).toBeDefined();
    expect(saveData.gen3PokeNews?.length).toBe(16);
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
      if (offset >= section1Offset + 0x071c) {
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
      sheen: 60,
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
      sheen: 65,
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

describe('parseGen3 mirageIslandValue', () => {
  it('should correctly extract mirageIslandValue for ruby/sapphire', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Section 1 setup
    const section1Offset = 0xe000 + 1 * 4096;
    view.setUint16(section1Offset + 4084, 1, true);
    view.setUint32(section1Offset + 4088, 0x08012025, true);
    view.setUint32(section1Offset + 4092, 25, true);

    // Section 2 setup
    const section2Offset = 0xe000 + 2 * 4096;
    view.setUint16(section2Offset + 4084, 2, true);
    view.setUint32(section2Offset + 4088, 0x08012025, true);
    view.setUint32(section2Offset + 4092, 25, true);

    // Write mirageIslandValue (16-bit little-endian) for ruby at offset 0x0408
    view.setUint16(section2Offset + 0x0408, 0xabcd, true);

    const saveData = parseGen3(view, 'ruby');
    expect(saveData.mirageIslandValue).toBe(0xabcd);
  });

  it('should correctly extract mirageIslandValue for emerald', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Section 1 setup
    const section1Offset = 0xe000 + 1 * 4096;
    view.setUint16(section1Offset + 4084, 1, true);
    view.setUint32(section1Offset + 4088, 0x08012025, true);
    view.setUint32(section1Offset + 4092, 25, true);

    // Section 2 setup
    const section2Offset = 0xe000 + 2 * 4096;
    view.setUint16(section2Offset + 4084, 2, true);
    view.setUint32(section2Offset + 4088, 0x08012025, true);
    view.setUint32(section2Offset + 4092, 25, true);

    // Write mirageIslandValue (16-bit little-endian) for emerald at offset 0x0464
    view.setUint16(section2Offset + 0x0464, 0x1234, true);

    const saveData = parseGen3(view, 'emerald');
    expect(saveData.mirageIslandValue).toBe(0x1234);
  });

  it('should explicitly catch RangeError when parsing mirage island value and throw a corrupted file error', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Section 1 setup
    const section1Offset = 0xe000 + 1 * 4096;
    view.setUint16(section1Offset + 4084, 1, true);
    view.setUint32(section1Offset + 4088, 0x08012025, true);
    view.setUint32(section1Offset + 4092, 25, true);

    // Section 2 setup
    const section2Offset = 0xe000 + 2 * 4096;
    view.setUint16(section2Offset + 4084, 2, true);
    view.setUint32(section2Offset + 4088, 0x08012025, true);
    view.setUint32(section2Offset + 4092, 25, true);

    const originalGetUint16 = view.getUint16.bind(view);
    view.getUint16 = (offset: number, le: boolean) => {
      // Offset 0x0408 is the mirage island offset for Ruby/Sapphire
      if (offset === section2Offset + 0x0408) {
        throw new RangeError('Out of bounds reading mirage island value');
      }
      return originalGetUint16(offset, le);
    };

    expect(() => parseGen3(view, 'ruby')).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3Ribbons', () => {
  it('should extract the contest ribbon ranks correctly', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);

    // Let's create a bitfield:
    // cool: 1 (001) -> bits 0-2 -> 1
    // beauty: 2 (010) -> bits 3-5 -> 2 << 3 = 16
    // cute: 3 (011) -> bits 6-8 -> 3 << 6 = 192
    // smart: 4 (100) -> bits 9-11 -> 4 << 9 = 2048
    // tough: 0 (000) -> bits 12-14 -> 0
    // Total value: 1 + 16 + 192 + 2048 = 2257 (0x08D1)

    // 32-bit little endian at offset 2
    // 0x000008D1
    view.setUint8(2, 0xd1);
    view.setUint8(3, 0x08);
    view.setUint8(4, 0x00);
    view.setUint8(5, 0x00);

    const result = parseGen3Ribbons(view, 2);

    expect(result).toEqual({
      cool: 1,
      beauty: 2,
      cute: 3,
      smart: 4,
      tough: 0,
    });
  });

  it('should explicitly catch RangeError on out-of-bounds reads and throw a corrupted file error', () => {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    // Attempting to read a 32-bit integer (4 bytes) starting at offset 2 will exceed the 4-byte buffer
    expect(() => parseGen3Ribbons(view, 2)).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3TVShows', () => {
  it('should extract all TV show events correctly', () => {
    const buffer = new ArrayBuffer(900); // 25 shows * 36 bytes
    const view = new DataView(buffer);

    // Show 1: Normal show (kind 1, active)
    view.setUint8(0, 1);
    view.setUint8(1, 1);

    // Show 2: Mix Record show (kind 22, inactive)
    view.setUint8(36, 22);
    view.setUint8(37, 0);

    // Show 3: Outbreak show (kind 45, active)
    view.setUint8(72, 45);
    view.setUint8(73, 1);

    const result = parseGen3TVShows(view, 0);

    expect(result).toHaveLength(25);
    expect(result[0]).toEqual({ kind: 1, active: true });
    expect(result[1]).toEqual({ kind: 22, active: false });
    expect(result[2]).toEqual({ kind: 45, active: true });
    // The rest should be kind: 0, active: false
    expect(result[3]).toEqual({ kind: 0, active: false });
  });

  it('should explicitly catch RangeError on out-of-bounds reads and throw a corrupted file error', () => {
    const buffer = new ArrayBuffer(800); // Not enough space for 25 items (900 bytes)
    const view = new DataView(buffer);

    expect(() => parseGen3TVShows(view, 0)).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3MixRecords', () => {
  it('should extract active mix record events correctly', () => {
    const buffer = new ArrayBuffer(900); // 25 shows * 36 bytes
    const view = new DataView(buffer);

    // Show 1: Normal show (kind 1, active) - should be ignored
    view.setUint8(0, 1);
    view.setUint8(1, 1);

    // Show 2: Mix Record show (kind 22, active) - should be included
    view.setUint8(36, 22);
    view.setUint8(37, 1);

    // Show 3: Mix Record show (kind 31, active) - should be included
    view.setUint8(72, 31);
    view.setUint8(73, 1);

    // Show 4: Mix Record show (kind 33, inactive) - should be ignored
    view.setUint8(108, 33);
    view.setUint8(109, 0);

    // Show 5: Outbreak show (kind 45, active) - should be ignored
    view.setUint8(144, 45);
    view.setUint8(145, 1);

    const result = parseGen3MixRecords(view, 0);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ kind: 22, active: true });
    expect(result[1]).toEqual({ kind: 31, active: true });
  });

  it('should explicitly catch RangeError on out-of-bounds reads and throw a corrupted file error', () => {
    const buffer = new ArrayBuffer(800); // Not enough space for 25 items (900 bytes)
    const view = new DataView(buffer);

    expect(() => parseGen3MixRecords(view, 0)).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3PokeNews', () => {
  it('should extract 16 news items correctly', () => {
    const buffer = new ArrayBuffer(64);
    const view = new DataView(buffer);

    // Set up a news item at offset 0 (kind: 1, state: 2, countdown: 4)
    view.setUint8(0, 1);
    view.setUint8(1, 2);
    view.setUint16(2, 4, true);

    // Set up another news item at index 15 (offset 60)
    view.setUint8(60, 3);
    view.setUint8(61, 1);
    view.setUint16(62, 10, true);

    const result = parseGen3PokeNews(view, 0);

    expect(result).toHaveLength(16);
    expect(result[0]).toEqual({ kind: 1, state: 2, dayCountdown: 4 });
    expect(result[15]).toEqual({ kind: 3, state: 1, dayCountdown: 10 });
  });

  it('should explicitly catch RangeError on out-of-bounds reads and throw a corrupted file error', () => {
    const buffer = new ArrayBuffer(60); // Not enough space for 16 items (64 bytes)
    const view = new DataView(buffer);

    expect(() => parseGen3PokeNews(view, 0)).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3Roamer', () => {
  it('should parse Gen 3 roamer data', () => {
    const buffer = new ArrayBuffer(0x3144 + 20);
    const view = new DataView(buffer);
    const offset = 0x3144;

    // Set ivs: HP=31, Atk=10, Def=15, Spd=20, SpAtk=25, SpDef=30
    // 31 = 0x1F, 10 = 0x0A, 15 = 0x0F, 20 = 0x14, 25 = 0x19, 30 = 0x1E
    // ivs = 31 | (10 << 5) | (15 << 10) | (20 << 15) | (25 << 20) | (30 << 25)
    // ivs = 31 | 320 | 15360 | 655360 | 26214400 | 1006632960 = 1033518431 (0x3D9A3D5F)
    view.setUint32(offset, 0x3d9a3d5f, true);

    // Set personalityValue
    view.setUint32(offset + 4, 0x12345678, true);

    // Set speciesId (e.g. 380 for Latias)
    view.setUint16(offset + 8, 380, true);

    // Set hp
    view.setUint16(offset + 10, 150, true);

    // Set level
    view.setUint8(offset + 12, 40);

    // Set statusCondition (e.g. 1 for Sleep)
    view.setUint8(offset + 13, 1);

    // Set active
    view.setUint8(offset + 19, 1);

    const result = parseGen3Roamer(view, 0, 'ruby');

    expect(result).toEqual({
      ivs: { hp: 31, atk: 10, def: 15, spd: 20, spAtk: 25, spDef: 30 },
      personalityValue: 0x12345678,
      speciesId: 380,
      hp: 150,
      level: 40,
      statusCondition: 1,
      active: true,
    });
  });

  it('should explicitly catch RangeError and throw corrupted file error on out-of-bounds reads', () => {
    // A buffer that is not large enough to hold the 20-byte roamer struct at the correct offset
    const buffer = new ArrayBuffer(0x3144 + 10);
    const view = new DataView(buffer);

    expect(() => parseGen3Roamer(view, 0, 'ruby')).toThrowError('The save file is corrupted or incomplete.');
  });
});
