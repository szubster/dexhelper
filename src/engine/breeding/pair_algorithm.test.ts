import { describe, expect, test } from 'vitest';
import { calculateBreedingPairs, type PokemonWithMetadata } from './pair_algorithm';

describe('calculateBreedingPairs', () => {
  test('matches valid male/female pairs in same egg group', () => {
    const p1: PokemonWithMetadata = {
      id: '1',
      speciesId: 1,
      gender: 'Male',
      eggGroups: ['Monster'],
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 2,
      gender: 'Female',
      eggGroups: ['Monster'],
    };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(1);
    expect(pairs[0]?.score).toBe(0);
  });

  test('prioritizes shiny carriers', () => {
    const p1: PokemonWithMetadata = {
      id: '1',
      speciesId: 1,
      gender: 'Male',
      eggGroups: ['Monster'],
      isShinyCarrier: true,
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 2,
      gender: 'Female',
      eggGroups: ['Monster'],
    };
    const p3: PokemonWithMetadata = {
      id: '3',
      speciesId: 3,
      gender: 'Female',
      eggGroups: ['Monster'],
      isShinyCarrier: true,
    };

    const pairs = calculateBreedingPairs([p1, p2, p3]);
    // Since p1 and p3 are both shiny carriers, they cannot breed.
    // p2 and p3 are both Female, so they cannot breed.
    // So the only valid pair is p1 + p2.
    expect(pairs).toHaveLength(1);
    expect(pairs[0]?.score).toBe(1);

    // Check that p1 and p3 are not paired together
    const pairIds = pairs.map((p) => `${p.parentA.id}-${p.parentB.id}`);
    expect(pairIds).not.toContain('1-3');
    expect(pairIds).not.toContain('3-1');
  });

  test('two shiny/shiny carrier parents cannot breed', () => {
    const p1: PokemonWithMetadata = {
      id: '1',
      speciesId: 1,
      gender: 'Male',
      eggGroups: ['Monster'],
      isShinyCarrier: true,
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 2,
      gender: 'Female',
      eggGroups: ['Monster'],
      isShiny: true,
    };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(0);
  });

  test('handles Ditto mechanics correctly', () => {
    const ditto: PokemonWithMetadata = {
      id: '1',
      speciesId: 132,
      gender: 'Genderless',
      eggGroups: ['Ditto'],
    };
    const maleBulba: PokemonWithMetadata = {
      id: '2',
      speciesId: 1,
      gender: 'Male',
      eggGroups: ['Monster'],
    };
    const genderlessMagnemite: PokemonWithMetadata = {
      id: '3',
      speciesId: 81,
      gender: 'Genderless',
      eggGroups: ['Mineral'],
    };
    const noEggsMewtwo: PokemonWithMetadata = {
      id: '4',
      speciesId: 150,
      gender: 'Genderless',
      eggGroups: ['No Eggs'],
    };

    const pairs = calculateBreedingPairs([ditto, maleBulba, genderlessMagnemite, noEggsMewtwo]);

    expect(pairs).toHaveLength(2);

    const pairAIds = pairs.map((p) => p.parentA.id);
    const pairBIds = pairs.map((p) => p.parentB.id);
    const allIdsInPairs = new Set([...pairAIds, ...pairBIds]);

    expect(allIdsInPairs.has('1')).toBe(true);
    expect(allIdsInPairs.has('4')).toBe(false);
  });

  test('does not match same gender', () => {
    const p1: PokemonWithMetadata = {
      id: '1',
      speciesId: 1,
      gender: 'Male',
      eggGroups: ['Monster'],
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 2,
      gender: 'Male',
      eggGroups: ['Monster'],
    };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(0);
  });

  test('does not match No Eggs group', () => {
    const p1: PokemonWithMetadata = {
      id: '1',
      speciesId: 175,
      gender: 'Male',
      eggGroups: ['No Eggs'],
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 175,
      gender: 'Female',
      eggGroups: ['No Eggs'],
    };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(0);
  });
});
