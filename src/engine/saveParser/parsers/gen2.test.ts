import { describe, expect, it } from 'vitest';
import { detectGen2GameVersion, isGen2Save, parseCaughtData, parseGen2 } from './gen2';

describe('gen2 parsers', () => {
  describe('detectGen2GameVersion', () => {
    it('should detect gold version', () => {
      const owned = new Set([56, 58, 167, 168]); // gold exclusives
      const seen = new Set<number>();
      expect(detectGen2GameVersion(owned, seen)).toBe('gold');
    });

    it('should detect silver version', () => {
      const owned = new Set([37, 38, 165, 166]); // silver exclusives
      const seen = new Set<number>();
      expect(detectGen2GameVersion(owned, seen)).toBe('silver');
    });

    it('should return unknown if cannot determine', () => {
      const owned = new Set<number>();
      const seen = new Set<number>();
      expect(detectGen2GameVersion(owned, seen)).toBe('unknown');
    });
  });

  describe('isGen2Save', () => {
    it('should return false for invalid party count', () => {
      const u8 = new Uint8Array(32768);
      u8[0x288a] = 7; // GS party count
      expect(isGen2Save(u8, false)).toBe(false);

      u8[0x2865] = 7; // Crystal party count
      expect(isGen2Save(u8, true)).toBe(false);
    });

    it('should return false for invalid terminator', () => {
      const u8 = new Uint8Array(32768);
      u8[0x288a] = 1; // GS
      u8[0x288b + 1] = 0x00; // Not 0xff terminator
      expect(isGen2Save(u8, false)).toBe(false);
    });

    it('should return false for invalid species id', () => {
      const u8 = new Uint8Array(32768);
      u8[0x288a] = 1; // GS
      u8[0x288b + 1] = 0xff; // Terminator
      u8[0x288b] = 0; // ID 0 is invalid
      expect(isGen2Save(u8, false)).toBe(false);
      u8[0x288b] = 252; // Out of bounds
      expect(isGen2Save(u8, false)).toBe(false);
    });

    it('should return true for valid looking save', () => {
      const u8 = new Uint8Array(32768);

      u8[0x288a] = 1; // GS party count
      u8[0x288b + 1] = 0xff; // Terminator
      u8[0x288b] = 1; // Bulbasaur
      expect(isGen2Save(u8, false)).toBe(true);

      u8[0x2865] = 1; // Crystal party count
      u8[0x2866 + 1] = 0xff; // Terminator
      u8[0x2866] = 1; // Bulbasaur
      expect(isGen2Save(u8, true)).toBe(true);
    });
  });

  describe('parseCaughtData', () => {
    it('should return undefined if both bytes are 0', () => {
      const u8 = new Uint8Array(31);
      u8[29] = 0;
      u8[30] = 0;
      expect(parseCaughtData(u8, 0)).toBeUndefined();
    });

    it('should parse time correctly', () => {
      const u8 = new Uint8Array(31);
      // timeBits 1 = Morning
      u8[29] = (1 << 6) | 5; // Level 5
      u8[30] = 1;
      expect(parseCaughtData(u8, 0)).toMatchObject({ time: 'Morning', level: 5 });

      u8[29] = (2 << 6) | 5; // Day
      expect(parseCaughtData(u8, 0)).toMatchObject({ time: 'Day' });

      u8[29] = (3 << 6) | 5; // Night
      expect(parseCaughtData(u8, 0)).toMatchObject({ time: 'Night' });
    });

    it('should parse location correctly', () => {
      const u8 = new Uint8Array(31);
      u8[29] = (1 << 6) | 5;

      u8[30] = 0x7e;
      expect(parseCaughtData(u8, 0)).toMatchObject({ locationName: 'Event/Gift' });

      u8[30] = 0x7f;
      expect(parseCaughtData(u8, 0)).toMatchObject({ locationName: 'Special Event/Traded' });

      u8[30] = 1; // Assuming 1 is mapped in landmarks
      expect(parseCaughtData(u8, 0)?.locationName).toBeDefined();
    });
  });

  describe('parseGen2', () => {
    it('should parse GS party', () => {
      const u8 = new Uint8Array(32768);
      // Valid party of 1
      u8[0x288a] = 1;
      u8[0x288b] = 1; // Bulbasaur
      u8[0x288b + 7] = 1; // speciesId inside struct
      u8[0x288b + 7 + 31] = 5; // Level

      const data = parseGen2(u8, false);
      expect(data.party).toContain(1);
      expect(data.partyDetails[0].speciesId).toBe(1);
      expect(data.generation).toBe(2);
      expect(data.gameVersion).toBe('gold'); // As we haven't provided seen/owned data to identify gold/silver
    });

    it('should detect Crystal and parse', () => {
      const u8 = new Uint8Array(32768);
      u8[0x288a] = 7; // invalid GS
      u8[0x2865] = 1; // Valid Crystal
      u8[0x2866] = 2; // Ivysaur
      u8[0x2866 + 7] = 2; // speciesId inside struct

      const data = parseGen2(u8, false);
      expect(data.gameVersion).toBe('crystal');
      expect(data.party).toContain(2);
    });

    it('should fall back to gold if unknown GS', () => {
      const u8 = new Uint8Array(32768);
      u8[0x288a] = 1; // GS
      u8[0x288b] = 1;
      u8[0x288b + 7] = 1;

      // detectGen2GameVersion will return 'unknown'.
      // Wait, in parseGen2, if (gameVersion === 'unknown' && !isCrystal) gameVersion = 'gold'.
      const data = parseGen2(u8, false);
      expect(data.gameVersion).toBe('gold');
    });
  });
});
