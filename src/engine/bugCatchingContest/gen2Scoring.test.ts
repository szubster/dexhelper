import { describe, expect, it } from 'vitest';
import { calculateGen2BugCatchingScore, type Gen2PokemonStats } from './gen2Scoring';

describe('calculateGen2BugCatchingScore', () => {
  it('calculates score correctly for a basic pokemon without held item', () => {
    const stats: Gen2PokemonStats = {
      maxHp: 50,
      currentHp: 50,
      attack: 30,
      defense: 30,
      specialAttack: 30,
      specialDefense: 30,
      speed: 30,
      ivs: {
        attack: 0,
        defense: 0,
        special: 0,
        speed: 0,
      },
      heldItem: false,
      isShiny: false,
    };

    // maxHp (50 * 4) = 200
    // stats (30 * 5) = 150
    // IVs (all 0) = 0
    // currentHp (floor 50 / 8) = 6
    // item = 0
    // Total = 356

    expect(calculateGen2BugCatchingScore(stats)).toBe(356);
  });

  it('calculates score correctly for a shiny pokemon with item', () => {
    const stats: Gen2PokemonStats = {
      maxHp: 50,
      currentHp: 20,
      attack: 30,
      defense: 30,
      specialAttack: 30,
      specialDefense: 30,
      speed: 30,
      ivs: {
        attack: 15,
        defense: 10,
        special: 10,
        speed: 10,
      },
      heldItem: true,
      isShiny: true,
    };

    // maxHp (50 * 4) = 200
    // stats (30 * 5) = 150
    // IVs (shiny) = 29
    // currentHp (floor 20 / 8) = 2
    // item = 1
    // Total = 382

    expect(calculateGen2BugCatchingScore(stats)).toBe(382);
  });

  it('calculates IV bonus correctly', () => {
    // Math.floor(IV / 2) % 2 !== 0
    // 2 / 2 = 1 (odd) -> valid
    // 3 / 2 = 1.5 -> 1 (odd) -> valid
    // 4 / 2 = 2 (even) -> invalid

    const stats: Gen2PokemonStats = {
      maxHp: 10,
      currentHp: 8,
      attack: 10,
      defense: 10,
      specialAttack: 10,
      specialDefense: 10,
      speed: 10,
      ivs: {
        defense: 2, // 16
        attack: 3, // 8
        special: 4, // 0
        speed: 2, // 1
      },
      heldItem: false,
    };

    // maxHp (10 * 4) = 40
    // stats (10 * 5) = 50
    // IVs = 16 + 8 + 1 = 25
    // currentHp (floor 8 / 8) = 1
    // item = 0
    // Total = 116

    expect(calculateGen2BugCatchingScore(stats)).toBe(116);
  });
});
