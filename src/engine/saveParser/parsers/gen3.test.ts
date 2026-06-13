import { describe, expect, it } from 'vitest';
import { isGen3Save, parseGen3, parseGen3ConditionStats, parseGen3PersonalityValue } from './gen3';

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

describe('parseGen3ConditionStats', () => {
  it('should correctly decrypt and extract condition stats from substruct E', () => {
    // 80 bytes is the size of the pokemon struct
    const buffer = new ArrayBuffer(80);
    const view = new DataView(buffer);

    const pokemonOffset = 0;
    const personalityValue = 0; // % 24 = 0 -> Substruct order: GAEM -> E is index 2
    const otId = 0x12345678;
    const decryptionKey = personalityValue ^ otId;

    // Substruct E starts at pokemonOffset + 32 + (2 * 12) = 56
    const substructStart = 56;

    // We want cool=10, beauty=20, cute=30, smart=40, tough=50
    // dword1 covers bytes 4-7. cool is at byte 2, beauty is at byte 3.
    // So decrypted dword1 should be: (beauty << 24) | (cool << 16) = (20 << 24) | (10 << 16) = 0x140A0000
    const decryptedDword1 = (20 << 24) | (10 << 16);

    // dword2 covers bytes 8-11. cute is at byte 0, smart is at byte 1, tough is at byte 2.
    // So decrypted dword2 should be: (tough << 16) | (smart << 8) | cute = (50 << 16) | (40 << 8) | 30 = 0x0032281E
    const decryptedDword2 = (50 << 16) | (40 << 8) | 30;

    // Encrypt the dwords
    const encryptedDword1 = decryptedDword1 ^ decryptionKey;
    const encryptedDword2 = decryptedDword2 ^ decryptionKey;

    view.setUint32(substructStart + 4, encryptedDword1, true);
    view.setUint32(substructStart + 8, encryptedDword2, true);

    const result = parseGen3ConditionStats(view, pokemonOffset, personalityValue, otId);

    expect(result).toEqual({
      cool: 10,
      beauty: 20,
      cute: 30,
      smart: 40,
      tough: 50,
    });
  });

  it('should correctly decrypt and extract from a different substruct order', () => {
    const buffer = new ArrayBuffer(80);
    const view = new DataView(buffer);

    const pokemonOffset = 0;
    const personalityValue = 12; // % 24 = 12 -> Substruct order: EGAM -> E is index 0
    const otId = 0x87654321;
    const decryptionKey = personalityValue ^ otId;

    // Substruct E starts at pokemonOffset + 32 + (0 * 12) = 32
    const substructStart = 32;

    const decryptedDword1 = (255 << 24) | (128 << 16); // beauty=255, cool=128
    const decryptedDword2 = (1 << 16) | (2 << 8) | 3; // tough=1, smart=2, cute=3

    view.setUint32(substructStart + 4, decryptedDword1 ^ decryptionKey, true);
    view.setUint32(substructStart + 8, decryptedDword2 ^ decryptionKey, true);

    const result = parseGen3ConditionStats(view, pokemonOffset, personalityValue, otId);

    expect(result).toEqual({
      cool: 128,
      beauty: 255,
      cute: 3,
      smart: 2,
      tough: 1,
    });
  });

  it('should throw corrupted file error on out of bounds read', () => {
    // A buffer that is too small (less than 80 bytes)
    const buffer = new ArrayBuffer(40);
    const view = new DataView(buffer);

    const pokemonOffset = 0;
    const personalityValue = 0; // E is index 2, needs offset 56
    const otId = 0;

    expect(() => parseGen3ConditionStats(view, pokemonOffset, personalityValue, otId)).toThrowError(
      'The save file is corrupted or incomplete.',
    );
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
