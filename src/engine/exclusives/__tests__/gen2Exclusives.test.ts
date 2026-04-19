import { describe, expect, it } from 'vitest';
import { getUnobtainableReason } from '../gen2Exclusives';

describe('gen2Exclusives', () => {
  describe('getUnobtainableReason', () => {
    describe('Johto Starters (Mutually Exclusive)', () => {
      it('should lock Cyndaquil (155) if Chikorita (152) is owned', () => {
        const ownedSet = new Set([152]); // Own Chikorita
        const reason = getUnobtainableReason(155, 'gold', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('different Johto starter');
      });

      it('should lock Totodile (158) if Quilava (156) is owned', () => {
        const ownedSet = new Set([156]); // Own Quilava
        const reason = getUnobtainableReason(158, 'silver', 1, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('different Johto starter');
      });

      it('should not lock Totodile (158) if neither is owned', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(158, 'gold', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock Totodile (158) if it is already owned', () => {
        const ownedSet = new Set([152, 158]); // Owned both through trading
        const reason = getUnobtainableReason(158, 'crystal', 2, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('Version Exclusives', () => {
      it('should lock Mantine (226) in Silver', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(226, 'silver', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Silver');
      });

      it('should not lock Mantine (226) in Gold', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(226, 'gold', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should lock Delibird (225) in Gold', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(225, 'gold', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('not available in Gold');
      });

      it('should not lock Delibird (225) in Silver', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(225, 'silver', 0, ownedSet);
        expect(reason).toBeNull();
      });

      it('should not lock version exclusives if they are already owned', () => {
        const ownedSet = new Set([225]);
        const reason = getUnobtainableReason(225, 'gold', 1, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('Missing Gen 1 Pokemon', () => {
      it('should lock Bulbasaur (1)', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(1, 'crystal', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('Not found in Johto or Kanto in Generation 2');
      });

      it('should lock Omanyte (138)', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(138, 'gold', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('Not found in Johto or Kanto in Generation 2');
      });

      it('should lock Mewtwo (150)', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(150, 'silver', 0, ownedSet);
        expect(typeof reason).toBe('string');
        expect(reason).toContain('Not found in Johto or Kanto in Generation 2');
      });

      it('should not lock missing Gen 1 if already owned', () => {
        const ownedSet = new Set([150]);
        const reason = getUnobtainableReason(150, 'silver', 1, ownedSet);
        expect(reason).toBeNull();
      });
    });

    describe('Celebi', () => {
      it('should lock Celebi (251) in Gold/Silver', () => {
        const ownedSet = new Set<number>();
        const reasonGold = getUnobtainableReason(251, 'gold', 0, ownedSet);
        const reasonSilver = getUnobtainableReason(251, 'silver', 0, ownedSet);
        expect(typeof reasonGold).toBe('string');
        expect(typeof reasonSilver).toBe('string');
        expect(reasonGold).toContain('Virtual Console release of Pokémon Crystal');
      });

      it('should not lock Celebi in Crystal', () => {
        const ownedSet = new Set<number>();
        const reason = getUnobtainableReason(251, 'crystal', 0, ownedSet);
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
