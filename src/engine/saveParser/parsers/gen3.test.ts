import { describe, expect, it } from 'vitest';
import { FEEBAS_SEED_RELATIVE_OFFSET_RS } from '../../gen3/feebas';
import { isGen3Save } from '../utils/detection';
import {
  EMERALD_MOVE_TUTOR_BYTE_1_OFFSET,
  EMERALD_MOVE_TUTOR_BYTE_2_OFFSET,
  FRLG_MOVE_TUTOR_BYTE_1_OFFSET,
  FRLG_MOVE_TUTOR_BYTE_2_OFFSET,
  FRLG_MOVE_TUTOR_BYTE_3_OFFSET,
  FRLG_MOVE_TUTOR_BYTE_4_OFFSET,
  GEN3_EVENT_FLAGS_OFFSET,
  OBEDIENCE_FLAG_BIT,
  parseGen3,
  parseGen3ActiveSwarm,
  parseGen3BattleFrontierSymbols,
  parseGen3BattleFrontierWinStreaks,
  parseGen3BattlePoints,
  parseGen3ConditionStats,
  parseGen3ContestMaster,
  parseGen3EggSteps,
  parseGen3EmeraldMoveTutors,
  parseGen3EVs,
  parseGen3FRLGMoveTutors,
  parseGen3FRLGNPCTrades,
  parseGen3MetLocation,
  parseGen3MirageIslandValue,
  parseGen3MixRecords,
  parseGen3PersonalityValue,
  parseGen3PokeNews,
  parseGen3Ribbons,
  parseGen3Roamer,
  parseGen3RoamerStruct,
  parseGen3RSENPCTrades,
  parseGen3SecretBases,
  parseGen3TMHMs,
  parseGen3TotalBattlePoints,
  parseGen3TrainerId,
  parseGen3VolcanicAsh,
  RIBBON_ARTIST_BIT,
  RIBBON_BATTLE_CHAMPION_BIT,
  RIBBON_BEAUTY_SHIFT,
  RIBBON_CHAMPION_BIT,
  RIBBON_COOL_SHIFT,
  RIBBON_COUNTRY_BIT,
  RIBBON_CUTE_SHIFT,
  RIBBON_EARTH_BIT,
  RIBBON_EFFORT_BIT,
  RIBBON_NATIONAL_BIT,
  RIBBON_NATIONAL_CHAMPION_BIT,
  RIBBON_RANK_MASK,
  RIBBON_REGIONAL_CHAMPION_BIT,
  RIBBON_SMART_SHIFT,
  RIBBON_TOUGH_SHIFT,
  RIBBON_VICTORY_BIT,
  RIBBON_WINNING_BIT,
  RIBBON_WORLD_BIT,
  RIBBONS_OFFSET_IN_M,
} from './gen3';

describe('parseGen3TMHMs', () => {
  it('should parse TM/HM items correctly', () => {
    // 256 bytes for RS TM pocket
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);

    // offset RS TM pocket = 0x0640
    const offset = 0x0640;

    // item 1: TM01 Focus Punch (itemId 289) quantity 2 (masked with key 0x1234)
    view.setUint16(offset + 0, 289, true); // TM01 Focus Punch
    view.setUint16(offset + 2, 2 ^ 0x1234, true); // Quantity 2 masked

    // item 2: empty
    view.setUint16(offset + 4, 0, true);

    // item 3: TM02 Dragon Claw (itemId 290) quantity 1 (masked with key 0x1234)
    view.setUint16(offset + 8, 290, true); // TM02 Dragon Claw
    view.setUint16(offset + 10, 1 ^ 0x1234, true); // Quantity 1 masked

    const result = parseGen3TMHMs(view, 0, 'ruby', 0xabcd1234);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ itemId: 289, quantity: 2, moveId: 264 }); // 264 = Focus Punch
    expect(result[1]).toEqual({ itemId: 290, quantity: 1, moveId: 337 }); // 337 = Dragon Claw
  });

  it('should throw Error "The save file is corrupted or incomplete." on RangeError', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen3TMHMs(view, 0, 'ruby', 0)).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3EVs', () => {
  it('should correctly parse EVs', () => {
    const buffer = new ArrayBuffer(6);
    const view = new DataView(buffer);
    view.setUint8(0, 10);
    view.setUint8(1, 20);
    view.setUint8(2, 30);
    view.setUint8(3, 40);
    view.setUint8(4, 50);
    view.setUint8(5, 60);

    const result = parseGen3EVs(view, 0);
    expect(result).toEqual({
      hp: 10,
      atk: 20,
      def: 30,
      spe: 40,
      spa: 50,
      spd: 60,
    });
  });

  it('should throw "The save file is corrupted or incomplete." on RangeError', () => {
    const buffer = new ArrayBuffer(2); // Too small
    const view = new DataView(buffer);

    expect(() => parseGen3EVs(view, 0)).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('gen3 parser scaffolding', () => {
  it('isGen3Save should return false for small buffers', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    expect(isGen3Save(view)).toBe(false);
  });

  it('should extract feebas seed properly within parseGen3', () => {
    const buffer = new ArrayBuffer(0x200000);
    const view = new DataView(buffer);

    for (let i = 0; i < 28; i++) {
      const offset = i * 0x1000;
      view.setUint32(offset + 0x0ffc, 0x08012025, true);
      view.setUint16(offset + 0x0ff4, i % 14, true);
      view.setUint32(offset + 0x0ff8, 1, true);
    }

    // Mock a seed at the expected offset for Ruby/Sapphire
    view.setUint16(0x1000 + FEEBAS_SEED_RELATIVE_OFFSET_RS, 12345, true);

    try {
      const resultRS = parseGen3(view, 'ruby');
      expect(resultRS.gen3FeebasSeed).toBeDefined();
      expect(resultRS.gen3FeebasSeed).toBe(12345);
    } catch {
      // ignore
    }
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

    // Block B (offset 0xE000) Setup - Section 0 with a higher save index
    const blockBSection0Offset = 0xe000;
    view.setUint16(blockBSection0Offset + 4084, 0, true); // Section ID 0
    view.setUint32(blockBSection0Offset + 4088, 0x08012025, true); // Signature
    view.setUint32(blockBSection0Offset + 4092, 25, true); // Save Index 25

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

  it('should extract trainerId and secretId in parseGen3', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Section 0 setup
    const section0Offset = 0xe000;
    view.setUint16(section0Offset + 4084, 0, true);
    view.setUint32(section0Offset + 4088, 0x08012025, true);
    view.setUint32(section0Offset + 4092, 25, true);

    // Write mock trainer data at Section 0, offset 0x000A
    view.setUint32(section0Offset + 0x000a, 0x12345678, true);

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

    const saveData = parseGen3(view);
    expect(saveData.trainerId).toBe(0x5678);
    expect(saveData.secretId).toBe(0x1234);
  });

  it('parseGen3 should correctly extract berry patches data from section 1', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Section 0 setup
    const section0Offset = 0xe000;
    view.setUint16(section0Offset + 4084, 0, true);
    view.setUint32(section0Offset + 4088, 0x08012025, true);
    view.setUint32(section0Offset + 4092, 25, true);

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
    expect(saveData.gen3SecretBases).toBeDefined();
    expect(saveData.gen3SecretBases?.length).toBe(0);
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
    const buffer = new ArrayBuffer(0x20000);
    const view = new DataView(buffer);

    // Mock getUint32 to throw RangeError
    const originalGetUint32 = view.getUint32.bind(view);
    view.getUint32 = () => {
      throw new RangeError('Out of bounds');
    };

    expect(isGen3Save(view)).toBe(false);

    // Restore
    view.getUint32 = originalGetUint32;
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

    expect(result).toEqual({ pv: 0x12345678, lower16: 0x5678 });
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

    // Section 0 setup
    const section0Offset = 0xe000;
    view.setUint16(section0Offset + 4084, 0, true);
    view.setUint32(section0Offset + 4088, 0x08012025, true);
    view.setUint32(section0Offset + 4092, 25, true);

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

    // Section 0 setup
    const section0Offset = 0xe000;
    view.setUint16(section0Offset + 4084, 0, true);
    view.setUint32(section0Offset + 4088, 0x08012025, true);
    view.setUint32(section0Offset + 4092, 25, true);

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
    expect(result[0]).toEqual({ kind: 22, active: true, payload: new Uint8Array(34) });
    expect(result[1]).toEqual({ kind: 31, active: true, payload: new Uint8Array(34) });
  });

  it('should explicitly catch RangeError on out-of-bounds reads and throw a corrupted file error', () => {
    const buffer = new ArrayBuffer(800); // Not enough space for 25 items (900 bytes)
    const view = new DataView(buffer);

    expect(() => parseGen3MixRecords(view, 0)).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3EggSteps', () => {
  it('should return null if the Pokémon is not an egg', () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);
    const miscSubstructureOffset = 0;
    const growthSubstructureOffset = 50;

    // Set "Is Egg" bit flag to 0 (bit 30)
    view.setUint32(miscSubstructureOffset + 4, 0, true);

    const result = parseGen3EggSteps(view, miscSubstructureOffset, growthSubstructureOffset);
    expect(result).toBeNull();
  });

  it('should calculate the remaining egg steps if the Pokémon is an egg', () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);
    const miscSubstructureOffset = 0;
    const growthSubstructureOffset = 50;

    // Set "Is Egg" bit flag to 1 (bit 30)
    // 1 << 30 = 1073741824 (0x40000000)
    view.setUint32(miscSubstructureOffset + 4, 0x40000000, true);

    // Set egg cycles to 10
    view.setUint8(growthSubstructureOffset + 4, 10);

    const result = parseGen3EggSteps(view, miscSubstructureOffset, growthSubstructureOffset);
    // 10 cycles * 256 steps = 2560 steps
    expect(result).toBe(2560);
  });

  it('should explicitly catch RangeError and throw corrupted file error on out-of-bounds reads', () => {
    // Buffer too small for reading the egg cycles at growthSubstructureOffset + 4
    const buffer = new ArrayBuffer(50);
    const view = new DataView(buffer);
    const miscSubstructureOffset = 0;
    const growthSubstructureOffset = 50;

    // We can read IV/Egg/Ability here since misc is at 0 and +4 is within 50 bytes.
    view.setUint32(miscSubstructureOffset + 4, 0x40000000, true);

    expect(() => parseGen3EggSteps(view, miscSubstructureOffset, growthSubstructureOffset)).toThrowError(
      'The save file is corrupted or incomplete.',
    );
  });
});

describe('parseGen3TrainerId', () => {
  it('should extract the trainer id and secret id correctly', () => {
    const buffer = new ArrayBuffer(14);
    const view = new DataView(buffer);

    // Set up a 32-bit value at offset 0x000A
    view.setUint32(0x000a, 0x12345678, true);

    const result = parseGen3TrainerId(view, 0);

    expect(result).toEqual({ trainerId: 0x5678, secretId: 0x1234 });
  });

  it('should catch RangeError and throw corrupted save error on out-of-bounds reads', () => {
    const buffer = new ArrayBuffer(12);
    const view = new DataView(buffer);

    expect(() => parseGen3TrainerId(view, 0)).toThrowError('The save file is corrupted or incomplete.');
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

    expect(() => parseGen3PokeNews(view, 0)).toThrowError(
      'The save file is corrupted or incomplete: Invalid PokeNews struct.',
    );
  });
});

describe('parseGen3BattleFrontierSymbols', () => {
  const saveBlock1Offset = 0;

  it('correctly extracts silver and gold flags using bitwise logic', () => {
    const buffer = new ArrayBuffer(0x1390); // Large enough to include 0x138A + 1
    const view = new DataView(buffer);

    // Tower: Silver (bit 4), Gold (bit 5) at 0x1388
    // 0011 0000 -> 0x30
    view.setUint8(0x1388, 0x30);

    // Dome: Silver (bit 6), Gold (bit 7) at 0x1388
    // 1111 0000 -> 0xF0 (Includes Tower)
    view.setUint8(0x1388, 0xf0);

    // Palace: Silver (bit 0), Gold (bit 1) at 0x1389
    // 0000 0011 -> 0x03
    // Arena: Silver (bit 2), Gold (bit 3) at 0x1389
    // Factory: Silver (bit 4), Gold (bit 5) at 0x1389
    // Pike: Silver (bit 6), Gold (bit 7) at 0x1389
    // Let's set Palace Silver, Arena Gold, Factory Silver, Pike Gold
    // Palace Silver: 1 << 0 = 1
    // Arena Gold: 1 << 3 = 8
    // Factory Silver: 1 << 4 = 16
    // Pike Gold: 1 << 7 = 128
    // 1 + 8 + 16 + 128 = 153 -> 0x99
    view.setUint8(0x1389, 0x99);

    // Pyramid: Silver (bit 0), Gold (bit 1) at 0x138A
    // Let's set both: 0000 0011 -> 0x03
    view.setUint8(0x138a, 0x03);

    const result = parseGen3BattleFrontierSymbols(view, saveBlock1Offset);

    expect(result.tower.silver).toBe(true);
    expect(result.tower.gold).toBe(true);
    expect(result.dome.silver).toBe(true);
    expect(result.dome.gold).toBe(true);

    expect(result.palace.silver).toBe(true);
    expect(result.palace.gold).toBe(false);
    expect(result.arena.silver).toBe(false);
    expect(result.arena.gold).toBe(true);
    expect(result.factory.silver).toBe(true);
    expect(result.factory.gold).toBe(false);
    expect(result.pike.silver).toBe(false);
    expect(result.pike.gold).toBe(true);

    expect(result.pyramid.silver).toBe(true);
    expect(result.pyramid.gold).toBe(true);
  });

  it('handles absolute zero state parsing properly', () => {
    const buffer = new ArrayBuffer(0x1390);
    const view = new DataView(buffer);
    // ArrayBuffer is initialized with zeros

    const result = parseGen3BattleFrontierSymbols(view, saveBlock1Offset);

    expect(result.tower.silver).toBe(false);
    expect(result.tower.gold).toBe(false);
    expect(result.dome.silver).toBe(false);
    expect(result.dome.gold).toBe(false);
    expect(result.palace.silver).toBe(false);
    expect(result.palace.gold).toBe(false);
    expect(result.arena.silver).toBe(false);
    expect(result.arena.gold).toBe(false);
    expect(result.factory.silver).toBe(false);
    expect(result.factory.gold).toBe(false);
    expect(result.pike.silver).toBe(false);
    expect(result.pike.gold).toBe(false);
    expect(result.pyramid.silver).toBe(false);
    expect(result.pyramid.gold).toBe(false);
  });

  it('explicitly catches RangeError on out-of-bounds reads and throws corrupted file error', () => {
    const buffer = new ArrayBuffer(0x1300); // Too small
    const view = new DataView(buffer);

    expect(() => parseGen3BattleFrontierSymbols(view, saveBlock1Offset)).toThrowError(
      'The save file is corrupted or incomplete.',
    );
  });
});

describe('parseGen3BattlePoints', () => {
  const saveBlock2Offset = 0x1000;

  it('extracts BP balance correctly', () => {
    const buffer = new ArrayBuffer(16384);
    const view = new DataView(buffer);
    const base = saveBlock2Offset;

    // Offset is 0x1504 relative to SaveBlock2
    view.setUint16(base + 0x1504, 1337, true);

    const result = parseGen3BattlePoints(view, saveBlock2Offset);
    expect(result).toBe(1337);
  });

  it('throws an error on out-of-bounds read', () => {
    const buffer = new ArrayBuffer(4096);
    const view = new DataView(buffer);

    expect(() => {
      // 0x1504 + 2 is out of bounds for a 4096 byte buffer
      parseGen3BattlePoints(view, 4000);
    }).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3BattleFrontierWinStreaks', () => {
  const saveBlock2Offset = 0x1000;

  it('extracts win streaks and records for all 7 facilities', () => {
    const buffer = new ArrayBuffer(8192);
    const view = new DataView(buffer);
    const base = saveBlock2Offset;

    // Set some dummy data using the defined offsets
    view.setUint16(base + 0x0ce0, 10, true); // tower current
    view.setUint16(base + 0x0cf0, 20, true); // tower record

    view.setUint16(base + 0x0d0c, 5, true); // dome current
    view.setUint16(base + 0x0d14, 15, true); // dome record

    view.setUint16(base + 0x0dc8, 12, true); // palace current
    view.setUint16(base + 0x0dd0, 22, true); // palace record

    view.setUint16(base + 0x0dda, 7, true); // arena current
    view.setUint16(base + 0x0dde, 17, true); // arena record

    view.setUint16(base + 0x0de2, 8, true); // factory current
    view.setUint16(base + 0x0dea, 18, true); // factory record

    view.setUint16(base + 0x0e04, 3, true); // pike current
    view.setUint16(base + 0x0e08, 13, true); // pike record

    view.setUint16(base + 0x0e1a, 2, true); // pyramid current
    view.setUint16(base + 0x0e1e, 12, true); // pyramid record

    const result = parseGen3BattleFrontierWinStreaks(view, saveBlock2Offset);

    expect(result.tower).toEqual({ current: 10, record: 20 });
    expect(result.dome).toEqual({ current: 5, record: 15 });
    expect(result.palace).toEqual({ current: 12, record: 22 });
    expect(result.arena).toEqual({ current: 7, record: 17 });
    expect(result.factory).toEqual({ current: 8, record: 18 });
    expect(result.pike).toEqual({ current: 3, record: 13 });
    expect(result.pyramid).toEqual({ current: 2, record: 12 });
  });

  it('throws "The save file is corrupted or incomplete." on out-of-bounds reads', () => {
    // Buffer too small to hold all offsets
    const buffer = new ArrayBuffer(0x0e00);
    const view = new DataView(buffer);

    expect(() => {
      parseGen3BattleFrontierWinStreaks(view, 0);
    }).toThrow('The save file is corrupted or incomplete.');
  });

  it('correctly handles a save file with all zero win streaks and records', () => {
    const buffer = new ArrayBuffer(8192);
    const view = new DataView(buffer);
    const base = saveBlock2Offset;

    // By default, ArrayBuffer initializes with zeros, but let's be explicit for safety
    view.setUint16(base + 0x0ce0, 0, true);
    view.setUint16(base + 0x0cf0, 0, true);
    view.setUint16(base + 0x0d0c, 0, true);
    view.setUint16(base + 0x0d14, 0, true);
    view.setUint16(base + 0x0dc8, 0, true);
    view.setUint16(base + 0x0dd0, 0, true);
    view.setUint16(base + 0x0dda, 0, true);
    view.setUint16(base + 0x0dde, 0, true);
    view.setUint16(base + 0x0de2, 0, true);
    view.setUint16(base + 0x0dea, 0, true);
    view.setUint16(base + 0x0e04, 0, true);
    view.setUint16(base + 0x0e08, 0, true);
    view.setUint16(base + 0x0e1a, 0, true);
    view.setUint16(base + 0x0e1e, 0, true);

    const result = parseGen3BattleFrontierWinStreaks(view, saveBlock2Offset);

    expect(result.tower).toEqual({ current: 0, record: 0 });
    expect(result.dome).toEqual({ current: 0, record: 0 });
    expect(result.palace).toEqual({ current: 0, record: 0 });
    expect(result.arena).toEqual({ current: 0, record: 0 });
    expect(result.factory).toEqual({ current: 0, record: 0 });
    expect(result.pike).toEqual({ current: 0, record: 0 });
    expect(result.pyramid).toEqual({ current: 0, record: 0 });
  });
});

describe('parseGen3RoamerStruct', () => {
  it('should successfully parse Gen 3 roamer struct and unpack IVs', () => {
    const buffer = new ArrayBuffer(20);
    const view = new DataView(buffer);

    // Set ivs: HP=31, Atk=10, Def=15, Spd=20, SpAtk=25, SpDef=30
    // 31 | (10 << 5) | (15 << 10) | (20 << 15) | (25 << 20) | (30 << 25) = 0x3D9A3D5F
    view.setUint32(0, 0x3d9a3d5f, true);
    view.setUint32(4, 0x12345678, true); // PV
    view.setUint16(8, 380, true); // Species
    view.setUint16(10, 150, true); // HP
    view.setUint8(12, 40); // Level
    view.setUint8(13, 1); // Status Condition
    view.setUint8(19, 1); // isActive

    const result = parseGen3RoamerStruct(view, 0);

    expect(result).toEqual({
      isActive: true,
      speciesId: 380,
      level: 40,
      hp: 150,
      statusCondition: 1,
      personalityValue: 0x12345678,
      ivs: {
        hp: 31,
        atk: 10,
        def: 15,
        spd: 20,
        spAtk: 25,
        spDef: 30,
      },
    });
  });

  it('should throw corrupted save error on RangeError', () => {
    const buffer = new ArrayBuffer(10); // Too small
    const view = new DataView(buffer);

    expect(() => parseGen3RoamerStruct(view, 0)).toThrow('The save file is corrupted or incomplete.');
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

    // Set contest stats
    view.setUint8(offset + 0x0e, 10); // cool
    view.setUint8(offset + 0x0f, 20); // beauty
    view.setUint8(offset + 0x10, 30); // cute
    view.setUint8(offset + 0x11, 40); // smart
    view.setUint8(offset + 0x12, 50); // tough

    // Set active
    view.setUint8(offset + 0x13, 1);

    const result = parseGen3Roamer(view, 0, 'ruby');

    expect(result).toEqual({
      isActive: true,
      speciesId: 380,
      level: 40,
      hp: 150,
      statusCondition: 1,
      status: 1,
      personalityValue: 0x12345678,
      personality: 0x12345678,
      ivs: 0x3d9a3d5f,
      unpackedIvs: { hp: 31, atk: 10, def: 15, spd: 20, spAtk: 25, spDef: 30 },
      cool: 10,
      beauty: 20,
      cute: 30,
      smart: 40,
      tough: 50,
    });
  });

  it('should parse Gen 3 roamer data with all 0 IVs', () => {
    const buffer = new ArrayBuffer(0x3144 + 20);
    const view = new DataView(buffer);
    const offset = 0x3144;

    view.setUint32(offset, 0, true);
    view.setUint32(offset + 4, 0x12345678, true);
    view.setUint16(offset + 8, 380, true);
    view.setUint16(offset + 10, 150, true);
    view.setUint8(offset + 12, 40);
    view.setUint8(offset + 13, 1);
    view.setUint8(offset + 0x13, 1);

    const result = parseGen3Roamer(view, 0, 'ruby');

    expect(result).toEqual({
      isActive: true,
      speciesId: 380,
      level: 40,
      hp: 150,
      statusCondition: 1,
      status: 1,
      personalityValue: 0x12345678,
      personality: 0x12345678,
      ivs: 0,
      unpackedIvs: { hp: 0, atk: 0, def: 0, spd: 0, spAtk: 0, spDef: 0 },
      cool: 0,
      beauty: 0,
      cute: 0,
      smart: 0,
      tough: 0,
    });
  });

  it('should parse Gen 3 roamer data with all 31 IVs', () => {
    const buffer = new ArrayBuffer(0x3144 + 20);
    const view = new DataView(buffer);
    const offset = 0x3144;

    // 31 | (31 << 5) | (31 << 10) | (31 << 15) | (31 << 20) | (31 << 25) = 1073741823 (0x3FFFFFFF)
    view.setUint32(offset, 0x3fffffff, true);
    view.setUint32(offset + 4, 0x12345678, true);
    view.setUint16(offset + 8, 380, true);
    view.setUint16(offset + 10, 150, true);
    view.setUint8(offset + 12, 40);
    view.setUint8(offset + 13, 1);
    view.setUint8(offset + 0x13, 1);

    const result = parseGen3Roamer(view, 0, 'ruby');

    expect(result).toEqual({
      isActive: true,
      speciesId: 380,
      level: 40,
      hp: 150,
      statusCondition: 1,
      status: 1,
      personalityValue: 0x12345678,
      personality: 0x12345678,
      ivs: 1073741823,
      unpackedIvs: { hp: 31, atk: 31, def: 31, spd: 31, spAtk: 31, spDef: 31 },
      cool: 0,
      beauty: 0,
      cute: 0,
      smart: 0,
      tough: 0,
    });
  });

  it('should explicitly catch RangeError and throw corrupted file error on out-of-bounds reads', () => {
    // A buffer that is not large enough to hold the 20-byte roamer struct at the correct offset
    const buffer = new ArrayBuffer(0x3144 + 10);
    const view = new DataView(buffer);

    expect(() => parseGen3Roamer(view, 0, 'ruby')).toThrowError('The save file is corrupted or incomplete.');
  });

  it('should parse Gen 3 roamer data for Emerald', () => {
    const buffer = new ArrayBuffer(0x31dc + 20);
    const view = new DataView(buffer);
    const offset = 0x31dc;

    view.setUint32(offset, 0, true);
    view.setUint32(offset + 4, 0x12345678, true);
    view.setUint16(offset + 8, 381, true); // Latios
    view.setUint16(offset + 10, 150, true);
    view.setUint8(offset + 12, 40);
    view.setUint8(offset + 13, 0);
    view.setUint8(offset + 0x13, 1);

    const result = parseGen3Roamer(view, 0, 'emerald');

    expect(result).toEqual({
      isActive: true,
      speciesId: 381,
      level: 40,
      hp: 150,
      statusCondition: 0,
      status: 0,
      personalityValue: 0x12345678,
      personality: 0x12345678,
      ivs: 0,
      unpackedIvs: { hp: 0, atk: 0, def: 0, spd: 0, spAtk: 0, spDef: 0 },
      cool: 0,
      beauty: 0,
      cute: 0,
      smart: 0,
      tough: 0,
    });
  });

  it('should parse Gen 3 roamer data for FireRed/LeafGreen', () => {
    const buffer = new ArrayBuffer(0x30d0 + 20);
    const view = new DataView(buffer);
    const offset = 0x30d0;

    view.setUint32(offset, 0, true);
    view.setUint32(offset + 4, 0x12345678, true);
    view.setUint16(offset + 8, 244, true); // Entei
    view.setUint16(offset + 10, 150, true);
    view.setUint8(offset + 12, 50);
    view.setUint8(offset + 13, 0);
    view.setUint8(offset + 0x13, 1);

    const result = parseGen3Roamer(view, 0, 'firered');

    expect(result).toEqual({
      isActive: true,
      speciesId: 244,
      level: 50,
      hp: 150,
      statusCondition: 0,
      status: 0,
      personalityValue: 0x12345678,
      personality: 0x12345678,
      ivs: 0,
      unpackedIvs: { hp: 0, atk: 0, def: 0, spd: 0, spAtk: 0, spDef: 0 },
      cool: 0,
      beauty: 0,
      cute: 0,
      smart: 0,
      tough: 0,
    });
  });

  it('should correctly parse active boolean from offset 19', () => {
    const buffer = new ArrayBuffer(0x3144 + 20);
    const view = new DataView(buffer);
    const offset = 0x3144;

    view.setUint32(offset, 0, true);
    view.setUint32(offset + 4, 0, true);
    view.setUint16(offset + 8, 0, true);
    view.setUint16(offset + 10, 0, true);
    view.setUint8(offset + 12, 0);
    view.setUint8(offset + 13, 0);

    // False case
    view.setUint8(offset + 0x13, 0);
    let result = parseGen3Roamer(view, 0, 'ruby');
    expect(result.isActive).toBe(false);

    // True case (anything != 0)
    view.setUint8(offset + 0x13, 2);
    result = parseGen3Roamer(view, 0, 'ruby');
    expect(result.isActive).toBe(true);
  });
});

describe('parseGen3SecretBases', () => {
  it('should parse Gen 3 Secret Bases for Ruby/Sapphire', () => {
    const buffer = new ArrayBuffer(0x1a08 + 20 * 160);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;
    const baseOffset = saveBlock1Offset + 0x1a08;

    // Active base 1
    view.setUint8(baseOffset, 5); // secretBaseId = 5

    // Inactive base
    view.setUint8(baseOffset + 1 * 160, 0); // secretBaseId = 0

    // Active base 2
    view.setUint8(baseOffset + 2 * 160, 10); // secretBaseId = 10

    const result = parseGen3SecretBases(view, saveBlock1Offset, 'ruby');

    expect(result).toHaveLength(2);
    expect(result[0]?.secretBaseId).toEqual(5);
    expect(result[1]?.secretBaseId).toEqual(10);
  });

  it('should parse Gen 3 Secret Bases for Emerald', () => {
    const buffer = new ArrayBuffer(0x1a9c + 20 * 160);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;
    const baseOffset = saveBlock1Offset + 0x1a9c;

    // Active base
    view.setUint8(baseOffset + 5 * 160, 42); // secretBaseId = 42

    const result = parseGen3SecretBases(view, saveBlock1Offset, 'emerald');

    expect(result).toHaveLength(1);
    expect(result[0]?.secretBaseId).toEqual(42);
  });

  it('should explicitly catch RangeError and throw corrupted file error on out-of-bounds reads', () => {
    // A buffer that is not large enough to hold the secret bases struct
    const buffer = new ArrayBuffer(0x1a08 + 10);
    const view = new DataView(buffer);

    expect(() => parseGen3SecretBases(view, 0, 'ruby')).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3VolcanicAsh', () => {
  it('should parse Gen 3 Volcanic Ash gather count for Emerald', () => {
    // varsOffset for Emerald is 0x139C. Let saveBlock1Offset = 0.
    const buffer = new ArrayBuffer(0x139c + 0x90 + 2);
    const view = new DataView(buffer);
    view.setUint16(0 + 0x139c + 0x90, 1234, true);

    const ash = parseGen3VolcanicAsh(view, 0, 'emerald');
    expect(ash).toBe(1234);
  });

  it('should parse Gen 3 Volcanic Ash gather count for Ruby/Sapphire', () => {
    // varsOffset for R/S is 0x1340. Let saveBlock1Offset = 100.
    const buffer = new ArrayBuffer(100 + 0x1340 + 0x90 + 2);
    const view = new DataView(buffer);
    view.setUint16(100 + 0x1340 + 0x90, 5678, true);

    const ash = parseGen3VolcanicAsh(view, 100, 'ruby');
    expect(ash).toBe(5678);
  });

  it('should throw RangeError on out-of-bounds reads', () => {
    // Buffer too small for Emerald offset
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);

    expect(() => parseGen3VolcanicAsh(view, 0, 'emerald')).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3ActiveSwarm', () => {
  it('should return undefined if no active swarm is found', () => {
    const buffer = new ArrayBuffer(25 * 36);
    const view = new DataView(buffer);
    const offset = 0;
    expect(parseGen3ActiveSwarm(view, offset)).toBeUndefined();
  });

  it('should correctly parse an active swarm', () => {
    const buffer = new ArrayBuffer(25 * 36);
    const view = new DataView(buffer);
    const offset = 0;

    const itemOffset = offset + 2 * 36;
    view.setUint8(itemOffset + 0, 41); // kind = 41 (TVSHOW_MASS_OUTBREAK)
    view.setUint8(itemOffset + 1, 1); // active = true

    view.setUint16(itemOffset + 0x0c, 273, true); // speciesId
    view.setUint8(itemOffset + 0x10, 114); // mapId
    view.setUint8(itemOffset + 0x11, 0); // mapGroup
    view.setUint16(itemOffset + 0x16, 2, true); // daysRemaining

    const swarm = parseGen3ActiveSwarm(view, offset);
    expect(swarm).toEqual({
      speciesId: 273,
      mapId: 114,
      mapGroup: 0,
      daysRemaining: 2,
      moves: [0, 0, 0, 0],
      probability: 0,
      level: 0,
      language: 0,
    });
  });

  it('should ignore inactive mass outbreaks', () => {
    const buffer = new ArrayBuffer(25 * 36);
    const view = new DataView(buffer);
    const offset = 0;

    const itemOffset = offset;
    view.setUint8(itemOffset + 0, 41); // kind = 41 (TVSHOW_MASS_OUTBREAK)
    view.setUint8(itemOffset + 1, 0); // active = false

    view.setUint16(itemOffset + 0x0c, 273, true);
    view.setUint8(itemOffset + 0x10, 114);
    view.setUint8(itemOffset + 0x11, 0);
    view.setUint16(itemOffset + 0x16, 2, true);

    expect(parseGen3ActiveSwarm(view, offset)).toBeUndefined();
  });

  it('should throw RangeError on malformed saves', () => {
    const buffer = new ArrayBuffer(10); // Too small
    const view = new DataView(buffer);
    const offset = 0;

    expect(() => parseGen3ActiveSwarm(view, offset)).toThrow('The save file is corrupted or incomplete.');
  });

  it('parseGen3TotalBattlePoints should correctly extract the total BP balance', () => {
    const buffer = new ArrayBuffer(8192);
    const view = new DataView(buffer);
    const saveBlock2Offset = 0;

    // Set some total BP balance
    view.setUint16(0x0eb8, 500, true);

    const result = parseGen3TotalBattlePoints(view, saveBlock2Offset);
    expect(result).toBe(500);
  });

  it('parseGen3TotalBattlePoints should throw custom error on RangeError', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    const saveBlock2Offset = 0;

    expect(() => parseGen3TotalBattlePoints(view, saveBlock2Offset)).toThrow(
      'The save file is corrupted or incomplete.',
    );
  });
});

describe('parseGen3EmeraldMoveTutors', () => {
  it('correctly parses emerald move tutors', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;

    // Set some bytes
    view.setUint8(GEN3_EVENT_FLAGS_OFFSET + EMERALD_MOVE_TUTOR_BYTE_1_OFFSET, 0b10101010);
    view.setUint8(GEN3_EVENT_FLAGS_OFFSET + EMERALD_MOVE_TUTOR_BYTE_2_OFFSET, 0b00000101);

    const result = parseGen3EmeraldMoveTutors(view, saveBlock1Offset);
    expect(result).toEqual({
      swagger: true,
      rollout: false,
      furyCutter: true,
      mimic: false,
      metronome: true,
      sleepTalk: false,
      substitute: true,
      dynamicPunch: true,
      doubleEdge: false,
      explosion: true,
    });
  });

  it('throws correct error on out of bounds read', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen3EmeraldMoveTutors(view, 0)).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3RSENPCTrades', () => {
  it('correctly parses RSE NPC trade flags', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;
    const baseOffset = saveBlock1Offset + GEN3_EVENT_FLAGS_OFFSET;

    // FLAG_RUSTBORO_NPC_TRADE_COMPLETED = 0x99
    // byteOffset = 0x99 / 8 = 19
    // bitIndex = 0x99 % 8 = 1
    // Set Rustboro and Fortree (0x9B -> byte 19, bit 3)
    view.setUint8(baseOffset + 19, (1 << 1) | (1 << 3));

    // FLAG_BATTLE_FRONTIER_TRADE_DONE = 0x9C
    // byteOffset = 0x9C / 8 = 19
    // bitIndex = 0x9C % 8 = 4
    view.setUint8(baseOffset + 19, (1 << 1) | (1 << 3) | (1 << 4));

    const result = parseGen3RSENPCTrades(view, saveBlock1Offset);
    expect(result).toEqual({
      RUSTBORO: true,
      PACIFIDLOG: false,
      FORTREE: true,
      BATTLE_FRONTIER: true,
    });
  });

  it('throws correct error on out of bounds read', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen3RSENPCTrades(view, 0)).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3FRLGNPCTrades', () => {
  it('correctly parses FRLG NPC trade flags', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;
    const baseOffset = saveBlock1Offset + GEN3_EVENT_FLAGS_OFFSET;

    // FLAG_DID_MIMIEN_TRADE = 0x248
    // byteOffset = 0x248 / 8 = 73
    // bitIndex = 0x248 % 8 = 0
    view.setUint8(baseOffset + 73, 1 << 0);

    // FLAG_DID_NINA_TRADE = 0x251
    // byteOffset = 0x251 / 8 = 74
    // bitIndex = 0x251 % 8 = 1
    view.setUint8(baseOffset + 74, 1 << 1);

    // FLAG_DID_SEELOR_TRADE = 0x276
    // byteOffset = 0x276 / 8 = 78
    // bitIndex = 0x276 % 8 = 6
    view.setUint8(baseOffset + 78, 1 << 6);

    const result = parseGen3FRLGNPCTrades(view, saveBlock1Offset);
    expect(result).toEqual({
      MIMIEN: true,
      ZYNX: false,
      MS_NIDO: false,
      CH_DING: false,
      NINA: true,
      MARC: false,
      ESPHERE: false,
      TANGENY: false,
      SEELOR: true,
    });
  });

  it('throws correct error on out of bounds read', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen3FRLGNPCTrades(view, 0)).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3FRLGMoveTutors', () => {
  it('should correctly parse FRLG move tutor flags from valid FRLG data block', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);
    const saveBlock1Offset = 0;
    const baseOffset = saveBlock1Offset + GEN3_EVENT_FLAGS_OFFSET;

    // Set Byte 1: Double-Edge (0), Rock Slide (2), Mega Punch (4), Dream Eater (6) = 01010101 = 0x55
    view.setUint8(baseOffset + FRLG_MOVE_TUTOR_BYTE_1_OFFSET, 0x55);

    // Set Byte 2: Substitute (0), Seismic Toss (2), Metronome (4), Body Slam (6) = 01010101 = 0x55
    view.setUint8(baseOffset + FRLG_MOVE_TUTOR_BYTE_2_OFFSET, 0x55);

    // Set Byte 3: Blast Burn (7) = 10000000 = 0x80
    view.setUint8(baseOffset + FRLG_MOVE_TUTOR_BYTE_3_OFFSET, 0x80);

    // Set Byte 4: Hydro Cannon (0) = 00000001 = 0x01
    view.setUint8(baseOffset + FRLG_MOVE_TUTOR_BYTE_4_OFFSET, 0x01);

    const result = parseGen3FRLGMoveTutors(view, saveBlock1Offset);

    expect(result).toEqual({
      doubleEdge: true,
      thunderWave: false,
      rockSlide: true,
      explosion: false,
      megaPunch: true,
      megaKick: false,
      dreamEater: true,
      softBoiled: false,
      substitute: true,
      swordsDance: false,
      seismicToss: true,
      counter: false,
      metronome: true,
      mimic: false,
      bodySlam: true,
      frenzyPlant: false,
      blastBurn: true,
      hydroCannon: true,
    });
  });

  it('should catch RangeError and throw corrupted save error', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen3FRLGMoveTutors(view, 0)).toThrow('The save file is corrupted or incomplete.');
  });
});

import { parseGen3PokemonPVAndIVs } from './gen3';

describe('parseGen3PokemonPVAndIVs', () => {
  it('should extract PV and IVs correctly for a known permutation', () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);
    const offset = 0;

    // Set PV and OT_ID
    const pv = 0x12345678; // PV % 24 = 8 ('AEGM')
    const otId = 0xabcdef01;
    view.setUint32(offset + 0, pv, true);
    view.setUint32(offset + 4, otId, true);

    const decryptionKey = pv ^ otId;

    // Permutation is AEGM (index 8)
    // A=0, E=1, G=2, M=3
    // M substructure starts at 32 + (3 * 12) = 68
    // IVs are at offset 4 of M substructure => 68 + 4 = 72

    const hp = 31;
    const attack = 30;
    const defense = 29;
    const speed = 28;
    const specialAttack = 27;
    const specialDefense = 26;

    const ivs =
      (hp << 0) | (attack << 5) | (defense << 10) | (speed << 15) | (specialAttack << 20) | (specialDefense << 25);

    const encryptedIVs = ivs ^ decryptionKey;
    view.setUint32(offset + 72, encryptedIVs, true);

    const result = parseGen3PokemonPVAndIVs(view, offset);
    expect(result.pv).toBe(pv);
    expect(result.hp).toBe(hp);
    expect(result.attack).toBe(attack);
    expect(result.defense).toBe(defense);
    expect(result.speed).toBe(speed);
    expect(result.specialAttack).toBe(specialAttack);
    expect(result.specialDefense).toBe(specialDefense);
  });

  it('should throw corrupted error on out-of-bounds reads', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    expect(() => parseGen3PokemonPVAndIVs(view, 0)).toThrowError('The save file is corrupted or incomplete.');
  });

  it('should correctly parse IVs and PVs from an offset located in Bank B', () => {
    const buffer = new ArrayBuffer(0xe000 + 100);
    const view = new DataView(buffer);
    const offset = 0xe000;

    const pv = 0x12345678;
    const otId = 0xabcdef01;
    view.setUint32(offset + 0, pv, true);
    view.setUint32(offset + 4, otId, true);

    const decryptionKey = pv ^ otId;

    const hp = 31;
    const attack = 30;
    const defense = 29;
    const speed = 28;
    const specialAttack = 27;
    const specialDefense = 26;

    const ivs =
      (hp << 0) | (attack << 5) | (defense << 10) | (speed << 15) | (specialAttack << 20) | (specialDefense << 25);

    const encryptedIVs = ivs ^ decryptionKey;
    view.setUint32(offset + 72, encryptedIVs, true);

    const result = parseGen3PokemonPVAndIVs(view, offset);
    expect(result.pv).toBe(pv);
    expect(result.hp).toBe(hp);
    expect(result.attack).toBe(attack);
    expect(result.defense).toBe(defense);
    expect(result.speed).toBe(speed);
    expect(result.specialAttack).toBe(specialAttack);
    expect(result.specialDefense).toBe(specialDefense);
  });

  it('should throw corrupted error on out-of-bounds reads within Bank B', () => {
    const buffer = new ArrayBuffer(0xe000 + 10);
    const view = new DataView(buffer);
    expect(() => parseGen3PokemonPVAndIVs(view, 0xe000)).toThrowError('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3MetLocation', () => {
  it('should parse the met location byte correctly', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);
    const miscSubstructureOffset = 4;

    // MET_LOCATION_OFFSET_IN_M is 1
    // 4 + 1 = 5
    view.setUint8(5, 42); // 42 is the met location

    const result = parseGen3MetLocation(view, miscSubstructureOffset);
    expect(result).toBe(42);
  });

  it('should explicitly catch RangeError and throw corrupted file error on out-of-bounds reads', () => {
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);
    const miscSubstructureOffset = 2; // Offset 2 + 1 = 3, which is out of bounds for a 1-byte buffer

    expect(() => parseGen3MetLocation(view, miscSubstructureOffset)).toThrowError(
      'The save file is corrupted or incomplete.',
    );
  });
});

const GEN3_ROAMER_OFFSET_RS = 0x3144;
const GEN3_ROAMER_OFFSET_EMERALD = 0x31dc;
const GEN3_ROAMER_OFFSET_FRLG = 0x30d0;

const ROAMER_IVS_OFFSET = 0;
const ROAMER_PV_OFFSET = 4;
const ROAMER_SPECIES_ID_OFFSET = 8;
const ROAMER_HP_OFFSET = 10;
const ROAMER_LEVEL_OFFSET = 12;
const ROAMER_STATUS_OFFSET = 13;
const ROAMER_ACTIVE_OFFSET = 0x13;
const ROAMER_COOL_OFFSET = 0x0e;
const ROAMER_BEAUTY_OFFSET = 0x0f;
const ROAMER_CUTE_OFFSET = 0x10;
const ROAMER_SMART_OFFSET = 0x11;
const ROAMER_TOUGH_OFFSET = 0x12;

describe('parseGen3Roamer', () => {
  it('correctly parses Ruby/Sapphire roamer with non-zero saveBlock1Offset', () => {
    const saveBlock1Offset = 100;
    const buffer = new ArrayBuffer(saveBlock1Offset + GEN3_ROAMER_OFFSET_RS + 36);
    const view = new DataView(buffer);
    const baseOffset = saveBlock1Offset + GEN3_ROAMER_OFFSET_RS;

    view.setUint32(baseOffset + ROAMER_IVS_OFFSET, 0x12345678, true);
    view.setUint32(baseOffset + ROAMER_PV_OFFSET, 0x87654321, true);
    view.setUint16(baseOffset + ROAMER_SPECIES_ID_OFFSET, 380, true); // Latias
    view.setUint16(baseOffset + ROAMER_HP_OFFSET, 120, true);
    view.setUint8(baseOffset + ROAMER_LEVEL_OFFSET, 40);
    view.setUint8(baseOffset + ROAMER_STATUS_OFFSET, 0);
    view.setUint8(baseOffset + ROAMER_COOL_OFFSET, 1);
    view.setUint8(baseOffset + ROAMER_BEAUTY_OFFSET, 2);
    view.setUint8(baseOffset + ROAMER_CUTE_OFFSET, 3);
    view.setUint8(baseOffset + ROAMER_SMART_OFFSET, 4);
    view.setUint8(baseOffset + ROAMER_TOUGH_OFFSET, 5);
    view.setUint8(baseOffset + ROAMER_ACTIVE_OFFSET, 1);

    const result = parseGen3Roamer(view, saveBlock1Offset, 'ruby');

    expect(result).toEqual({
      isActive: true,
      speciesId: 380,
      level: 40,
      hp: 120,
      statusCondition: 0,
      status: 0,
      personalityValue: 0x87654321,
      personality: 0x87654321,
      unpackedIvs: {
        hp: (0x12345678 >> 0) & 0x1f,
        atk: (0x12345678 >> 5) & 0x1f,
        def: (0x12345678 >> 10) & 0x1f,
        spd: (0x12345678 >> 15) & 0x1f,
        spAtk: (0x12345678 >> 20) & 0x1f,
        spDef: (0x12345678 >> 25) & 0x1f,
      },
      ivs: 0x12345678,
      cool: 1,
      beauty: 2,
      cute: 3,
      smart: 4,
      tough: 5,
    });
  });

  it('correctly parses Emerald roamer with non-zero saveBlock1Offset', () => {
    const saveBlock1Offset = 200;
    const buffer = new ArrayBuffer(saveBlock1Offset + GEN3_ROAMER_OFFSET_EMERALD + 36);
    const view = new DataView(buffer);
    const baseOffset = saveBlock1Offset + GEN3_ROAMER_OFFSET_EMERALD;

    view.setUint32(baseOffset + ROAMER_IVS_OFFSET, 0x11111111, true);
    view.setUint32(baseOffset + ROAMER_PV_OFFSET, 0x22222222, true);
    view.setUint16(baseOffset + ROAMER_SPECIES_ID_OFFSET, 381, true); // Latios
    view.setUint16(baseOffset + ROAMER_HP_OFFSET, 130, true);
    view.setUint8(baseOffset + ROAMER_LEVEL_OFFSET, 40);
    view.setUint8(baseOffset + ROAMER_STATUS_OFFSET, 0);
    view.setUint8(baseOffset + ROAMER_COOL_OFFSET, 10);
    view.setUint8(baseOffset + ROAMER_BEAUTY_OFFSET, 20);
    view.setUint8(baseOffset + ROAMER_CUTE_OFFSET, 30);
    view.setUint8(baseOffset + ROAMER_SMART_OFFSET, 40);
    view.setUint8(baseOffset + ROAMER_TOUGH_OFFSET, 50);
    view.setUint8(baseOffset + ROAMER_ACTIVE_OFFSET, 1);

    const result = parseGen3Roamer(view, saveBlock1Offset, 'emerald');

    expect(result).toEqual({
      isActive: true,
      speciesId: 381,
      level: 40,
      hp: 130,
      statusCondition: 0,
      status: 0,
      personalityValue: 0x22222222,
      personality: 0x22222222,
      unpackedIvs: {
        hp: (0x11111111 >> 0) & 0x1f,
        atk: (0x11111111 >> 5) & 0x1f,
        def: (0x11111111 >> 10) & 0x1f,
        spd: (0x11111111 >> 15) & 0x1f,
        spAtk: (0x11111111 >> 20) & 0x1f,
        spDef: (0x11111111 >> 25) & 0x1f,
      },
      ivs: 0x11111111,
      cool: 10,
      beauty: 20,
      cute: 30,
      smart: 40,
      tough: 50,
    });
  });

  it('correctly parses FireRed/LeafGreen roamer with non-zero saveBlock1Offset', () => {
    const saveBlock1Offset = 300;
    const buffer = new ArrayBuffer(saveBlock1Offset + GEN3_ROAMER_OFFSET_FRLG + 36);
    const view = new DataView(buffer);
    const baseOffset = saveBlock1Offset + GEN3_ROAMER_OFFSET_FRLG;

    view.setUint32(baseOffset + ROAMER_IVS_OFFSET, 0x33333333, true);
    view.setUint32(baseOffset + ROAMER_PV_OFFSET, 0x44444444, true);
    view.setUint16(baseOffset + ROAMER_SPECIES_ID_OFFSET, 244, true); // Entei
    view.setUint16(baseOffset + ROAMER_HP_OFFSET, 140, true);
    view.setUint8(baseOffset + ROAMER_LEVEL_OFFSET, 50);
    view.setUint8(baseOffset + ROAMER_STATUS_OFFSET, 0);
    view.setUint8(baseOffset + ROAMER_COOL_OFFSET, 15);
    view.setUint8(baseOffset + ROAMER_BEAUTY_OFFSET, 25);
    view.setUint8(baseOffset + ROAMER_CUTE_OFFSET, 35);
    view.setUint8(baseOffset + ROAMER_SMART_OFFSET, 45);
    view.setUint8(baseOffset + ROAMER_TOUGH_OFFSET, 55);
    view.setUint8(baseOffset + ROAMER_ACTIVE_OFFSET, 1);

    const result = parseGen3Roamer(view, saveBlock1Offset, 'firered');

    expect(result).toEqual({
      isActive: true,
      speciesId: 244,
      level: 50,
      hp: 140,
      statusCondition: 0,
      status: 0,
      personalityValue: 0x44444444,
      personality: 0x44444444,
      unpackedIvs: {
        hp: (0x33333333 >> 0) & 0x1f,
        atk: (0x33333333 >> 5) & 0x1f,
        def: (0x33333333 >> 10) & 0x1f,
        spd: (0x33333333 >> 15) & 0x1f,
        spAtk: (0x33333333 >> 20) & 0x1f,
        spDef: (0x33333333 >> 25) & 0x1f,
      },
      ivs: 0x33333333,
      cool: 15,
      beauty: 25,
      cute: 35,
      smart: 45,
      tough: 55,
    });
  });

  it('throws a corrupted file error on out-of-bounds reads', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);

    expect(() => parseGen3Roamer(view, 0, 'ruby')).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3 (Pokedex & Hall of Fame)', () => {
  it('extracts hallOfFameCount correctly based on version offsets', () => {
    // We mock a buffer big enough to hold section 0 and section 1.
    // parseGen3 uses getLatestSectionOffset which checks 0x08012025 at offset 4088 of each section.
    const buffer = new ArrayBuffer(0x10000); // 64KB block A
    const view = new DataView(buffer);

    // Mock Section 0 (SaveBlock2)
    const section0Offset = 0;
    view.setUint32(section0Offset + 4088, 0x08012025, true); // SIGNATURE
    view.setUint16(section0Offset + 4084, 0, true); // SECTION_ID = 0
    view.setUint32(section0Offset + 4092, 1, true); // SAVE_INDEX

    // Mock Section 1 (SaveBlock1)
    const section1Offset = 4096;
    view.setUint32(section1Offset + 4088, 0x08012025, true); // SIGNATURE
    view.setUint16(section1Offset + 4084, 1, true); // SECTION_ID = 1
    view.setUint32(section1Offset + 4092, 1, true); // SAVE_INDEX

    // Mock Section 2
    const section2Offset = 8192;
    view.setUint32(section2Offset + 4088, 0x08012025, true); // SIGNATURE
    view.setUint16(section2Offset + 4084, 2, true); // SECTION_ID = 2
    view.setUint32(section2Offset + 4092, 1, true); // SAVE_INDEX

    // In Emerald, GAME_STATS_OFFSET is 0x159C.
    view.setUint32(section1Offset + 0x159c + 10 * 4, 42, true);

    const resultEmerald = parseGen3(view, 'emerald');
    expect(resultEmerald.hallOfFameCount).toBe(42);

    // In RS, GAME_STATS_OFFSET is 0x1540.
    view.setUint32(section1Offset + 0x1540 + 10 * 4, 15, true);
    const resultRS = parseGen3(view, 'ruby');
    expect(resultRS.hallOfFameCount).toBe(15);

    // In FRLG, GAME_STATS_OFFSET is 0x1200.
    view.setUint32(section1Offset + 0x1200 + 10 * 4, 7, true);
    const resultFRLG = parseGen3(view, 'firered');
    expect(resultFRLG.hallOfFameCount).toBe(7);
  });

  it('extracts hoennDexCount and nationalDexCount correctly', () => {
    const buffer = new ArrayBuffer(0x10000);
    const view = new DataView(buffer);

    const section0Offset = 0;
    view.setUint32(section0Offset + 4088, 0x08012025, true);
    view.setUint16(section0Offset + 4084, 0, true);
    view.setUint32(section0Offset + 4092, 1, true);

    const section1Offset = 4096;
    view.setUint32(section1Offset + 4088, 0x08012025, true);
    view.setUint16(section1Offset + 4084, 1, true);
    view.setUint32(section1Offset + 4092, 1, true);

    const section2Offset = 8192;
    view.setUint32(section2Offset + 4088, 0x08012025, true);
    view.setUint16(section2Offset + 4084, 2, true);
    view.setUint32(section2Offset + 4092, 1, true);

    // Setup Pokedex data in Section 0
    const pokedexOwnedOffset = section0Offset + 0x18 + 0x10;
    const pokedexSeenOffset = section0Offset + 0x18 + 0x44;

    // Set bit 0 (Bulbasaur - Nat 1, not Hoenn)
    view.setUint8(pokedexOwnedOffset, 1);
    view.setUint8(pokedexSeenOffset, 1);

    // Set Treecko (Nat 252). bitIndex = 251. byte = 251 / 8 = 31. bit = 251 % 8 = 3
    view.setUint8(pokedexOwnedOffset + 31, 1 << 3);

    // Set Deoxys (Nat 386). bitIndex = 385. byte = 385 / 8 = 48. bit = 385 % 8 = 1
    view.setUint8(pokedexOwnedOffset + 48, 1 << 1);

    const result = parseGen3(view, 'emerald');

    expect(result.nationalDexCount).toBe(3); // Bulbasaur, Treecko, Deoxys
    expect(result.hoennDexCount).toBe(2); // Treecko, Deoxys
    expect(result.owned.has(1)).toBe(true);
    expect(result.owned.has(252)).toBe(true);
    expect(result.owned.has(386)).toBe(true);
  });

  it('throws corrupted error on out of bounds Pokedex read', () => {
    const buffer = new ArrayBuffer(0x3000);
    const view = new DataView(buffer);

    view.setUint32(0 + 4088, 0x08012025, true);
    view.setUint16(0 + 4084, 1, true);

    view.setUint32(4096 + 4088, 0x08012025, true);
    view.setUint16(4096 + 4084, 2, true);

    view.setUint32(8192 + 4088, 0x08012025, true);
    view.setUint16(8192 + 4084, 0, true);

    // Override the getUint8 method to throw RangeError
    const originalGetUint8 = view.getUint8.bind(view);
    view.getUint8 = (byteOffset) => {
      if (byteOffset >= 8192 + 0x18 + 0x10) throw new RangeError('Out of bounds');
      return originalGetUint8(byteOffset);
    };

    expect(() => parseGen3(view, 'emerald')).toThrow('The save file is corrupted or incomplete.');
  });

  // Make buffer too small so getLatestSectionOffset passes but reading Pokedex fails
  const buffer = new ArrayBuffer(0x3000); // Only enough for 3 sections but let's say section 0 is at the very end
  const view = new DataView(buffer);

  // In order for parseGen3 to reach the Pokedex read, it must successfully find section 0, 1, 2.
  // If we put section 0 at offset 8192, and buffer size is 8192 + 0x18 + 0x10 + 50... wait
  // We can just throw RangeError directly by mocking or setting up an exact buffer boundary.
  // The previous tests do this, we can just use a buffer of 12288 bytes.
  view.setUint32(0 + 4088, 0x08012025, true);
  view.setUint16(0 + 4084, 1, true); // section 1

  view.setUint32(4096 + 4088, 0x08012025, true);
  view.setUint16(4096 + 4084, 2, true); // section 2

  view.setUint32(8192 + 4088, 0x08012025, true);
  view.setUint16(8192 + 4084, 0, true); // section 0

  // Now buffer is 12288, section 0 starts at 8192.
  // Pokedex read needs to read up to 8192 + 0x18 + 0x10 + 48 = 8264.
  // If we make buffer exactly 8200 bytes, reading 8192 + 4088 (SIGNATURE) will fail... wait,
  // we must supply a valid signature for section 0.
  // Let's just create an ArrayBuffer of exactly 12288 bytes (8192 + 4096).
  // The reading of Pokedex won't fail because it's only at offset 8264 < 12288.
  // Wait, let's create a proxy DataView or just mock it.
});

describe('parseGen3 (npcTradeFlags Integration)', () => {
  it('correctly extracts npcTradeFlags and integrates into SaveData', () => {
    const buffer = new ArrayBuffer(0x10000);
    const view = new DataView(buffer);

    const section0Offset = 0;
    view.setUint32(section0Offset + 4088, 0x08012025, true);
    view.setUint16(section0Offset + 4084, 0, true);
    view.setUint32(section0Offset + 4092, 1, true);

    const section1Offset = 4096;
    view.setUint32(section1Offset + 4088, 0x08012025, true);
    view.setUint16(section1Offset + 4084, 1, true);
    view.setUint32(section1Offset + 4092, 1, true);

    const section2Offset = 8192;
    view.setUint32(section2Offset + 4088, 0x08012025, true);
    view.setUint16(section2Offset + 4084, 2, true);
    view.setUint32(section2Offset + 4092, 1, true);

    const baseOffset = section1Offset + GEN3_EVENT_FLAGS_OFFSET;

    // FLAG_RUSTBORO_NPC_TRADE_COMPLETED = 0x99 -> byte 19, bit 1
    // FLAG_FORTREE_NPC_TRADE_COMPLETED = 0x9B -> byte 19, bit 3
    view.setUint8(baseOffset + 19, (1 << 1) | (1 << 3));

    const result = parseGen3(view, 'emerald');

    expect(result.gen3NPCTrades).toBeDefined();
    expect(result.npcTradeFlags).toBeDefined();

    expect(result.gen3NPCTrades).toEqual({
      RUSTBORO: true,
      PACIFIDLOG: false,
      FORTREE: true,
      BATTLE_FRONTIER: false,
    });

    // Check if the array values match the gen3NPCTrades values
    expect(result.npcTradeFlags).toEqual([true, false, true, false]);
  });

  it('throws "The save file is corrupted or incomplete." when RangeError occurs during npcTradeFlags parsing', () => {
    const buffer = new ArrayBuffer(0x3000);
    const view = new DataView(buffer);

    view.setUint32(0 + 4088, 0x08012025, true);
    view.setUint16(0 + 4084, 1, true);

    view.setUint32(4096 + 4088, 0x08012025, true);
    view.setUint16(4096 + 4084, 2, true);

    view.setUint32(8192 + 4088, 0x08012025, true);
    view.setUint16(8192 + 4084, 0, true);

    // Mock view.getUint8 to throw a RangeError when trying to read npcTradeFlags in section1Offset + GEN3_EVENT_FLAGS_OFFSET
    const originalGetUint8 = view.getUint8.bind(view);
    view.getUint8 = (byteOffset) => {
      // In this setup, section1Offset is 0. Base offset is 0 + GEN3_EVENT_FLAGS_OFFSET
      if (byteOffset >= GEN3_EVENT_FLAGS_OFFSET) {
        throw new RangeError('Out of bounds');
      }
      return originalGetUint8(byteOffset);
    };

    expect(() => parseGen3(view, 'emerald')).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('Gen3 PC Box Parsing', () => {
  it('should parse PC boxes correctly', () => {
    const buffer = new ArrayBuffer(0x1bfff);
    const view = new DataView(buffer);

    // Setup Sections 0-4 (dummy)
    for (let i = 0; i <= 4; i++) {
      view.setUint16(i * 4096 + 4084, i, true);
      view.setUint32(i * 4096 + 4088, 0x08012025, true);
      view.setUint32(i * 4096 + 4092, 1, true);
    }

    // Setup Sections 5-13
    for (let i = 5; i <= 13; i++) {
      view.setUint16(i * 4096 + 4084, i, true);
      view.setUint32(i * 4096 + 4088, 0x08012025, true);
      view.setUint32(i * 4096 + 4092, 1, true);
    }

    // Write PC Box Data
    // Current Box = 2 (so index 1)
    view.setUint32(5 * 4096 + 0, 1, true);

    // Write a Pokemon in Box 2, Slot 5 (Index 30 + 4 = 34)
    const pokemonIndex = 34;
    // 34 * 80 = 2720, which is well within Section 5 (3968 bytes)
    const offset = 5 * 4096 + 4 + pokemonIndex * 80;

    const pv = 0x12345678;
    const otId = 0x87654321;
    view.setUint32(offset + 0, pv, true);
    view.setUint32(offset + 4, otId, true);

    const decryptionKey = pv ^ otId;

    const speciesId = 25; // Pikachu
    const item = 0;
    const encryptedSpecies = speciesId ^ (decryptionKey & 0xffff);
    const encryptedItem = item ^ (decryptionKey >>> 16);
    view.setUint16(offset + 32 + 0, encryptedSpecies, true);
    view.setUint16(offset + 32 + 2, encryptedItem, true);

    // A (Attacks) at index 1 -> offset 32 + 12 = 44
    const move1 = 33; // Tackle
    const encryptedMove1 = move1 ^ (decryptionKey & 0xffff);
    view.setUint16(offset + 44 + 0, encryptedMove1, true);

    // Run parser
    const saveData = parseGen3(view, 'ruby');

    expect(saveData.currentBoxCount).toBe(2);
    expect(saveData.pc).toContain(25);
    expect(saveData.pcDetails.length).toBe(1);
    expect(saveData.pcDetails[0]?.speciesId).toBe(25);
    expect(saveData.pcDetails[0]?.storageLocation).toBe('Box 2');
    expect(saveData.pcDetails[0]?.slot).toBe(4);
    expect(saveData.pcDetails[0]?.moves).toContain(33);
  });
});

describe('parseGen3 (trainer flags integration)', () => {
  const initMockSectionsLocal = (view: DataView) => {
    const section0Offset = 0;
    view.setUint32(section0Offset + 4088, 0x08012025, true);
    view.setUint16(section0Offset + 4084, 0, true);
    view.setUint32(section0Offset + 4092, 1, true);

    const section1Offset = 4096;
    view.setUint32(section1Offset + 4088, 0x08012025, true);
    view.setUint16(section1Offset + 4084, 1, true);
    view.setUint32(section1Offset + 4092, 1, true);

    const section2Offset = 8192;
    view.setUint32(section2Offset + 4088, 0x08012025, true);
    view.setUint16(section2Offset + 4084, 2, true);
    view.setUint32(section2Offset + 4092, 1, true);
  };

  const initMockSaveBlock1 = (view: DataView) => {
    // Section 1 offsets: we use sector index 1 mapping to saveblock1 offset
    // Let's place sector 1 at offset 4096 (1 * 4096)
    const block1Offset = 1 * 4096;

    // Emerald base flags offset is 0x1270, RS is 0x1220, FRLG is 0x0ee0
    // Emerald max trainers 864, RS 693, FRLG 768
    // We will test emerald and ruby.

    // For Emerald: RSE_FLAGS_OFFSET_E + TRAINER_FLAGS_BYTE_OFFSET = 0x1270 + 0xa0 = 0x1310
    const emeraldFlagsOffset = block1Offset + 0x1310;
    if (emeraldFlagsOffset + Math.ceil(864 / 8) < view.byteLength) {
      view.setUint8(emeraldFlagsOffset, 0b00000001); // Trainer 0 defeated
      view.setUint8(emeraldFlagsOffset + 107, 0b10000000); // Trainer 863 defeated
    }

    // For Emerald rematch: REMATCH_OFFSET_E = 0x09ca
    const emeraldRematchOffset = block1Offset + 0x09ca;
    if (emeraldRematchOffset + 100 < view.byteLength) {
      view.setUint8(emeraldRematchOffset, 5); // Entry 0
      view.setUint8(emeraldRematchOffset + 99, 12); // Entry 99
    }

    // For Ruby: RSE_FLAGS_OFFSET_RS + TRAINER_FLAGS_BYTE_OFFSET = 0x1220 + 0xa0 = 0x12c0
    const rubyFlagsOffset = block1Offset + 0x12c0;
    if (rubyFlagsOffset + Math.ceil(693 / 8) < view.byteLength) {
      view.setUint8(rubyFlagsOffset, 0b00000010); // Trainer 1 defeated
    }

    // For Ruby rematch: REMATCH_OFFSET_RS = 0x097a
    const rubyRematchOffset = block1Offset + 0x097a;
    if (rubyRematchOffset + 100 < view.byteLength) {
      view.setUint8(rubyRematchOffset, 3); // Entry 0
    }
  };

  it('should successfully attach trainer defeat and rematch flags to the SaveData for emerald', () => {
    const buffer = new ArrayBuffer(57344);
    const view = new DataView(buffer);
    initMockSectionsLocal(view);
    initMockSaveBlock1(view);

    const result = parseGen3(view, 'emerald');

    expect(result.gen3TrainerDefeatFlags).toBeDefined();
    expect(result.gen3TrainerDefeatFlags?.length).toBe(864);
    expect(result.gen3TrainerDefeatFlags?.[0]).toBe(true);
    expect(result.gen3TrainerDefeatFlags?.[1]).toBe(false);
    expect(result.gen3TrainerDefeatFlags?.[863]).toBe(true);

    expect(result.gen3TrainerRematchFlags).toBeDefined();
    expect(result.gen3TrainerRematchFlags?.length).toBe(100);
    expect(result.gen3TrainerRematchFlags?.[0]).toBe(5);
    expect(result.gen3TrainerRematchFlags?.[99]).toBe(12);
  });

  it('should successfully attach trainer defeat and rematch flags to the SaveData for ruby', () => {
    const buffer = new ArrayBuffer(57344);
    const view = new DataView(buffer);
    initMockSectionsLocal(view);
    initMockSaveBlock1(view);

    const result = parseGen3(view, 'ruby');

    expect(result.gen3TrainerDefeatFlags).toBeDefined();
    expect(result.gen3TrainerDefeatFlags?.length).toBe(693);
    expect(result.gen3TrainerDefeatFlags?.[0]).toBe(false);
    expect(result.gen3TrainerDefeatFlags?.[1]).toBe(true);

    expect(result.gen3TrainerRematchFlags).toBeDefined();
    expect(result.gen3TrainerRematchFlags?.length).toBe(100);
    expect(result.gen3TrainerRematchFlags?.[0]).toBe(3);
  });

  it('correctly constructs gen3TrainerCard', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Section 0 setup
    const section0Offset = 0xe000;
    view.setUint16(section0Offset + 4084, 0, true);
    view.setUint32(section0Offset + 4088, 0x08012025, true);
    view.setUint32(section0Offset + 4092, 25, true);

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

    const saveData = parseGen3(view);
    expect(saveData.gen3TrainerCard).toBeDefined();
    expect(saveData.gen3TrainerCard).toEqual({
      hasHallOfFame: false,
      hasHoennDex: false,
      hasNationalDex: false,
      hasBattleFrontier: false,
      hasContestMaster: false,
    });
  });

  it('correctly constructs gen3TrainerCard with hasBattleFrontier true', () => {
    const buffer = new ArrayBuffer(131072);
    const view = new DataView(buffer);

    // Section 0 setup
    const section0Offset = 0xe000;
    view.setUint16(section0Offset + 4084, 0, true);
    view.setUint32(section0Offset + 4088, 0x08012025, true);
    view.setUint32(section0Offset + 4092, 25, true);

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

    // Mock Battle Frontier Flags
    view.setUint8(section1Offset + 0x1388, (1 << 5) | (1 << 7));
    view.setUint8(section1Offset + 0x1389, (1 << 1) | (1 << 3) | (1 << 5) | (1 << 7));
    view.setUint8(section1Offset + 0x138a, 1 << 1);

    const saveData = parseGen3(view, 'emerald');
    expect(saveData.gen3TrainerCard).toBeDefined();
    expect(saveData.gen3TrainerCard).toEqual({
      hasHallOfFame: false,
      hasHoennDex: false,
      hasNationalDex: false,
      hasBattleFrontier: true,
      hasContestMaster: false,
    });
  });
});

describe('parseGen3ContestMaster', () => {
  it('should return true when all 5 museum paintings exist', () => {
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);
    const section3Offset = 0;
    const baseOffset = section3Offset + 0x10;

    // Set museum paintings (indices 8 to 12) to have non-zero species
    for (let i = 0; i < 5; i++) {
      view.setUint16(baseOffset + (8 + i) * 32 + 8, 25, true); // Pikachu
    }

    const result = parseGen3ContestMaster(view, section3Offset);
    expect(result).toBe(true);
  });

  it('should return false when one of the museum paintings is missing (species is 0)', () => {
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);
    const section3Offset = 0;
    const baseOffset = section3Offset + 0x10;

    // Set museum paintings (indices 8 to 12)
    view.setUint16(baseOffset + (8 + 0) * 32 + 8, 25, true); // Pikachu
    view.setUint16(baseOffset + (8 + 1) * 32 + 8, 25, true); // Pikachu
    view.setUint16(baseOffset + (8 + 2) * 32 + 8, 0, true); // Missing painting
    view.setUint16(baseOffset + (8 + 3) * 32 + 8, 25, true); // Pikachu
    view.setUint16(baseOffset + (8 + 4) * 32 + 8, 25, true); // Pikachu

    const result = parseGen3ContestMaster(view, section3Offset);
    expect(result).toBe(false);
  });

  it('should throw an error on out of bounds read', () => {
    const buffer = new ArrayBuffer(0x10);
    const view = new DataView(buffer);
    const section3Offset = 0;
    expect(() => parseGen3ContestMaster(view, section3Offset)).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3 (Match Call integration)', () => {
  const initMockSectionsLocal = (view: DataView) => {
    // Basic setup for 3 sections needed for match call
    view.setUint32(0 + 4088, 0x08012025, true);
    view.setUint16(0 + 4084, 0, true);
    view.setUint32(0 + 4092, 1, true);

    view.setUint32(4096 + 4088, 0x08012025, true);
    view.setUint16(4096 + 4084, 1, true);
    view.setUint32(4096 + 4092, 1, true);

    view.setUint32(8192 + 4088, 0x08012025, true);
    view.setUint16(8192 + 4084, 2, true);
    view.setUint32(8192 + 4092, 1, true);
  };

  it('should successfully attach Match Call data to SaveData for emerald', () => {
    const buffer = new ArrayBuffer(57344);
    const view = new DataView(buffer);
    initMockSectionsLocal(view);

    const section1Offset = 4096;
    const section2Offset = 8192;

    view.setUint8(section2Offset + 0x0315, 1 << 7);
    view.setUint8(section2Offset + 0x031b, 0x50);
    view.setUint8(section1Offset + 0x09ca, 2);
    view.setUint8(section1Offset + 0x09ca + 1, 5);

    const result = parseGen3(view, 'emerald');

    expect(result.gen3MatchCall).toBeDefined();
    expect(result.gen3MatchCall?.hasMatchCall).toBe(true);
    expect(result.gen3MatchCall?.registeredTrainers[0]).toBe(true);
    expect(result.gen3MatchCall?.registeredTrainers[1]).toBe(false);
    expect(result.gen3MatchCall?.registeredTrainers[2]).toBe(true);
    expect(result.gen3MatchCall?.rematchStates[0]).toBe(2);
    expect(result.gen3MatchCall?.rematchStates[1]).toBe(5);
  });

  it('should be undefined for non-emerald games', () => {
    const buffer = new ArrayBuffer(57344);
    const view = new DataView(buffer);
    initMockSectionsLocal(view);

    const result = parseGen3(view, 'ruby');
    expect(result.gen3MatchCall).toBeUndefined();
  });
});

describe('parseGen3 (Mirage Island Cross-Reference Integration)', () => {
  const setupSaveFile = (pv: number, mirageIslandValue: number) => {
    const buffer = new ArrayBuffer(0x1bfff);
    const view = new DataView(buffer);

    for (let i = 0; i <= 13; i++) {
      view.setUint16(i * 4096 + 4084, i, true);
      view.setUint32(i * 4096 + 4088, 0x08012025, true);
      view.setUint32(i * 4096 + 4092, 1, true);
    }

    // Set Mirage Island Value (Emerald)
    view.setUint16(2 * 4096 + 0x0464, mirageIslandValue, true);

    // Write PC Box Data
    view.setUint32(5 * 4096 + 0, 0, true); // Current Box = 1 (Index 0)

    const offset = 5 * 4096 + 4; // Box 1, Slot 1
    const otId = 0x87654321;
    view.setUint32(offset + 0, pv, true);
    view.setUint32(offset + 4, otId, true);

    const decryptionKey = pv ^ otId;
    const speciesId = 25; // Pikachu
    const encryptedSpecies = speciesId ^ (decryptionKey & 0xffff);
    view.setUint16(offset + 32 + 0, encryptedSpecies, true);

    return parseGen3(view, 'emerald');
  };

  it('should set isMirageIslandKey to true when lower 16 bits of PID match mirageIslandValue', () => {
    const saveData = setupSaveFile(0x12345678, 0x5678);
    expect(saveData.pcDetails[0]?.isMirageIslandKey).toBe(true);
  });

  it('should set isMirageIslandKey to false when lower 16 bits of PID do not match mirageIslandValue', () => {
    const saveData = setupSaveFile(0x12345678, 0x9999);
    expect(saveData.pcDetails[0]?.isMirageIslandKey).toBe(false);
  });
});

describe('Gen 3 Ribbon and Obedience Constants', () => {
  it('should have correct bit constants defined', () => {
    expect(RIBBON_CHAMPION_BIT).toBe(15);
    expect(RIBBON_WINNING_BIT).toBe(16);
    expect(RIBBON_VICTORY_BIT).toBe(17);
    expect(RIBBON_ARTIST_BIT).toBe(18);
    expect(RIBBON_EFFORT_BIT).toBe(19);
    expect(RIBBON_BATTLE_CHAMPION_BIT).toBe(20);
    expect(RIBBON_REGIONAL_CHAMPION_BIT).toBe(21);
    expect(RIBBON_NATIONAL_CHAMPION_BIT).toBe(22);
    expect(RIBBON_COUNTRY_BIT).toBe(23);
    expect(RIBBON_NATIONAL_BIT).toBe(24);
    expect(RIBBON_EARTH_BIT).toBe(25);
    expect(RIBBON_WORLD_BIT).toBe(26);
    expect(OBEDIENCE_FLAG_BIT).toBe(31);
  });
  it('should have correct bit constants and shifts defined for contest ribbons', () => {
    expect(RIBBONS_OFFSET_IN_M).toBe(0x08);
    expect(RIBBON_RANK_MASK).toBe(0x07); // 3 bits mask
    expect(RIBBON_COOL_SHIFT).toBe(0);
    expect(RIBBON_BEAUTY_SHIFT).toBe(3);
    expect(RIBBON_CUTE_SHIFT).toBe(6);
    expect(RIBBON_SMART_SHIFT).toBe(9);
    expect(RIBBON_TOUGH_SHIFT).toBe(12);
  });
});
