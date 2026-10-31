import { describe, expect, it } from 'vitest';
import { detectRoamerIVGlitch } from './glitchDetection';
import { ROAMER_IV_GLITCH_STATE } from './types';

describe('detectRoamerIVGlitch', () => {
  it.fails('should correctly identify a glitched IV spread (HP 0-31, Attack 0-7, other 0)', () => {
    const glitchedIVs = {
      hp: 15,
      attack: 3,
      defense: 0,
      speed: 0,
      specialAttack: 0,
      specialDefense: 0,
    };
    expect(detectRoamerIVGlitch(glitchedIVs)).toBe(ROAMER_IV_GLITCH_STATE.GLITCHED);
  });

  it('should correctly identify a non-glitched IV spread', () => {
    const normalIVs = {
      hp: 31,
      attack: 31,
      defense: 31,
      speed: 31,
      specialAttack: 31,
      specialDefense: 31,
    };
    expect(detectRoamerIVGlitch(normalIVs)).toBe(ROAMER_IV_GLITCH_STATE.NONE);
  });
});
