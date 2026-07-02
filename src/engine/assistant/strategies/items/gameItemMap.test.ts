import { describe, expect, it } from 'vitest';
import { getGameItemId } from './gameItemMap';

describe('gameItemMap', () => {
  describe('getGameItemId', () => {
    it('returns the mapped Gen 1 ID when generation is 1', () => {
      // Moon Stone
      expect(getGameItemId(81, 1)).toBe(0x0a);
      // Fallback
      expect(getGameItemId(999, 1)).toBe(999);
    });

    it('returns the mapped Gen 2 ID when generation is 2', () => {
      // Sun Stone
      expect(getGameItemId(80, 2)).toBe(0x11);
      // Metal Coat
      expect(getGameItemId(210, 2)).toBe(0x8f);
      // Fallback
      expect(getGameItemId(999, 2)).toBe(999);
    });

    it('returns the mapped Gen 3 ID when generation is 3', () => {
      // Leaf Stone
      expect(getGameItemId(85, 3)).toBe(98);
      // Deep Sea Tooth
      expect(getGameItemId(203, 3)).toBe(192);
      // Fallback
      expect(getGameItemId(999, 3)).toBe(999);
    });

    it('returns the fallback ID when generation is unknown (e.g. 4)', () => {
      // Moon Stone
      expect(getGameItemId(81, 4)).toBe(81);
    });
  });
});
