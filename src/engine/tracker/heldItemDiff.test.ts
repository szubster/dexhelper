import { describe, expect, it } from 'vitest';
import { diffHeldItems } from './heldItemDiff';

describe('diffHeldItems', () => {
  it('identifies newly acquired items', () => {
    expect(diffHeldItems([1, 2], [1, 2, 3, 4])).toEqual([3, 4]);
  });

  it('returns empty array if no new items', () => {
    expect(diffHeldItems([1, 2, 3], [1, 2])).toEqual([]);
  });

  it('handles empty arrays', () => {
    expect(diffHeldItems([], [1])).toEqual([1]);
    expect(diffHeldItems([1], [])).toEqual([]);
  });

  it('handles multiple of same new item', () => {
    expect(diffHeldItems([1], [1, 2, 2])).toEqual([2, 2]);
  });

  it('handles gaining a duplicate of an existing item', () => {
    expect(diffHeldItems([1], [1, 1])).toEqual([1]);
  });

  it('handles losing an item and gaining a duplicate of another', () => {
    expect(diffHeldItems([1, 2], [1, 1])).toEqual([1]);
  });
});
