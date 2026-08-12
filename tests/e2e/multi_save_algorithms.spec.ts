import { expect, test } from '@playwright/test';
import type { SaveData } from '../../src/engine/saveParser';
import { compareSaves, findTradePossibilities } from '../../src/utils/saveComparison';

test.describe('Multi-Save Comparison Algorithms E2E', () => {
  const createMockSave = (ownedIds: number[]): SaveData => {
    return {
      generation: 1,
      owned: new Set(ownedIds),
      seen: new Set(),
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      gameVersion: 'red',
      badges: 0,
      trainerName: 'Ash',
      trainerId: 12345,
      currentMapId: 0,
      inventory: [],
      currentBoxCount: 0,
      hallOfFameCount: 0,
    };
  };

  test('should correctly compare saves', () => {
    const save1 = createMockSave([1, 2, 3]);
    const save2 = createMockSave([2, 3, 4]);

    const result = compareSaves(save1, save2);

    expect(result.save1Missing).toEqual([4]);
    expect(result.save2Missing).toEqual([1]);
  });

  test('should find trade possibilities across multiple saves', () => {
    const saves: Record<string, SaveData> = {
      saveA: createMockSave([1, 2, 3]),
      saveB: createMockSave([3, 4, 5]),
      saveC: createMockSave([1, 5, 6]),
    };

    const result = findTradePossibilities(saves);
    expect(result).toHaveLength(6);
  });
});
