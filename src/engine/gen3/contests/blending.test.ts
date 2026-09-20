import { describe, expect, it } from 'vitest';
import { calculatePokeblockProfile } from './blending';

describe('calculatePokeblockProfile', () => {
  it('calculates profile correctly with 1 player (NPC blending)', () => {
    const berries = [
      { spicy: 20, dry: 0, sweet: 0, bitter: 0, sour: 0, feel: 20 },
      { spicy: 0, dry: 10, sweet: 0, bitter: 0, sour: 0, feel: 30 },
    ];
    // Spicy = max(0, 20 - 0) / 1 = 20
    // Dry = max(0, 10 - 20) / 1 = 0
    const profile = calculatePokeblockProfile(berries, 1);
    expect(profile.spicy).toBe(20);
    expect(profile.dry).toBe(0);
    expect(profile.feel).toBe(25); // average of 20 and 30 is 25, min is 20, max(25, 20) = 25
  });

  it('calculates profile correctly with 3 players', () => {
    const berries = [
      { spicy: 30, dry: 0, sweet: 0, bitter: 0, sour: 10, feel: 25 },
      { spicy: 0, dry: 20, sweet: 0, bitter: 0, sour: 0, feel: 25 },
    ];
    // divisor = max(1, 3 - 1) = 2
    // Spicy = max(0, 30 - 10) / 2 = 10
    // Dry = max(0, 20 - 30) / 2 = 0
    const profile = calculatePokeblockProfile(berries, 3);
    expect(profile.spicy).toBe(10);
    expect(profile.dry).toBe(0);
    expect(profile.feel).toBe(25);
  });
});
