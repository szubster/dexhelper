import { describe, expect, it } from 'vitest';
import { POKEMON_TYPE } from '../../db/schema';
import { getTypeMultiplier } from './typeEffectiveness';

describe('getTypeMultiplier', () => {
  it('should return 1 for a matchup with no defined modifiers', () => {
    // Normal vs Normal is 1x
    expect(getTypeMultiplier(POKEMON_TYPE.NORMAL, [POKEMON_TYPE.NORMAL])).toBe(1);
  });

  it('should return 2 for super effective matchups', () => {
    // Water vs Fire is 2x
    expect(getTypeMultiplier(POKEMON_TYPE.WATER, [POKEMON_TYPE.FIRE])).toBe(2);
  });

  it('should return 0.5 for not very effective matchups', () => {
    // Fire vs Water is 0.5x
    expect(getTypeMultiplier(POKEMON_TYPE.FIRE, [POKEMON_TYPE.WATER])).toBe(0.5);
  });

  it('should return 0 for immune matchups', () => {
    // Normal vs Ghost is 0x
    expect(getTypeMultiplier(POKEMON_TYPE.NORMAL, [POKEMON_TYPE.GHOST])).toBe(0);
  });

  it('should handle dual types correctly (2x * 2x = 4x)', () => {
    // Water vs Rock/Ground is 4x
    expect(getTypeMultiplier(POKEMON_TYPE.WATER, [POKEMON_TYPE.ROCK, POKEMON_TYPE.GROUND])).toBe(4);
  });

  it('should handle dual types correctly (2x * 0.5x = 1x)', () => {
    // Fire vs Bug/Rock is 1x
    expect(getTypeMultiplier(POKEMON_TYPE.FIRE, [POKEMON_TYPE.BUG, POKEMON_TYPE.ROCK])).toBe(1);
  });

  it('should handle dual types correctly (0.5x * 0.5x = 0.25x)', () => {
    // Bug vs Poison/Fighting is 0.25x
    expect(getTypeMultiplier(POKEMON_TYPE.BUG, [POKEMON_TYPE.POISON, POKEMON_TYPE.FIGHTING])).toBe(0.25);
  });

  it('should handle dual types with immunity correctly (2x * 0x = 0x)', () => {
    // Ground vs Flying/Fire is 0x
    expect(getTypeMultiplier(POKEMON_TYPE.GROUND, [POKEMON_TYPE.FLYING, POKEMON_TYPE.FIRE])).toBe(0);
  });

  it('should return 1 for an empty defender types array', () => {
    expect(getTypeMultiplier(POKEMON_TYPE.NORMAL, [])).toBe(1);
  });
});
