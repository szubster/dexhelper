import { describe, expect, it } from 'vitest';
import { hasGen2ExclusiveMove } from '../gen2Moves';

describe('hasGen2ExclusiveMove', () => {
  it('should return false for an empty array', () => {
    expect(hasGen2ExclusiveMove([])).toBe(false);
  });

  it('should return false for an array with all zeros', () => {
    expect(hasGen2ExclusiveMove([0, 0, 0, 0])).toBe(false);
  });

  it('should return false for an array with only Gen 1 moves', () => {
    expect(hasGen2ExclusiveMove([1, 50, 100, 165])).toBe(false);
  });

  it('should return true for an array with Gen 2 moves', () => {
    expect(hasGen2ExclusiveMove([166, 200, 250, 251])).toBe(true);
  });

  it('should return true for an array with a mix of Gen 1 and Gen 2 moves', () => {
    expect(hasGen2ExclusiveMove([1, 165, 0, 166])).toBe(true);
  });

  it('should return false for boundary condition (165 is Gen 1)', () => {
    expect(hasGen2ExclusiveMove([165])).toBe(false);
  });

  it('should return true for boundary condition (166 is Gen 2)', () => {
    expect(hasGen2ExclusiveMove([166])).toBe(true);
  });

  it('should handle undefined or null gracefully', () => {
    // @ts-expect-error Testing invalid input
    expect(hasGen2ExclusiveMove(undefined)).toBe(false);
    // @ts-expect-error Testing invalid input
    expect(hasGen2ExclusiveMove(null)).toBe(false);
  });
});
