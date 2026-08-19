import { describe, expect, it } from 'vitest';
import type { SaveData } from '@dexhelper/engine/saveParser';
import { compareSaves, findTradePossibilities } from './saveComparison';

describe('saveComparison', () => {
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

  describe('compareSaves', () => {
    it('correctly identifies missing species for both saves', () => {
      const save1 = createMockSave([1, 2, 3]);
      const save2 = createMockSave([2, 3, 4]);

      const result = compareSaves(save1, save2);

      expect(result.save1Missing).toEqual([4]);
      expect(result.save2Missing).toEqual([1]);
    });

    it('returns empty arrays when saves are identical', () => {
      const save1 = createMockSave([1, 2, 3]);
      const save2 = createMockSave([1, 2, 3]);

      const result = compareSaves(save1, save2);

      expect(result.save1Missing).toEqual([]);
      expect(result.save2Missing).toEqual([]);
    });

    it('handles disjoint saves', () => {
      const save1 = createMockSave([1, 2]);
      const save2 = createMockSave([3, 4]);

      const result = compareSaves(save1, save2);

      expect(result.save1Missing).toEqual([3, 4]);
      expect(result.save2Missing).toEqual([1, 2]);
    });

    it('handles empty saves', () => {
      const save1 = createMockSave([]);
      const save2 = createMockSave([]);

      const result = compareSaves(save1, save2);

      expect(result.save1Missing).toEqual([]);
      expect(result.save2Missing).toEqual([]);
    });

    it('handles one empty save', () => {
      const save1 = createMockSave([1, 2]);
      const save2 = createMockSave([]);

      const result = compareSaves(save1, save2);

      expect(result.save1Missing).toEqual([]);
      expect(result.save2Missing).toEqual([1, 2]);
    });
  });

  describe('findTradePossibilities', () => {
    it('correctly identifies trade possibilities among multiple saves', () => {
      const saves: Record<string, SaveData> = {
        saveA: createMockSave([1, 2, 3]),
        saveB: createMockSave([3, 4, 5]),
        saveC: createMockSave([1, 5, 6]),
      };

      const result = findTradePossibilities(saves);

      expect(result).toHaveLength(6);

      // saveA -> saveB (B needs 1, 2)
      expect(result).toContainEqual({
        sourceSaveId: 'saveA',
        targetSaveId: 'saveB',
        speciesIds: [1, 2],
      });

      // saveA -> saveC (C needs 2, 3)
      expect(result).toContainEqual({
        sourceSaveId: 'saveA',
        targetSaveId: 'saveC',
        speciesIds: [2, 3],
      });

      // saveB -> saveA (A needs 4, 5)
      expect(result).toContainEqual({
        sourceSaveId: 'saveB',
        targetSaveId: 'saveA',
        speciesIds: [4, 5],
      });

      // saveB -> saveC (C needs 3, 4)
      expect(result).toContainEqual({
        sourceSaveId: 'saveB',
        targetSaveId: 'saveC',
        speciesIds: [3, 4],
      });

      // saveC -> saveA (A needs 5, 6)
      expect(result).toContainEqual({
        sourceSaveId: 'saveC',
        targetSaveId: 'saveA',
        speciesIds: [5, 6],
      });

      // saveC -> saveB (B needs 1, 6)
      expect(result).toContainEqual({
        sourceSaveId: 'saveC',
        targetSaveId: 'saveB',
        speciesIds: [1, 6],
      });
    });

    it('returns empty array when there are no trade possibilities', () => {
      const saves: Record<string, SaveData> = {
        saveA: createMockSave([1, 2]),
        saveB: createMockSave([1, 2]),
      };

      const result = findTradePossibilities(saves);

      expect(result).toEqual([]);
    });

    it('returns empty array with a single save', () => {
      const saves: Record<string, SaveData> = {
        saveA: createMockSave([1, 2]),
      };

      const result = findTradePossibilities(saves);

      expect(result).toEqual([]);
    });

    it('returns empty array with no saves', () => {
      const saves: Record<string, SaveData> = {};

      const result = findTradePossibilities(saves);

      expect(result).toEqual([]);
    });
  });
});
