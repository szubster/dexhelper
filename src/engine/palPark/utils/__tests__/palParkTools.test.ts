import { describe, expect, it } from 'vitest';
import { hasGen3HMMoves } from '../palParkTools';

describe('hasGen3HMMoves', () => {
  it('returns true if the array contains at least one Gen 3 HM move', () => {
    expect(hasGen3HMMoves([15, 2])).toBe(true); // 15 is Cut
    expect(hasGen3HMMoves([19])).toBe(true); // 19 is Fly
    expect(hasGen3HMMoves([1, 2, 57])).toBe(true); // 57 is Surf
    expect(hasGen3HMMoves([70, 127])).toBe(true); // 70 is Strength, 127 is Waterfall
    expect(hasGen3HMMoves([148, 249, 291])).toBe(true); // Flash, Rock Smash, Dive
  });

  it('returns false if the array contains no Gen 3 HM moves', () => {
    expect(hasGen3HMMoves([1, 2, 3])).toBe(false);
    expect(hasGen3HMMoves([99, 100])).toBe(false);
  });

  it('returns false for an empty array', () => {
    expect(hasGen3HMMoves([])).toBe(false);
  });

  it('returns false for duplicate non-HM moves', () => {
    expect(hasGen3HMMoves([1, 1, 1])).toBe(false);
  });

  it('returns true for duplicate HM moves', () => {
    expect(hasGen3HMMoves([15, 15, 15])).toBe(true);
  });
});
