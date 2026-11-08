import { describe, expect, it } from 'vitest';

import { gen1Strategy } from './gen1Strategy';
import { gen2Strategy } from './gen2Strategy';
import { gen3Strategy } from './gen3Strategy';
import { getStrategy } from './index';

describe('getStrategy', () => {
  it('returns gen1Strategy for generation 1', async () => {
    expect(await getStrategy(1)).toBe(gen1Strategy);
  });

  it('returns gen2Strategy for generation 2', async () => {
    expect(await getStrategy(2)).toBe(gen2Strategy);
  });

  it('returns gen3Strategy for generation 3', async () => {
    expect(await getStrategy(3)).toBe(gen3Strategy);
  });

  it('returns fallbackStrategy for unknown generation', async () => {
    const strategy = await getStrategy(999);

    expect(strategy.generation).toBe(0);

    const mockSaveData = {
      generation: 1 as const,
      owned: new Set<number>(),
      seen: new Set<number>(),
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      gameVersion: 'red' as const,
      badges: 0,
      trainerName: 'Ash',
      trainerId: 12345,
      currentMapId: 1,
      inventory: [],
      currentBoxCount: 0,
      hallOfFameCount: 0,
    };

    // Type-safe mock implementations using Type Casting with specific structural properties if needed,
    // though here the parameters are effectively ignored by the fallbackStrategy.
    expect(strategy.resolveMapAid(mockSaveData, [])).toBe(null);

    expect(strategy.getMapDistance(1, 1, [])).toBe(null);
    expect(strategy.getUnobtainableReason(1, 'red', 0, new Set<number>())).toBe(null);

    expect(strategy.getSpecialSuggestions(mockSaveData, [])).toEqual([]);
    expect(strategy.isInternallyObtainable(1, 'red')).toBe(false);
  });
});
