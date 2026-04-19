import { describe, expect, it } from 'vitest';
import { gen1Strategy } from './gen1Strategy';
import { getStrategy } from './index';

describe('getStrategy', () => {
  it('returns gen1Strategy for generation 1', () => {
    expect(getStrategy(1)).toBe(gen1Strategy);
  });

  it('returns gen1Strategy as fallback for unsupported generation (e.g. 2)', () => {
    expect(getStrategy(2)).toBe(gen1Strategy);
  });

  it('returns gen1Strategy as fallback for unknown generation (e.g. 99)', () => {
    expect(getStrategy(99)).toBe(gen1Strategy);
  });
});
