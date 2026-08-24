import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../../saveParser/index';
import { generateSynergyData } from '../synergyDataGenerator';

describe('synergyDataGenerator', () => {
  it('should return empty opportunities when no saves are provided', () => {
    const result = generateSynergyData({});
    expect(result.opportunities).toEqual([]);
  });

  it('should return empty opportunities when only one save is provided', () => {
    const saves: Record<string, SaveData> = {
      save1: {
        owned: new Set([1, 4, 7]),
        generation: 1,
        gameVersion: 'red',
        // Mocking only necessary fields for type safety/test
      } as unknown as SaveData,
    };
    const result = generateSynergyData(saves);
    expect(result.opportunities).toEqual([]);
  });

  it('should identify trade opportunities between two saves', () => {
    const saves: Record<string, SaveData> = {
      save1: { owned: new Set([1, 2, 3]), generation: 1, gameVersion: 'red' } as unknown as SaveData,
      save2: { owned: new Set([3, 4, 5]), generation: 1, gameVersion: 'blue' } as unknown as SaveData,
    };

    const result = generateSynergyData(saves);

    // save1 has 1, 2 that save2 doesn't have
    // save2 has 4, 5 that save1 doesn't have
    expect(result.opportunities).toHaveLength(4);
    expect(result.opportunities).toEqual(
      expect.arrayContaining([
        { sourceSaveId: 'save1', targetSaveId: 'save2', pokemonId: 1, priority: 50, isExclusive: false },
        { sourceSaveId: 'save1', targetSaveId: 'save2', pokemonId: 2, priority: 50, isExclusive: false },
        { sourceSaveId: 'save2', targetSaveId: 'save1', pokemonId: 4, priority: 50, isExclusive: false },
        { sourceSaveId: 'save2', targetSaveId: 'save1', pokemonId: 5, priority: 50, isExclusive: false },
      ]),
    );
  });

  it('should handle saves with identical owned pokemon', () => {
    const saves: Record<string, SaveData> = {
      save1: { owned: new Set([1, 2, 3]), generation: 1, gameVersion: 'red' } as unknown as SaveData,
      save2: { owned: new Set([1, 2, 3]), generation: 1, gameVersion: 'red' } as unknown as SaveData,
    };

    const result = generateSynergyData(saves);
    expect(result.opportunities).toEqual([]);
  });

  it('should identify trade opportunities among three saves', () => {
    const saves: Record<string, SaveData> = {
      save1: { owned: new Set([1]), generation: 1, gameVersion: 'red' } as unknown as SaveData,
      save2: { owned: new Set([4]), generation: 1, gameVersion: 'red' } as unknown as SaveData,
      save3: { owned: new Set([7]), generation: 1, gameVersion: 'red' } as unknown as SaveData,
    };

    const result = generateSynergyData(saves);

    // save1 gives 1 to save2 and save3
    // save2 gives 4 to save1 and save3
    // save3 gives 7 to save1 and save2
    expect(result.opportunities).toHaveLength(6);
    expect(result.opportunities).toEqual(
      expect.arrayContaining([
        { sourceSaveId: 'save1', targetSaveId: 'save2', pokemonId: 1, priority: 50, isExclusive: false },
        { sourceSaveId: 'save1', targetSaveId: 'save3', pokemonId: 1, priority: 50, isExclusive: false },
        { sourceSaveId: 'save2', targetSaveId: 'save1', pokemonId: 4, priority: 50, isExclusive: false },
        { sourceSaveId: 'save2', targetSaveId: 'save3', pokemonId: 4, priority: 50, isExclusive: false },
        { sourceSaveId: 'save3', targetSaveId: 'save1', pokemonId: 7, priority: 50, isExclusive: false },
        { sourceSaveId: 'save3', targetSaveId: 'save2', pokemonId: 7, priority: 50, isExclusive: false },
      ]),
    );
  });

  it('should prioritize and flag version exclusive trade opportunities', () => {
    const saves: Record<string, SaveData> = {
      // Blue save missing Vulpix (37)
      saveRed: { owned: new Set([]), generation: 1, gameVersion: 'red' } as unknown as SaveData,
      // Red save has Vulpix (Red exclusive)
      saveBlue: { owned: new Set([37, 1]), generation: 1, gameVersion: 'blue' } as unknown as SaveData,
    };

    const result = generateSynergyData(saves);

    // 37 is a Red exclusive, so Blue needs it.
    // 1 is not exclusive, but Blue needs it.

    // Opportunities from saveRed -> saveBlue
    const opp37 = result.opportunities.find((o) => o.pokemonId === 37 && o.targetSaveId === 'saveRed');
    const opp1 = result.opportunities.find((o) => o.pokemonId === 1 && o.targetSaveId === 'saveRed');

    expect(opp37).toBeDefined();
    expect(opp37?.isExclusive).toBe(true);
    expect(opp37?.priority).toBe(100);

    expect(opp1).toBeDefined();
    expect(opp1?.isExclusive).toBe(false);
    expect(opp1?.priority).toBe(50);

    // Verify sorting (priority 100 before 50)
    expect(result.opportunities[0]?.priority).toBe(100);
    expect(result.opportunities[1]?.priority).toBe(50);
  });
});
