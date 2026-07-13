import { describe, expect, it } from 'vitest';
import { checkPhoneCall, chooseRandomCaller } from './predictor';

describe('Gen 2 Pokegear Predictor Engine Logic', () => {
  describe('checkPhoneCall', () => {
    it('should return false if there is a delay remaining', () => {
      const timerState = { delayMinsRemaining: 10, timeCyclesSinceLastCall: 0 };
      expect(checkPhoneCall(timerState, 0)).toBe(false);
      expect(checkPhoneCall(timerState, 127)).toBe(false);
      expect(checkPhoneCall(timerState, 255)).toBe(false);
    });

    it('should evaluate 50% probability properly when no delay remains', () => {
      const timerState = { delayMinsRemaining: 0, timeCyclesSinceLastCall: 5 };

      // masked < 64 returns true, masked >= 64 returns false.

      // random byte: 0 -> masked: 0 (true)
      expect(checkPhoneCall(timerState, 0)).toBe(true);
      // random byte: 63 -> masked: 63 (true)
      expect(checkPhoneCall(timerState, 63)).toBe(true);

      // random byte: 64 -> masked: 64 (false)
      expect(checkPhoneCall(timerState, 64)).toBe(false);
      // random byte: 127 -> masked: 127 (false)
      expect(checkPhoneCall(timerState, 127)).toBe(false);

      // Above 127, the mask strips the highest bit:
      // random byte: 128 (10000000) -> masked: 0 (true)
      expect(checkPhoneCall(timerState, 128)).toBe(true);
      // random byte: 191 (10111111) -> masked: 63 (true)
      expect(checkPhoneCall(timerState, 191)).toBe(true);
      // random byte: 192 (11000000) -> masked: 64 (false)
      expect(checkPhoneCall(timerState, 192)).toBe(false);
      // random byte: 255 (11111111) -> masked: 127 (false)
      expect(checkPhoneCall(timerState, 255)).toBe(false);
    });
  });

  describe('chooseRandomCaller', () => {
    it('should return null if there are no available callers', () => {
      expect(chooseRandomCaller([], 123)).toBeNull();
    });

    it('should uniformly sample a caller based on SimpleDivide (modulo)', () => {
      const callers = [
        { id: 1, name: 'Mom' },
        { id: 2, name: 'Prof. Elm' },
        { id: 3, name: 'Youngster Joey' },
      ];

      // random byte % 3
      // 0 % 3 = 0 -> Mom
      expect(chooseRandomCaller(callers, 0)).toEqual(callers[0]);
      // 1 % 3 = 1 -> Prof. Elm
      expect(chooseRandomCaller(callers, 1)).toEqual(callers[1]);
      // 2 % 3 = 2 -> Youngster Joey
      expect(chooseRandomCaller(callers, 2)).toEqual(callers[2]);

      // 3 % 3 = 0 -> Mom
      expect(chooseRandomCaller(callers, 3)).toEqual(callers[0]);

      // 255 % 3 = 0 -> Mom
      expect(chooseRandomCaller(callers, 255)).toEqual(callers[0]);
    });
  });
});
