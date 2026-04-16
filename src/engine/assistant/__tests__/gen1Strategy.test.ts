import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '../../../db/schema';
import type { SaveData } from '../../saveParser/index';
import { gen1Strategy } from '../strategies/gen1Strategy';

const mockLocations: UnifiedLocation[] = [
  { id: 0x00, n: 'Pallet Town', connections: [0x01], dist: { 0x00: 0, 0x01: 1 } },
  { id: 0x01, n: 'Route 1', connections: [0x00, 0x03], dist: { 0x01: 0, 0x00: 1, 0x03: 1 } },
  { id: 0x03, n: 'Cerulean City', connections: [0x01], dist: { 0x03: 0, 0x01: 1 } },
  { id: 0x25, n: 'Pallet House', parentId: 0x00, connections: [], dist: {} },
];

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

  describe('resolveMapAid', () => {
    it('should resolve Pallet Town (0x00) to Pallet Town Map ID (0x00)', () => {
      const save = makeSaveData({ currentMapId: 0x00 });
      expect(gen1Strategy.resolveMapAid(save, mockLocations)).toBe(0x00);
    });

    it('should resolve Cerulean City (0x03) to Cerulean City Map ID (0x03)', () => {
      const save = makeSaveData({ currentMapId: 0x03 });
      expect(gen1Strategy.resolveMapAid(save, mockLocations)).toBe(0x03);
    });

    it('should resolve indoor maps to their parent outdoor area map id', () => {
      // 0x25 is a Pallet Town interior -> resolves to 0x00 (Pallet Town)
      const save = makeSaveData({ currentMapId: 0x25 });
      expect(gen1Strategy.resolveMapAid(save, mockLocations)).toBe(0x00);
    });
  });

  describe('getMapDistance', () => {
    it('should return distance 0 for current location', () => {
      const result = gen1Strategy.getMapDistance(0x00, 0x00, mockLocations);
      expect(result).not.toBeNull();
      expect(result?.distance).toBe(0);
    });

    it('should return positive distance for adjacent locations', () => {
      const result = gen1Strategy.getMapDistance(0x00, 0x01, mockLocations);
      expect(result).not.toBeNull();
      expect(result?.distance).toBe(1);
    });

    it('should return null for unknown target aids', () => {
      const result = gen1Strategy.getMapDistance(0x00, 9999, mockLocations);
      expect(result).toBeNull();
    });
  });

  describe('getUnobtainableReason', () => {
    it('should detect Raichu lock in Yellow', () => {
      const reason = gen1Strategy.getUnobtainableReason(26, 'yellow', 1, new Set([25]));
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
      expect(suggestions[0]?.id).toBe('box-full-warning');
    });

    it('should not warn when box has space', () => {
      const save = makeSaveData({ currentBoxCount: 5 });
      const suggestions = gen1Strategy.getSpecialSuggestions(save, []);
      expect(suggestions).toHaveLength(0);
    });
  });
});
