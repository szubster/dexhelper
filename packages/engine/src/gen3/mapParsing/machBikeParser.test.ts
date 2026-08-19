import { describe, expect, it } from 'vitest';
import { hasMachBikeRequirement, MB_CRACKED_FLOOR, MB_MUDDY_SLOPE } from './machBikeParser';

describe('hasMachBikeRequirement', () => {
  it('should return false for empty or normal metatiles', () => {
    expect(hasMachBikeRequirement([])).toBe(false);
    expect(hasMachBikeRequirement([0x00, 0x01, 0x02])).toBe(false);
  });

  it('should return true if MB_MUDDY_SLOPE is present', () => {
    expect(hasMachBikeRequirement([0x00, MB_MUDDY_SLOPE, 0x02])).toBe(true);
  });

  it('should return true if MB_CRACKED_FLOOR is present', () => {
    expect(hasMachBikeRequirement([MB_CRACKED_FLOOR])).toBe(true);
  });
});
