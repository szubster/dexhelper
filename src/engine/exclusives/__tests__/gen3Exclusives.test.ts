import { describe, expect, it } from 'vitest';
import { getGen3UnobtainableReason } from '../gen3Exclusives';

describe('gen3Exclusives', () => {
  describe('getGen3UnobtainableReason', () => {
    it('should lock Seviper (336) in Ruby', () => {
      const ownedSet = new Set<number>();
      const reason = getGen3UnobtainableReason(336, 'ruby', 0, ownedSet);
      expect(typeof reason).toBe('string');
      expect(reason).toContain('not available in Ruby');
    });

    it('should not lock Zangoose (335) in Ruby', () => {
      const ownedSet = new Set<number>();
      const reason = getGen3UnobtainableReason(335, 'ruby', 0, ownedSet);
      expect(reason).toBeNull();
    });

    it('should lock Zangoose (335) in Sapphire', () => {
      const ownedSet = new Set<number>();
      const reason = getGen3UnobtainableReason(335, 'sapphire', 0, ownedSet);
      expect(typeof reason).toBe('string');
      expect(reason).toContain('not available in Sapphire');
    });

    describe('Emerald', () => {
      it('should lock Surskit (283) in Emerald', () => {
        const ownedSet = new Set<number>();
        const reason = getGen3UnobtainableReason(283, 'emerald', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Emerald');
      });

      it('should lock Zangoose (335) in Emerald', () => {
        const ownedSet = new Set<number>();
        const reason = getGen3UnobtainableReason(335, 'emerald', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Emerald');
      });

      it('should not lock Lotad (270) in Emerald', () => {
        const ownedSet = new Set<number>();
        const reason = getGen3UnobtainableReason(270, 'emerald', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Groudon (383) in Emerald', () => {
        const ownedSet = new Set<number>();
        const reason = getGen3UnobtainableReason(383, 'emerald', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });
  });
});
