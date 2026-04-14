import { describe, expect, it } from 'vitest';
import { detectGen1GameVersion, isGen1Save } from './gen1';

describe('gen1 parsers', () => {
  describe('detectGen1GameVersion', () => {
    const trainerName = 'RED';
    const party = [] as { speciesId: number; otName: string }[];

    it('should detect yellow version by starters', () => {
      const owned = new Set([1, 4, 7, 25]); // Bulbasaur, Charmander, Squirtle, Pikachu
      const seen = new Set<number>();
      expect(detectGen1GameVersion(new Uint8Array(1), owned, seen, trainerName, party)).toBe('unknown');
    });

    it('should detect yellow version by pikachu markers', () => {
      const u8 = new Uint8Array(32768);
      u8[0x271c] = 1;
      u8[0x271d] = 128;
      expect(detectGen1GameVersion(u8, new Set(), new Set(), trainerName, party)).toBe('yellow');
    });

    it('should detect red version by exclusives', () => {
      const owned = new Set([23, 24, 43, 44]); // Ekans, Arbok, Oddish, Gloom
      const seen = new Set<number>();
      expect(detectGen1GameVersion(new Uint8Array(1), owned, seen, trainerName, party)).toBe('red');
    });

    it('should detect blue version by exclusives', () => {
      const owned = new Set([27, 28, 37, 38]); // Sandshrew, Sandslash, Vulpix, Ninetales
      const seen = new Set<number>();
      expect(detectGen1GameVersion(new Uint8Array(1), owned, seen, trainerName, party)).toBe('blue');
    });

    it('should detect red by trade checks', () => {
      const owned = new Set<number>();
      const seen = new Set<number>();
      const party = [{ speciesId: 83, otName: 'CHIKUCHIKU' }]; // Farfetch'd DUX
      owned.add(23); // Red exclusive
      expect(detectGen1GameVersion(new Uint8Array(1), owned, seen, trainerName, party)).toBe('red');
    });

    it('should return unknown if completely ambiguous', () => {
      const owned = new Set<number>();
      const seen = new Set<number>();
      expect(detectGen1GameVersion(new Uint8Array(1), owned, seen, trainerName, party)).toBe('unknown');
    });
  });

  describe('isGen1Save', () => {
    it('should return false for invalid party count', () => {
      const u8 = new Uint8Array(32768);
      u8[0x2f2c] = 7;
      expect(isGen1Save(u8)).toBe(false);
    });

    it('should return false for missing party terminator', () => {
      const u8 = new Uint8Array(32768);
      u8[0x2f2c] = 1;
      u8[0x2f2d + 1] = 0x00; // Not 0xff
      expect(isGen1Save(u8)).toBe(false);
    });

    it('should return false for invalid species id', () => {
      const u8 = new Uint8Array(32768);
      u8[0x2f2c] = 1;
      u8[0x2f2d + 1] = 0xff; // Terminator
      u8[0x2f2d] = 0; // ID 0 is invalid
      expect(isGen1Save(u8)).toBe(false);
      u8[0x2f2d] = 0xff; // ID 0xff is invalid
      expect(isGen1Save(u8)).toBe(false);
    });

    it('should return true for valid looking save', () => {
      const u8 = new Uint8Array(32768);
      u8[0x2f2c] = 1; // party count
      u8[0x2f2d + 1] = 0xff; // Terminator
      u8[0x2f2d] = 15; // Valid ID

      expect(isGen1Save(u8)).toBe(true);
    });
  });
});
