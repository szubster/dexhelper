import { describe, expect, it } from 'vitest';
import type { BaseStats } from './statAdvantage';
import { calculateStatAdvantage } from './statAdvantage';

describe('calculateStatAdvantage', () => {
  it('should return 0 when stats are equal', () => {
    const stats: BaseStats = { hp: 100, atk: 100, def: 100, spatk: 100, spdef: 100, spd: 100 };
    expect(calculateStatAdvantage(stats, stats)).toBe(0);
  });

  it('should return 4 when attacker has all advantages', () => {
    const attacker: BaseStats = { hp: 110, atk: 110, def: 100, spatk: 110, spdef: 100, spd: 110 };
    const defender: BaseStats = { hp: 100, atk: 100, def: 100, spatk: 100, spdef: 100, spd: 100 };
    expect(calculateStatAdvantage(attacker, defender)).toBe(4);
  });

  it('should return -4 when defender has all advantages', () => {
    const attacker: BaseStats = { hp: 100, atk: 100, def: 100, spatk: 100, spdef: 100, spd: 100 };
    const defender: BaseStats = { hp: 110, atk: 100, def: 110, spatk: 100, spdef: 110, spd: 110 };
    expect(calculateStatAdvantage(attacker, defender)).toBe(-4);
  });

  it('should correctly calculate mixed advantages', () => {
    const attacker: BaseStats = { hp: 110, atk: 90, def: 100, spatk: 110, spdef: 100, spd: 100 };
    const defender: BaseStats = { hp: 100, atk: 100, def: 100, spatk: 100, spdef: 110, spd: 90 };
    // HP: attacker > defender (+1)
    // ATK vs DEF: 90 vs 100 (-1)
    // SPATK vs SPDEF: 110 vs 110 (0)
    // SPD: attacker > defender (+1)
    // Advantage: 1 - 1 + 0 + 1 = 1
    expect(calculateStatAdvantage(attacker, defender)).toBe(1);
  });
});
