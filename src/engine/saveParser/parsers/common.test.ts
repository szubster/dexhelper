import { describe, expect, test, vi } from 'vitest';
import { byte, checkShiny, decodeGen12String, parseDVs } from './common';

describe('common parsers', () => {
  describe('byte', () => {
    test('returns byte at offset', () => {
      const u8 = new Uint8Array([10, 20, 30]);
      expect(byte(u8, 1)).toBe(20);
    });

    test('returns 0 for out of bounds offset', () => {
      const u8 = new Uint8Array([10, 20, 30]);
      expect(byte(u8, 5)).toBe(0);
    });

    test('returns 0 for undefined values', () => {
      const u8 = new Uint8Array(2);
      expect(byte(u8, 10)).toBe(0);
    });
  });
  describe('decodeGen12String', () => {
    test('decodes valid string', () => {
      // 0x80 -> A, 0x81 -> B, 0x82 -> C
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);
      view.setUint8(0, 0x80);
      view.setUint8(1, 0x81);
      view.setUint8(2, 0x82);
      view.setUint8(3, 0x50);
      expect(decodeGen12String(view, 0)).toBe('ABC');
    });

    test('stops at terminator 0x50', () => {
      const buffer = new ArrayBuffer(3);
      const view = new DataView(buffer);
      view.setUint8(0, 0x80);
      view.setUint8(1, 0x50);
      view.setUint8(2, 0x81);
      expect(decodeGen12String(view, 0)).toBe('A');
    });

    test('stops at terminator 0x00', () => {
      const buffer = new ArrayBuffer(3);
      const view = new DataView(buffer);
      view.setUint8(0, 0x80);
      view.setUint8(1, 0x00);
      view.setUint8(2, 0x81);
      expect(decodeGen12String(view, 0)).toBe('A');
    });

    test('stops at terminator 0xff', () => {
      const buffer = new ArrayBuffer(3);
      const view = new DataView(buffer);
      view.setUint8(0, 0x80);
      view.setUint8(1, 0xff);
      view.setUint8(2, 0x81);
      expect(decodeGen12String(view, 0)).toBe('A');
    });

    test('replaces unknown characters with ?', () => {
      // 0x10 is not in GEN12_CHAR_MAP
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);
      view.setUint8(0, 0x80);
      view.setUint8(1, 0x10);
      view.setUint8(2, 0x82);
      view.setUint8(3, 0x50);
      expect(decodeGen12String(view, 0)).toBe('A?C');
    });

    test('trims whitespace', () => {
      // 0x7f -> space
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);
      view.setUint8(0, 0x7f);
      view.setUint8(1, 0x80);
      view.setUint8(2, 0x7f);
      view.setUint8(3, 0x50);
      expect(decodeGen12String(view, 0)).toBe('A');
    });

    test('respects maxLength parameter', () => {
      const buffer = new ArrayBuffer(5);
      const view = new DataView(buffer);
      view.setUint8(0, 0x80);
      view.setUint8(1, 0x81);
      view.setUint8(2, 0x82);
      view.setUint8(3, 0x83);
      view.setUint8(4, 0x50);
      expect(decodeGen12String(view, 0, 2)).toBe('AB');
    });

    test('stops at end of buffer (RangeError)', () => {
      const buffer = new ArrayBuffer(2);
      const view = new DataView(buffer);
      view.setUint8(0, 0x80);
      view.setUint8(1, 0x81);
      expect(decodeGen12String(view, 0)).toBe('AB');
    });

    test('rethrows non-RangeError exceptions', () => {
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);
      vi.spyOn(view, 'getUint8').mockImplementation(() => {
        throw new Error('Custom Error');
      });
      expect(() => decodeGen12String(view, 0)).toThrow('Custom Error');
    });
  });

  describe('parseDVs', () => {
    test('parses maximum DVs (15 for all)', () => {
      const dvs = parseDVs(0xffff);
      expect(dvs).toEqual({ hp: 15, atk: 15, def: 15, spd: 15, spc: 15 });
    });

    test('parses mixed DVs', () => {
      // 0x12 -> atk: 1, def: 2
      // 0x34 -> spd: 3, spc: 4
      // hp = ((1 & 1) << 3) | ((2 & 1) << 2) | ((3 & 1) << 1) | (4 & 1)
      // hp = (1 << 3) | (0 << 2) | (1 << 1) | 0
      // hp = 8 | 0 | 2 | 0 = 10
      const dvs = parseDVs(0x1234);
      expect(dvs).toEqual({ hp: 10, atk: 1, def: 2, spd: 3, spc: 4 });
    });

    test('handles zero values', () => {
      const dvs = parseDVs(0x0000);
      expect(dvs).toEqual({ hp: 0, atk: 0, def: 0, spd: 0, spc: 0 });
    });
  });

  describe('checkShiny', () => {
    test('identifies shiny with Atk=2', () => {
      expect(checkShiny({ atk: 2, def: 10, spd: 10, spc: 10 })).toBe(true);
    });

    test('identifies shiny with Atk=15', () => {
      expect(checkShiny({ atk: 15, def: 10, spd: 10, spc: 10 })).toBe(true);
    });

    test('returns false for non-shiny Atk', () => {
      expect(checkShiny({ atk: 4, def: 10, spd: 10, spc: 10 })).toBe(false);
    });

    test('returns false if Def is not 10', () => {
      expect(checkShiny({ atk: 2, def: 9, spd: 10, spc: 10 })).toBe(false);
    });

    test('returns false if Spd is not 10', () => {
      expect(checkShiny({ atk: 2, def: 10, spd: 9, spc: 10 })).toBe(false);
    });

    test('returns false if Spc is not 10', () => {
      expect(checkShiny({ atk: 2, def: 10, spd: 10, spc: 9 })).toBe(false);
    });
  });
});
