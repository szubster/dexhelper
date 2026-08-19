import { describe, expect, it } from 'vitest';
import type { PokemonMetadata } from '@/db/schema';
import type { PokemonInstance } from '../saveParser/parsers/common';
import { MultiCriterionSorter, type SortablePokemon, type SortingStrategy } from './SortingStrategy';

describe('MultiCriterionSorter', () => {
  const createSortable = (id: number, level: number, name: string): SortablePokemon => ({
    instance: {
      speciesId: id,
      level,
      isShiny: false,
      hash: '',
      moves: [],
      storageLocation: 'Box 1',
    } as unknown as PokemonInstance,
    metadata: {
      id,
      n: name,
      cr: 100,
      baby: false,
      eto: [],
      efrm: [],
      det: [],
    } as PokemonMetadata,
  });

  const sortById: SortingStrategy = (a, b) => a.instance.speciesId - b.instance.speciesId;
  const sortByLevel: SortingStrategy = (a, b) => a.instance.level - b.instance.level;
  const sortByName: SortingStrategy = (a, b) => {
    const nameA = a.metadata?.n || '';
    const nameB = b.metadata?.n || '';
    return nameA.localeCompare(nameB);
  };

  it('should prioritize the first strategy', () => {
    const sorter = new MultiCriterionSorter([sortById, sortByLevel]);

    const p1 = createSortable(2, 5, 'Bulbasaur');
    const p2 = createSortable(1, 10, 'Ivysaur');

    expect(sorter.sort(p1, p2)).toBeGreaterThan(0); // 2 > 1
    expect(sorter.sort(p2, p1)).toBeLessThan(0); // 1 < 2
  });

  it('should fall back to the second strategy when the first returns 0', () => {
    const sorter = new MultiCriterionSorter([sortById, sortByLevel]);

    const p1 = createSortable(1, 10, 'Bulbasaur');
    const p2 = createSortable(1, 5, 'Bulbasaur');

    expect(sorter.sort(p1, p2)).toBeGreaterThan(0); // ID equal, 10 > 5
    expect(sorter.sort(p2, p1)).toBeLessThan(0); // ID equal, 5 < 10
  });

  it('should fall back through multiple strategies', () => {
    const sorter = new MultiCriterionSorter([sortById, sortByLevel, sortByName]);

    const p1 = createSortable(1, 5, 'Bulbasaur');
    const p2 = createSortable(1, 5, 'Ivysaur');

    expect(sorter.sort(p1, p2)).toBeLessThan(0); // ID equal, Level equal, 'B' < 'I'
    expect(sorter.sort(p2, p1)).toBeGreaterThan(0); // ID equal, Level equal, 'I' > 'B'
  });

  it('should return 0 when all strategies return 0', () => {
    const sorter = new MultiCriterionSorter([sortById, sortByLevel]);

    const p1 = createSortable(1, 5, 'Bulbasaur');
    const p2 = createSortable(1, 5, 'Bulbasaur');

    expect(sorter.sort(p1, p2)).toBe(0);
  });
});
