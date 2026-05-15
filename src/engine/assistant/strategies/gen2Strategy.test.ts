import { describe, expect, it, vi } from 'vitest';
import type { UnifiedLocation } from '../../../db/schema';
import type { SaveData } from '../../saveParser/index';
import { gen2Strategy } from './gen2Strategy';

// Mock the dependencies
vi.mock('../../mapGraph/gen2Graph', () => ({
  resolveOutdoorMapId: vi.fn<(all: any, id: number) => number>((_, id) => id),
  getDistanceToMap: vi.fn<(all: any, start: number, target: number) => any>(() => ({ distance: 5, name: 'Target Area' })),
}));

vi.mock('../../exclusives/gen2Exclusives', () => ({
  getGen2UnobtainableReason: vi.fn<(id: number, ver: string, count: number, set: Set<number>) => string | null>(() => 'Exclusivity Reason'),
}));

import { getDistanceToMap, resolveOutdoorMapId } from '../../mapGraph/gen2Graph';
import { getGen2UnobtainableReason } from '../../exclusives/gen2Exclusives';

describe('gen2Strategy', () => {
  const mockLocations: UnifiedLocation[] = [];
  const mockSaveData = {
    currentMapId: 0x0306,
  } as SaveData;

  it('has generation 2', () => {
    expect(gen2Strategy.generation).toBe(2);
  });

  it('delegates resolveMapAid to resolveOutdoorMapId', () => {
    const result = gen2Strategy.resolveMapAid(mockSaveData, mockLocations);
    expect(resolveOutdoorMapId).toHaveBeenCalledWith(mockLocations, 0x0306);
    expect(result).toBe(0x0306);
  });

  it('delegates getMapDistance to getDistanceToMap', () => {
    const result = gen2Strategy.getMapDistance(0x0306, 0x0a04, mockLocations);
    expect(getDistanceToMap).toHaveBeenCalledWith(mockLocations, 0x0306, 0x0a04);
    expect(result).toEqual({ distance: 5, name: 'Target Area' });
  });

  it('delegates getUnobtainableReason to getGen2UnobtainableReason', () => {
    const ownedSet = new Set<number>([1, 2, 3]);
    const result = gen2Strategy.getUnobtainableReason(10, 'gold', 3, ownedSet);
    expect(getGen2UnobtainableReason).toHaveBeenCalledWith(10, 'gold', 3, ownedSet);
    expect(result).toBe('Exclusivity Reason');
  });

  it('returns empty special suggestions', () => {
    expect(gen2Strategy.getSpecialSuggestions(mockSaveData, [])).toEqual([]);
  });

  it('returns true for isInternallyObtainable', () => {
    expect(gen2Strategy.isInternallyObtainable(1, 'gold')).toBe(true);
  });
});
