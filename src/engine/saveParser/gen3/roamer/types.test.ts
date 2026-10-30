import { describe, expect, it } from 'vitest';
import { ROAMER_IV_GLITCH_STATE } from './types';

describe('RoamerIVGlitchState', () => {
  it('should have the correct states', () => {
    expect(ROAMER_IV_GLITCH_STATE.NONE).toBe('NONE');
    expect(ROAMER_IV_GLITCH_STATE.GLITCHED).toBe('GLITCHED');
  });
});
