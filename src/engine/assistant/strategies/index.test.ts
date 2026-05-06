import { describe, expect, it } from 'vitest';

import { gen1Strategy } from './gen1Strategy';
import { getStrategy } from './index';

describe('getStrategy', () => {
  it('returns gen1Strategy for generation 1', () => {
    expect(getStrategy(1)).toBe(gen1Strategy);
  });

  it('returns fallbackStrategy for unknown generation', () => {
    const strategy = getStrategy(999);

    expect(strategy.generation).toBe(0);

    // Type-safe mock implementations using Type Casting with specific structural properties if needed,
    // though here the parameters are effectively ignored by the fallbackStrategy.
    expect(
      strategy.resolveMapAid(
        {
          gameVersion: 'red',
          currentMapId: 1,
          currentBoxCount: 0,
          currentBoxName: '',
          playerName: 'Ash',
          flags: new Map(),
          variables: new Map(),
        },
        [],
      ),
    ).toBe(null);

    expect(strategy.getMapDistance(1, 1, [])).toBe(null);
    expect(strategy.getUnobtainableReason(1, 'red', 0, new Set<number>())).toBe(null);

    expect(
      strategy.getSpecialSuggestions(
        {
          gameVersion: 'red',
          currentMapId: 1,
          currentBoxCount: 0,
          currentBoxName: '',
          playerName: 'Ash',
          flags: new Map(),
          variables: new Map(),
        },
        [],
      ),
    ).toEqual([]);
    expect(strategy.isInternallyObtainable(1, 'red')).toBe(false);
  });
});
