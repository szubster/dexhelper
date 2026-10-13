import { describe, expect, it } from 'vitest';
import type { PokemonMoveset, TMHM } from './compatibility.js';
import { identifyStrategicGapsForTMHM } from './compatibility.js';

describe('identifyStrategicGapsForTMHM', () => {
  it('should return true if the Pokemon lacks a move of the TM/HM type', () => {
    const pokemon: PokemonMoveset = {
      id: '1',
      speciesId: 25, // Pikachu
      knownMoves: [
        { id: 1, type: 'Normal' },
        { id: 2, type: 'Normal' },
      ],
    };
    const tmhm: TMHM = { id: 24, type: 'Electric' }; // Thunderbolt

    expect(identifyStrategicGapsForTMHM(pokemon, tmhm)).toBe(true);
  });

  it('should return false if the Pokemon already knows a move of the TM/HM type', () => {
    const pokemon: PokemonMoveset = {
      id: '1',
      speciesId: 25, // Pikachu
      knownMoves: [
        { id: 1, type: 'Electric' }, // Thundershock
        { id: 2, type: 'Normal' },
      ],
    };
    const tmhm: TMHM = { id: 24, type: 'Electric' }; // Thunderbolt

    expect(identifyStrategicGapsForTMHM(pokemon, tmhm)).toBe(false);
  });

  it('should return true if the Pokemon has no known moves', () => {
    const pokemon: PokemonMoveset = {
      id: '1',
      speciesId: 25,
      knownMoves: [],
    };
    const tmhm: TMHM = { id: 24, type: 'Electric' };

    expect(identifyStrategicGapsForTMHM(pokemon, tmhm)).toBe(true);
  });
});
