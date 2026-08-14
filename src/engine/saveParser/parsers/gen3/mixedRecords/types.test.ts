import { describe, expect, it } from 'vitest';
import { MixedRecordNPCSchema, SecretBasePokemonSchema } from './types';

describe('Mixed Record Types Validation', () => {
  it('should validate a valid SecretBasePokemon', () => {
    const validPokemon = {
      personality: 123456789,
      moves: [1, 2, 3, 4],
      species: 25,
      heldItem: 10,
      level: 50,
      evs: 100,
    };
    expect(() => SecretBasePokemonSchema.parse(validPokemon)).not.toThrow();
  });

  it('should reject an invalid SecretBasePokemon', () => {
    const invalidPokemon = {
      personality: -1,
      moves: [1, 2, 3],
      species: -1,
      heldItem: -1,
      level: 101,
      evs: 256,
    };
    expect(() => SecretBasePokemonSchema.parse(invalidPokemon)).toThrowError(/Too small/);
  });

  it('should validate a valid MixedRecordNPC', () => {
    const validNPC = {
      trainerName: 'Brendan',
      trainerId: 12345,
      secretBaseId: 1,
      party: [
        {
          personality: 123456789,
          moves: [1, 2, 3, 4],
          species: 25,
          heldItem: 10,
          level: 50,
          evs: 100,
        },
      ],
    };
    expect(() => MixedRecordNPCSchema.parse(validNPC)).not.toThrow();
  });

  it('should reject an invalid MixedRecordNPC', () => {
    const invalidNPC = {
      trainerName: 'ThisNameIsTooLong',
      trainerId: -1,
      secretBaseId: -1,
      party: [],
    };
    expect(() => MixedRecordNPCSchema.parse(invalidNPC)).toThrowError(/Too big/);
  });
});
