import { describe, expect, it } from 'vitest';
import { getSavingsProgress } from './gen2Savings';

describe('getSavingsProgress', () => {
  it('should return the first threshold for 0 money', () => {
    const result = getSavingsProgress(0);
    expect(result).toEqual({
      nextThresholdAmount: 10000,
      nextDecoration: 'Charmander Doll',
      amountRemaining: 10000,
      allThresholdsReached: false,
    });
  });

  it('should return the first threshold for money below 10000', () => {
    const result = getSavingsProgress(5000);
    expect(result).toEqual({
      nextThresholdAmount: 10000,
      nextDecoration: 'Charmander Doll',
      amountRemaining: 5000,
      allThresholdsReached: false,
    });
  });

  it('should return the second threshold for money between 10000 and 29999', () => {
    const result = getSavingsProgress(15000);
    expect(result).toEqual({
      nextThresholdAmount: 30000,
      nextDecoration: 'Clefairy Doll',
      amountRemaining: 15000,
      allThresholdsReached: false,
    });
  });

  it('should return the third threshold for money between 30000 and 49999', () => {
    const result = getSavingsProgress(30000);
    expect(result).toEqual({
      nextThresholdAmount: 50000,
      nextDecoration: 'Pikachu Doll',
      amountRemaining: 20000,
      allThresholdsReached: false,
    });
  });

  it('should return the fourth threshold for money between 50000 and 99999', () => {
    const result = getSavingsProgress(99999);
    expect(result).toEqual({
      nextThresholdAmount: 100000,
      nextDecoration: 'Big Snorlax',
      amountRemaining: 1,
      allThresholdsReached: false,
    });
  });

  it('should return all thresholds reached for 100000 money', () => {
    const result = getSavingsProgress(100000);
    expect(result).toEqual({
      nextThresholdAmount: null,
      nextDecoration: null,
      amountRemaining: 0,
      allThresholdsReached: true,
    });
  });

  it('should return all thresholds reached for money > 100000', () => {
    const result = getSavingsProgress(150000);
    expect(result).toEqual({
      nextThresholdAmount: null,
      nextDecoration: null,
      amountRemaining: 0,
      allThresholdsReached: true,
    });
  });
});
