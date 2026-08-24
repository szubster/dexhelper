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
        // Mocking only necessary fields for type safety/test
      } as unknown as SaveData,
    };
    const result = generateSynergyData(saves);
    expect(result.opportunities).toEqual([]);
  });

  it('should identify trade opportunities between two saves', () => {
    const saves: Record<string, SaveData> = {
      save1: { owned: new Set([1, 2, 3]) } as unknown as SaveData,
      save2: { owned: new Set([3, 4, 5]) } as unknown as SaveData,
    };

    const result = generateSynergyData(saves);

    // save1 has 1, 2 that save2 doesn't have
    // save2 has 4, 5 that save1 doesn't have
    expect(result.opportunities).toHaveLength(4);
    expect(result.opportunities).toEqual(
      expect.arrayContaining([
        { sourceSaveId: 'save1', targetSaveId: 'save2', pokemonId: 1 },
        { sourceSaveId: 'save1', targetSaveId: 'save2', pokemonId: 2 },
        { sourceSaveId: 'save2', targetSaveId: 'save1', pokemonId: 4 },
        { sourceSaveId: 'save2', targetSaveId: 'save1', pokemonId: 5 },
      ]),
    );
  });

  it('should handle saves with identical owned pokemon', () => {
    const saves: Record<string, SaveData> = {
      save1: { owned: new Set([1, 2, 3]) } as unknown as SaveData,
      save2: { owned: new Set([1, 2, 3]) } as unknown as SaveData,
    };

    const result = generateSynergyData(saves);
    expect(result.opportunities).toEqual([]);
  });

  it('should identify trade opportunities among three saves', () => {
    const saves: Record<string, SaveData> = {
      save1: { owned: new Set([1]) } as unknown as SaveData,
      save2: { owned: new Set([4]) } as unknown as SaveData,
      save3: { owned: new Set([7]) } as unknown as SaveData,
    };

    const result = generateSynergyData(saves);

    // save1 gives 1 to save2 and save3
    // save2 gives 4 to save1 and save3
    // save3 gives 7 to save1 and save2
    expect(result.opportunities).toHaveLength(6);
    expect(result.opportunities).toEqual(
      expect.arrayContaining([
        { sourceSaveId: 'save1', targetSaveId: 'save2', pokemonId: 1 },
        { sourceSaveId: 'save1', targetSaveId: 'save3', pokemonId: 1 },
        { sourceSaveId: 'save2', targetSaveId: 'save1', pokemonId: 4 },
        { sourceSaveId: 'save2', targetSaveId: 'save3', pokemonId: 4 },
        { sourceSaveId: 'save3', targetSaveId: 'save1', pokemonId: 7 },
        { sourceSaveId: 'save3', targetSaveId: 'save2', pokemonId: 7 },
      ]),
    );
  });
});
