import { describe, expect, it } from 'vitest';
import { validateTimeCapsuleEligibility } from './timeCapsule';

describe('validateTimeCapsuleEligibility', () => {
  it('should be eligible for Gen 1 species with Gen 1 moves', () => {
    const result = validateTimeCapsuleEligibility(1, [1, 2, 3, 4]); // Bulbasaur with Gen 1 moves
    expect(result.isEligible).toBe(true);
    expect(result.reasons).toEqual([]);
  });

  it('should not be eligible for Gen 2 species', () => {
    const result = validateTimeCapsuleEligibility(152, [1, 2, 3, 4]); // Chikorita
    expect(result.isEligible).toBe(false);
    expect(result.reasons).toContain('INVALID: Gen 2 Species');
  });

  it('should not be eligible for Gen 1 species with Gen 2 exclusive moves', () => {
    const result = validateTimeCapsuleEligibility(1, [166]); // Bulbasaur with Gen 2 move
    expect(result.isEligible).toBe(false);
    expect(result.reasons).toContain('INVALID: Gen 2 Exclusive Move(s)');
  });

  it('should not be eligible for Gen 2 species with Gen 2 exclusive moves', () => {
    const result = validateTimeCapsuleEligibility(152, [166]); // Chikorita with Gen 2 move
    expect(result.isEligible).toBe(false);
    expect(result.reasons).toEqual(['INVALID: Gen 2 Species', 'INVALID: Gen 2 Exclusive Move(s)']);
  });
});
