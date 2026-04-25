import { describe, expect, it } from 'vitest';
import { getUnobtainableReason } from '../gen2Exclusives';

describe('gen2Exclusives', () => {
  describe('getUnobtainableReason', () => {
    describe('Gold Version Exclusives', () => {
      it('should lock Vulpix (37) in Gold', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(37, 'gold', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Gold');
      });

      it('should not lock Mankey (56) in Gold', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(56, 'gold', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('Silver Version Exclusives', () => {
      it('should lock Mankey (56) in Silver', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(56, 'silver', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Silver');
      });

      it('should not lock Vulpix (37) in Silver', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(37, 'silver', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('Crystal Version Exclusives', () => {
      it('should lock Mareep (179) in Crystal', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(179, 'crystal', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Crystal');
      });

      it('should not lock Ledyba (165) in Crystal', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(165, 'crystal', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('General Obtainable Pokémon', () => {
      it('should return null for normally obtainable Pokémon (Pidgey 16)', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(16, 'gold', 0, ownedSet);
        expect(reason).toBeNull();
      });
    });
  });
});
