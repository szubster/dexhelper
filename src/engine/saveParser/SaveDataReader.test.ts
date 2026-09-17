import { describe, expect, it } from 'vitest';
import { SaveDataReader } from './SaveDataReader';

describe('SaveDataReader', () => {
  it('should read data correctly and handle bounds', () => {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    const reader = new SaveDataReader(view);

    view.setUint8(0, 42);
    expect(reader.getUint8(0)).toBe(42);

    expect(() => reader.getUint8(16)).toThrow('The save file is corrupted or incomplete.');
  });
});
