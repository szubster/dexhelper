import { describe, expect, it } from 'vitest';
import { EGG_GROUP } from '../../db/schema';
import type { PokemonWithMetadata } from './pair_algorithm';
import { calculateShinyOdds } from './shiny';

describe('calculateShinyOdds', () => {
  it('should return 1/64 for shiny carriers and 1/8192 for non-carriers (Ditto x Male)', () => {
    // Parent A is a Ditto with shiny DVs (carrier)
    const parentA: PokemonWithMetadata = {
      id: 'ditto1',
      speciesId: 132,
      gender: 'Genderless',
      eggGroups: [EGG_GROUP.DITTO],
      dvs: { attack: 10, defense: 10, special: 10, speed: 10 },
    };

    // Parent B is a Male with regular DVs
    const parentB: PokemonWithMetadata = {
      id: 'pikachu-m',
      speciesId: 25,
      gender: 'Male',
      eggGroups: [EGG_GROUP.GROUND, EGG_GROUP.FAIRY],
      dvs: { attack: 15, defense: 14, special: 13, speed: 12 },
    };

    const result = calculateShinyOdds(parentA, parentB);

    // Because parent A is Ditto, the non-Ditto parent passes down its DVs.
    // Parent B (Pikachu) does NOT have Defense 10 and Special 10.
    // So all offspring odds should be 1/8192.
    expect(result.maleOffspringOdds).toBe('1/8192');
    expect(result.femaleOffspringOdds).toBe('1/8192');
    expect(result.genderlessOffspringOdds).toBe('1/8192');
  });

  it('should return 1/64 for shiny carriers and 1/8192 for non-carriers (Ditto x Shiny Carrier Male)', () => {
    // Parent A is a Ditto with regular DVs
    const parentA: PokemonWithMetadata = {
      id: 'ditto1',
      speciesId: 132,
      gender: 'Genderless',
      eggGroups: [EGG_GROUP.DITTO],
      dvs: { attack: 15, defense: 14, special: 13, speed: 12 },
    };

    // Parent B is a Male with shiny DVs
    const parentB: PokemonWithMetadata = {
      id: 'pikachu-m',
      speciesId: 25,
      gender: 'Male',
      eggGroups: [EGG_GROUP.GROUND, EGG_GROUP.FAIRY],
      dvs: { attack: 10, defense: 10, special: 10, speed: 10 },
    };

    const result = calculateShinyOdds(parentA, parentB);

    // Because parent A is Ditto, the non-Ditto parent (Parent B) passes down its DVs.
    // Parent B has Defense 10 and Special 10, so all offspring odds should be 1/64.
    expect(result.maleOffspringOdds).toBe('1/64');
    expect(result.femaleOffspringOdds).toBe('1/64');
    expect(result.genderlessOffspringOdds).toBe('1/64');
  });

  it('should return 1/64 for shiny carriers and 1/8192 for non-carriers (Female x Male)', () => {
    // Parent A is a Female with shiny DVs (carrier)
    const parentA: PokemonWithMetadata = {
      id: 'miltank',
      speciesId: 241,
      gender: 'Female',
      eggGroups: [EGG_GROUP.GROUND],
      dvs: { attack: 10, defense: 10, special: 10, speed: 10 }, // Female
    };

    // Parent B is a Male with regular DVs
    const parentB: PokemonWithMetadata = {
      id: 'tauros',
      speciesId: 128,
      gender: 'Male',
      eggGroups: [EGG_GROUP.GROUND],
      dvs: { attack: 15, defense: 1, special: 1, speed: 10 }, // Male
    };

    const result = calculateShinyOdds(parentA, parentB);

    // Male offspring inherits from Female parent (Miltank, shiny carrier)
    expect(result.maleOffspringOdds).toBe('1/64');

    // Female offspring inherits from Male parent (Tauros, non-carrier)
    expect(result.femaleOffspringOdds).toBe('1/8192');

    // Genderless offspring shouldn't inherit in this pairing (empty DVs)
    expect(result.genderlessOffspringOdds).toBe('1/8192');
  });

  it('should return 1/64 for shiny carriers and 1/8192 for non-carriers (Female x Shiny Carrier Male)', () => {
    // Parent A is a Female with regular DVs
    const parentA: PokemonWithMetadata = {
      id: 'miltank',
      speciesId: 241,
      gender: 'Female',
      eggGroups: [EGG_GROUP.GROUND],
      dvs: { attack: 10, defense: 15, special: 15, speed: 10 }, // Female
    };

    // Parent B is a Male with shiny DVs
    const parentB: PokemonWithMetadata = {
      id: 'tauros',
      speciesId: 128,
      gender: 'Male',
      eggGroups: [EGG_GROUP.GROUND],
      dvs: { attack: 15, defense: 10, special: 10, speed: 10 }, // Male
    };

    const result = calculateShinyOdds(parentA, parentB);

    // Male offspring inherits from Female parent (Miltank, non-carrier)
    expect(result.maleOffspringOdds).toBe('1/8192');

    // Female offspring inherits from Male parent (Tauros, shiny carrier)
    expect(result.femaleOffspringOdds).toBe('1/64');

    // Genderless offspring shouldn't inherit in this pairing (empty DVs)
    expect(result.genderlessOffspringOdds).toBe('1/8192');
  });
});
