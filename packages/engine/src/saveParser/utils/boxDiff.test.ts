import { describe, expect, test } from 'vitest';
import type { PokemonInstance } from '../parsers/common';
import { calculateBoxDiff } from './boxDiff';

describe('calculateBoxDiff', () => {
  const createPoke = (id: number, nickname: string, location: string, slot: number): PokemonInstance => ({
    storageLocation: location,
    slot: slot,
    speciesId: id,
    level: 5,
    nickname,
    isShiny: false,
    moves: [],
    dvs: { hp: id, atk: id, def: id, spd: id, spc: id },
    hash: `${id}-${5}-${nickname}-${id}-${id}-${id}-${id}-${id}`,
  });

  test('identifies additions', () => {
    const current: PokemonInstance[] = [];
    const target: PokemonInstance[] = [createPoke(1, 'Test', 'Box 1', 0)];

    const diff = calculateBoxDiff(current, target);
    expect(diff.additions).toHaveLength(1);
    expect(diff.additions[0]?.nickname).toBe('Test');
    expect(diff.removals).toHaveLength(0);
    expect(diff.relocations).toHaveLength(0);
  });

  test('identifies removals', () => {
    const current: PokemonInstance[] = [createPoke(1, 'Test', 'Box 1', 0)];
    const target: PokemonInstance[] = [];

    const diff = calculateBoxDiff(current, target);
    expect(diff.removals).toHaveLength(1);
    expect(diff.removals[0]?.nickname).toBe('Test');
    expect(diff.additions).toHaveLength(0);
    expect(diff.relocations).toHaveLength(0);
  });

  test('identifies relocations', () => {
    const current: PokemonInstance[] = [createPoke(1, 'Test', 'Box 1', 0)];
    const target: PokemonInstance[] = [createPoke(1, 'Test', 'Box 2', 5)];

    const diff = calculateBoxDiff(current, target);
    expect(diff.relocations).toHaveLength(1);
    expect(diff.relocations[0]).toEqual({
      pokemon: target[0],
      sourceBox: 1,
      sourceSlot: 0,
      targetBox: 2,
      targetSlot: 5,
    });
    expect(diff.additions).toHaveLength(0);
    expect(diff.removals).toHaveLength(0);
  });

  test('identifies complex diffs', () => {
    const current: PokemonInstance[] = [
      createPoke(1, 'Poke1', 'Box 1', 0), // Relocated
      createPoke(2, 'Poke2', 'Box 1', 1), // Removed
      createPoke(3, 'Poke3', 'Box 2', 0), // Unchanged
    ];
    const target: PokemonInstance[] = [
      createPoke(1, 'Poke1', 'Box 3', 2), // Relocated from Box 1
      createPoke(3, 'Poke3', 'Box 2', 0), // Unchanged
      createPoke(4, 'Poke4', 'Box 1', 1), // Added
    ];

    const diff = calculateBoxDiff(current, target);
    expect(diff.additions).toHaveLength(1);
    expect(diff.additions[0]?.nickname).toBe('Poke4');

    expect(diff.removals).toHaveLength(1);
    expect(diff.removals[0]?.nickname).toBe('Poke2');

    expect(diff.relocations).toHaveLength(1);
    expect(diff.relocations[0]?.pokemon.nickname).toBe('Poke1');
    expect(diff.relocations[0]?.sourceBox).toBe(1);
    expect(diff.relocations[0]?.targetBox).toBe(3);
  });

  test('disambiguates duplicates using hash', () => {
    // Two Pokémon with identical species and level, but different hashes
    const p1 = createPoke(1, 'Twin', 'Box 1', 0);
    p1.hash = 'hash1';

    const p2 = createPoke(1, 'Twin', 'Box 1', 1);
    p2.hash = 'hash2';

    const current: PokemonInstance[] = [p1, p2];

    // Target moves p1 to Box 2 and removes p2, adds p3 (also a duplicate but new hash)
    const p1Target = { ...p1, storageLocation: 'Box 2', slot: 5 };
    const p3 = createPoke(1, 'Twin', 'Box 1', 1);
    p3.hash = 'hash3';

    const target: PokemonInstance[] = [p1Target, p3];

    const diff = calculateBoxDiff(current, target);

    expect(diff.removals).toHaveLength(1);
    expect(diff.removals[0]?.hash).toBe('hash2');

    expect(diff.additions).toHaveLength(1);
    expect(diff.additions[0]?.hash).toBe('hash3');

    expect(diff.relocations).toHaveLength(1);
    expect(diff.relocations[0]?.pokemon.hash).toBe('hash1');
    expect(diff.relocations[0]?.sourceBox).toBe(1);
    expect(diff.relocations[0]?.targetBox).toBe(2);
  });

  test('handles storage locations that do not match expected Box N regex', () => {
    const current: PokemonInstance[] = [createPoke(1, 'Test', 'Party', 0)];
    const target: PokemonInstance[] = [createPoke(1, 'Test', 'Daycare', 1)];

    const diff = calculateBoxDiff(current, target);
    expect(diff.relocations).toHaveLength(1);
    expect(diff.relocations[0]).toEqual({
      pokemon: target[0],
      sourceBox: -1,
      sourceSlot: 0,
      targetBox: -1,
      targetSlot: 1,
    });
  });
});
