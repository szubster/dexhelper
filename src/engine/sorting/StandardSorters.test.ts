import { describe, expect, it } from 'vitest';
import type { PokemonMetadata } from '../../db/schema';
import type { PokemonInstance } from '../saveParser/parsers/common';
import type { SortablePokemon } from './SortingStrategy';
import { AlphaSorter, DexNumberSorter, LevelSorter, MissingRibbonSorter, TypeSorter } from './StandardSorters';

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

    it('sorts by Hoenn dex order for regional variant Gen 3 (Ruby/Sapphire/Emerald)', () => {
      const sorter = new DexNumberSorter({ variant: 'regional', generation: 3, gameVersion: 'emerald' }).sort;
      // Treecko (252) is #1 in Hoenn Dex, Abra (63) is #39, Bulbasaur (1) is not in Hoenn Dex
      const treecko = createSortable(252, 5);
      const abra = createSortable(63, 5);
      const bulbasaur = createSortable(1, 5);

      expect(sorter(treecko, abra)).toBeLessThan(0);
      expect(sorter(abra, treecko)).toBeGreaterThan(0);
      expect(sorter(treecko, bulbasaur)).toBeLessThan(0);
      expect(sorter(bulbasaur, treecko)).toBeGreaterThan(0);
    });

    it('falls back to National Dex order for regional variant Gen 3 (FireRed/LeafGreen)', () => {
      const sorter = new DexNumberSorter({ variant: 'regional', generation: 3, gameVersion: 'firered' }).sort;
      const treecko = createSortable(252, 5);
      const bulbasaur = createSortable(1, 5);

      expect(sorter(bulbasaur, treecko)).toBeLessThan(0);
      expect(sorter(treecko, bulbasaur)).toBeGreaterThan(0);
    });

    it('falls back to National Dex order for regional variant Gen 1 and Gen 2', () => {
      const sorterGen1 = new DexNumberSorter({ variant: 'regional', generation: 1 }).sort;
      const sorterGen2 = new DexNumberSorter({ variant: 'regional', generation: 2 }).sort;

      const chikorita = createSortable(152, 5);
      const bulbasaur = createSortable(1, 5);

      expect(sorterGen1(bulbasaur, chikorita)).toBeLessThan(0);
      expect(sorterGen2(bulbasaur, chikorita)).toBeLessThan(0);
    });

    it('handles missing instance properties gracefully', () => {
      const sorter = new DexNumberSorter({ variant: 'national' }).sort;
      const p1 = {} as SortablePokemon;
      const p2 = createSortable(1, 5);
      expect(sorter(p1, p2)).toBeGreaterThan(0);
      expect(sorter(p2, p1)).toBeLessThan(0);
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

    it('handles missing instance properties gracefully by defaulting level to 0', () => {
      const sorter = new LevelSorter({ direction: 'asc' }).sort;
      const p1 = {} as SortablePokemon; // Level will default to 0
      const p2 = createSortable(1, 5);
      expect(sorter(p1, p2)).toBeLessThan(0);
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

    it('filters out Steel (9) and Dark (17) types for Gen 1', () => {
      const sorter = new TypeSorter({ generation: 1 }).sort;
      // Magnemite is Electric (13) and Steel (9). In Gen 1, it should just be Electric.
      const magnemite = createSortable(81, 5, undefined, [13, 9]);
      const electabuzz = createSortable(125, 5, undefined, [13]);

      // Since Steel is filtered out, both have only [13], so they should be equal
      expect(sorter(magnemite, electabuzz)).toBe(0);

      // Umbreon is Dark (17). In Gen 1 context, it should have no types.
      const umbreon = createSortable(197, 5, undefined, [17]);
      const porygon = createSortable(137, 5, undefined, [1]); // Normal (1)

      // Porygon has type 1, Umbreon has no types (Infinity), so Porygon is less.
      expect(sorter(porygon, umbreon)).toBeLessThan(0);
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

    it('handles missing instance properties gracefully', () => {
      const sorter = new AlphaSorter().sort;
      const p1 = {} as SortablePokemon; // Resolves to 'Infinity'
      const p2 = createSortable(2, 5); // Resolves to '2'
      expect(sorter(p1, p2)).toBeGreaterThan(0);
    });
  });

  describe('MissingRibbonSorter', () => {
    const createWithRibbons = (id: number, ribbons?: PokemonInstance['ribbons']): SortablePokemon => {
      return {
        instance: {
          speciesId: id,
          level: 50,
          isShiny: false,
          hash: String(id),
          moves: [],
          storageLocation: 'Box 1',
          generation: 3,
          ribbons,
        } as unknown as PokemonInstance,
      };
    };

    const p1_noRibbons = createWithRibbons(1); // 5 missing
    const p2_someRibbons = createWithRibbons(2, {
      cool: 1,
      beauty: 4,
      cute: 2,
      smart: 4,
      tough: 0,
      champion: false,
      winning: false,
      victory: false,
      artist: false,
      effort: false,
      battleChampion: false,
      regionalChampion: false,
      nationalChampion: false,
      country: false,
      national: false,
      earth: false,
      world: false,
      obedience: false,
    }); // 3 missing
    const p3_allMaster = createWithRibbons(3, {
      cool: 4,
      beauty: 4,
      cute: 4,
      smart: 4,
      tough: 4,
      champion: false,
      winning: false,
      victory: false,
      artist: false,
      effort: false,
      battleChampion: false,
      regionalChampion: false,
      nationalChampion: false,
      country: false,
      national: false,
      earth: false,
      world: false,
      obedience: false,
    }); // 0 missing

    it('sorts descending by default (most missing first)', () => {
      const sorter = new MissingRibbonSorter(); // default is desc

      expect(sorter.sort(p1_noRibbons, p2_someRibbons)).toBeLessThan(0); // p1 has more missing, so p1 < p2
      expect(sorter.sort(p2_someRibbons, p3_allMaster)).toBeLessThan(0);
      expect(sorter.sort(p3_allMaster, p1_noRibbons)).toBeGreaterThan(0);
    });

    it('sorts ascending when configured (least missing first)', () => {
      const sorter = new MissingRibbonSorter({ direction: 'asc' });

      expect(sorter.sort(p3_allMaster, p2_someRibbons)).toBeLessThan(0); // p3 has less missing, so p3 < p2
      expect(sorter.sort(p2_someRibbons, p1_noRibbons)).toBeLessThan(0);
      expect(sorter.sort(p1_noRibbons, p3_allMaster)).toBeGreaterThan(0);
    });

    it('handles equal missing counts', () => {
      const sorter = new MissingRibbonSorter();
      const p4_someRibbons = createWithRibbons(4, {
        cool: 0,
        beauty: 4,
        cute: 0,
        smart: 4,
        tough: 0,
        champion: false,
        winning: false,
        victory: false,
        artist: false,
        effort: false,
        battleChampion: false,
        regionalChampion: false,
        nationalChampion: false,
        country: false,
        national: false,
        earth: false,
        world: false,
        obedience: false,
      }); // 3 missing
      expect(sorter.sort(p2_someRibbons, p4_someRibbons)).toBe(0);
    });
  });
});
