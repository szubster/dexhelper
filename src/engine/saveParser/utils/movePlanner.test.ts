import { describe, expect, it } from 'vitest';
import type { PokemonInstance } from '../parsers/common';
import type { BoxDiffResult } from './boxDiff';
import { calculateMovePlan } from './movePlanner';

describe('movePlanner', () => {
  const createMockPokemon = (hash: string, box: number, slot: number): PokemonInstance =>
    ({
      hash,
      storageLocation: `Box ${box}`,
      slot,
      speciesName: 'Bulbasaur',
      speciesId: 1,
      level: 5,
      nickname: '',
      exp: 0,
      isShiny: false,
      moves: [],
      dvs: { hp: 0, atk: 0, def: 0, spc: 0, spe: 0 },
    }) as unknown as PokemonInstance;

  it('handles basic linear moves', () => {
    const diff: BoxDiffResult = {
      additions: [],
      removals: [],
      relocations: [
        {
          pokemon: createMockPokemon('A', 1, 2),
          sourceBox: 1,
          sourceSlot: 1,
          targetBox: 1,
          targetSlot: 2,
        },
      ],
    };

    const plan = calculateMovePlan(diff);
    expect(plan).toEqual([
      {
        type: 'MOVE',
        sourceBox: 1,
        sourceSlot: 1,
        targetBox: 1,
        targetSlot: 2,
      },
    ]);
  });

  it('handles basic SWAP (2-cycle) scenarios', () => {
    const diff: BoxDiffResult = {
      additions: [],
      removals: [],
      relocations: [
        {
          pokemon: createMockPokemon('A', 1, 2),
          sourceBox: 1,
          sourceSlot: 1,
          targetBox: 1,
          targetSlot: 2,
        },
        {
          pokemon: createMockPokemon('B', 1, 1),
          sourceBox: 1,
          sourceSlot: 2,
          targetBox: 1,
          targetSlot: 1,
        },
      ],
    };

    const plan = calculateMovePlan(diff);
    expect(plan).toEqual([
      {
        type: 'SWAP',
        sourceBox: 1,
        sourceSlot: 1,
        targetBox: 1,
        targetSlot: 2,
      },
    ]);
  });

  it('handles cycle resolutions (3+ Pokémon)', () => {
    const diff: BoxDiffResult = {
      additions: [],
      removals: [],
      relocations: [
        {
          pokemon: createMockPokemon('A', 1, 2),
          sourceBox: 1,
          sourceSlot: 1,
          targetBox: 1,
          targetSlot: 2,
        },
        {
          pokemon: createMockPokemon('B', 1, 3),
          sourceBox: 1,
          sourceSlot: 2,
          targetBox: 1,
          targetSlot: 3,
        },
        {
          pokemon: createMockPokemon('C', 1, 1),
          sourceBox: 1,
          sourceSlot: 3,
          targetBox: 1,
          targetSlot: 1,
        },
      ],
    };

    const plan = calculateMovePlan(diff);
    // Move A to Temp
    // Move C to A's spot
    // Move B to C's spot
    // Move Temp(A) to B's spot (target of A)
    expect(plan).toEqual([
      { type: 'MOVE', sourceBox: 1, sourceSlot: 1, targetBox: -1, targetSlot: -1 },
      { type: 'MOVE', sourceBox: 1, sourceSlot: 3, targetBox: 1, targetSlot: 1 },
      { type: 'MOVE', sourceBox: 1, sourceSlot: 2, targetBox: 1, targetSlot: 3 },
      { type: 'MOVE', sourceBox: -1, sourceSlot: -1, targetBox: 1, targetSlot: 2 },
    ]);
  });
});
