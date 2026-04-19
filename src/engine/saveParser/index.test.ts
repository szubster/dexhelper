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

describe('saveParser - Error Handling and Fallbacks', () => {
  const HEADER_SIZE = 32768;

  it('should throw if buffer is too small', () => {
    const smallBuffer = new Uint8Array(100).buffer;
    expect(() => parseSaveFile(smallBuffer)).toThrow('Invalid save file size. Expected at least 32KB.');
  });

  it('should fallback to gen1 if checksum invalid but structurally valid', () => {
    const buffer = new Uint8Array(HEADER_SIZE);
    buffer[0x2f2c] = 0; // party count
    buffer[0x2f2d] = 0xff; // party terminator
    const data = parseSaveFile(buffer.buffer);
    expect(data.generation).toBe(1);
  });

  it('should fallback to gen2 (crystal) if checksum invalid but structurally valid', () => {
    const buffer = new Uint8Array(HEADER_SIZE);
    buffer[0x2f2d] = 0x00;
    buffer[0x288a] = 0; // party count
    buffer[0x288b] = 0xff; // terminator
    const data = parseSaveFile(buffer.buffer);
    expect(data.generation).toBe(2);
  });

  it('should throw if no valid structure is found', () => {
    const buffer = new Uint8Array(HEADER_SIZE);

    // Clear gen1 check
    buffer[0x2f2d] = 0x00;

    // Clear gen2 true check
    buffer[0x2865] = 0x01; // Party count 1 (to bypass party count 0 check)
    buffer[0x2866] = 0x00; // terminator not 0xFF

    // Clear gen2 false check
    buffer[0x288a] = 0x01;
    buffer[0x288b] = 0x00;

    expect(() => parseSaveFile(buffer.buffer)).toThrow(
      'Could not detect a valid Pokémon Red/Blue/Yellow or Gold/Silver/Crystal save file. Please ensure you are uploading a .sav file from a Gen 1 or Gen 2 game.',
    );
  });
});
