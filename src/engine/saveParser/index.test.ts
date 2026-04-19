import { describe, expect, it } from 'vitest';
import { parseSaveFile } from './index';

describe('saveParser - Dynamic Offset Shift Detection', () => {
  const HEADER_SIZE = 32768;

  function createMockSave(paddingBytes: Record<number, number>, mapId: number, mapIdx: number): ArrayBuffer {
    const buffer = new Uint8Array(HEADER_SIZE);

    // Set padding bits for Pokedex
    // res0 padding is at 0x25B5
    // res1 padding is at 0x25B6
    Object.entries(paddingBytes).forEach(([offset, val]) => {
      buffer[Number(offset)] = val;
    });

    // Set Map ID
    buffer[mapIdx] = mapId;

    // Set some valid identifiers so isYellow/isRed detection works enough
    // Pikachu markers at 0x271C (following) and 0x271D (happiness)
    buffer[0x271c] = 1;
    buffer[0x271d] = 128;

    // Satisfy isGen1Save check
    buffer[0x271c] = 1;
    buffer[0x271d] = 128;
    buffer[0x2f2c] = 0; // party count
    buffer[0x2f2d] = 0xff; // party terminator

    return buffer.buffer;
  }

  it('should detect NO SHIFT when padding at 0x25B5 is correct', () => {
    // 0x25A3 + 18 = 0x25B5. Bit 7 = 0 means correct.
    const buffer = createMockSave({ 0x25b5: 0x00, 0x25b6: 0x80 }, 0x1f, 0x260a);
    const data = parseSaveFile(buffer);

    expect(data.currentMapId).toBe(0x1f); // Route 20
    expect(data.gameVersion).toBe('yellow');
  });

  it('should detect 1-BYTE SHIFT when padding at 0x25B5 is incorrect and 0x25B6 is correct', () => {
    // 0x25B5: 0x80 (Incorrect for res0)
    // 0x25B6: 0x00 (Correct for res1)
    // Map ID at 0x260A + 1 = 0x260B
    const buffer = createMockSave({ 0x25b5: 0x80, 0x25b6: 0x00 }, 0x0c, 0x260b);
    const data = parseSaveFile(buffer);

    expect(data.currentMapId).toBe(0x0c); // Route 1
    expect(data.gameVersion).toBe('yellow');
  });

  it('should fallback to 0 shift if neither padding is correct (safest bet)', () => {
    const buffer = createMockSave({ 0x25b5: 0x80, 0x25b6: 0x80 }, 0x1f, 0x260a);
    const data = parseSaveFile(buffer);
    expect(data.currentMapId).toBe(0x1f);
  });
});

describe('parseSaveFile errors and fallback paths', () => {
  const HEADER_SIZE = 32768;

  it('should throw an error if the save file is too small', () => {
    const buffer = new Uint8Array(100).buffer;
    expect(() => parseSaveFile(buffer)).toThrowError('Invalid save file size. Expected at least 32KB.');
  });

  it('should throw an error for completely invalid save file structure', () => {
    const u8 = new Uint8Array(HEADER_SIZE);
    // Break Gen 2 Checksum
    u8[0x2009] = 1;
    const buffer = u8.buffer;
    expect(() => parseSaveFile(buffer)).toThrowError(
      'Could not detect a valid Pokémon Red/Blue/Yellow or Gold/Silver/Crystal save file. Please ensure you are uploading a .sav file from a Gen 1 or Gen 2 game.',
    );
  });

  it('should fallback to Gen 1 parsing if checksum is bad but structure is valid', () => {
    const u8 = new Uint8Array(HEADER_SIZE);

    // Satisfy isGen1Save check
    u8[0x2f2c] = 0; // party count
    u8[0x271c] = 1;
    u8[0x271d] = 128;
    u8[0x2f2d] = 0xff; // party terminator

    // Corrupt checksum (gen1Sum computation will be wrong)
    // By default 0-initialized array has checksum 255. Let's make it differ from u8[0x3523] (which is 0)
    // Wait, gen1Sum = 255 - 0 = 255. 255 & 0xff is 255. u8[0x3523] is 0. So checksum is already invalid.

    const data = parseSaveFile(u8.buffer);
    expect(data.gameVersion).toBe('yellow'); // Parses as yellow due to pikachu identifiers
  });

  it('should fallback to Gen 2 Crystal parsing if checksum is bad but structure is valid', () => {
    const u8 = new Uint8Array(HEADER_SIZE);

    // Satisfy isGen2Save(crystal: true)
    // countOffset = 0x2865, speciesOffset = 0x2866
    u8[0x2865] = 0; // party count
    u8[0x2866] = 0xff; // party terminator

    // Ensure invalid checksum: sum = 0. u8[0x2d0d] and u8[0x2d0e] are 0. sum & 0xffff is 0.
    // So checksum is valid by default! We need to break it.
    u8[0x2009] = 1; // Now sum is 1, checksum is 0.

    const data = parseSaveFile(u8.buffer);
    expect(data.gameVersion).toBe('crystal');
  });

  it('should fallback to Gen 2 GS parsing if checksum is bad but structure is valid', () => {
    const u8 = new Uint8Array(HEADER_SIZE);

    // Satisfy isGen2Save(crystal: false)
    // countOffset = 0x288a, speciesOffset = 0x288b
    u8[0x288a] = 0; // party count
    u8[0x288b] = 0xff; // party terminator

    // Break checksum
    u8[0x2009] = 1;

    const data = parseSaveFile(u8.buffer);
    expect(data.gameVersion).toBe('gold'); // Default GS fallback
  });

  it('should parse as Gen 2 if checksum is valid but structure is weird', () => {
    const u8 = new Uint8Array(HEADER_SIZE);

    // Break structure checks
    u8[0x2865] = 7; // invalid party count for Crystal
    u8[0x288a] = 7; // invalid party count for GS

    // Make Gen 2 checksum valid
    // gen2Sum for 0x2009..0x2D0C
    let sum = 0;
    for (let i = 0x2009; i <= 0x2d0c; i++) {
      sum += u8[i] ?? 0;
    }
    u8[0x2d0d] = sum & 0xff;
    u8[0x2d0e] = (sum >> 8) & 0xff;

    // Make Gen 1 checksum invalid just in case

    const data = parseSaveFile(u8.buffer);
    // Since it forces GS in parseGen2(u8) as fallback when not forced Crystal
    expect(data.gameVersion).toBe('gold');
  });
});
