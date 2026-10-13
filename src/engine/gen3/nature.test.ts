import { describe, expect, it } from 'vitest';
import { getNature } from './nature';

describe('nature', () => {
  it('correctly maps PVs to natures', () => {
    expect(getNature(0)).toBe('hardy');
    expect(getNature(1)).toBe('lonely');
    expect(getNature(24)).toBe('quirky');
    expect(getNature(25)).toBe('hardy');
  });

  it('should handle edge cases (e.g. invalid large PVs) correctly', () => {
    // PV maxes out theoretically around 2^32 - 1, which should just mod 25 normally,
    // but we can verify our lookup doesn't break
    const maxPv = 0xffffffff;
    expect(getNature(maxPv)).not.toBeUndefined();
    // 0xFFFFFFFF % 25 = 4294967295 % 25 = 20
    expect(getNature(maxPv)).toBe('calm');
  });
});
