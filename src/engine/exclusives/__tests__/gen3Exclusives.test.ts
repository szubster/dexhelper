import { describe, expect, it } from 'vitest';
import {
  GEN3_VERSION_EXCLUSIVES,
  getGen3UnobtainableReason,
  getVersionExclusives,
  mapMissingToAvailability,
} from '../gen3Exclusives';

describe('gen3Exclusives', () => {
  describe('GEN3_VERSION_EXCLUSIVES content checks', () => {
    it('should list correct FireRed missing pokemon', () => {
      expect(GEN3_VERSION_EXCLUSIVES['firered']).toContain(27);
      expect(GEN3_VERSION_EXCLUSIVES['firered']).not.toContain(52);
      expect(GEN3_VERSION_EXCLUSIVES['firered']).not.toContain(89);
    });

    it('should list correct LeafGreen missing pokemon', () => {
      expect(GEN3_VERSION_EXCLUSIVES['leafgreen']).toContain(123);
      expect(GEN3_VERSION_EXCLUSIVES['leafgreen']).not.toContain(110);
    });
  });

  describe('getGen3UnobtainableReason delegation', () => {
    it('should return null for non-exclusive Pokemon', () => {
      const ownedSet = new Set<number>();
      expect(getGen3UnobtainableReason(1, 'ruby', 0, ownedSet)).toBeNull();
    });

    it('should return reason for exclusive Pokemon not owned via unified evaluator', () => {
      const ownedSet = new Set<number>();
      const reason = getGen3UnobtainableReason(382, 'ruby', 0, ownedSet);
      expect(reason).toContain('not available in Ruby');
    });

    it('should return null for exclusive Pokemon already owned', () => {
      const ownedSet = new Set<number>([382]);
      expect(getGen3UnobtainableReason(382, 'ruby', 0, ownedSet)).toBeNull();
    });
  });

  describe('getVersionExclusives', () => {
    it('returns expected exclusives for emerald', () => {
      const { missing, available } = getVersionExclusives('emerald');
      expect(missing).toContain(335);
      expect(available).toEqual([]);
    });

    it('handles uppercase versions', () => {
      const { missing } = getVersionExclusives('Ruby');
      expect(missing).toEqual(GEN3_VERSION_EXCLUSIVES['ruby']);
    });
  });

  describe('mapMissingToAvailability', () => {
    it('categorizes missing IDs correctly for ruby', () => {
      const { available, versionExclusive } = mapMissingToAvailability([382, 1], 'ruby');
      expect(versionExclusive).toEqual([382]);
      expect(available).toEqual([1]);
    });
  });
});
