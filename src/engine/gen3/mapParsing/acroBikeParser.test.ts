import { describe, expect, it } from 'vitest';
import {
  hasAcroBikeRequirement,
  MB_BUMPY_SLOPE,
  MB_HORIZONTAL_RAIL,
  MB_ISOLATED_HORIZONTAL_RAIL,
  MB_ISOLATED_VERTICAL_RAIL,
  MB_VERTICAL_RAIL,
} from './acroBikeParser';

describe('hasAcroBikeRequirement', () => {
  it('should return false for empty or normal metatiles', () => {
    expect(hasAcroBikeRequirement([])).toBe(false);
    expect(hasAcroBikeRequirement([0x00, 0x01, 0x02])).toBe(false);
  });

  it('should return true if MB_BUMPY_SLOPE is present', () => {
    expect(hasAcroBikeRequirement([0x00, MB_BUMPY_SLOPE, 0x02])).toBe(true);
  });

  it('should return true if MB_ISOLATED_VERTICAL_RAIL is present', () => {
    expect(hasAcroBikeRequirement([MB_ISOLATED_VERTICAL_RAIL])).toBe(true);
  });

  it('should return true if MB_ISOLATED_HORIZONTAL_RAIL is present', () => {
    expect(hasAcroBikeRequirement([MB_ISOLATED_HORIZONTAL_RAIL])).toBe(true);
  });

  it('should return true if MB_VERTICAL_RAIL is present', () => {
    expect(hasAcroBikeRequirement([MB_VERTICAL_RAIL])).toBe(true);
  });

  it('should return true if MB_HORIZONTAL_RAIL is present', () => {
    expect(hasAcroBikeRequirement([MB_HORIZONTAL_RAIL])).toBe(true);
  });
});
