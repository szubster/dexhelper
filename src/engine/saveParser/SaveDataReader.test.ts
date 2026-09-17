import { describe, expect, it } from 'vitest';
import { SaveDataReader } from './SaveDataReader';

describe('SaveDataReader', () => {
  it('should successfully read all data types', () => {
    const buffer = new ArrayBuffer(64);
    const view = new DataView(buffer);
    const reader = new SaveDataReader(view);

    view.setUint8(0, 42);
    expect(reader.getUint8(0)).toBe(42);

    view.setInt8(1, -42);
    expect(reader.getInt8(1)).toBe(-42);

    view.setUint16(2, 0x1234, true);
    expect(reader.getUint16Le(2)).toBe(0x1234);

    view.setUint16(4, 0x1234, false);
    expect(reader.getUint16Be(4)).toBe(0x1234);

    view.setInt16(6, -0x1234, true);
    expect(reader.getInt16Le(6)).toBe(-0x1234);

    view.setInt16(8, -0x1234, false);
    expect(reader.getInt16Be(8)).toBe(-0x1234);

    view.setUint32(10, 0x12345678, true);
    expect(reader.getUint32Le(10)).toBe(0x12345678);

    view.setUint32(14, 0x12345678, false);
    expect(reader.getUint32Be(14)).toBe(0x12345678);

    view.setInt32(18, -0x12345678, true);
    expect(reader.getInt32Le(18)).toBe(-0x12345678);

    view.setInt32(22, -0x12345678, false);
    expect(reader.getInt32Be(22)).toBe(-0x12345678);

    view.setFloat32(26, 123.456, true);
    expect(reader.getFloat32Le(26)).toBeCloseTo(123.456);

    view.setFloat32(30, 123.456, false);
    expect(reader.getFloat32Be(30)).toBeCloseTo(123.456);

    view.setFloat64(34, 12345.6789, true);
    expect(reader.getFloat64Le(34)).toBeCloseTo(12345.6789);

    view.setFloat64(42, 12345.6789, false);
    expect(reader.getFloat64Be(42)).toBeCloseTo(12345.6789);
  });

  it('should throw an error for out-of-bounds accesses', () => {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    const reader = new SaveDataReader(view);

    const expectedError = 'The save file is corrupted or incomplete.';

    expect(() => reader.getUint8(4)).toThrow(expectedError);
    expect(() => reader.getInt8(-1)).toThrow(expectedError);
    expect(() => reader.getUint16Le(3)).toThrow(expectedError);
    expect(() => reader.getUint16Be(3)).toThrow(expectedError);
    expect(() => reader.getInt16Le(3)).toThrow(expectedError);
    expect(() => reader.getInt16Be(3)).toThrow(expectedError);
    expect(() => reader.getUint32Le(1)).toThrow(expectedError);
    expect(() => reader.getUint32Be(1)).toThrow(expectedError);
    expect(() => reader.getInt32Le(1)).toThrow(expectedError);
    expect(() => reader.getInt32Be(1)).toThrow(expectedError);
    expect(() => reader.getFloat32Le(1)).toThrow(expectedError);
    expect(() => reader.getFloat32Be(1)).toThrow(expectedError);
    expect(() => reader.getFloat64Le(0)).toThrow(expectedError);
    expect(() => reader.getFloat64Be(0)).toThrow(expectedError);
  });
});
