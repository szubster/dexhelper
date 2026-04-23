import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../saveParser';
import { gen1Strategy } from './gen1Strategy';
import { fallbackStrategy, getStrategy } from './index';

describe('getStrategy', () => {
  it('returns gen1Strategy for generation 1', () => {
    expect(getStrategy(1)).toBe(gen1Strategy);
  });

  it('returns fallbackStrategy for unsupported generation (e.g. 2)', () => {
    expect(getStrategy(2)).toBe(fallbackStrategy);
  });

  it('returns fallbackStrategy for unknown generation (e.g. 99)', () => {
    expect(getStrategy(99)).toBe(fallbackStrategy);
  });
});

describe('fallbackStrategy', () => {
  it('has safe default returns for all methods', () => {
    const mockSave = {} as unknown as SaveData;
    expect(fallbackStrategy.generation).toBe(0);
    expect(fallbackStrategy.resolveMapAid(mockSave, [])).toBeNull();
    expect(fallbackStrategy.getMapDistance(0, 0, [])).toBeNull();
    expect(fallbackStrategy.getUnobtainableReason(1, 'Red', 0, new Set())).toBeNull();
    expect(fallbackStrategy.getSpecialSuggestions(mockSave, [])).toEqual([]);
    expect(fallbackStrategy.isInternallyObtainable(1, 'Red')).toBe(false);
  });
});
