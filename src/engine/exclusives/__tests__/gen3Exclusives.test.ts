import { describe, expect, it } from 'vitest';
import { GEN3_VERSION_EXCLUSIVES, getGen3UnobtainableReason } from '../gen3Exclusives';

describe('gen3Exclusives', () => {
  describe('GEN3_VERSION_EXCLUSIVES content checks', () => {
    it('should list correct FireRed missing pokemon', () => {
      // 52 (Meowth) is missing from FireRed (it's in LeafGreen)
      expect(GEN3_VERSION_EXCLUSIVES['firered']).toContain(52);
      // 89 (Muk) is NOT missing from FireRed, it is available in both FR and LG
      expect(GEN3_VERSION_EXCLUSIVES['firered']).not.toContain(89);
    });

    it('should list correct LeafGreen missing pokemon', () => {
      // 123 (Scyther) is missing from LeafGreen
      expect(GEN3_VERSION_EXCLUSIVES['leafgreen']).toContain(123);
      // 110 (Weezing) is NOT missing from LeafGreen, it is available in both FR and LG
      expect(GEN3_VERSION_EXCLUSIVES['leafgreen']).not.toContain(110);
    });
  });

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

    it('should return null for Lotad in Emerald (available natively)', () => {
      const ownedSet = new Set<number>();
      expect(getGen3UnobtainableReason(270, 'emerald', 0, ownedSet)).toBeNull();
    });

    it('should return reason for FireRed exclusive missing (LeafGreen exclusives)', () => {
      const ownedSet = new Set<number>();
      const reason = getGen3UnobtainableReason(27, 'firered', 0, ownedSet); // Sandshrew
      expect(reason).toContain('not available in Firered');
    });

    it('should return reason for Meowth missing in FireRed', () => {
      const ownedSet = new Set<number>();
      const reason = getGen3UnobtainableReason(52, 'firered', 0, ownedSet); // Meowth
      expect(reason).toContain('not available in Firered');
    });

    it('should return reason for LeafGreen exclusive missing (FireRed exclusives)', () => {
      const ownedSet = new Set<number>();
      const reason = getGen3UnobtainableReason(23, 'leafgreen', 0, ownedSet); // Ekans
      expect(reason).toContain('not available in Leafgreen');
    });

    it('should return null for Machop in LeafGreen (obtainable)', () => {
      const ownedSet = new Set<number>();
      expect(getGen3UnobtainableReason(66, 'leafgreen', 0, ownedSet)).toBeNull();
    });
  });
});
