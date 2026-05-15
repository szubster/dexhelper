import { describe, expect, it, vi } from 'vitest';
import type { UnifiedLocation } from '../../../db/schema';
import { getGenerationConfig } from '../../../utils/generationConfig';
import type { SaveData } from '../../saveParser/index';
import { gen2Strategy } from './gen2Strategy';

// Mock the dependencies
vi.mock('../../mapGraph/gen2Graph', () => ({
  getDistanceToMap: vi
    .fn<() => { distance: number; name: string } | null>()
    .mockReturnValue({ distance: 10, name: 'Mocked Gen 2 Target' }),
}));

vi.mock('../../exclusives/gen2Exclusives', () => ({
  getGen2UnobtainableReason: vi.fn<() => string | null>().mockReturnValue('Mocked Gen 2 Reason'),
}));

describe('gen2Strategy', () => {
  describe('generation', () => {
    it('is generation 2', () => {
      expect(gen2Strategy.generation).toBe(2);
    });
  });

  describe('resolveMapAid', () => {
    const mockLocations: UnifiedLocation[] = [
      { id: 0x0301, n: 'New Bark Town' },
      { id: 0x0302, n: 'Cherrygrove City' },
      { id: 0x25, n: "Elm's Lab", prnt: 0x0301 },
    ];

    it('returns null if location is not found', () => {
      const mockSave = { currentMapId: 0x999 } as SaveData;
      expect(gen2Strategy.resolveMapAid(mockSave, mockLocations)).toBeNull();
    });

    it('returns the location id if it is an outdoor location (no prnt)', () => {
      const mockSave = { currentMapId: 0x0301 } as SaveData;
      expect(gen2Strategy.resolveMapAid(mockSave, mockLocations)).toBe(0x0301);
    });

    it('returns the parent location id if it is an indoor location (has prnt)', () => {
      const mockSave = { currentMapId: 0x25 } as SaveData;
      expect(gen2Strategy.resolveMapAid(mockSave, mockLocations)).toBe(0x0301);
    });
  });

  describe('getMapDistance', () => {
    it('delegates to getDistanceToMap', () => {
      const result = gen2Strategy.getMapDistance(0x0301, 0x0302, []);
      expect(result).toEqual({ distance: 10, name: 'Mocked Gen 2 Target' });
    });
  });

  describe('getUnobtainableReason', () => {
    it('delegates to getGen2UnobtainableReason from exclusives', () => {
      const mockSet = new Set<number>();
      const result = gen2Strategy.getUnobtainableReason(152, 'gold', 0, mockSet);
      expect(result).toBe('Mocked Gen 2 Reason');
    });
  });

  describe('getSpecialSuggestions', () => {
    const genConfig = getGenerationConfig(2);

    it('returns a box full warning when currentBoxCount is >= boxWarningThreshold', () => {
      const mockSave = {
        currentBoxCount: genConfig.boxWarningThreshold,
        owned: new Set(),
      } as unknown as SaveData;

      const suggestions = gen2Strategy.getSpecialSuggestions(mockSave, []);

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
        owned: new Set(),
      } as unknown as SaveData;

      const suggestions = gen2Strategy.getSpecialSuggestions(mockSave, []);

      expect(suggestions).toHaveLength(0);
    });
  });

  describe('isInternallyObtainable', () => {
    it('returns true for Gen 2', () => {
      expect(gen2Strategy.isInternallyObtainable(152, 'gold')).toBe(true);
    });
  });
});
