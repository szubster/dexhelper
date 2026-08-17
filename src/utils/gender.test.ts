import { describe, expect, it } from 'vitest';
import { calculateGen2Gender, calculateGen3Gender } from './gender.ts';

describe('calculateGen2Gender', () => {
  it('should return genderless for gender rate -1', () => {
    expect(calculateGen2Gender(15, -1)).toBe('genderless');
    expect(calculateGen2Gender(0, -1)).toBe('genderless');
  });

  it('should return male for gender rate 0 (male only)', () => {
    expect(calculateGen2Gender(0, 0)).toBe('male');
    expect(calculateGen2Gender(15, 0)).toBe('male');
  });

  it('should return female for gender rate 8 (female only)', () => {
    expect(calculateGen2Gender(0, 8)).toBe('female');
    expect(calculateGen2Gender(15, 8)).toBe('female');
  });

  it('should correctly calculate gender for 7:1 ratio (gender rate 1)', () => {
    expect(calculateGen2Gender(0, 1)).toBe('female');
    expect(calculateGen2Gender(1, 1)).toBe('female');
    expect(calculateGen2Gender(2, 1)).toBe('male');
    expect(calculateGen2Gender(15, 1)).toBe('male');
  });

  it('should correctly calculate gender for 3:1 ratio (gender rate 2)', () => {
    expect(calculateGen2Gender(0, 2)).toBe('female');
    expect(calculateGen2Gender(3, 2)).toBe('female');
    expect(calculateGen2Gender(4, 2)).toBe('male');
    expect(calculateGen2Gender(15, 2)).toBe('male');
  });

  it('should correctly calculate gender for 1:1 ratio (gender rate 4)', () => {
    expect(calculateGen2Gender(0, 4)).toBe('female');
    expect(calculateGen2Gender(7, 4)).toBe('female');
    expect(calculateGen2Gender(8, 4)).toBe('male');
    expect(calculateGen2Gender(15, 4)).toBe('male');
  });

  it('should correctly calculate gender for 1:3 ratio (gender rate 6)', () => {
    expect(calculateGen2Gender(0, 6)).toBe('female');
    expect(calculateGen2Gender(11, 6)).toBe('female');
    expect(calculateGen2Gender(12, 6)).toBe('male');
    expect(calculateGen2Gender(15, 6)).toBe('male');
  });
});

describe('calculateGen3Gender', () => {
  it('should return genderless for gender rate -1', () => {
    expect(calculateGen3Gender(255, -1)).toBe('genderless');
    expect(calculateGen3Gender(0, -1)).toBe('genderless');
  });

  it('should return male for gender rate 0 (male only)', () => {
    expect(calculateGen3Gender(0, 0)).toBe('male');
    expect(calculateGen3Gender(255, 0)).toBe('male');
  });

  it('should return female for gender rate 8 (female only)', () => {
    expect(calculateGen3Gender(0, 8)).toBe('female');
    expect(calculateGen3Gender(255, 8)).toBe('female');
  });

  it('should correctly calculate gender for 7:1 ratio (gender rate 1)', () => {
    expect(calculateGen3Gender(0, 1)).toBe('female');
    expect(calculateGen3Gender(31, 1)).toBe('female');
    expect(calculateGen3Gender(32, 1)).toBe('male');
    expect(calculateGen3Gender(255, 1)).toBe('male');
  });

  it('should correctly calculate gender for 3:1 ratio (gender rate 2)', () => {
    expect(calculateGen3Gender(0, 2)).toBe('female');
    expect(calculateGen3Gender(63, 2)).toBe('female');
    expect(calculateGen3Gender(64, 2)).toBe('male');
    expect(calculateGen3Gender(255, 2)).toBe('male');
  });

  it('should correctly calculate gender for 1:1 ratio (gender rate 4)', () => {
    expect(calculateGen3Gender(0, 4)).toBe('female');
    expect(calculateGen3Gender(127, 4)).toBe('female');
    expect(calculateGen3Gender(128, 4)).toBe('male');
    expect(calculateGen3Gender(255, 4)).toBe('male');
  });

  it('should correctly calculate gender for 1:3 ratio (gender rate 6)', () => {
    expect(calculateGen3Gender(0, 6)).toBe('female');
    expect(calculateGen3Gender(191, 6)).toBe('female');
    expect(calculateGen3Gender(192, 6)).toBe('male');
    expect(calculateGen3Gender(255, 6)).toBe('male');
  });
});
