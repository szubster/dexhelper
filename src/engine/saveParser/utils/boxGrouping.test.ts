import { describe, expect, it } from 'vitest';
import type { PokemonInstance } from '../parsers/common';
import { groupBoxPokemonBySpecies } from './boxGrouping';

describe('boxGrouping', () => {
  it('groups Pokemon by speciesId and filters non-box Pokemon', () => {
    const mockPokemon: PokemonInstance[] = [
      {
        speciesId: 1,
        level: 5,
        isShiny: false,
        hash: '',
        moves: [],
        storageLocation: 'Box 1',
        dvs: { hp: 15, atk: 15, def: 15, spd: 15, spc: 15 },
      },
      {
        speciesId: 1,
        level: 10,
        isShiny: true,
        hash: '',
        moves: [],
        storageLocation: 'Box 2',
        dvs: { hp: 10, atk: 10, def: 10, spd: 10, spc: 10 },
      },
      {
        speciesId: 2,
        level: 20,
        isShiny: false,
        hash: '',
        moves: [],
        storageLocation: 'Box 3',
        dvs: { hp: 0, atk: 0, def: 0, spd: 0, spc: 0 },
      },
      {
        speciesId: 1,
        level: 100,
        isShiny: false,
        hash: '',
        moves: [],
        storageLocation: 'Party',
        dvs: { hp: 15, atk: 15, def: 15, spd: 15, spc: 15 },
      },
      {
        speciesId: 3,
        level: 50,
        isShiny: false,
        hash: '',
        moves: [],
        storageLocation: 'Daycare',
        dvs: { hp: 8, atk: 8, def: 8, spd: 8, spc: 8 },
      },
    ];

    const result = groupBoxPokemonBySpecies(mockPokemon);

    expect(Object.keys(result)).toEqual(['1', '2']);
    expect(result[1]?.length).toBe(2);
    expect(result[2]?.length).toBe(1);
    expect(result[3]).toBeUndefined();

    // Verify properties like DVs and shininess are retained
    expect(result[1]?.[0]?.storageLocation).toBe('Box 1');
    expect(result[1]?.[0]?.dvs?.hp).toBe(15);
    expect(result[1]?.[1]?.isShiny).toBe(true);
    expect(result[2]?.[0]?.storageLocation).toBe('Box 3');
  });

  it('handles empty arrays', () => {
    const result = groupBoxPokemonBySpecies([]);
    expect(Object.keys(result).length).toBe(0);
  });
});
