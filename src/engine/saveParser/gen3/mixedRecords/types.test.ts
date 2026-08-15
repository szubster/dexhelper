import { describe, expect, it } from 'vitest';
import * as Constants from './constants';
import { Gen3MixedRecordNPCPokemonSchema, Gen3MixedRecordNPCSchema } from './types';

describe('Gen 3 Mixed Records Types', () => {
  it('should validate a correct Gen3MixedRecordNPCPokemon object', () => {
    const validPokemon = {
      personality: 123456,
      species: 25,
      heldItem: 100,
      moves: [1, 2, 3, 4],
      level: 50,
      hpEV: 0,
      atkEV: 0,
      defEV: 0,
      speedEV: 0,
      spAtkEV: 0,
      spDefEV: 0,
    };
    expect(() => Gen3MixedRecordNPCPokemonSchema.parse(validPokemon)).not.toThrow();
  });

  it('should invalidate an incorrect Gen3MixedRecordNPCPokemon object', () => {
    const invalidPokemon = {
      personality: 123456,
      species: 25,
      // Missing heldItem and EVs
      moves: [1, 2, 3, 4],
      level: 50,
    };
    expect(() => Gen3MixedRecordNPCPokemonSchema.parse(invalidPokemon)).toThrowError(
      /Invalid input: expected number, received undefined/,
    );
  });

  it('should validate a correct Gen3MixedRecordNPC object', () => {
    const validNPC = {
      trainerName: 'Ash',
      trainerGender: 0,
      trainerId: 12345,
      party: [
        {
          personality: 123456,
          species: 25,
          heldItem: 100,
          moves: [1, 2, 3, 4],
          level: 50,
          hpEV: 0,
          atkEV: 0,
          defEV: 0,
          speedEV: 0,
          spAtkEV: 0,
          spDefEV: 0,
        },
      ],
    };
    expect(() => Gen3MixedRecordNPCSchema.parse(validNPC)).not.toThrow();
  });

  it('should verify constants exist', () => {
    expect(Constants.MIXED_RECORD_NPC_PARTY_COUNT).toBe(6);
    expect(Constants.MIXED_RECORD_POKEMON_MOVES_COUNT).toBe(4);
  });
});
