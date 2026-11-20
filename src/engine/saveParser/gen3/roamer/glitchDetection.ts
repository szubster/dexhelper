import { ROAMER_IV_GLITCH_STATE, type RoamerIVGlitchState } from './types';

export function detectRoamerIVGlitch(ivs: {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  specialAttack: number;
  specialDefense: number;
}): RoamerIVGlitchState {
  if (
    ivs.hp >= 0 &&
    ivs.hp <= 31 &&
    ivs.attack >= 0 &&
    ivs.attack <= 7 &&
    ivs.defense === 0 &&
    ivs.speed === 0 &&
    ivs.specialAttack === 0 &&
    ivs.specialDefense === 0
  ) {
    return ROAMER_IV_GLITCH_STATE.GLITCHED;
  }
  return ROAMER_IV_GLITCH_STATE.NONE;
}
