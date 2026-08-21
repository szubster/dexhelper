import { describe, expect, it } from 'vitest';
import { EGG_GROUP } from '../../db/schema';
import { determineInheritedDVs } from './inheritance';
import type { PokemonWithMetadata } from './pair_algorithm';

describe('determineInheritedDVs (Gen 2 Breeding)', () => {
  it('should inherit from the non-Ditto parent when breeding with Ditto (Male + Ditto)', () => {
    const parentA: PokemonWithMetadata = {
      id: 'ditto1',
      speciesId: 132,
      gender: 'Genderless',
      eggGroups: [EGG_GROUP.DITTO],
      dvs: { attack: 10, defense: 10, special: 10, speed: 10 },
    };

    const parentB: PokemonWithMetadata = {
      id: 'pikachu-m',
      speciesId: 25,
      gender: 'Male',
      eggGroups: [EGG_GROUP.GROUND, EGG_GROUP.FAIRY],
      dvs: { attack: 15, defense: 14, special: 13, speed: 12 },
    };

    const result = determineInheritedDVs(parentA, parentB);

    // Male offspring inherits from Pikachu
    expect(result.maleOffspring.defense).toBe(14);
    expect(result.maleOffspring.special).toBe(13);

    // Female offspring inherits from Pikachu
    expect(result.femaleOffspring.defense).toBe(14);
    expect(result.femaleOffspring.special).toBe(13);

    // Genderless offspring inherits from Pikachu
    expect(result.genderlessOffspring.defense).toBe(14);
    expect(result.genderlessOffspring.special).toBe(13);
  });

  it('should inherit from the non-Ditto parent when breeding with Ditto (Female + Ditto)', () => {
    const parentA: PokemonWithMetadata = {
      id: 'ditto1',
      speciesId: 132,
      gender: 'Genderless',
      eggGroups: [EGG_GROUP.DITTO],
      dvs: { attack: 10, defense: 10, special: 10, speed: 10 },
    };

    const parentB: PokemonWithMetadata = {
      id: 'pikachu-f',
      speciesId: 25,
      gender: 'Female',
      eggGroups: [EGG_GROUP.GROUND, EGG_GROUP.FAIRY],
      dvs: { attack: 1, defense: 14, special: 13, speed: 12 },
    };

    const result = determineInheritedDVs(parentB, parentA); // swap order

    expect(result.maleOffspring.defense).toBe(14);
    expect(result.maleOffspring.special).toBe(13);

    expect(result.femaleOffspring.defense).toBe(14);
    expect(result.femaleOffspring.special).toBe(13);
  });

  it('should inherit from the non-Ditto parent when breeding with Ditto (Genderless + Ditto)', () => {
    const parentA: PokemonWithMetadata = {
      id: 'ditto1',
      speciesId: 132,
      gender: 'Genderless',
      eggGroups: [EGG_GROUP.DITTO],
      dvs: { attack: 10, defense: 10, special: 10, speed: 10 },
    };

    const parentB: PokemonWithMetadata = {
      id: 'magnemite',
      speciesId: 81,
      gender: 'Genderless',
      eggGroups: [EGG_GROUP.MINERAL],
      dvs: { attack: 15, defense: 5, special: 6, speed: 12 },
    };

    const result = determineInheritedDVs(parentB, parentA);

    expect(result.genderlessOffspring.defense).toBe(5);
    expect(result.genderlessOffspring.special).toBe(6);
  });

  it('should inherit from the opposite-gender parent for Male x Female pairings', () => {
    const parentA: PokemonWithMetadata = {
      id: 'miltank',
      speciesId: 241,
      gender: 'Female',
      eggGroups: [EGG_GROUP.GROUND],
      dvs: { attack: 10, defense: 15, special: 15, speed: 10 }, // Female
    };

    const parentB: PokemonWithMetadata = {
      id: 'tauros',
      speciesId: 128,
      gender: 'Male',
      eggGroups: [EGG_GROUP.GROUND],
      dvs: { attack: 15, defense: 1, special: 1, speed: 10 }, // Male
    };

    const result = determineInheritedDVs(parentA, parentB);

    // Male offspring inherits from Female parent (Miltank)
    expect(result.maleOffspring.defense).toBe(15);
    expect(result.maleOffspring.special).toBe(15);

    // Female offspring inherits from Male parent (Tauros)
    expect(result.femaleOffspring.defense).toBe(1);
    expect(result.femaleOffspring.special).toBe(1);

    // Genderless offspring shouldn't inherit in this pairing
    expect(result.genderlessOffspring.defense).toBeUndefined();
  });

  it('should handle parents missing DVs gracefully', () => {
    const parentA: PokemonWithMetadata = {
      id: 'miltank',
      speciesId: 241,
      gender: 'Female',
      eggGroups: [EGG_GROUP.GROUND],
      // No DVs
    };

    const parentB: PokemonWithMetadata = {
      id: 'tauros',
      speciesId: 128,
      gender: 'Male',
      eggGroups: [EGG_GROUP.GROUND],
      // No DVs
    };

    const result = determineInheritedDVs(parentA, parentB);

    expect(result.maleOffspring.defense).toBeUndefined();
    expect(result.maleOffspring.special).toBeUndefined();
    expect(result.femaleOffspring.defense).toBeUndefined();
    expect(result.femaleOffspring.special).toBeUndefined();
  });
});
