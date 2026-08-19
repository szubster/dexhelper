import { describe, expect, it } from 'vitest';
import type { HiddenItemData } from '@/db/schema';
import { getAcquiredHiddenItems, getRemainingHiddenItems, mergeHiddenItemFlags } from './hiddenItems';

describe('Hidden Items Utilities', () => {
  const mockItems: HiddenItemData[] = [
    { flagOffset: 0, flagBit: 0, locationId: 1, itemId: 1 },
    { flagOffset: 0, flagBit: 1, locationId: 2, itemId: 2 },
    { flagOffset: 1, flagBit: 7, locationId: 3, itemId: 3 },
  ];

  describe('mergeHiddenItemFlags', () => {
    it('returns false for all items if flags is undefined', () => {
      const result = mergeHiddenItemFlags(undefined, mockItems);
      expect(result).toHaveLength(3);
      expect(result[0]?.isAcquired).toBe(false);
      expect(result[1]?.isAcquired).toBe(false);
      expect(result[2]?.isAcquired).toBe(false);
    });

    it('throws a RangeError if the offset goes out of bounds', () => {
      const buffer = new ArrayBuffer(1); // Only 1 byte long
      const view = new DataView(buffer);

      expect(() => {
        mergeHiddenItemFlags(view, mockItems);
      }).toThrowError(RangeError);
    });

    it('correctly maps flags based on matching bits', () => {
      const buffer = new ArrayBuffer(2);
      const view = new DataView(buffer);

      // Set byte 0: 0000 0001 (bit 0 is 1)
      view.setUint8(0, 1);
      // Set byte 1: 1000 0000 (bit 7 is 1)
      view.setUint8(1, 128);

      const result = mergeHiddenItemFlags(view, mockItems);
      expect(result[0]?.isAcquired).toBe(true);
      expect(result[1]?.isAcquired).toBe(false); // bit 1 of byte 0 is 0
      expect(result[2]?.isAcquired).toBe(true);
    });

    it('correctly maps flags when some bits do not match', () => {
      const buffer = new ArrayBuffer(2);
      const view = new DataView(buffer);

      // Set byte 0: 0000 0010 (bit 1 is 1)
      view.setUint8(0, 2);
      view.setUint8(1, 0);

      const result = mergeHiddenItemFlags(view, mockItems);
      expect(result[0]?.isAcquired).toBe(false);
      expect(result[1]?.isAcquired).toBe(true);
      expect(result[2]?.isAcquired).toBe(false);
    });
  });

  describe('Filtering utilities', () => {
    const mixedItems: HiddenItemData[] = [
      { flagOffset: 0, flagBit: 0, locationId: 1, itemId: 1, isAcquired: true },
      { flagOffset: 0, flagBit: 1, locationId: 2, itemId: 2, isAcquired: false },
      { flagOffset: 1, flagBit: 7, locationId: 3, itemId: 3 }, // isAcquired undefined
    ];

    describe('getAcquiredHiddenItems', () => {
      it('returns only items where isAcquired is true', () => {
        const result = getAcquiredHiddenItems(mixedItems);
        expect(result).toHaveLength(1);
        expect(result[0]?.itemId).toBe(1);
      });
    });

    describe('getRemainingHiddenItems', () => {
      it('returns items where isAcquired is false or undefined', () => {
        const result = getRemainingHiddenItems(mixedItems);
        expect(result).toHaveLength(2);
        expect(result[0]?.itemId).toBe(2);
        expect(result[1]?.itemId).toBe(3);
      });
    });
  });
});
