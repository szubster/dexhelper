import { describe, expect, test } from 'vitest';
import { byte, checkShiny, decodeGen12String, parseDVs } from './common';

describe('common parsers', () => {
  describe('byte', () => {
    test('reads valid byte at offset', () => {
      const u8 = new Uint8Array([10, 20, 30]);
      expect(byte(u8, 1)).toBe(20);
    });

    test('returns 0 for out-of-bounds offset', () => {
      const u8 = new Uint8Array([10, 20, 30]);
      expect(byte(u8, 5)).toBe(0);
    });
  });

  describe('decodeGen12String', () => {
    test('decodes valid string', () => {
      // 0x80 -> A, 0x81 -> B, 0x82 -> C
      const u8 = new Uint8Array([0x80, 0x81, 0x82, 0x50]);
      expect(decodeGen12String(u8, 0)).toBe('ABC');
    });

    test('stops at terminator 0x50', () => {
      const u8 = new Uint8Array([0x80, 0x50, 0x81]);
      expect(decodeGen12String(u8, 0)).toBe('A');
    });

    test('stops at terminator 0x00', () => {
      const u8 = new Uint8Array([0x80, 0x00, 0x81]);
      expect(decodeGen12String(u8, 0)).toBe('A');
    });

    test('stops at terminator 0xff', () => {
      const u8 = new Uint8Array([0x80, 0xff, 0x81]);
      expect(decodeGen12String(u8, 0)).toBe('A');
    });

    test('replaces unknown characters with ?', () => {
      // 0x10 is not in GEN12_CHAR_MAP
      const u8 = new Uint8Array([0x80, 0x10, 0x82, 0x50]);
      expect(decodeGen12String(u8, 0)).toBe('A?C');
    });

    test('trims whitespace', () => {
      // 0x7f -> space
      const u8 = new Uint8Array([0x7f, 0x80, 0x7f, 0x50]);
      expect(decodeGen12String(u8, 0)).toBe('A');
    });

    test('respects maxLength parameter', () => {
      const u8 = new Uint8Array([0x80, 0x81, 0x82, 0x83, 0x50]);
      expect(decodeGen12String(u8, 0, 2)).toBe('AB');
    });
  });

  describe('parseDVs', () => {
    test('parses maximum DVs (15 for all)', () => {
      const u8 = new Uint8Array([0xff, 0xff]);
      const dvs = parseDVs(u8);
      expect(dvs).toEqual({ hp: 15, atk: 15, def: 15, spd: 15, spc: 15 });
    });

    test('parses mixed DVs', () => {
      // 0x12 -> atk: 1, def: 2
      // 0x34 -> spd: 3, spc: 4
      // hp = ((1 & 1) << 3) | ((2 & 1) << 2) | ((3 & 1) << 1) | (4 & 1)
      // hp = (1 << 3) | (0 << 2) | (1 << 1) | 0
      // hp = 8 | 0 | 2 | 0 = 10
      const u8 = new Uint8Array([0x12, 0x34]);
      const dvs = parseDVs(u8);
      expect(dvs).toEqual({ hp: 10, atk: 1, def: 2, spd: 3, spc: 4 });
    });

    test('handles empty or missing bytes', () => {
      const u8 = new Uint8Array([]);
      const dvs = parseDVs(u8);
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
