import { describe, expect, it } from 'vitest';
import type { PokemonMetadata } from '../../db/schema';
import type { PokemonInstance } from '../saveParser/parsers/common';
import type { SortablePokemon } from './SortingStrategy';
import { AlphaSorter, DexNumberSorter, LevelSorter, TypeSorter } from './StandardSorters';

describe('StandardSorters', () => {
  const createSortable = (
    id: number,
    level: number,
    nickname?: string,
    types?: number[],
    speciesName?: string,
  ): SortablePokemon => {
    const metadata =
      types || speciesName
        ? ({
            id,
            n: speciesName || '',
            cr: 100,
            baby: false,
            eto: [],
            efrm: [],
            det: [],
            types,
          } as unknown as PokemonMetadata)
        : undefined;

    const result: SortablePokemon = {
      instance: {
        speciesId: id,
        level,
        isShiny: false,
        hash: '',
        moves: [],
        storageLocation: 'Box 1',
        nickname,
      } as unknown as PokemonInstance,
    };
    if (metadata) {
      result.metadata = metadata;
    }
    return result;
  };

  describe('DexNumberSorter', () => {
    it('sorts by speciesId for national variant', () => {
      const sorter = new DexNumberSorter({ variant: 'national' }).sort;
      const p1 = createSortable(2, 5);
      const p2 = createSortable(1, 10);
      expect(sorter(p1, p2)).toBeGreaterThan(0);
      expect(sorter(p2, p1)).toBeLessThan(0);
    });

    it('throws error for regional variant', () => {
      expect(() =>
        new DexNumberSorter({ variant: 'regional' }).sort(createSortable(1, 1), createSortable(2, 1)),
      ).toThrow('Regional variant sorting is not supported yet.');
    });
  });

  describe('LevelSorter', () => {
    it('sorts asc', () => {
      const sorter = new LevelSorter({ direction: 'asc' }).sort;
      const p1 = createSortable(1, 5);
      const p2 = createSortable(2, 10);
      expect(sorter(p1, p2)).toBeLessThan(0);
      expect(sorter(p2, p1)).toBeGreaterThan(0);
    });

    it('sorts desc', () => {
      const sorter = new LevelSorter({ direction: 'desc' }).sort;
      const p1 = createSortable(1, 5);
      const p2 = createSortable(2, 10);
      expect(sorter(p1, p2)).toBeGreaterThan(0);
      expect(sorter(p2, p1)).toBeLessThan(0);
    });
  });

  describe('TypeSorter', () => {
    it('sorts by primary type', () => {
      const sorter = new TypeSorter().sort;
      const p1 = createSortable(1, 5, undefined, [1, 3]);
      const p2 = createSortable(2, 5, undefined, [2, 3]);
      expect(sorter(p1, p2)).toBeLessThan(0);
    });

    it('sorts by secondary type if primary type is equal', () => {
      const sorter = new TypeSorter().sort;
      const p1 = createSortable(1, 5, undefined, [1, 2]);
      const p2 = createSortable(2, 5, undefined, [1, 3]);
      expect(sorter(p1, p2)).toBeLessThan(0);
    });

    it('puts missing metadata or types at the end', () => {
      const sorter = new TypeSorter().sort;
      const p1 = createSortable(1, 5, undefined, [1]);
      const p2 = createSortable(2, 5); // missing metadata
      expect(sorter(p1, p2)).toBeLessThan(0);
    });

    it('returns 0 if primary and secondary types are equal', () => {
      const sorter = new TypeSorter().sort;
      const p1 = createSortable(1, 5, undefined, [1]);
      const p2 = createSortable(2, 5, undefined, [1]);
      expect(sorter(p1, p2)).toBe(0);
    });
  });

  describe('AlphaSorter', () => {
    it('sorts alphabetically by nickname', () => {
      const sorter = new AlphaSorter().sort;
      const p1 = createSortable(1, 5, 'Bulba');
      const p2 = createSortable(2, 5, 'Ivysaur');
      expect(sorter(p1, p2)).toBeLessThan(0);
    });

    it('falls back to species name if nickname is missing', () => {
      const sorter = new AlphaSorter().sort;
      const p1 = createSortable(1, 5, undefined, undefined, 'Zubat');
      const p2 = createSortable(2, 5, undefined, undefined, 'Abra');
      expect(sorter(p1, p2)).toBeGreaterThan(0);
    });

    it('falls back to string speciesId if metadata is missing', () => {
      const sorter = new AlphaSorter().sort;
      const p1 = createSortable(2, 5);
      const p2 = createSortable(10, 5);
      expect(sorter(p1, p2)).toBeGreaterThan(0); // '2' > '10' string comparison
    });
  });
});
