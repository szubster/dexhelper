import { describe, expect, it } from 'vitest';
import { identifyHighValueHeldItem, PAL_PARK_HIGH_VALUE_ITEMS } from './itemIdentification';

describe('identifyHighValueHeldItem', () => {
  it('identifies Master Ball correctly', () => {
    const result = identifyHighValueHeldItem(1);
    expect(result).toEqual({ isHighValue: true, itemName: 'Master Ball' });
  });

  it('identifies Leftovers correctly', () => {
    const result = identifyHighValueHeldItem(200);
    expect(result).toEqual({ isHighValue: true, itemName: 'Leftovers' });
  });

  it('returns false for an unknown/unlisted item ID', () => {
    const result = identifyHighValueHeldItem(999);
    expect(result).toEqual({ isHighValue: false });
  });

  it('returns false for 0 (no item)', () => {
    const result = identifyHighValueHeldItem(0);
    expect(result).toEqual({ isHighValue: false });
  });

  it('covers all items in PAL_PARK_HIGH_VALUE_ITEMS with a valid name', () => {
    for (const itemId of PAL_PARK_HIGH_VALUE_ITEMS) {
      const result = identifyHighValueHeldItem(itemId);
      expect(result.isHighValue).toBe(true);
      expect(typeof result.itemName).toBe('string');
      expect(result.itemName?.length).toBeGreaterThan(0);
    }
  });
});
