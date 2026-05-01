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

    describe('General Obtainable Pokémon', () => {
      it('should return null for normally obtainable Pokémon (Pidgey 16)', () => {
        const ownedSet = new Set<number>();
        const reason = getGen2UnobtainableReason(16, 'gold', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });
  });
});
