import { describe, expect, it } from 'vitest';
import { getUnobtainableReason as gen1UnobtainableReason } from '../gen1Exclusives';
import { getExclusivesChecker } from '../index';

describe('exclusives/index', () => {
  describe('getExclusivesChecker', () => {
    it('should return gen1UnobtainableReason for generation 1', () => {
      const checker = getExclusivesChecker(1);
      expect(checker).toBe(gen1UnobtainableReason);
    });

    it('should return null for unsupported generations', () => {
      expect(getExclusivesChecker(2)).toBeNull();
      expect(getExclusivesChecker(9)).toBeNull();
      expect(getExclusivesChecker(-1)).toBeNull();
    });
  });
});
