import { describe, expect, it } from 'vitest';
import {
  BUG_CONTEST_CURRENT_HP_DIVISOR,
  BUG_CONTEST_HELD_ITEM_BONUS,
  BUG_CONTEST_MAX_HP_MULTIPLIER,
  BUG_CONTEST_SHINY_IV_BONUS,
  calculateBugContestIvBonus,
  calculateGen2BugCatchingScore,
  calculateOtherStatsSum,
  type Gen2PokemonStats,
  IV_BONUS_ATTACK,
  IV_BONUS_DEFENSE,
  IV_BONUS_SPECIAL,
  IV_BONUS_SPEED,
} from './gen2Scoring';

describe('calculateBugContestIvBonus', () => {
  it('returns fixed shiny bonus when pokemon is shiny regardless of IVs', () => {
    const zeroIvs = { attack: 0, defense: 0, special: 0, speed: 0 };
    expect(calculateBugContestIvBonus(zeroIvs, true)).toBe(BUG_CONTEST_SHINY_IV_BONUS);
    expect(calculateBugContestIvBonus(zeroIvs, true)).toBe(29);
  });

  it('returns 0 when all IVs fail the odd quotient check', () => {
    // 0 / 2 = 0 (even), 1 / 2 = 0 (even), 4 / 2 = 2 (even), 5 / 2 = 2 (even)
    const ivs = { attack: 0, defense: 4, special: 1, speed: 5 };
    expect(calculateBugContestIvBonus(ivs, false)).toBe(0);
  });

  it('adds defense bonus when defense IV quotient is odd', () => {
    // 2 / 2 = 1 (odd)
    const ivs = { attack: 0, defense: 2, special: 0, speed: 0 };
    expect(calculateBugContestIvBonus(ivs, false)).toBe(IV_BONUS_DEFENSE);
    expect(calculateBugContestIvBonus(ivs, false)).toBe(16);
  });

  it('adds attack bonus when attack IV quotient is odd', () => {
    // 3 / 2 = 1 (odd)
    const ivs = { attack: 3, defense: 0, special: 0, speed: 0 };
    expect(calculateBugContestIvBonus(ivs, false)).toBe(IV_BONUS_ATTACK);
    expect(calculateBugContestIvBonus(ivs, false)).toBe(8);
  });

  it('adds special bonus when special IV quotient is odd', () => {
    // 6 / 2 = 3 (odd)
    const ivs = { attack: 0, defense: 0, special: 6, speed: 0 };
    expect(calculateBugContestIvBonus(ivs, false)).toBe(IV_BONUS_SPECIAL);
    expect(calculateBugContestIvBonus(ivs, false)).toBe(4);
  });

  it('adds speed bonus when speed IV quotient is odd', () => {
    // 7 / 2 = 3 (odd)
    const ivs = { attack: 0, defense: 0, special: 0, speed: 7 };
    expect(calculateBugContestIvBonus(ivs, false)).toBe(IV_BONUS_SPEED);
    expect(calculateBugContestIvBonus(ivs, false)).toBe(1);
  });

  it('accumulates all bonuses when all IV quotients are odd', () => {
    const ivs = { attack: 2, defense: 2, special: 2, speed: 2 };
    expect(calculateBugContestIvBonus(ivs, false)).toBe(
      IV_BONUS_DEFENSE + IV_BONUS_ATTACK + IV_BONUS_SPECIAL + IV_BONUS_SPEED,
    );
    expect(calculateBugContestIvBonus(ivs, false)).toBe(29);
  });
});

describe('calculateOtherStatsSum', () => {
  it('sums non-HP stats correctly', () => {
    const stats: Gen2PokemonStats = {
      maxHp: 100,
      currentHp: 100,
      attack: 25,
      defense: 30,
      specialAttack: 35,
      specialDefense: 40,
      speed: 45,
      ivs: { attack: 0, defense: 0, special: 0, speed: 0 },
      heldItem: false,
    };

    expect(calculateOtherStatsSum(stats)).toBe(25 + 30 + 35 + 40 + 45);
    expect(calculateOtherStatsSum(stats)).toBe(175);
  });
});

describe('calculateGen2BugCatchingScore', () => {
  it('exports expected domain constants', () => {
    expect(BUG_CONTEST_MAX_HP_MULTIPLIER).toBe(4);
    expect(BUG_CONTEST_CURRENT_HP_DIVISOR).toBe(8);
    expect(BUG_CONTEST_HELD_ITEM_BONUS).toBe(1);
    expect(BUG_CONTEST_SHINY_IV_BONUS).toBe(29);
    expect(IV_BONUS_DEFENSE).toBe(16);
    expect(IV_BONUS_ATTACK).toBe(8);
    expect(IV_BONUS_SPECIAL).toBe(4);
    expect(IV_BONUS_SPEED).toBe(1);
  });

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

  it('calculates score for maximum stats scenario (perfect shiny maxed)', () => {
    const stats: Gen2PokemonStats = {
      maxHp: 255, // Theoretical max stat
      currentHp: 255,
      attack: 255,
      defense: 255,
      specialAttack: 255,
      specialDefense: 255,
      speed: 255,
      ivs: {
        attack: 15, // max IV
        defense: 15,
        special: 15,
        speed: 15,
      },
      heldItem: true,
      isShiny: true,
    };

    // maxHp (255 * 4) = 1020
    // stats (255 * 5) = 1275
    // IVs (shiny) = 29
    // currentHp (Math.floor(255 / 8)) = 31
    // item = 1
    // Total = 1020 + 1275 + 29 + 31 + 1 = 2356

    expect(calculateGen2BugCatchingScore(stats)).toBe(2356);
  });

  it('calculates score for minimum stats scenario', () => {
    const stats: Gen2PokemonStats = {
      maxHp: 1, // Minimum HP
      currentHp: 1,
      attack: 1,
      defense: 1,
      specialAttack: 1,
      specialDefense: 1,
      speed: 1,
      ivs: {
        attack: 0,
        defense: 0,
        special: 0,
        speed: 0,
      },
      heldItem: false,
      isShiny: false,
    };

    // maxHp (1 * 4) = 4
    // stats (1 * 5) = 5
    // IVs = 0
    // currentHp (Math.floor(1 / 8)) = 0
    // item = 0
    // Total = 4 + 5 + 0 + 0 + 0 = 9

    expect(calculateGen2BugCatchingScore(stats)).toBe(9);
  });
});
