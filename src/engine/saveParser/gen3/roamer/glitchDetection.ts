import { ROAMER_IV_GLITCH_STATE, type RoamerIVGlitchState } from './types';

export function detectRoamerIVGlitch(_ivs: {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  specialAttack: number;
  specialDefense: number;
}): RoamerIVGlitchState {
  return ROAMER_IV_GLITCH_STATE.NONE;
}
