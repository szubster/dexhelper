import { describe, expect, it } from 'vitest';
import { getGen3UnobtainableReason } from '../gen3Exclusives';

describe('gen3Exclusives', () => {
  describe('getGen3UnobtainableReason', () => {
    it('should return null for non-exclusive Pokemon', () => {
      const ownedSet = new Set<number>();
      expect(getGen3UnobtainableReason(1, 'ruby', 0, ownedSet)).toBeNull();
    });

    it('should return reason for exclusive Pokemon not owned', () => {
      const ownedSet = new Set<number>();
      const reason = getGen3UnobtainableReason(382, 'ruby', 0, ownedSet); // 382 is Kyogre, missing in Ruby
      expect(reason).toContain('not available in Ruby');
    });

    it('should return null for exclusive Pokemon already owned', () => {
      const ownedSet = new Set<number>([382]);
      expect(getGen3UnobtainableReason(382, 'ruby', 0, ownedSet)).toBeNull();
    });

    it('should return reason for Emerald exclusive missing', () => {
      const ownedSet = new Set<number>();
      const reason = getGen3UnobtainableReason(335, 'emerald', 0, ownedSet); // Zangoose
      expect(reason).toContain('not available in Emerald');
    });

    it('should return null for Seedot in Emerald', () => {
      const ownedSet = new Set<number>();
      expect(getGen3UnobtainableReason(273, 'emerald', 0, ownedSet)).toBeNull();
    });
  });
});
