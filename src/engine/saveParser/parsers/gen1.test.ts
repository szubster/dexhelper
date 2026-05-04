import { describe, expect, test } from 'vitest';
import { isGen1Save } from './gen1';

describe('gen1 parsers', () => {
  describe('isGen1Save', () => {
    const cases = [
      { name: 'invalid party count', u8Mods: { 0x2f2c: 7 }, expected: false },
      { name: 'missing party terminator', u8Mods: { 0x2f2c: 1, 0x2f2e: 0x00 }, expected: false },
      { name: 'invalid species id 0', u8Mods: { 0x2f2c: 1, 0x2f2e: 0xff, 0x2f2d: 0 }, expected: false },
      { name: 'invalid species id 255', u8Mods: { 0x2f2c: 1, 0x2f2e: 0xff, 0x2f2d: 0xff }, expected: false },
      { name: 'valid save', u8Mods: { 0x2f2c: 1, 0x2f2e: 0xff, 0x2f2d: 15 }, expected: true },
    ];

    test.for(cases)('should return $expected for $name', ({ u8Mods, expected }) => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      for (const [offset, value] of Object.entries(u8Mods)) {
        view.setUint8(Number(offset), value as number);
      }
      expect(isGen1Save(view)).toBe(expected);
    });
  });
});
