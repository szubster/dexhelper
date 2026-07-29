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

  it('handles empty state / no diffs', () => {
    const diff: BoxDiffResult = {
      additions: [],
      removals: [],
      relocations: [],
    };
    const plan = calculateMovePlan(diff);
    expect(plan).toEqual([]);
  });

  it('handles simple additions and removals', () => {
    const diff: BoxDiffResult = {
      additions: [createMockPokemon('A', 1, 1)],
      removals: [createMockPokemon('B', 1, 2)],
      relocations: [],
    };
    const plan = calculateMovePlan(diff);
    // Removals should be processed first as WITHDRAWs
    expect(plan).toEqual([
      { type: 'WITHDRAW', sourceBox: 1, sourceSlot: 2, targetBox: -1, targetSlot: -1 },
      { type: 'DEPOSIT', sourceBox: -1, sourceSlot: -1, targetBox: 1, targetSlot: 1 },
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

  it('handles overlapping/disjoint cycles', () => {
    const diff: BoxDiffResult = {
      additions: [],
      removals: [],
      relocations: [
        // Cycle 1: 1:1 -> 1:2 -> 1:1 (SWAP)
        { pokemon: createMockPokemon('A', 1, 1), sourceBox: 1, sourceSlot: 1, targetBox: 1, targetSlot: 2 },
        { pokemon: createMockPokemon('B', 1, 2), sourceBox: 1, sourceSlot: 2, targetBox: 1, targetSlot: 1 },
        // Cycle 2: 2:1 -> 2:2 -> 2:3 -> 2:1
        { pokemon: createMockPokemon('C', 2, 1), sourceBox: 2, sourceSlot: 1, targetBox: 2, targetSlot: 2 },
        { pokemon: createMockPokemon('D', 2, 2), sourceBox: 2, sourceSlot: 2, targetBox: 2, targetSlot: 3 },
        { pokemon: createMockPokemon('E', 2, 3), sourceBox: 2, sourceSlot: 3, targetBox: 2, targetSlot: 1 },
      ],
    };

    const plan = calculateMovePlan(diff);
    expect(plan).toEqual(
      expect.arrayContaining([
        { type: 'SWAP', sourceBox: 1, sourceSlot: 1, targetBox: 1, targetSlot: 2 },
        { type: 'MOVE', sourceBox: 2, sourceSlot: 1, targetBox: -1, targetSlot: -1 },
        { type: 'MOVE', sourceBox: 2, sourceSlot: 3, targetBox: 2, targetSlot: 1 },
        { type: 'MOVE', sourceBox: 2, sourceSlot: 2, targetBox: 2, targetSlot: 3 },
        { type: 'MOVE', sourceBox: -1, sourceSlot: -1, targetBox: 2, targetSlot: 2 },
      ]),
    );
  });

  it('handles an open-chain move (chain ending in empty slot)', () => {
    const diff: BoxDiffResult = {
      additions: [],
      removals: [],
      relocations: [
        // Chain: 1:1 -> 1:2 -> 1:3 (1:3 is empty)
        { pokemon: createMockPokemon('A', 1, 1), sourceBox: 1, sourceSlot: 1, targetBox: 1, targetSlot: 2 },
        { pokemon: createMockPokemon('B', 1, 2), sourceBox: 1, sourceSlot: 2, targetBox: 1, targetSlot: 3 },
      ],
    };

    const plan = calculateMovePlan(diff);
    expect(plan).toEqual([
      { type: 'MOVE', sourceBox: 1, sourceSlot: 2, targetBox: 1, targetSlot: 3 },
      { type: 'MOVE', sourceBox: 1, sourceSlot: 1, targetBox: 1, targetSlot: 2 },
    ]);
  });

  it('handles complex mixed operations (add, remove, move, cycle, swap)', () => {
    const diff: BoxDiffResult = {
      additions: [createMockPokemon('Add1', 3, 1)],
      removals: [createMockPokemon('Rem1', 3, 2)],
      relocations: [
        { pokemon: createMockPokemon('A', 1, 1), sourceBox: 1, sourceSlot: 1, targetBox: 1, targetSlot: 2 },
        { pokemon: createMockPokemon('B', 1, 2), sourceBox: 1, sourceSlot: 2, targetBox: 1, targetSlot: 1 },
        { pokemon: createMockPokemon('C', 2, 1), sourceBox: 2, sourceSlot: 1, targetBox: 2, targetSlot: 2 },
      ],
    };

    const plan = calculateMovePlan(diff);
    expect(plan).toEqual(
      expect.arrayContaining([
        { type: 'WITHDRAW', sourceBox: 3, sourceSlot: 2, targetBox: -1, targetSlot: -1 },
        { type: 'MOVE', sourceBox: 2, sourceSlot: 1, targetBox: 2, targetSlot: 2 },
        { type: 'SWAP', sourceBox: 1, sourceSlot: 1, targetBox: 1, targetSlot: 2 },
        { type: 'DEPOSIT', sourceBox: -1, sourceSlot: -1, targetBox: 3, targetSlot: 1 },
      ]),
    );
  });
});
