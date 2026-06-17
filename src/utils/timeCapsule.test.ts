import { describe, expect, it } from 'vitest';
import { getTimeCapsuleValidation, isTimeCapsuleEligible } from './timeCapsule';

describe('Time Capsule Validation', () => {
  it('should return eligible for Gen 1 species with Gen 1 moves', () => {
    expect(isTimeCapsuleEligible(1, [1, 2, 3])).toBe(true);
    expect(getTimeCapsuleValidation(1, [1, 2, 3])).toEqual({ isEligible: true });
  });

  it('should return ineligible for Gen 2 species', () => {
    expect(isTimeCapsuleEligible(152, [1, 2, 3])).toBe(false);
    expect(getTimeCapsuleValidation(152, [1, 2, 3])).toEqual({ isEligible: false, reason: 'INVALID: Gen 2 Species' });
  });

  it('should return ineligible for Gen 1 species with Gen 2 moves', () => {
    expect(isTimeCapsuleEligible(1, [1, 2, 166])).toBe(false);
    expect(getTimeCapsuleValidation(1, [1, 2, 166])).toEqual({
      isEligible: false,
      reason: 'INVALID: Gen 2 Exclusive Move(s)',
    });
  });

  it('should handle undefined moves', () => {
    expect(getTimeCapsuleValidation(1, undefined as any)).toEqual({ isEligible: true });
    expect(isTimeCapsuleEligible(1, undefined as any)).toEqual(true);
  });
});
