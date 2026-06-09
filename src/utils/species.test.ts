import { describe, expect, it } from 'vitest';
import { isGen1Species } from './species';

describe('isGen1Species', () => {
  it('should return true for Gen 1 species IDs', () => {
    expect(isGen1Species(1)).toBe(true);
    expect(isGen1Species(151)).toBe(true);
  });

  it('should return false for non-Gen 1 species IDs', () => {
    expect(isGen1Species(0)).toBe(false);
    expect(isGen1Species(152)).toBe(false);
    expect(isGen1Species(251)).toBe(false);
  });
});
