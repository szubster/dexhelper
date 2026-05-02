import { describe, expect, it, vi } from 'vitest';
import type { UnifiedLocation } from '../../../db/schema';
import { getGenerationConfig } from '../../../utils/generationConfig';
import type { SaveData } from '../../saveParser/index';
import { gen1Strategy } from './gen1Strategy';

// Mock the dependencies
vi.mock('../../mapGraph/gen1Graph', () => ({
  getDistanceToMap: vi
    .fn<() => { distance: number; name: string }>()
    .mockReturnValue({ distance: 5, name: 'Mocked Target' }),
}));

vi.mock('../../exclusives/gen1Exclusives', () => ({
  getUnobtainableReason: vi.fn<() => string>().mockReturnValue('Mocked Reason'),
}));

describe('gen1Strategy', () => {
  describe('generation', () => {
    it('is generation 1', () => {
      expect(gen1Strategy.generation).toBe(1);
    });
  });

  describe('resolveMapAid', () => {
    const mockLocations: UnifiedLocation[] = [
      { id: 1, n: 'Pallet Town' },
      { id: 2, n: "Red's House 1F", prnt: 1 },
    ];

    it('returns null if location is not found', () => {
      const mockSave = { currentMapId: 999 } as SaveData;
      expect(gen1Strategy.resolveMapAid(mockSave, mockLocations)).toBeNull();
    });

    it('returns the location id if it is an outdoor location (no prnt)', () => {
      const mockSave = { currentMapId: 1 } as SaveData;
      expect(gen1Strategy.resolveMapAid(mockSave, mockLocations)).toBe(1);
    });

    it('returns the parent location id if it is an indoor location (has prnt)', () => {
      const mockSave = { currentMapId: 2 } as SaveData;
      expect(gen1Strategy.resolveMapAid(mockSave, mockLocations)).toBe(1);
    });
  });

  describe('getMapDistance', () => {
    it('delegates to getDistanceToMap', () => {
      const result = gen1Strategy.getMapDistance(1, 2, []);
      expect(result).toEqual({ distance: 5, name: 'Mocked Target' });
    });
  });

  describe('getUnobtainableReason', () => {
    it('delegates to getUnobtainableReason from exclusives', () => {
      const mockSet = new Set<number>();
      const result = gen1Strategy.getUnobtainableReason(1, 'red', 0, mockSet);
      expect(result).toBe('Mocked Reason');
    });
  });

  describe('getSpecialSuggestions', () => {
    const genConfig = getGenerationConfig(1);

    it('returns a box full warning when currentBoxCount is >= boxWarningThreshold', () => {
      const mockSave = {
        currentBoxCount: genConfig.boxWarningThreshold,
        hallOfFameCount: 1,
        owned: new Set(),
      } as unknown as SaveData;

      const suggestions = gen1Strategy.getSpecialSuggestions(mockSave, []);

      expect(suggestions).toHaveLength(1);
      expect(suggestions[0]).toMatchObject({
        id: 'box-full-warning',
        category: 'Event',
        priority: 1000,
      });
      expect(suggestions[0]?.description).toContain(`${genConfig.boxWarningThreshold}/${genConfig.boxCapacity}`);
    });

    it('returns no warnings when currentBoxCount is < boxWarningThreshold', () => {
      const mockSave = {
        currentBoxCount: genConfig.boxWarningThreshold - 1,
        hallOfFameCount: 1,
        owned: new Set(),
      } as unknown as SaveData;

      const suggestions = gen1Strategy.getSpecialSuggestions(mockSave, []);

      expect(suggestions).toHaveLength(0);
    });

    it('does not return Mewtwo lock suggestion even if locked (handled elsewhere)', () => {
      const mockSave = {
        currentBoxCount: 0,
        hallOfFameCount: 0,
        owned: new Set(),
      } as unknown as SaveData;

      const suggestions = gen1Strategy.getSpecialSuggestions(mockSave, []);

      expect(suggestions).toHaveLength(0);
    });
  });

  describe('isInternallyObtainable', () => {
    it('always returns true since Gen 1 lacks breeding', () => {
      expect(gen1Strategy.isInternallyObtainable(1, 'red')).toBe(true);
      expect(gen1Strategy.isInternallyObtainable(150, 'blue')).toBe(true);
    });
  });
});
