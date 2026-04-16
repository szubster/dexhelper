import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../saveParser/index';
import { gen1Strategy } from './gen1Strategy';
import { getStrategy } from './index';

describe('getStrategy', () => {
  it('returns gen1Strategy for generation 1', () => {
    expect(getStrategy(1)).toBe(gen1Strategy);
  });

  it('falls back to fallbackStrategy for unsupported generations', () => {
    const strategyGen2 = getStrategy(2);
    expect(strategyGen2).not.toBe(gen1Strategy);
    expect(strategyGen2.generation).toBe(1);
    expect(strategyGen2.resolveMapAid({} as SaveData, [])).toBeNull();
    expect(strategyGen2.getMapDistance(0, 0, [])).toBeNull();
    expect(strategyGen2.getUnobtainableReason(0, '', 0, new Set())).toBeNull();
    expect(strategyGen2.getSpecialSuggestions({} as SaveData, [])).toEqual([]);
    expect(strategyGen2.isInternallyObtainable(0, '')).toBe(false);

    const strategyGen99 = getStrategy(99);
    expect(strategyGen99).not.toBe(gen1Strategy);
    expect(strategyGen99.generation).toBe(1);
    expect(strategyGen99.resolveMapAid({} as SaveData, [])).toBeNull();
    expect(strategyGen99.getMapDistance(0, 0, [])).toBeNull();
    expect(strategyGen99.getUnobtainableReason(0, '', 0, new Set())).toBeNull();
    expect(strategyGen99.getSpecialSuggestions({} as SaveData, [])).toEqual([]);
    expect(strategyGen99.isInternallyObtainable(0, '')).toBe(false);
  });
});
