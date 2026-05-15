import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '../../../db/schema';
import type { SaveData } from '../../saveParser/index';
import { gen2Strategy } from './gen2Strategy';

const mockLocations: UnifiedLocation[] = [
  // Johto Hubs
  { id: 0x0306, n: 'Goldenrod City', conn: [0x0a], dist: { 0x0a: 1, 0x05: 2, 0x0307: 3 } },
  { id: 0x0307, n: 'Olivine City', conn: [0x05], dist: { 0x05: 1, 0x0a: 2, 0x0306: 3 } },
  // Kanto Hubs
  { id: 0x0a, n: 'Saffron City', conn: [0x0306, 0x05], dist: { 0x0306: 1, 0x05: 1, 0x0307: 2 } },
  { id: 0x05, n: 'Vermilion City', conn: [0x0a, 0x0307], dist: { 0x0a: 1, 0x0307: 1, 0x0306: 2 } },
  // Indoor
  { id: 0x25, n: 'Goldenrod Pokecenter', prnt: 0x0306, conn: [], dist: {} },
];

const mockSaveData = (currentMapId: number): SaveData => ({
  generation: 2,
  gameVersion: 'gold',
  trainerName: 'GOLD',
  badges: 0,
  currentMapId,
  currentMapName: 'Mock Map',
  inventory: [],
  owned: new Set(),
  seen: new Set(),
  party: [],
  pc: [],
  partyDetails: [],
  pcDetails: [],
  trainerId: 12345,
  currentBoxCount: 0,
  hallOfFameCount: 0,
});

describe('gen2Strategy', () => {
  describe('resolveMapAid', () => {
    it('resolves outdoor map directly', () => {
      const saveData = mockSaveData(0x0306);
      const result = gen2Strategy.resolveMapAid(saveData, mockLocations);
      expect(result).toBe(0x0306);
    });

    it('resolves indoor map to outdoor parent', () => {
      const saveData = mockSaveData(0x25);
      const result = gen2Strategy.resolveMapAid(saveData, mockLocations);
      expect(result).toBe(0x0306);
    });
  });

  describe('getMapDistance', () => {
    it('calculates distance between Johto and Kanto (Magnet Train)', () => {
      // Goldenrod (Johto) to Saffron (Kanto)
      const result = gen2Strategy.getMapDistance(0x0306, 0x0a, mockLocations);
      expect(result).toEqual({ distance: 1, name: 'Saffron City' });
    });

    it('calculates distance between Johto and Kanto (S.S. Aqua)', () => {
      // Olivine (Johto) to Vermilion (Kanto)
      const result = gen2Strategy.getMapDistance(0x0307, 0x05, mockLocations);
      expect(result).toEqual({ distance: 1, name: 'Vermilion City' });
    });

    it('returns null for unreachable maps', () => {
      const result = gen2Strategy.getMapDistance(0x0306, 0x999, mockLocations);
      expect(result).toBeNull();
    });
  });

  describe('getUnobtainableReason', () => {
    it('returns reason for version exclusives', () => {
      // Vulpix (ID 37) is silver exclusive
      const result = gen2Strategy.getUnobtainableReason(37, 'gold', 0, new Set());
      expect(result).toContain('not available in Gold');
    });

    it('returns null for obtainable pokemon', () => {
      // Pidgey (ID 16) is in all versions
      const result = gen2Strategy.getUnobtainableReason(16, 'gold', 0, new Set());
      expect(result).toBeNull();
    });
  });

  describe('getSpecialSuggestions', () => {
    it('adds box full warning when box is almost full', () => {
      const saveData = { ...mockSaveData(0x0306), currentBoxCount: 19 };
      const result = gen2Strategy.getSpecialSuggestions(saveData, []);
      expect(result).toHaveLength(1);
      expect(result[0]?.id).toBe('box-full-warning');
    });

    it('does not add warning when box has space', () => {
      const saveData = { ...mockSaveData(0x0306), currentBoxCount: 5 };
      const result = gen2Strategy.getSpecialSuggestions(saveData, []);
      expect(result).toHaveLength(0);
    });
  });
});
