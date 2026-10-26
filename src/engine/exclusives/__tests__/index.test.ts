import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../saveParser/index';
import {
  formatVersionExclusiveReason,
  getGameExclusives,
  getUnobtainableReason,
  getVersionExclusivesMap,
} from '../index';

describe('exclusives/index', () => {
  describe('formatVersionExclusiveReason', () => {
    it('formats capitalized game version exclusive string', () => {
      expect(formatVersionExclusiveReason('gold')).toBe(
        'This Pokémon is not available in Gold. Must be traded from another version.',
      );
      expect(formatVersionExclusiveReason('ruby')).toBe(
        'This Pokémon is not available in Ruby. Must be traded from another version.',
      );
    });
  });

  describe('getVersionExclusivesMap', () => {
    it('returns Gen 1 exclusives when generation is 1', () => {
      const map = getVersionExclusivesMap(1);
      expect(map).toHaveProperty('red');
      expect(map).toHaveProperty('blue');
      expect(map).toHaveProperty('yellow');
    });

    it('returns Gen 2 exclusives when generation is 2', () => {
      const map = getVersionExclusivesMap(2);
      expect(map).toHaveProperty('gold');
      expect(map).toHaveProperty('silver');
      expect(map).toHaveProperty('crystal');
    });

    it('returns Gen 3 exclusives when generation is 3', () => {
      const map = getVersionExclusivesMap(3);
      expect(map).toHaveProperty('ruby');
      expect(map).toHaveProperty('sapphire');
      expect(map).toHaveProperty('emerald');
    });

    it('returns merged map when generation is unspecified', () => {
      const map = getVersionExclusivesMap();
      expect(map).toHaveProperty('red');
      expect(map).toHaveProperty('gold');
      expect(map).toHaveProperty('ruby');
    });
  });

  describe('unified getUnobtainableReason', () => {
    it('evaluates Gen 1 exclusives correctly', () => {
      const ownedSet = new Set<number>();
      const reason = getUnobtainableReason(27, 'red', ownedSet, 1);
      expect(reason).toContain('not available in Red');
    });

    it('evaluates Gen 1 choice locks (Starters)', () => {
      const ownedSet = new Set<number>([1]); // Own Bulbasaur
      const reason = getUnobtainableReason(4, 'red', ownedSet, 1); // Charmander
      expect(reason).toContain('other Starter Pokémon');
    });

    it('evaluates Gen 2 exclusives correctly', () => {
      const ownedSet = new Set<number>();
      const reason = getUnobtainableReason(37, 'gold', ownedSet, 2); // Vulpix
      expect(reason).toContain('not available in Gold');
    });

    it('evaluates Gen 3 exclusives correctly', () => {
      const ownedSet = new Set<number>();
      const reason = getUnobtainableReason(382, 'ruby', ownedSet, 3); // Kyogre
      expect(reason).toContain('not available in Ruby');
    });

    it('supports backward-compatible 4-argument signature (with ownedCount)', () => {
      const ownedSet = new Set<number>();
      const reason = getUnobtainableReason(37, 'gold', 0, ownedSet, 2);
      expect(reason).toContain('not available in Gold');
    });

    it('returns null when Pokémon is already owned', () => {
      const ownedSet = new Set<number>([37]);
      const reason = getUnobtainableReason(37, 'gold', ownedSet, 2);
      expect(reason).toBeNull();
    });

    it('returns null for obtainable non-exclusive Pokémon', () => {
      const ownedSet = new Set<number>();
      const reason = getUnobtainableReason(16, 'red', ownedSet, 1);
      expect(reason).toBeNull();
    });
  });

  describe('getGameExclusives', () => {
    it('should return missing exclusives for gen 1 red', () => {
      const saveData = { generation: 1, gameVersion: 'red' } as SaveData;
      const exclusives = getGameExclusives(saveData);
      expect(exclusives.missing).toContain(27);
      expect(exclusives.available).toContain(23);
    });

    it('should return missing exclusives for gen 2 gold', () => {
      const saveData = { generation: 2, gameVersion: 'gold' } as SaveData;
      const exclusives = getGameExclusives(saveData);
      expect(exclusives.missing).toContain(37);
      expect(exclusives.available).toContain(56);
    });

    it('should return missing exclusives for gen 3 ruby', () => {
      const saveData = { generation: 3, gameVersion: 'ruby' } as SaveData;
      const exclusives = getGameExclusives(saveData);
      expect(exclusives.missing).toContain(270);
      expect(exclusives.available).toContain(273);
    });
  });
});
