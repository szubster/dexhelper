import { describe, expect, it, vi } from 'vitest';
import { pokeDB } from '@/db/PokeDB';
import { getGameItemId } from './gameItemMap';

describe('gameItemMap', () => {
  describe('getGameItemId', () => {
    it('returns the mapped Gen 1 ID when generation is 1', async () => {
      vi.spyOn(pokeDB, 'getItem').mockResolvedValue({
        id: 81,
        name: 'Moon Stone',
        gen1_id: 0x0a,
      });
      // Moon Stone
      expect(await getGameItemId(81, 1)).toBe(0x0a);

      vi.spyOn(pokeDB, 'getItem').mockResolvedValue(undefined);
      // Fallback
      expect(await getGameItemId(999, 1)).toBe(999);
    });

    it('returns the mapped Gen 2 ID when generation is 2', async () => {
      vi.spyOn(pokeDB, 'getItem').mockImplementation(async (id) => {
        if (id === 80) return { id: 80, name: 'Sun Stone', gen2_id: 0x11 };
        if (id === 210) return { id: 210, name: 'Metal Coat', gen2_id: 0x8f };
        return undefined;
      });
      // Sun Stone
      expect(await getGameItemId(80, 2)).toBe(0x11);
      // Metal Coat
      expect(await getGameItemId(210, 2)).toBe(0x8f);
      // Fallback
      expect(await getGameItemId(999, 2)).toBe(999);
    });

    it('returns the mapped Gen 3 ID when generation is 3', async () => {
      vi.spyOn(pokeDB, 'getItem').mockImplementation(async (id) => {
        if (id === 85) return { id: 85, name: 'Leaf Stone', gen3_id: 98 };
        if (id === 203) return { id: 203, name: 'Deep Sea Tooth', gen3_id: 192 };
        return undefined;
      });
      // Leaf Stone
      expect(await getGameItemId(85, 3)).toBe(98);
      // Deep Sea Tooth
      expect(await getGameItemId(203, 3)).toBe(192);
      // Fallback
      expect(await getGameItemId(999, 3)).toBe(999);
    });

    it('returns the fallback ID when generation is unknown (e.g. 4)', async () => {
      vi.spyOn(pokeDB, 'getItem').mockResolvedValue({
        id: 81,
        name: 'Moon Stone',
        gen1_id: 0x0a,
        gen2_id: 0x08,
        gen3_id: 94,
      });
      // Moon Stone
      expect(await getGameItemId(81, 4)).toBe(81);
    });
  });
});
