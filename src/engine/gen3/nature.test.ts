import { describe, expect, it } from 'vitest';
import { getNature } from './nature';

describe('nature', () => {
  it('correctly maps PVs to natures', () => {
    expect(getNature(0)).toBe('hardy');
    expect(getNature(1)).toBe('lonely');
    expect(getNature(24)).toBe('quirky');
    expect(getNature(25)).toBe('hardy');
  });
});
