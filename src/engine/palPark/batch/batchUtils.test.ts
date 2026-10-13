import { describe, expect, it } from 'vitest';
import type { PokemonInstance } from '../../saveParser/parsers/common';
import { chunkPalParkBatches } from './batchUtils';

describe('chunkPalParkBatches', () => {
  const createMockPokemon = (storageLocation: string, slot?: number): PokemonInstance => {
    return {
      storageLocation,
      slot,
      speciesId: 1,
      level: 1,
      isShiny: false,
      moves: [],
      hash: 'mock-hash',
    } as PokemonInstance;
  };

  it('batches pokemon into groups of 6', () => {
    const pokes = Array.from({ length: 14 }).map((_, i) => createMockPokemon(`Box 1`, i + 1));
    const batches = chunkPalParkBatches(pokes);

    expect(batches.length).toBe(3);
    expect(batches[0]?.length).toBe(6);
    expect(batches[1]?.length).toBe(6);
    expect(batches[2]?.length).toBe(2);
  });

  it('extracts box and slot correctly', () => {
    const pokes = [
      createMockPokemon('Box 1', 1),
      createMockPokemon('Box 14', 30),
      createMockPokemon('Party', 1),
      createMockPokemon('Unknown Box Format', undefined),
    ];

    const batches = chunkPalParkBatches(pokes);
    const batch = batches[0];

    expect(batch?.[0]?.location).toEqual({ box: 1, slot: 1 });
    expect(batch?.[1]?.location).toEqual({ box: 14, slot: 30 });
    expect(batch?.[2]?.location).toEqual({ box: 0, slot: 1 });
    expect(batch?.[3]?.location).toEqual({ box: 0, slot: 0 });
  });

  it('handles empty arrays', () => {
    expect(chunkPalParkBatches([])).toEqual([]);
  });
});
