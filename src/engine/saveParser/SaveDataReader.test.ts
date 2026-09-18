import { describe, expect, it } from 'vitest';
import { SaveDataReader } from './SaveDataReader';

describe('SaveDataReader', () => {
  it('should read 8-bit integers correctly', () => {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    const reader = new SaveDataReader(view);

    view.setUint8(0, 42);
    view.setInt8(1, -12);

    expect(reader.getUint8(0)).toBe(42);
    expect(reader.getInt8(1)).toBe(-12);
  });

  it('should read 16-bit integers correctly in both endianness', () => {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    const reader = new SaveDataReader(view);

    view.setUint16(0, 0x1234, true);
    view.setUint16(2, 0x5678, false);
    view.setInt16(4, -1234, true);
    view.setInt16(6, -5678, false);

    expect(reader.getUint16Le(0)).toBe(0x1234);
    expect(reader.getUint16Be(2)).toBe(0x5678);
    expect(reader.getInt16Le(4)).toBe(-1234);
    expect(reader.getInt16Be(6)).toBe(-5678);
  });

  it('should read 32-bit integers correctly in both endianness', () => {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    const reader = new SaveDataReader(view);

    view.setUint32(0, 0x12345678, true);
    view.setUint32(4, 0x87654321, false);
    view.setInt32(8, -12345678, true);
    view.setInt32(12, -87654321, false);

    expect(reader.getUint32Le(0)).toBe(0x12345678);
    expect(reader.getUint32Be(4)).toBe(0x87654321);
    expect(reader.getInt32Le(8)).toBe(-12345678);
    expect(reader.getInt32Be(12)).toBe(-87654321);
  });

  it('should read 32-bit and 64-bit floating point numbers correctly', () => {
    const buffer = new ArrayBuffer(24);
    const view = new DataView(buffer);
    const reader = new SaveDataReader(view);

    view.setFloat32(0, Math.PI, true);
    view.setFloat32(4, Math.E, false);
    view.setFloat64(8, Math.PI, true);
    view.setFloat64(16, Math.E, false);

    expect(reader.getFloat32Le(0)).toBeCloseTo(Math.PI, 4);
    expect(reader.getFloat32Be(4)).toBeCloseTo(Math.E, 4);
    expect(reader.getFloat64Le(8)).toBeCloseTo(Math.PI, 8);
    expect(reader.getFloat64Be(16)).toBeCloseTo(Math.E, 8);
  });

  it('should throw RangeError for out-of-bounds reading and negative offsets', () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    const reader = new SaveDataReader(view);

    const errorMessage = 'The save file is corrupted or incomplete.';

    expect(() => reader.getUint8(-1)).toThrow(errorMessage);
    expect(() => reader.getUint8(8)).toThrow(errorMessage);

    expect(() => reader.getInt8(-1)).toThrow(errorMessage);
    expect(() => reader.getInt8(8)).toThrow(errorMessage);

    expect(() => reader.getUint16Le(7)).toThrow(errorMessage);
    expect(() => reader.getUint16Be(7)).toThrow(errorMessage);
    expect(() => reader.getInt16Le(7)).toThrow(errorMessage);
    expect(() => reader.getInt16Be(7)).toThrow(errorMessage);

    expect(() => reader.getUint32Le(5)).toThrow(errorMessage);
    expect(() => reader.getUint32Be(5)).toThrow(errorMessage);
    expect(() => reader.getInt32Le(5)).toThrow(errorMessage);
    expect(() => reader.getInt32Be(5)).toThrow(errorMessage);

    expect(() => reader.getFloat32Le(5)).toThrow(errorMessage);
    expect(() => reader.getFloat32Be(5)).toThrow(errorMessage);

    expect(() => reader.getFloat64Le(1)).toThrow(errorMessage);
    expect(() => reader.getFloat64Be(1)).toThrow(errorMessage);
  });
});
