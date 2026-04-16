import { describe, expect, it } from 'vitest';
import { getStrategy } from './index';
import { gen1Strategy } from './gen1Strategy';

describe('getStrategy', () => {
  it('returns gen1Strategy for generation 1', () => {
    expect(getStrategy(1)).toBe(gen1Strategy);
  });

  it('falls back to fallbackStrategy for unsupported generations', () => {
    const strategyGen2 = getStrategy(2);
    expect(strategyGen2).not.toBe(gen1Strategy);
    expect(strategyGen2.generateLocationSuggestions([])).toEqual([]);
    expect(strategyGen2.getExclusivesChecker()).toBeNull();
    expect(strategyGen2.getMapGraph()).toBeNull();

    const strategyGen99 = getStrategy(99);
    expect(strategyGen99).not.toBe(gen1Strategy);
    expect(strategyGen99.generateLocationSuggestions([])).toEqual([]);
    expect(strategyGen99.getExclusivesChecker()).toBeNull();
    expect(strategyGen99.getMapGraph()).toBeNull();
  });
});
