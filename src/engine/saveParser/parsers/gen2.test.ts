import { describe, expect, it } from 'vitest';
import { isGen2Save, parseGen2 } from './gen2';

describe('gen2 parsers', () => {
  describe('isGen2Save', () => {
    it('should return false for invalid party count', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 7); // GS party count
      expect(isGen2Save(view, false)).toBe(false);

      view.setUint8(0x2865, 7); // Crystal party count
      expect(isGen2Save(view, true)).toBe(false);
    });

    it('should return false for invalid terminator', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1); // GS
      view.setUint8(0x288b + 1, 0x00); // Invalid terminator
      expect(isGen2Save(view, false)).toBe(false);
    });

    it('should return false for invalid species id', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1); // GS
      view.setUint8(0x288b + 1, 0xff); // Terminator
      view.setUint8(0x288b, 0); // ID 0 is invalid
      expect(isGen2Save(view, false)).toBe(false);
      view.setUint8(0x288b, 252); // Out of bounds
      expect(isGen2Save(view, false)).toBe(false);
    });

    it('should return true for valid looking save', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);

      view.setUint8(0x288a, 1); // GS party count
      view.setUint8(0x288b + 1, 0xff); // Terminator
      view.setUint8(0x288b, 1); // Bulbasaur
      expect(isGen2Save(view, false)).toBe(true);

      view.setUint8(0x2865, 1); // Crystal party count
      view.setUint8(0x2866 + 1, 0xff); // Terminator
      view.setUint8(0x2866, 1); // Bulbasaur
      expect(isGen2Save(view, true)).toBe(true);
    });
  });

  describe('parseGen2', () => {
    it('should parse GS party', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      // Valid party of 1
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1); // Bulbasaur
      view.setUint8(0x288b + 7, 1); // speciesId inside struct
      view.setUint8(0x288b + 7 + 31, 5); // Level

      const data = parseGen2(view, false);
      expect(data.party).toContain(1);
      expect(data.partyDetails[0]?.speciesId).toBe(1);
      expect(data.generation).toBe(2);
      expect(data.gameVersion).toBe('gold'); // As we haven't provided seen/owned data to identify gold/silver
    });

    it('should detect Crystal and parse', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 7); // invalid GS
      view.setUint8(0x2865, 1); // Valid Crystal
      view.setUint8(0x2866, 2); // Ivysaur
      view.setUint8(0x2866 + 7, 2); // speciesId inside struct

      const data = parseGen2(view, false);
      expect(data.gameVersion).toBe('crystal');
      expect(data.party).toContain(2);
    });

    it('should fall back to gold if unknown GS', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1); // GS
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      const data = parseGen2(view, false);
      expect(data.gameVersion).toBe('gold');
    });
  });
});
