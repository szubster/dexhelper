import { describe, expect, it } from 'vitest';
import type { InventoryBerry } from './engine';
import { isGoalPossible, recommendPokeblocks } from './engine';

describe('recommendPokeblocks', () => {
  it('returns isPossible=false and empty blends when inventory is empty', () => {
    const result = recommendPokeblocks({
      inventory: [],
      currentCondition: 0,
      currentSheen: 0,
      targetCondition: 100,
      targetCategory: 'cool',
      nature: 'hardy',
    });
    expect(result.isPossible).toBe(false);
    expect(result.blends).toEqual([]);
    expect(result.finalCondition).toBe(0);
    expect(result.finalSheen).toBe(0);
  });

  it('selects the most efficient berry to blend until target is reached', () => {
    const cheri: InventoryBerry = { id: 'cheri', count: 10, spicy: 10, dry: 0, sweet: 0, bitter: 0, sour: 0, feel: 20 };
    const tamato: InventoryBerry = {
      id: 'tamato',
      count: 10,
      spicy: 20,
      dry: 0,
      sweet: 0,
      bitter: 0,
      sour: 0,
      feel: 30,
    }; // more efficient

    const result = recommendPokeblocks({
      inventory: [cheri, tamato],
      currentCondition: 0,
      currentSheen: 0,
      targetCondition: 30, // Needs ~2 tamatos (20 * 2 = 40)
      targetCategory: 'cool',
      nature: 'hardy',
      numPlayers: 1, // Full flavor yield
    });

    expect(result.isPossible).toBe(true);
    expect(result.blends.length).toBe(2);
    expect(result.blends[0]?.berries[0]?.id).toBe('tamato');
    expect(result.finalCondition).toBeGreaterThanOrEqual(30);
  });

  it('handles maximum sheen correctly and stops early', () => {
    const cheri: InventoryBerry = {
      id: 'cheri',
      count: 10,
      spicy: 10,
      dry: 0,
      sweet: 0,
      bitter: 0,
      sour: 0,
      feel: 200,
    };

    const result = recommendPokeblocks({
      inventory: [cheri],
      currentCondition: 0,
      currentSheen: 100,
      targetCondition: 50,
      targetCategory: 'cool',
      nature: 'hardy',
      numPlayers: 1,
    });

    // 1st cheri gives 10 condition, sheen goes from 100 to 300 (capped at 255)
    // Next iteration sheen is 255, loop should break.
    expect(result.isPossible).toBe(false); // Can't reach 50
    expect(result.finalSheen).toBe(255);
    expect(result.finalCondition).toBe(10);
  });

  it('exhausts berry count and moves to next best', () => {
    const cheri: InventoryBerry = { id: 'cheri', count: 1, spicy: 10, dry: 0, sweet: 0, bitter: 0, sour: 0, feel: 20 };
    const pecha: InventoryBerry = { id: 'pecha', count: 5, spicy: 5, dry: 0, sweet: 0, bitter: 0, sour: 0, feel: 10 };

    const result = recommendPokeblocks({
      inventory: [cheri, pecha],
      currentCondition: 0,
      currentSheen: 0,
      targetCondition: 15, // Needs 1 cheri and 1 pecha
      targetCategory: 'cool',
      nature: 'hardy',
      numPlayers: 1,
    });

    expect(result.isPossible).toBe(true);
    expect(result.blends.length).toBe(2);
    expect(result.blends[0]?.berries[0]?.id).toBe('cheri');
    expect(result.blends[1]?.berries[0]?.id).toBe('pecha');
  });

  it('applies nature multipliers', () => {
    const cheri: InventoryBerry = { id: 'cheri', count: 10, spicy: 10, dry: 0, sweet: 0, bitter: 0, sour: 0, feel: 20 };

    // Adamant likes Spicy/Cool
    const resultLikes = recommendPokeblocks({
      inventory: [cheri],
      currentCondition: 0,
      currentSheen: 0,
      targetCondition: 11,
      targetCategory: 'cool',
      nature: 'adamant',
      numPlayers: 1,
    });
    // 10 spicy * 1.1 = 11. Reaches target in 1 blend.
    expect(resultLikes.blends.length).toBe(1);
    expect(resultLikes.finalCondition).toBe(11);

    // Modest dislikes Spicy/Cool
    const resultDislikes = recommendPokeblocks({
      inventory: [cheri],
      currentCondition: 0,
      currentSheen: 0,
      targetCondition: 10,
      targetCategory: 'cool',
      nature: 'modest',
      numPlayers: 1,
    });
    // 10 spicy * 0.9 = 9. Needs 2 blends to reach 10.
    expect(resultDislikes.blends.length).toBe(2);
    expect(resultDislikes.finalCondition).toBe(18); // 9 + 9
  });
});

describe('isGoalPossible', () => {
  it('returns false when inventory is empty', () => {
    expect.hasAssertions();
    expect(
      isGoalPossible({
        inventory: [],
        currentCondition: 0,
        currentSheen: 0,
        targetCondition: 100,
        targetCategory: 'cool',
        nature: 'hardy',
      }),
    ).toBe(false);
  });

  it('returns true when goal is reachable with given berries', () => {
    expect.hasAssertions();
    const cheri: InventoryBerry = {
      id: 'cheri',
      count: 10,
      spicy: 10,
      dry: 0,
      sweet: 0,
      bitter: 0,
      sour: 0,
      feel: 20,
    };

    expect(
      isGoalPossible({
        inventory: [cheri],
        currentCondition: 0,
        currentSheen: 0,
        targetCondition: 30, // Needs 3 cheri
        targetCategory: 'cool',
        nature: 'hardy',
        numPlayers: 1,
      }),
    ).toBe(true);
  });

  it('returns false when sheen maxes out before goal is reached', () => {
    expect.hasAssertions();
    const cheri: InventoryBerry = {
      id: 'cheri',
      count: 10,
      spicy: 10,
      dry: 0,
      sweet: 0,
      bitter: 0,
      sour: 0,
      feel: 200,
    };

    expect(
      isGoalPossible({
        inventory: [cheri],
        currentCondition: 0,
        currentSheen: 100,
        targetCondition: 50,
        targetCategory: 'cool',
        nature: 'hardy',
        numPlayers: 1,
      }),
    ).toBe(false);
  });
});
