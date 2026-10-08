import { describe, expect, it } from 'vitest';
import type { PokemonMetadata } from '../../db/schema.js';
import type { PokemonInstance } from '../saveParser/parsers/common.js';
import type { PokemonMoveset, TMHM } from './compatibility.js';
import { getCompatiblePokemonForTMHM, identifyStrategicGapsForTMHM } from './compatibility.js';

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

describe('getCompatiblePokemonForTMHM', () => {
  const metadataMap = new Map<number, PokemonMetadata>();
  metadataMap.set(1, { id: 1, n: 'Bulbasaur', cr: 45, baby: false, eto: [], efrm: [], det: [], tm: [10, 20] });
  metadataMap.set(4, { id: 4, n: 'Charmander', cr: 45, baby: false, eto: [], efrm: [], det: [], tm: [20, 30] });

  it('should return pokemon that already know the move', () => {
    const list: PokemonInstance[] = [
      { speciesId: 1, level: 5, isShiny: false, moves: [10, 50, 60], storageLocation: 'party', hash: '1' },
      { speciesId: 4, level: 5, isShiny: false, moves: [40, 50, 60], storageLocation: 'party', hash: '2' },
    ];
    const result = getCompatiblePokemonForTMHM(10, list, metadataMap);
    expect(result).toHaveLength(1);
    expect(result[0]?.speciesId).toBe(1);
  });

  it('should return pokemon that can learn the move via TM', () => {
    const list: PokemonInstance[] = [
      { speciesId: 1, level: 5, isShiny: false, moves: [50, 60], storageLocation: 'party', hash: '1' },
      { speciesId: 4, level: 5, isShiny: false, moves: [50, 60], storageLocation: 'party', hash: '2' },
    ];
    const result = getCompatiblePokemonForTMHM(20, list, metadataMap);
    expect(result).toHaveLength(2);
  });

  it('should filter out pokemon that cannot learn the move and do not know it', () => {
    const list: PokemonInstance[] = [
      { speciesId: 1, level: 5, isShiny: false, moves: [50, 60], storageLocation: 'party', hash: '1' },
      { speciesId: 4, level: 5, isShiny: false, moves: [50, 60], storageLocation: 'party', hash: '2' },
    ];
    const result = getCompatiblePokemonForTMHM(10, list, metadataMap);
    expect(result).toHaveLength(1);
    expect(result[0]?.speciesId).toBe(1);
  });
});
