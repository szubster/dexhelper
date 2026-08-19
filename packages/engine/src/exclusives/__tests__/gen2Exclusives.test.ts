import { describe, expect, it } from 'vitest';
import { getGen2UnobtainableReason } from '../gen2Exclusives';

describe('gen2Exclusives', () => {
  describe('getGen2UnobtainableReason', () => {
    describe('Gold Exclusives', () => {
      it('should lock Mankey (56) in Silver', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(56, 'silver', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Silver');
      });

      it('should not lock Sandshrew (27) in Silver', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(27, 'silver', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Sandslash (28) in Silver', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(28, 'silver', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Caterpie (10) in Silver', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(10, 'silver', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Caterpie (10) in Gold', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(10, 'gold', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Mankey (56) in Gold', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(56, 'gold', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should lock Spinarak (167) in Silver', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(167, 'silver', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Silver');
      });
    });

    describe('Silver Exclusives', () => {
      it('should lock Vulpix (37) in Gold', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(37, 'gold', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Gold');
      });

      it('should not lock Ekans (23) in Gold', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(23, 'gold', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Weedle (13) in Gold', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(13, 'gold', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Weedle (13) in Silver', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(13, 'silver', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Vulpix (37) in Silver', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(37, 'silver', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should lock Skarmory (227) in Gold', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(227, 'gold', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Gold');
      });
    });

    describe('Crystal Exclusives', () => {
      it('should lock Mareep (179) in Crystal', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(179, 'crystal', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Crystal');
      });

      it('should lock Mankey (56) in Crystal', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(56, 'crystal', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Crystal');
      });

      it('should not lock Arcanine (59) in Crystal', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(59, 'crystal', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Growlithe (58) in Crystal', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(58, 'crystal', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should lock Girafarig (203) in Crystal', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(203, 'crystal', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Crystal');
      });

      it('should not lock Mareep (179) in Gold or Silver', () => {
        const ownedSet = new Set<number>();
        const reasonGold = getGen2UnobtainableReason(179, 'gold', 0, ownedSet);
        const reasonSilver = getGen2UnobtainableReason(179, 'silver', 0, ownedSet);
        expect(reasonGold).toBeNull();
        expect(reasonSilver).toBeNull();
      });

      it('should not lock non-exclusive Pokemon in Crystal', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(10, 'crystal', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('General Obtainable Pokémon', () => {
      it('should return null for normally obtainable Pokémon (Pidgey 16)', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(16, 'gold', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('Already Owned Pokémon', () => {
      it('should not lock an exclusive Pokémon if it is already owned', () => {
        const ownedSet = new Set<number>([56]); // Mankey
        const reason = getGen2UnobtainableReason(56, 'silver', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('Unknown Version', () => {
      it('should handle unknown version gracefully by returning null', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(10, 'unknown', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should return null if exclusive not found for unknown version', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(999, 'ruby', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });
  });
});
