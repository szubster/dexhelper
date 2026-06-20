import { describe, expect, test } from 'vitest';
import { calculateBreedingPairs, type PokemonWithMetadata } from './pair_algorithm';

describe('calculateBreedingPairs', () => {
  test('matches valid male/female pairs in same egg group', () => {
    const p1: PokemonWithMetadata = { id: '1', speciesId: 1, gender: 'Male', eggGroups: ['Monster'] };
    const p2: PokemonWithMetadata = { id: '2', speciesId: 2, gender: 'Female', eggGroups: ['Monster'] };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(1);
    expect(pairs[0].score).toBe(0);
  });

  test('prioritizes shiny carriers', () => {
    const p1: PokemonWithMetadata = { id: '1', speciesId: 1, gender: 'Male', eggGroups: ['Monster'], isShinyCarrier: true };
    const p2: PokemonWithMetadata = { id: '2', speciesId: 2, gender: 'Female', eggGroups: ['Monster'] };
    const p3: PokemonWithMetadata = { id: '3', speciesId: 3, gender: 'Female', eggGroups: ['Monster'], isShinyCarrier: true };

    const pairs = calculateBreedingPairs([p1, p2, p3]);
    // p1 + p2
    // p1 + p3
    // p2 + p3 -> both female, invalid!
    // So there are only 2 pairs.
    expect(pairs).toHaveLength(2);

    // p1 (carrier) + p3 (carrier) should be highest score (2)
    expect(pairs[0].score).toBe(2);
    expect(pairs[0].parentA.id).toBe('1');
    expect(pairs[0].parentB.id).toBe('3');
  });

  test('handles Ditto mechanics correctly', () => {
    const ditto: PokemonWithMetadata = { id: '1', speciesId: 132, gender: 'Genderless', eggGroups: ['Ditto'] };
    const maleBulba: PokemonWithMetadata = { id: '2', speciesId: 1, gender: 'Male', eggGroups: ['Monster'] };
    const genderlessMagnemite: PokemonWithMetadata = { id: '3', speciesId: 81, gender: 'Genderless', eggGroups: ['Mineral'] };
    const noEggsMewtwo: PokemonWithMetadata = { id: '4', speciesId: 150, gender: 'Genderless', eggGroups: ['No Eggs'] };

    const pairs = calculateBreedingPairs([ditto, maleBulba, genderlessMagnemite, noEggsMewtwo]);

    // Ditto + male = valid
    // Ditto + genderless = valid
    // Ditto + no eggs = invalid
    // male + genderless = invalid
    expect(pairs).toHaveLength(2);

    const pairAIds = pairs.map(p => p.parentA.id);
    const pairBIds = pairs.map(p => p.parentB.id);
    const allIdsInPairs = new Set([...pairAIds, ...pairBIds]);

    expect(allIdsInPairs.has('1')).toBe(true); // Ditto is in all pairs
    expect(allIdsInPairs.has('4')).toBe(false); // Mewtwo is not in any pair
  });

  test('does not match same gender', () => {
    const p1: PokemonWithMetadata = { id: '1', speciesId: 1, gender: 'Male', eggGroups: ['Monster'] };
    const p2: PokemonWithMetadata = { id: '2', speciesId: 2, gender: 'Male', eggGroups: ['Monster'] };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(0);
  });

  test('does not match No Eggs group', () => {
    const p1: PokemonWithMetadata = { id: '1', speciesId: 175, gender: 'Male', eggGroups: ['No Eggs'] };
    const p2: PokemonWithMetadata = { id: '2', speciesId: 175, gender: 'Female', eggGroups: ['No Eggs'] };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(0);
  });
});
