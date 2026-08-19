import { describe, expect, it } from 'vitest';
import type { UnifiedLocation } from '@/db/schema';
import type { SaveData } from '../../saveParser/index';
import { gen3Strategy } from './gen3Strategy';

describe('gen3Strategy', () => {
  it('should have correct generation', () => {
    expect(gen3Strategy.generation).toBe(3);
  });

  it('isInternallyObtainable should return correct value', () => {
    expect(gen3Strategy.isInternallyObtainable(65, 'ruby')).toBe(false);
    expect(gen3Strategy.isInternallyObtainable(1, 'ruby')).toBe(true);
  });

  it('getSpecialSuggestions should track roamers', () => {
    const saveData = { roamingLegendaries: [{ speciesId: 380, level: 40, mapGroup: 0, mapId: 1 }] } as SaveData;
    const suggestions = gen3Strategy.getSpecialSuggestions(saveData, [380]);
    expect(suggestions.length).toBe(1);
    expect(suggestions[0]?.title).toBe('Track Latias');
  });

  it('resolveMapAid should resolve outdoor map', () => {
    const saveData = { currentMapId: 1 } as SaveData;
    const allLocations = [{ id: 1, prnt: 2 }, { id: 2 }] as UnifiedLocation[];
    expect(gen3Strategy.resolveMapAid(saveData, allLocations)).toBe(2);
  });

  it('getMapDistance should return correct distance', () => {
    const allLocations = [
      { id: 1, n: 'Start', dist: { 2: 5 } },
      { id: 2, n: 'Target' },
    ] as UnifiedLocation[];
    const result = gen3Strategy.getMapDistance(1, 2, allLocations);
    expect(result).toEqual({ distance: 5, name: 'Target' });
  });
});
