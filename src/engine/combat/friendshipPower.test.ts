import { describe, expect, test } from 'vitest';
import { calculateFrustrationBasePower, calculateReturnBasePower } from './friendshipPower';

describe('Friendship Move Power Calculations', () => {
  describe('calculateReturnBasePower', () => {
    test('calculates correct base power for max friendship', () => {
      expect(calculateReturnBasePower(255)).toBe(102);
    });

    test('calculates correct base power for 0 friendship', () => {
      expect(calculateReturnBasePower(0)).toBe(0);
    });

    test('calculates correct base power for intermediate friendship', () => {
      expect(calculateReturnBasePower(100)).toBe(40);
    });

    test('handles rounding correctly', () => {
      // 123 / 2.5 = 49.2 -> floor to 49
      expect(calculateReturnBasePower(123)).toBe(49);
      // 124 / 2.5 = 49.6 -> floor to 49
      expect(calculateReturnBasePower(124)).toBe(49);
    });
  });

  describe('calculateFrustrationBasePower', () => {
    test('calculates correct base power for max friendship', () => {
      expect(calculateFrustrationBasePower(255)).toBe(0);
    });

    test('calculates correct base power for 0 friendship', () => {
      expect(calculateFrustrationBasePower(0)).toBe(102);
    });

    test('calculates correct base power for intermediate friendship', () => {
      expect(calculateFrustrationBasePower(100)).toBe(62);
    });

    test('handles rounding correctly', () => {
      // (255 - 123) = 132; 132 / 2.5 = 52.8 -> floor to 52
      expect(calculateFrustrationBasePower(123)).toBe(52);
      // (255 - 124) = 131; 131 / 2.5 = 52.4 -> floor to 52
      expect(calculateFrustrationBasePower(124)).toBe(52);
    });
  });
});
