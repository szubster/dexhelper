import { describe, expect, it } from 'vitest';
import {
  GEN1_PARTY_COUNT_OFFSET,
  GEN1_PARTY_DATA_START_OFFSET,
  GEN2_PARTY_COUNT_OFFSET_CRYSTAL,
  GEN2_PARTY_COUNT_OFFSET_GS,
  GEN2_PARTY_SPECIES_OFFSET_CRYSTAL,
  GEN2_PARTY_SPECIES_OFFSET_GS,
  isGen1Save,
  isGen2Save,
  isGen3Save,
} from '../detection';

describe('Save File Detection', () => {
  describe('isGen1Save', () => {
    it('returns true for a valid Gen 1 save', () => {
      const buffer = new ArrayBuffer(0x3000);
      const view = new DataView(buffer);
      view.setUint8(GEN1_PARTY_COUNT_OFFSET, 2); // 2 Pokemon in party
      view.setUint8(GEN1_PARTY_DATA_START_OFFSET, 1); // Bulbasaur
      view.setUint8(GEN1_PARTY_DATA_START_OFFSET + 1, 4); // Charmander
      view.setUint8(GEN1_PARTY_DATA_START_OFFSET + 2, 0xff); // Terminator

      expect(isGen1Save(view)).toBe(true);
    });

    it('returns false if party count is > 6', () => {
      const buffer = new ArrayBuffer(0x3000);
      const view = new DataView(buffer);
      view.setUint8(GEN1_PARTY_COUNT_OFFSET, 7);
      expect(isGen1Save(view)).toBe(false);
    });

    it('returns false if terminator is missing', () => {
      const buffer = new ArrayBuffer(0x3000);
      const view = new DataView(buffer);
      view.setUint8(GEN1_PARTY_COUNT_OFFSET, 1);
      view.setUint8(GEN1_PARTY_DATA_START_OFFSET, 1);
      view.setUint8(GEN1_PARTY_DATA_START_OFFSET + 1, 0x00); // Not 0xff

      expect(isGen1Save(view)).toBe(false);
    });

    it('returns false if a Pokemon ID is invalid (0 or 0xff)', () => {
      const buffer = new ArrayBuffer(0x3000);
      const view = new DataView(buffer);
      view.setUint8(GEN1_PARTY_COUNT_OFFSET, 2);
      view.setUint8(GEN1_PARTY_DATA_START_OFFSET, 1);
      view.setUint8(GEN1_PARTY_DATA_START_OFFSET + 1, 0xff); // Invalid ID before terminator
      view.setUint8(GEN1_PARTY_DATA_START_OFFSET + 2, 0xff);

      expect(isGen1Save(view)).toBe(false);
    });

    it('returns false if a Pokemon ID is 0', () => {
      const buffer = new ArrayBuffer(0x3000);
      const view = new DataView(buffer);
      view.setUint8(GEN1_PARTY_COUNT_OFFSET, 1);
      view.setUint8(GEN1_PARTY_DATA_START_OFFSET, 0); // Invalid ID
      view.setUint8(GEN1_PARTY_DATA_START_OFFSET + 1, 0xff);

      expect(isGen1Save(view)).toBe(false);
    });

    it('handles RangeError by returning false', () => {
      const buffer = new ArrayBuffer(10); // Too small
      const view = new DataView(buffer);
      expect(isGen1Save(view)).toBe(false);
    });
    it('throws non RangeError', () => {
      const view = {
        getUint8: () => {
          throw new Error('Some error');
        },
      } as unknown as DataView;
      expect(() => isGen1Save(view)).toThrow('Some error');
    });
  });

  describe('isGen2Save', () => {
    it('returns true for a valid GS save', () => {
      const buffer = new ArrayBuffer(0x3000);
      const view = new DataView(buffer);
      view.setUint8(GEN2_PARTY_COUNT_OFFSET_GS, 1);
      view.setUint8(GEN2_PARTY_SPECIES_OFFSET_GS, 152); // Chikorita
      view.setUint8(GEN2_PARTY_SPECIES_OFFSET_GS + 1, 0xff); // Terminator

      expect(isGen2Save(view, false)).toBe(true);
    });

    it('returns true for a valid Crystal save', () => {
      const buffer = new ArrayBuffer(0x3000);
      const view = new DataView(buffer);
      view.setUint8(GEN2_PARTY_COUNT_OFFSET_CRYSTAL, 2);
      view.setUint8(GEN2_PARTY_SPECIES_OFFSET_CRYSTAL, 155); // Cyndaquil
      view.setUint8(GEN2_PARTY_SPECIES_OFFSET_CRYSTAL + 1, 158); // Totodile
      view.setUint8(GEN2_PARTY_SPECIES_OFFSET_CRYSTAL + 2, 0xff); // Terminator

      expect(isGen2Save(view, true)).toBe(true);
    });

    it('returns false if party count is > 6', () => {
      const buffer = new ArrayBuffer(0x3000);
      const view = new DataView(buffer);
      view.setUint8(GEN2_PARTY_COUNT_OFFSET_GS, 7);
      expect(isGen2Save(view, false)).toBe(false);
    });

    it('returns false if terminator is missing', () => {
      const buffer = new ArrayBuffer(0x3000);
      const view = new DataView(buffer);
      view.setUint8(GEN2_PARTY_COUNT_OFFSET_GS, 1);
      view.setUint8(GEN2_PARTY_SPECIES_OFFSET_GS, 152);
      view.setUint8(GEN2_PARTY_SPECIES_OFFSET_GS + 1, 0x00); // Not 0xff

      expect(isGen2Save(view, false)).toBe(false);
    });

    it('returns false if a Pokemon ID is invalid (> 251)', () => {
      const buffer = new ArrayBuffer(0x3000);
      const view = new DataView(buffer);
      view.setUint8(GEN2_PARTY_COUNT_OFFSET_GS, 1);
      view.setUint8(GEN2_PARTY_SPECIES_OFFSET_GS, 252); // Invalid ID
      view.setUint8(GEN2_PARTY_SPECIES_OFFSET_GS + 1, 0xff);

      expect(isGen2Save(view, false)).toBe(false);
    });

    it('returns false if a Pokemon ID is 0', () => {
      const buffer = new ArrayBuffer(0x3000);
      const view = new DataView(buffer);
      view.setUint8(GEN2_PARTY_COUNT_OFFSET_GS, 1);
      view.setUint8(GEN2_PARTY_SPECIES_OFFSET_GS, 0); // Invalid ID
      view.setUint8(GEN2_PARTY_SPECIES_OFFSET_GS + 1, 0xff);

      expect(isGen2Save(view, false)).toBe(false);
    });

    it('handles RangeError by returning false', () => {
      const buffer = new ArrayBuffer(10); // Too small
      const view = new DataView(buffer);
      expect(isGen2Save(view, false)).toBe(false);
    });

    it('throws non RangeError', () => {
      const view = {
        getUint8: () => {
          throw new Error('Some error');
        },
      } as unknown as DataView;
      expect(() => isGen2Save(view, false)).toThrow('Some error');
    });
  });

  describe('isGen3Save', () => {
    it('returns true for a valid Gen 3 save with at least 7 valid sector signatures', () => {
      const buffer = new ArrayBuffer(0x20000);
      const view = new DataView(buffer);
      for (let i = 0; i < 7; i++) {
        view.setUint32(i * 0x1000 + 0x0ff8, 0x08012025, true);
      }
      expect(isGen3Save(view)).toBe(true);
    });

    it('returns false if there are fewer than 7 valid sectors', () => {
      const buffer = new ArrayBuffer(0x20000);
      const view = new DataView(buffer);
      for (let i = 0; i < 6; i++) {
        view.setUint32(i * 0x1000 + 0x0ff8, 0x08012025, true);
      }
      expect(isGen3Save(view)).toBe(false);
    });

    it('returns false for buffers smaller than 0x10000 bytes', () => {
      const buffer = new ArrayBuffer(0x8000);
      const view = new DataView(buffer);
      expect(isGen3Save(view)).toBe(false);
    });

    it('handles RangeError gracefully', () => {
      const view = {
        byteLength: 0x20000,
        getUint32: () => {
          throw new RangeError('Out of bounds');
        },
      } as unknown as DataView;
      expect(isGen3Save(view)).toBe(false);
    });

    it('throws non RangeError', () => {
      const view = {
        byteLength: 0x20000,
        getUint32: () => {
          throw new Error('Some error');
        },
      } as unknown as DataView;
      expect(() => isGen3Save(view)).toThrow('Some error');
    });
  });
});
