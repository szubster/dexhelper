import { describe, expect, it } from 'vitest';
import * as Constants from './constants';
import type { Gen3MixedRecordNPC, Gen3MixedRecordNPCPokemon } from './types';

describe('Gen 3 Mixed Records Types & Constants', () => {
  it('should compile valid type assignments', () => {
    const validPokemon: Gen3MixedRecordNPCPokemon = {
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

    const validNPC: Gen3MixedRecordNPC = {
      trainerName: 'Ash',
      trainerGender: 0,
      trainerId: 12345,
      party: [validPokemon],
    };

    expect(validPokemon.species).toBe(25);
    expect(validNPC.trainerName).toBe('Ash');
  });

  it('should verify constants exist', () => {
    expect(Constants.MIXED_RECORD_NPC_PARTY_COUNT).toBe(6);
    expect(Constants.MIXED_RECORD_POKEMON_MOVES_COUNT).toBe(4);
  });
});
