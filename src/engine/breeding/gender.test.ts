import { describe, expect, it } from 'vitest';
import { getGen2Gender } from './gender';

describe('getGen2Gender', () => {
  it('returns Genderless if genderRate is -1', () => {
    expect(getGen2Gender(0, -1)).toBe('Genderless');
    expect(getGen2Gender(15, -1)).toBe('Genderless');
  });

  it('returns Male if genderRate is 0 (100% Male)', () => {
    expect(getGen2Gender(0, 0)).toBe('Male');
    expect(getGen2Gender(15, 0)).toBe('Male');
  });

  it('returns Female if genderRate is 8 (100% Female)', () => {
    expect(getGen2Gender(0, 8)).toBe('Female');
    expect(getGen2Gender(15, 8)).toBe('Female');
  });

  describe('with 50/50 genderRate (4)', () => {
    it('returns Female if attackDV is below threshold (4 * 2 = 8)', () => {
      expect(getGen2Gender(0, 4)).toBe('Female');
      expect(getGen2Gender(7, 4)).toBe('Female');
    });

    it('returns Male if attackDV is exactly the threshold', () => {
      expect(getGen2Gender(8, 4)).toBe('Male');
    });

    it('returns Male if attackDV is above the threshold', () => {
      expect(getGen2Gender(15, 4)).toBe('Male');
    });
  });

  describe('with 1/8 Female genderRate (1)', () => {
    it('returns Female if attackDV is below threshold (1 * 2 = 2)', () => {
      expect(getGen2Gender(0, 1)).toBe('Female');
      expect(getGen2Gender(1, 1)).toBe('Female');
    });

    it('returns Male if attackDV is exactly or above the threshold', () => {
      expect(getGen2Gender(2, 1)).toBe('Male');
      expect(getGen2Gender(15, 1)).toBe('Male');
    });
  });
});
