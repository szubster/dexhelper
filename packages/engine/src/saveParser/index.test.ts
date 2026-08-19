import { describe, expect, it, vi } from 'vitest';
import { parseSaveFile } from './index';

const GEN1_CHECKSUM_DATA_START = 0x2598;
const GEN2_CHECKSUM_DATA_START = 0x2009;
const GEN2_CHECKSUM_DATA_END = 0x2d0c;
const GEN2_CHECKSUM_OFFSET = 0x2d0d;

import * as detectionModule from '@/utils/detection';

vi.mock('@/utils/detection', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/utils/detection')>();
  return {
    ...actual,
  };
});

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

  it('should detect NO SHIFT when padding at 0x25B5 is correct', async () => {
    // 0x25A3 + 18 = 0x25B5. Bit 7 = 0 means correct.
    const buffer = createMockSave({ 0x25b5: 0x00, 0x25b6: 0x80 }, 0x1f, 0x260a);
    const data = await parseSaveFile(buffer);

    expect(data.currentMapId).toBe(0x1f); // Route 20
    expect(data.gameVersion).toBe('yellow');
  });

  it('should detect 1-BYTE SHIFT when padding at 0x25B5 is incorrect and 0x25B6 is correct', async () => {
    // 0x25B5: 0x80 (Incorrect for res0)
    // 0x25B6: 0x00 (Correct for res1)
    // Map ID at 0x260A + 1 = 0x260B
    const buffer = createMockSave({ 0x25b5: 0x80, 0x25b6: 0x00 }, 0x0c, 0x260b);
    const data = await parseSaveFile(buffer);

    expect(data.currentMapId).toBe(0x0c); // Route 1
    expect(data.gameVersion).toBe('yellow');
  });

  it('should fallback to 0 shift if neither padding is correct (safest bet)', async () => {
    const buffer = createMockSave({ 0x25b5: 0x80, 0x25b6: 0x80 }, 0x1f, 0x260a);
    const data = await parseSaveFile(buffer);
    expect(data.currentMapId).toBe(0x1f);
  });
});

describe('saveParser - Error Handling and Fallbacks', () => {
  const HEADER_SIZE = 32768;

  it('should throw if buffer is too small', async () => {
    const smallBuffer = new Uint8Array(100).buffer;
    await expect(() => parseSaveFile(smallBuffer)).rejects.toThrow('Invalid save file size. Expected at least 32KB.');
  });

  it('should fallback to gen1 if checksum invalid but structurally valid', async () => {
    const buffer = new Uint8Array(HEADER_SIZE);
    buffer[0x2f2c] = 0; // party count
    buffer[0x2f2d] = 0xff; // party terminator
    const data = await parseSaveFile(buffer.buffer);
    expect(data.generation).toBe(1);
  });

  it('should fallback to gen2 (crystal) if checksum invalid but structurally valid', async () => {
    const buffer = new Uint8Array(HEADER_SIZE);
    buffer[0x2f2d] = 0x00;
    buffer[0x288a] = 0; // party count
    buffer[0x288b] = 0xff; // terminator
    const data = await parseSaveFile(buffer.buffer);
    expect(data.generation).toBe(2);
  });

  it('should throw if no valid structure is found', async () => {
    const buffer = new Uint8Array(HEADER_SIZE);

    // Clear gen1 check
    buffer[0x2f2d] = 0x00;

    // Clear gen2 true check
    buffer[0x2865] = 0x01; // Party count 1 (to bypass party count 0 check)
    buffer[0x2866] = 0x00; // terminator not 0xFF

    // Clear gen2 false check
    buffer[0x288a] = 0x01;
    buffer[0x288b] = 0x00;

    await expect(() => parseSaveFile(buffer.buffer)).rejects.toThrow(
      'Could not detect a valid Pokémon Red/Blue/Yellow or Gold/Silver/Crystal save file. Please ensure you are uploading a .sav file from a Gen 1 or Gen 2 game.',
    );
  });
  it('should fallback to gen2 (gold/silver) if checksum invalid but structurally valid', async () => {
    const buffer = new Uint8Array(HEADER_SIZE);
    buffer[0x2865] = 0; // party count
    buffer[0x2866] = 0xff; // terminator
    const data = await parseSaveFile(buffer.buffer);
    expect(data.generation).toBe(2);
  });

  it('should parse gen2 (gold/silver) if checksum valid and structurally valid', async () => {
    const buffer = new Uint8Array(HEADER_SIZE);
    buffer[0x2865] = 0; // party count
    buffer[0x2866] = 0xff; // terminator

    // Gen 2 checksum
    let gen2Sum = 0;
    for (let i = GEN2_CHECKSUM_DATA_START; i <= GEN2_CHECKSUM_DATA_END; i++) {
      gen2Sum += buffer[i] as number;
    }
    const view = new DataView(buffer.buffer);
    view.setUint16(GEN2_CHECKSUM_OFFSET, gen2Sum, true);

    const data = await parseSaveFile(buffer.buffer);
    expect(data.generation).toBe(2);
  });

  it('should parse gen2 (crystal) if checksum valid and structurally valid', async () => {
    const buffer = new Uint8Array(HEADER_SIZE);
    buffer[0x2f2d] = 0x00;
    buffer[0x288a] = 0; // party count
    buffer[0x288b] = 0xff; // terminator

    // Gen 2 checksum
    let gen2Sum = 0;
    for (let i = GEN2_CHECKSUM_DATA_START; i <= GEN2_CHECKSUM_DATA_END; i++) {
      gen2Sum += buffer[i] as number;
    }
    const view = new DataView(buffer.buffer);
    view.setUint16(GEN2_CHECKSUM_OFFSET, gen2Sum, true);

    const data = await parseSaveFile(buffer.buffer);
    expect(data.generation).toBe(2);
  });

  it('should try to parse gen2 if checksum valid but structurally weird', async () => {
    const buffer = new Uint8Array(HEADER_SIZE);

    // Break structural validity
    buffer[0x2865] = 1;
    buffer[0x2866] = 0;
    buffer[0x288a] = 1;
    buffer[0x288b] = 0;

    // Gen 2 checksum
    let gen2Sum = 0;
    for (let i = GEN2_CHECKSUM_DATA_START; i <= GEN2_CHECKSUM_DATA_END; i++) {
      gen2Sum += buffer[i] as number;
    }
    const view = new DataView(buffer.buffer);
    view.setUint16(GEN2_CHECKSUM_OFFSET, gen2Sum, true);

    const data = await parseSaveFile(buffer.buffer);
    expect(data.generation).toBe(2);
  });

  it('should throw RangeError wrapper when RangeError is thrown', async () => {
    const buffer = new Uint8Array(HEADER_SIZE);
    // make isGen1Save true
    buffer[0x2f2c] = 0;
    buffer[0x2f2d] = 0xff;

    // We mock DataView to throw RangeError
    const originalDataView = global.DataView;
    global.DataView = class MockDataView {
      buffer: ArrayBuffer;
      byteLength: number;
      byteOffset: number;
      constructor(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number) {
        this.buffer = buffer;
        this.byteOffset = byteOffset ?? 0;
        this.byteLength = byteLength ?? buffer.byteLength;
      }
      getUint8(byteOffset: number) {
        if (byteOffset === GEN1_CHECKSUM_DATA_START) {
          throw new RangeError('Out of bounds');
        }
        return new originalDataView(this.buffer, this.byteOffset, this.byteLength).getUint8(byteOffset);
      }
      getUint16(byteOffset: number, littleEndian?: boolean) {
        return new originalDataView(this.buffer, this.byteOffset, this.byteLength).getUint16(byteOffset, littleEndian);
      }
      getInt8(byteOffset: number) {
        return new originalDataView(this.buffer, this.byteOffset, this.byteLength).getInt8(byteOffset);
      }
      getInt16(byteOffset: number, littleEndian?: boolean) {
        return new originalDataView(this.buffer, this.byteOffset, this.byteLength).getInt16(byteOffset, littleEndian);
      }
      getUint32(byteOffset: number, littleEndian?: boolean) {
        return new originalDataView(this.buffer, this.byteOffset, this.byteLength).getUint32(byteOffset, littleEndian);
      }
      getInt32(byteOffset: number, littleEndian?: boolean) {
        return new originalDataView(this.buffer, this.byteOffset, this.byteLength).getInt32(byteOffset, littleEndian);
      }
      getFloat32(byteOffset: number, littleEndian?: boolean) {
        return new originalDataView(this.buffer, this.byteOffset, this.byteLength).getFloat32(byteOffset, littleEndian);
      }
      getFloat64(byteOffset: number, littleEndian?: boolean) {
        return new originalDataView(this.buffer, this.byteOffset, this.byteLength).getFloat64(byteOffset, littleEndian);
      }
      setUint8() {}
      setUint16() {}
      setInt8() {}
      setInt16() {}
      setUint32() {}
      setInt32() {}
      setFloat32() {}
      setFloat64() {}
      getBigInt64() {
        return BigInt(0);
      }
      getBigUint64() {
        return BigInt(0);
      }
      setBigInt64() {}
      setBigUint64() {}
    } as unknown as typeof DataView;

    try {
      await expect(() => parseSaveFile(buffer.buffer)).rejects.toThrow('The save file is corrupted or incomplete.');
    } finally {
      global.DataView = originalDataView;
    }
  });

  it('should fallback to gen3 if checksum invalid but structurally valid for gen3', async () => {
    const buffer = new Uint8Array(HEADER_SIZE);

    // Clear gen1/gen2 checks
    buffer[0x2f2d] = 0x00;
    buffer[0x2865] = 0x01;
    buffer[0x2866] = 0x00;
    buffer[0x288a] = 0x01;
    buffer[0x288b] = 0x00;

    // Mock isGen3Save to return true
    const isGen3Spy = vi.spyOn(detectionModule, 'isGen3Save').mockReturnValue(true);

    // Should call parseGen3, which throws 'The save file is corrupted or incomplete.'
    await expect(() => parseSaveFile(buffer.buffer)).rejects.toThrow('The save file is corrupted or incomplete.');

    isGen3Spy.mockRestore();
  });
});
