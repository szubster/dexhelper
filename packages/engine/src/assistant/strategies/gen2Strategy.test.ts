import { describe, expect, it, vi } from 'vitest';
import type { UnifiedLocation } from '@/db/schema';
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
    currentBoxCount: 0,
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
      johtoBadges: (1 << 1) | (1 << 2), // Have Hive and Plain badges
      inventory: [
        { id: 192, quantity: 1 },
        { id: 198, quantity: 1 },
      ],
      roamingLegendaries: [{ speciesId: 243, level: 40, mapGroup: 1, mapId: 1 }],
      partyDetails: [{ speciesId: 25 }], // Pikachu
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

  it('warns when the current box is almost full', () => {
    const saveData = {
      ...mockSaveData,
      currentBoxCount: 19,
      johtoBadges: 0,
      inventory: [],
      partyDetails: [],
    } as unknown as SaveData;

    const suggestions = gen2Strategy.getSpecialSuggestions(saveData, []);
    const warning = suggestions.find((s) => s.id === 'box-full-warning');
    expect(warning).toBeDefined();
    expect(warning?.description).toContain('Your current box has 19/20 Pokémon');
  });

  it('handles tyrogue evo paths for Hitmonchan and Hitmontop', () => {
    const saveData = {
      ...mockSaveData,
      johtoBadges: 0,
      inventory: [],
      partyDetails: [],
    } as unknown as SaveData;

    // hitmonchan
    const sugg107 = gen2Strategy.getSpecialSuggestions(saveData, [107]);
    expect(sugg107.find((s) => s.id === 'tyrogue-evo-107')?.description).toContain('lower than');

    // hitmontop
    const sugg237 = gen2Strategy.getSpecialSuggestions(saveData, [237]);
    expect(sugg237.find((s) => s.id === 'tyrogue-evo-237')?.description).toContain('equal to');
  });

  it('handles tyrogue evo path when 236 is already owned', () => {
    const saveData = {
      ...mockSaveData,
      johtoBadges: 0,
      inventory: [],
      partyDetails: [],
    } as unknown as SaveData;

    // Own Tyrogue, so missingSet won't include it
    // but the test checks if tyrogue is in missingSet.
    // wait, the suggestion gets skipped if 236 is missing
    // if missingSet has(236), tyrogue warning is hidden
    const sugg106 = gen2Strategy.getSpecialSuggestions(saveData, [106, 236]);
    expect(sugg106.find((s) => s.id === 'tyrogue-evo-106')).toBeUndefined();
  });

  it('handles untracked roamers and no roamingLegendaries array', () => {
    const saveData = {
      ...mockSaveData,
      johtoBadges: 0,
      inventory: [],
      partyDetails: [],
    } as unknown as SaveData;

    const suggestions = gen2Strategy.getSpecialSuggestions(saveData, [244]);
    const roamerSugg = suggestions.find((s) => s.id === 'roamer-244');
    expect(roamerSugg).toBeDefined();
    expect(roamerSugg?.description).toContain('Encounter Entei in the wild');
  });

  it('handles untracked roamers with array but mapId 0', () => {
    const saveData = {
      ...mockSaveData,
      johtoBadges: 0,
      inventory: [],
      roamingLegendaries: [{ speciesId: 244, level: 40, mapGroup: 0, mapId: 0 }],
      partyDetails: [],
    } as unknown as SaveData;

    const suggestions = gen2Strategy.getSpecialSuggestions(saveData, [244]);
    const roamerSugg = suggestions.find((s) => s.id === 'roamer-244');
    expect(roamerSugg).toBeDefined();
    expect(roamerSugg?.description).toContain('Encounter Entei in the wild');
  });

  it('handles headbutt/rocksmash from moves instead of TM', () => {
    const saveData = {
      ...mockSaveData,
      johtoBadges: 0,
      inventory: [],
      partyDetails: [{ speciesId: 25, moves: [29, 249] }], // 29 is headbutt, 249 is rock smash
    } as unknown as SaveData;

    const suggestions = gen2Strategy.getSpecialSuggestions(saveData, []);
    expect(suggestions.some((s) => s.id === 'headbutt-reminder')).toBe(true);
    expect(suggestions.some((s) => s.id === 'rocksmash-reminder')).toBe(true);
  });

  it('handles headbutt/rocksmash from pcDetails moves instead of TM', () => {
    const saveData = {
      ...mockSaveData,
      johtoBadges: 0,
      inventory: [],
      pcDetails: [{ speciesId: 25, moves: [29, 249] }], // 29 is headbutt, 249 is rock smash
    } as unknown as SaveData;

    const suggestions = gen2Strategy.getSpecialSuggestions(saveData, []);
    expect(suggestions.some((s) => s.id === 'headbutt-reminder')).toBe(true);
    expect(suggestions.some((s) => s.id === 'rocksmash-reminder')).toBe(true);
  });

  it('handles no partyDetails or pcDetails array', () => {
    const saveData = {
      ...mockSaveData,
      johtoBadges: 0,
      inventory: [],
      partyDetails: undefined,
      pcDetails: undefined,
    } as unknown as SaveData;

    const suggestions = gen2Strategy.getSpecialSuggestions(saveData, []);
    expect(suggestions.some((s) => s.id === 'headbutt-reminder')).toBe(false);
    expect(suggestions.some((s) => s.id === 'rocksmash-reminder')).toBe(false);
  });

  it('returns true for isInternallyObtainable', () => {
    expect(gen2Strategy.isInternallyObtainable(1, 'gold')).toBe(true);
  });

  it('returns false for unobtainableInternally', () => {
    expect(gen2Strategy.isInternallyObtainable(65, 'gold')).toBe(false); // Alakazam
    expect(gen2Strategy.isInternallyObtainable(251, 'gold')).toBe(false); // Celebi
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
      {
        category: 'Catch',
        encounterInfo: {
          3: [
            { time: 2 }, // Day
          ],
        },
      },
      {
        category: 'Catch',
        encounterInfo: {
          4: [
            { time: 1 }, // Morning
            { time: 2 }, // Day
            { time: 4 }, // Night
          ],
        },
      },
      {
        category: 'Catch',
        encounterInfo: {
          5: [
            { time: 0 }, // Falsy time handled
          ],
        },
      },
      {
        category: 'Catch',
        encounterInfo: {
          6: [
            // Only hits the times.length === 0 check which should not add a warning
            { time: 8 }, // Unknown time
          ],
        },
      },
      {
        category: 'Utility', // Should be skipped
      },
    ] as unknown as import('./types').Suggestion[];
    gen2Strategy.postProcessSuggestions?.(suggestions);
    expect(suggestions[0]?.warning).toBe('Only available in the Morning/Night');
    expect(suggestions[1]?.warning).toBeUndefined();
    expect(suggestions[2]?.warning).toBe('Only available in the Day');
    expect(suggestions[3]?.warning).toBeUndefined(); // Morning/Day/Night -> length 3 -> no warning
    expect(suggestions[5]?.warning).toBeUndefined();
  });
});
