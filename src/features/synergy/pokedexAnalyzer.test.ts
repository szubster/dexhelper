import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../engine/saveParser';
import { analyzePokedexProgress } from './pokedexAnalyzer';

describe('analyzePokedexProgress', () => {
  it('correctly calculates missing vs owned entries', () => {
    const saveA = { gameVersion: 'red', owned: new Set([1, 2, 3]) } as SaveData;
    const saveB = { gameVersion: 'blue', owned: new Set([3, 4, 5]) } as SaveData;

    const result = analyzePokedexProgress([saveA, saveB]);

    expect(result[1]).toEqual({ ownedBy: ['red'], missingFrom: ['blue'], seenBy: [] });
    expect(result[2]).toEqual({ ownedBy: ['red'], missingFrom: ['blue'], seenBy: [] });
    expect(result[3]).toEqual({ ownedBy: ['red', 'blue'], missingFrom: [], seenBy: [] });
    expect(result[4]).toEqual({ ownedBy: ['blue'], missingFrom: ['red'], seenBy: [] });
    expect(result[5]).toEqual({ ownedBy: ['blue'], missingFrom: ['red'], seenBy: [] });
  });

  it('handles seen but not owned', () => {
    const saveA = { gameVersion: 'red', owned: new Set([1]), seen: new Set([1, 2]) } as SaveData;
    const saveB = { gameVersion: 'blue', owned: new Set([2]), seen: new Set([2, 3]) } as SaveData;

    const result = analyzePokedexProgress([saveA, saveB]);

    expect(result[1]).toEqual({ ownedBy: ['red'], missingFrom: ['blue'], seenBy: ['red'] });
    expect(result[2]).toEqual({ ownedBy: ['blue'], missingFrom: ['red'], seenBy: ['red', 'blue'] });
    expect(result[3]).toEqual({ ownedBy: [], missingFrom: ['red', 'blue'], seenBy: ['blue'] });
  });

  it('handles multiple saves', () => {
    const saveA = { gameVersion: 'red', owned: new Set([1]) } as SaveData;
    const saveB = { gameVersion: 'blue', owned: new Set([1]) } as SaveData;
    const saveC = { gameVersion: 'yellow', owned: new Set([2]) } as SaveData;

    const result = analyzePokedexProgress([saveA, saveB, saveC]);
    expect(result[1]).toEqual({ ownedBy: ['red', 'blue'], missingFrom: ['yellow'], seenBy: [] });
    expect(result[2]).toEqual({ ownedBy: ['yellow'], missingFrom: ['red', 'blue'], seenBy: [] });
  });
});
