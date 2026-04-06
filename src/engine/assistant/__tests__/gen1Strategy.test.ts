import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../saveParser/index';
import { gen1Strategy } from '../strategies/gen1Strategy';

const makeSaveData = (overrides: Partial<SaveData> = {}): SaveData => ({
  generation: 1,
  gameVersion: 'yellow',
  trainerName: 'TEST',
  trainerId: 12345,
  badges: 0,
  owned: new Set([25]),
  seen: new Set([25]),
  party: [25],
  pc: [],
  inventory: [],
  currentMapId: 0,
  currentBoxCount: 1,
  hallOfFameCount: 0,
  eventFlags: new Uint8Array(300),
  partyDetails: [],
  pcDetails: [],
  ...overrides,
});

describe('Gen 1 AssistantStrategy', () => {
  it('should have generation = 1', () => {
    expect(gen1Strategy.generation).toBe(1);
  });

  describe('resolveMapSlug', () => {
    it('should resolve Pallet Town (0x00) to pallet-town-area', () => {
      const save = makeSaveData({ currentMapId: 0x00 });
      expect(gen1Strategy.resolveMapSlug(save)).toBe('pallet-town-area');
    });

    it('should resolve Cerulean City (0x03) to cerulean-city-area', () => {
      const save = makeSaveData({ currentMapId: 0x03 });
      expect(gen1Strategy.resolveMapSlug(save)).toBe('cerulean-city-area');
    });

    it('should resolve indoor maps to their parent outdoor area', () => {
      // 0x25 is a Pallet Town interior -> resolves to 0x00 (Pallet Town)
      const save = makeSaveData({ currentMapId: 0x25 });
      expect(gen1Strategy.resolveMapSlug(save)).toBe('pallet-town-area');
    });
  });

  describe('getMapDistance', () => {
    it('should return distance 0 for current location', () => {
      const result = gen1Strategy.getMapDistance(0x00, 'pallet-town-area');
      expect(result).not.toBeNull();
      expect(result!.distance).toBe(0);
    });

    it('should return positive distance for adjacent locations', () => {
      // Pallet Town -> Route 1 (adjacent)
      const result = gen1Strategy.getMapDistance(0x00, 'route-1');
      expect(result).not.toBeNull();
      expect(result!.distance).toBe(1);
    });

    it('should return null for unknown target slugs', () => {
      const result = gen1Strategy.getMapDistance(0x00, 'nonexistent-area');
      expect(result).toBeNull();
    });
  });

  describe('getUnobtainableReason', () => {
    it('should detect Raichu lock in Yellow', () => {
      const reason = gen1Strategy.getUnobtainableReason(
        26,
        'yellow',
        1,
        new Set([25]),
      );
      expect(reason).toBeTruthy();
      expect(reason).toContain('Thunder Stone');
    });

    it('should return null for normal obtainable Pokémon', () => {
      const reason = gen1Strategy.getUnobtainableReason(1, 'red', 0, new Set());
      expect(reason).toBeNull();
    });
  });

  describe('getSpecialSuggestions', () => {
    it('should warn when box is nearly full', () => {
      const save = makeSaveData({ currentBoxCount: 19 });
      const suggestions = gen1Strategy.getSpecialSuggestions(save, []);
      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]!.id).toBe('box-full-warning');
    });

    it('should not warn when box has space', () => {
      const save = makeSaveData({ currentBoxCount: 5 });
      const suggestions = gen1Strategy.getSpecialSuggestions(save, []);
      expect(suggestions).toHaveLength(0);
    });
  });
});
