import { describe, expect, test } from 'vitest';
import { EGG_GROUP } from '@/db/schema';
import { calculateBreedingPairs, type PokemonWithMetadata } from './pair_algorithm';

describe('calculateBreedingPairs', () => {
  test('matches valid male/female pairs in same egg group', () => {
    const p1: PokemonWithMetadata = {
      id: '1',
      speciesId: 1,
      gender: 'Male',
      eggGroups: [EGG_GROUP.MONSTER],
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 2,
      gender: 'Female',
      eggGroups: [EGG_GROUP.MONSTER],
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
      eggGroups: [EGG_GROUP.MONSTER],
      isShinyCarrier: true,
      dvs: { attack: 15, defense: 10, speed: 10, special: 2 },
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 2,
      gender: 'Female',
      eggGroups: [EGG_GROUP.MONSTER],
      dvs: { attack: 1, defense: 1, speed: 1, special: 1 },
    };
    const p3: PokemonWithMetadata = {
      id: '3',
      speciesId: 3,
      gender: 'Female',
      eggGroups: [EGG_GROUP.MONSTER],
      isShinyCarrier: true,
      dvs: { attack: 15, defense: 10, speed: 10, special: 10 },
    };

    const pairs = calculateBreedingPairs([p1, p2, p3]);
    // Since p1 and p3 are both shiny carriers, but they share defense 10 and special difference is 8 (10-2). Thus they cannot breed.
    // p2 and p3 are both Female, so they cannot breed.
    // So the only valid pair is p1 + p2.
    expect(pairs).toHaveLength(1);
    expect(pairs[0]?.score).toBe(1);

    // Check that p1 and p3 are not paired together
    const pairIds = pairs.map((p) => `${p.parentA.id}-${p.parentB.id}`);
    expect(pairIds).not.toContain('1-3');
    expect(pairIds).not.toContain('3-1');
  });

  test('Test Case 1: Two Shiny Pokémon', () => {
    const p1: PokemonWithMetadata = {
      id: '1',
      speciesId: 1,
      gender: 'Male',
      eggGroups: [EGG_GROUP.MONSTER],
      isShiny: true,
      dvs: { attack: 10, defense: 10, speed: 10, special: 10 },
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 2,
      gender: 'Female',
      eggGroups: [EGG_GROUP.MONSTER],
      isShiny: true,
      dvs: { attack: 10, defense: 10, speed: 10, special: 10 },
    };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(0); // Defense 10 == 10, Special 10 == 10
  });

  test('Test Case 2: Shiny and Shiny Carrier (Difference of 8)', () => {
    const p1: PokemonWithMetadata = {
      id: '1',
      speciesId: 1,
      gender: 'Male',
      eggGroups: [EGG_GROUP.MONSTER],
      isShiny: true,
      dvs: { attack: 10, defense: 10, speed: 10, special: 10 },
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 2,
      gender: 'Female',
      eggGroups: [EGG_GROUP.MONSTER],
      isShinyCarrier: true,
      dvs: { attack: 15, defense: 10, speed: 15, special: 2 },
    };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(0); // Defense 10 == 10, Special |10-2| == 8
  });

  test('Test Case 3: Shiny and Unrelated Non-Shiny', () => {
    const p1: PokemonWithMetadata = {
      id: '1',
      speciesId: 1,
      gender: 'Male',
      eggGroups: [EGG_GROUP.MONSTER],
      isShiny: true,
      dvs: { attack: 10, defense: 10, speed: 10, special: 10 },
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 2,
      gender: 'Female',
      eggGroups: [EGG_GROUP.MONSTER],
      dvs: { attack: 15, defense: 7, speed: 15, special: 10 },
    };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(1); // Defense 10 != 7
  });

  test('Test Case 4: Identical Non-Shiny Defense, Different Special', () => {
    const p1: PokemonWithMetadata = {
      id: '1',
      speciesId: 1,
      gender: 'Male',
      eggGroups: [EGG_GROUP.MONSTER],
      dvs: { attack: 15, defense: 14, speed: 15, special: 5 },
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 2,
      gender: 'Female',
      eggGroups: [EGG_GROUP.MONSTER],
      dvs: { attack: 15, defense: 14, speed: 15, special: 10 },
    };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(1); // Defense 14 == 14, Special |5-10| = 5 != 8 or 0
  });

  test('handles Ditto mechanics correctly', () => {
    const ditto: PokemonWithMetadata = {
      id: '1',
      speciesId: 132,
      gender: 'Genderless',
      eggGroups: [EGG_GROUP.DITTO],
      dvs: { attack: 1, defense: 1, speed: 1, special: 1 },
    };
    const maleBulba: PokemonWithMetadata = {
      id: '2',
      speciesId: 1,
      gender: 'Male',
      eggGroups: [EGG_GROUP.MONSTER],
      dvs: { attack: 2, defense: 2, speed: 2, special: 2 },
    };
    const genderlessMagnemite: PokemonWithMetadata = {
      id: '3',
      speciesId: 81,
      gender: 'Genderless',
      eggGroups: [EGG_GROUP.MINERAL],
      dvs: { attack: 3, defense: 3, speed: 3, special: 3 },
    };
    const noEggsMewtwo: PokemonWithMetadata = {
      id: '4',
      speciesId: 150,
      gender: 'Genderless',
      eggGroups: [EGG_GROUP.NO_EGGS],
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
      eggGroups: [EGG_GROUP.MONSTER],
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 2,
      gender: 'Male',
      eggGroups: [EGG_GROUP.MONSTER],
    };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(0);
  });

  test('does not match No Eggs group', () => {
    const p1: PokemonWithMetadata = {
      id: '1',
      speciesId: 175,
      gender: 'Male',
      eggGroups: [EGG_GROUP.NO_EGGS],
    };
    const p2: PokemonWithMetadata = {
      id: '2',
      speciesId: 175,
      gender: 'Female',
      eggGroups: [EGG_GROUP.NO_EGGS],
    };

    const pairs = calculateBreedingPairs([p1, p2]);
    expect(pairs).toHaveLength(0);
  });
});
