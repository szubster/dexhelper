import { describe, expect, it, vi } from 'vitest';
import type { UnifiedLocation } from '../../../db/schema';
import type { SaveData } from '../../saveParser/index';
import { gen2Strategy } from './gen2Strategy';

// Mock the dependencies
vi.mock('../../mapGraph/gen2Graph', () => ({
  resolveOutdoorMapId: vi.fn<(allLocations: UnifiedLocation[], id: number) => number>((_, id) => id),
  getDistanceToMap: vi.fn<
    (allLocations: UnifiedLocation[], start: number, target: number) => { distance: number; name: string } | null
  >(() => ({ distance: 5, name: 'Target Area' })),
}));

vi.mock('../../exclusives/gen2Exclusives', () => ({
  getGen2UnobtainableReason: vi.fn<(id: number, ver: string, count: number, set: Set<number>) => string | null>(
    () => 'Exclusivity Reason',
  ),
}));

import { getGen2UnobtainableReason } from '../../exclusives/gen2Exclusives';
import { getDistanceToMap, resolveOutdoorMapId } from '../../mapGraph/gen2Graph';

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

  it('returns special suggestions for gen 2 mechanics', () => {
    const saveData = {
      ...mockSaveData,
      inventory: [],
      partyDetails: [{ speciesId: 25, moves: [29] }], // Pikachu with Headbutt
      pcDetails: [{ speciesId: 19, moves: [249] }], // Rattata with Rock Smash
      roamingLegendaries: [{ speciesId: 243, level: 40, mapGroup: 1, mapId: 1 }],
    } as unknown as SaveData;

    const suggestionsTyrogue = gen2Strategy.getSpecialSuggestions(saveData, [106]);
    expect(suggestionsTyrogue.some((s) => s.id === 'tyrogue-evo-106')).toBe(true);

    const suggestions = gen2Strategy.getSpecialSuggestions(saveData, [243]);
    expect(suggestions).toHaveLength(4); // roamer, headbutt, rocksmash, time
    expect(suggestions[0]?.id).toBe('roamer-243');
    expect(suggestions[1]?.id).toBe('headbutt-reminder');
    expect(suggestions[2]?.id).toBe('rocksmash-reminder');
    expect(suggestions[3]?.id).toBe('time-based-reminder');
  });

  it('returns true for isInternallyObtainable', () => {
    expect(gen2Strategy.isInternallyObtainable(1, 'gold')).toBe(true);
  });

  it('adds time warnings during postProcessSuggestions', () => {
    const suggestions = [
      {
        category: 'Catch',
        encounterInfo: {
          1: [
            { time: 1 }, // Morning
            { time: 4 }, // Night
          ],
        },
      },
      {
        category: 'Catch',
        encounterInfo: {
          2: [
            { time: undefined }, // Any time
          ],
        },
      },
    ] as unknown as import('./types').Suggestion[];
    gen2Strategy.postProcessSuggestions?.(suggestions);
    expect(suggestions[0]?.warning).toBe('Only available in the Morning/Night');
    expect(suggestions[1]?.warning).toBeUndefined();
  });
});
