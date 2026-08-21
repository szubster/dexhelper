import { describe, expect, it } from 'vitest';
import type { PokemonInstance } from '../saveParser/parsers/common';
import { filterByMissingRibbons, getMissingRibbonCount, sortByMissingRibbonCount } from './RibbonFilters';

describe('RibbonFilters', () => {
  const createPokemon = (id: number, ribbons?: PokemonInstance['ribbons']): PokemonInstance => {
    return {
      speciesId: id,
      level: 50,
      isShiny: false,
      hash: String(id),
      moves: [],
      storageLocation: 'Box 1',
      generation: 3,
      ribbons,
    } as unknown as PokemonInstance;
  };

  const p1_noRibbons = createPokemon(1);
  const p2_someRibbons = createPokemon(2, { cool: 1, beauty: 4, cute: 2, smart: 4, tough: 0 });
  const p3_allMaster = createPokemon(3, { cool: 4, beauty: 4, cute: 4, smart: 4, tough: 4 });
  const p4_allSuper = createPokemon(4, { cool: 2, beauty: 2, cute: 2, smart: 2, tough: 2 });

  describe('getMissingRibbonCount', () => {
    it('returns 5 when ribbons are undefined (default target 4)', () => {
      expect(getMissingRibbonCount(p1_noRibbons)).toBe(5);
    });

    it('returns 0 when all ribbons are at or above target rank', () => {
      expect(getMissingRibbonCount(p3_allMaster)).toBe(0);
    });

    it('returns correct count for mixed ranks', () => {
      expect(getMissingRibbonCount(p2_someRibbons)).toBe(3); // cool, cute, tough are < 4
    });

    it('respects targetRank in filterState', () => {
      expect(getMissingRibbonCount(p4_allSuper, { targetRank: 2 })).toBe(0);
      expect(getMissingRibbonCount(p4_allSuper, { targetRank: 3 })).toBe(5);
    });

    it('respects categories in filterState', () => {
      expect(getMissingRibbonCount(p2_someRibbons, { categories: ['beauty', 'smart'] })).toBe(0);
      expect(getMissingRibbonCount(p2_someRibbons, { categories: ['cool', 'beauty'] })).toBe(1);
    });
  });

  describe('filterByMissingRibbons', () => {
    const list = [p1_noRibbons, p2_someRibbons, p3_allMaster, p4_allSuper];

    it('filters out pokemon that have all required ribbons', () => {
      const filtered = filterByMissingRibbons(list);
      expect(filtered.length).toBe(3);
      expect(filtered).not.toContain(p3_allMaster);
      expect(filtered).toContain(p1_noRibbons);
      expect(filtered).toContain(p2_someRibbons);
      expect(filtered).toContain(p4_allSuper);
    });

    it('applies custom filterState correctly', () => {
      // p4 has all at rank 2. So if target is 2, it's not missing any.
      // p2 has some < 2 (tough is 0, cool is 1). So p2 is missing some.
      // p1 has undefined (all 0), missing some.
      // p3 has all 4, not missing any.
      const filtered = filterByMissingRibbons(list, { targetRank: 2 });
      expect(filtered.length).toBe(2);
      expect(filtered).toContain(p1_noRibbons);
      expect(filtered).toContain(p2_someRibbons);
    });
  });

  describe('sortByMissingRibbonCount', () => {
    const list = [p3_allMaster, p1_noRibbons, p2_someRibbons];

    it('sorts descending by default (most missing first)', () => {
      const sorted = sortByMissingRibbonCount(list);
      expect(sorted[0]?.speciesId).toBe(1); // 5 missing
      expect(sorted[1]?.speciesId).toBe(2); // 3 missing
      expect(sorted[2]?.speciesId).toBe(3); // 0 missing
    });

    it('sorts ascending when specified (least missing first)', () => {
      const sorted = sortByMissingRibbonCount(list, { direction: 'asc' });
      expect(sorted[0]?.speciesId).toBe(3); // 0 missing
      expect(sorted[1]?.speciesId).toBe(2); // 3 missing
      expect(sorted[2]?.speciesId).toBe(1); // 5 missing
    });
  });
});
