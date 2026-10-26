import { describe, expect, it } from 'vitest';
import { getGen2UnobtainableReason } from '../gen2Exclusives';

describe('gen2Exclusives', () => {
  describe('getGen2UnobtainableReason delegation', () => {
    it('delegates Mankey (56) lockout in Silver to unified getUnobtainableReason', () => {
      const ownedSet = new Set<number>();
      const reason = getGen2UnobtainableReason(56, 'silver', 0, ownedSet);
      expect(reason).toContain('not available in Silver');
    });

    it('returns null for non-exclusive Pokemon in Gen 2', () => {
      const ownedSet = new Set<number>();
      const reason = getGen2UnobtainableReason(16, 'gold', 0, ownedSet);
      expect(reason).toBeNull();
    });

    it('returns null when exclusive is already owned', () => {
      const ownedSet = new Set<number>([56]);
      const reason = getGen2UnobtainableReason(56, 'silver', 0, ownedSet);
      expect(reason).toBeNull();
    });
  });
});
