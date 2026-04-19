import { describe, expect, it, test } from 'vitest';
import { byte, checkShiny, decodeGen12String, parseDVs } from '../../../../src/engine/saveParser/parsers/common';

describe('common parsers', () => {
  describe('byte', () => {
    test.each([
      [0, 10],
      [1, 20],
      [2, 30],
      [3, 0],
      [-1, 0],
    ])('at offset %i returns %i', (offset, expected) => {
      const u8 = new Uint8Array([10, 20, 30]);
      expect(byte(u8, offset)).toBe(expected);
    });
  });

  describe('decodeGen12String', () => {
    it('should decode a string using GEN12_CHAR_MAP', () => {
      // 0x80 = A, 0x81 = B, 0x82 = C
      const u8 = new Uint8Array([0x80, 0x81, 0x82, 0x50]);
      expect(decodeGen12String(u8, 0)).toBe('ABC');
    });

    it('should stop decoding at terminator 0x50', () => {
      const u8 = new Uint8Array([0x80, 0x50, 0x81]);
      expect(decodeGen12String(u8, 0)).toBe('A');
    });

    it('should handle max length properly', () => {
      const u8 = new Uint8Array(20).fill(0x80); // 'A'
      expect(decodeGen12String(u8, 0, 5)).toBe('AAAAA');
    });

    it('should trim the resulting string', () => {
      // 0x7f = space
      const u8 = new Uint8Array([0x7f, 0x80, 0x7f, 0x50]);
      expect(decodeGen12String(u8, 0)).toBe('A');
    });

    it('should return ? for unknown characters', () => {
      const u8 = new Uint8Array([0x01, 0x50]);
      expect(decodeGen12String(u8, 0)).toBe('?');
    });
  });

  describe('parseDVs', () => {
    it('should parse 0xFFFF to max DVs (15 for all, HP 15)', () => {
      const dvs = parseDVs(new Uint8Array([0xff, 0xff]));
      expect(dvs).toEqual({ hp: 15, atk: 15, def: 15, spd: 15, spc: 15 });
    });

    it('should parse 0x0000 to min DVs (0 for all)', () => {
      const dvs = parseDVs(new Uint8Array([0x00, 0x00]));
      expect(dvs).toEqual({ hp: 0, atk: 0, def: 0, spd: 0, spc: 0 });
    });

    it('should compute HP correctly based on the lowest bits of other DVs', () => {
      // atk: 1 (0001) -> HP bit 3 = 1 (8)
      // def: 0 (0000) -> HP bit 2 = 0 (0)
      // spd: 1 (0001) -> HP bit 1 = 1 (2)
      // spc: 0 (0000) -> HP bit 0 = 0 (0)
      // HP = 10
      // 0x10 -> atk=1, def=0
      // 0x10 -> spd=1, spc=0
      const dvs = parseDVs(new Uint8Array([0x10, 0x10]));
      expect(dvs).toEqual({ hp: 10, atk: 1, def: 0, spd: 1, spc: 0 });
    });
  });

  describe('checkShiny', () => {
    test.each([2, 3, 6, 7, 10, 11, 14, 15])('should return true for valid shiny DVs (atk=%i)', (atk) => {
      expect(checkShiny({ atk, def: 10, spd: 10, spc: 10 })).toBe(true);
    });

    test.each([
      [{ atk: 10, def: 9, spd: 10, spc: 10 }],
      [{ atk: 10, def: 10, spd: 9, spc: 10 }],
      [{ atk: 10, def: 10, spd: 10, spc: 9 }],
    ])('should return false if any required DV is not 10 (%o)', (dvs) => {
      expect(checkShiny(dvs)).toBe(false);
    });

    test.each([
      0, 1, 4, 5, 8, 9, 12, 13,
    ])('should return false if atk is not one of the shiny values (atk=%i)', (atk) => {
      expect(checkShiny({ atk, def: 10, spd: 10, spc: 10 })).toBe(false);
    });
  });
});
