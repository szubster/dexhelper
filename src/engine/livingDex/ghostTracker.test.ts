import { describe, expect, it, vi } from 'vitest';
import type { PokemonMetadata } from '../../db/schema';
import * as configModule from '../../utils/generationConfig';
import type { SaveData } from '../saveParser/parsers/common';
import {
  getLivingDexDuplicates,
  getLivingDexGhosts,
  getMissingEvolutionsFromDuplicates,
  getOwnedPokemonLocations,
} from './ghostTracker';

// Mock getGenerationConfig
vi.mock('../../utils/generationConfig', () => ({
  getGenerationConfig: vi.fn<typeof configModule.getGenerationConfig>(),
}));

describe('ghostTracker', () => {
  it('identifies missing physical pokemon correctly up to maxDex', () => {
    // Mock Gen 1 with 151
    vi.mocked(configModule.getGenerationConfig).mockReturnValueOnce({
      maxDex: 151,
    } as import('../../utils/generationConfig').GenerationConfig);

    const mockSave: Partial<SaveData> = {
      generation: 1,
      party: [1, 2, 3, 0, 0, 0], // Bulbasaur, Ivysaur, Venusaur
      pc: [4, 5, 200, 0], // Charmander, Charmeleon (200 is invalid/egg/beyond maxDex)
    };

    const ghosts = getLivingDexGhosts(mockSave as SaveData);

    // We have 1,2,3,4,5. We are missing 6-151.
    // Length should be 151 - 5 = 146
    expect(ghosts.length).toBe(146);
    expect(ghosts.includes(1)).toBe(false);
    expect(ghosts.includes(5)).toBe(false);
    expect(ghosts.includes(6)).toBe(true);
    expect(ghosts.includes(151)).toBe(true);
    expect(ghosts.includes(200)).toBe(false); // Out of bounds
  });

  it('throws NotImplemented when regionalOnly is true', () => {
    const mockSave: Partial<SaveData> = {
      generation: 1,
      party: [],
      pc: [],
    };
    expect(() => getLivingDexGhosts(mockSave as SaveData, true)).toThrowError(/NotImplemented/);
  });
});

describe('getLivingDexDuplicates', () => {
  it('identifies duplicate physical pokemon correctly up to maxDex', () => {
    // Mock Gen 1 with 151
    vi.mocked(configModule.getGenerationConfig).mockReturnValueOnce({
      maxDex: 151,
    } as import('../../utils/generationConfig').GenerationConfig);

    const mockSave: Partial<SaveData> = {
      generation: 1,
      party: [1, 2, 3, 1, 0, 0], // Bulbasaur x2, Ivysaur, Venusaur
      pc: [4, 5, 4, 1, 200, 0], // Charmander x2, Charmeleon, Bulbasaur x3 (200 is invalid/egg/beyond maxDex)
    };

    const duplicates = getLivingDexDuplicates(mockSave as SaveData);

    expect(duplicates.size).toBe(2);
    expect(duplicates.has(1)).toBe(true); // Bulbasaur is duplicate
    expect(duplicates.has(4)).toBe(true); // Charmander is duplicate
    expect(duplicates.has(2)).toBe(false); // Ivysaur is not
    expect(duplicates.has(3)).toBe(false); // Venusaur is not
    expect(duplicates.has(5)).toBe(false); // Charmeleon is not
    expect(duplicates.has(200)).toBe(false); // Out of bounds
  });

  it('returns empty set if no duplicates exist', () => {
    // Mock Gen 1 with 151
    vi.mocked(configModule.getGenerationConfig).mockReturnValueOnce({
      maxDex: 151,
    } as import('../../utils/generationConfig').GenerationConfig);

    const mockSave: Partial<SaveData> = {
      generation: 1,
      party: [1, 2, 3, 0, 0, 0], // Bulbasaur, Ivysaur, Venusaur
      pc: [4, 5, 0, 0, 0, 0], // Charmander, Charmeleon
    };

    const duplicates = getLivingDexDuplicates(mockSave as SaveData);

    expect(duplicates.size).toBe(0);
  });
});

describe('getOwnedPokemonLocations', () => {
  it('extracts box and slot locations correctly', () => {
    const mockSave: Partial<SaveData> = {
      pcDetails: [
        { speciesId: 1, storageLocation: 'Box 1', slot: 0 } as import('../saveParser/parsers/common').PokemonInstance,
        { speciesId: 4, storageLocation: 'Box 2', slot: 15 } as import('../saveParser/parsers/common').PokemonInstance,
        { speciesId: 0, storageLocation: 'Box 3', slot: 1 } as import('../saveParser/parsers/common').PokemonInstance,
        { speciesId: 7, storageLocation: 'Party', slot: 0 } as import('../saveParser/parsers/common').PokemonInstance,
        {
          speciesId: 25,
          storageLocation: 'Box 14',
          slot: 29,
        } as import('../saveParser/parsers/common').PokemonInstance,
      ],
    };

    const locations = getOwnedPokemonLocations(mockSave as SaveData);

    expect(locations).toHaveLength(3);
    expect(locations).toEqual([
      { speciesId: 1, box: 1, slot: 0 },
      { speciesId: 4, box: 2, slot: 15 },
      { speciesId: 25, box: 14, slot: 29 },
    ]);
  });
});

describe('getMissingEvolutionsFromDuplicates', () => {
  it('identifies missing evolutions that can be obtained from duplicates', () => {
    const ghosts = [2, 3, 6]; // Missing Ivysaur, Venusaur, Charizard
    const duplicates = new Set([1, 4, 7]); // Has extra Bulbasaur, Charmander, Squirtle

    const mockMetadata: Record<number, PokemonMetadata | null> = {
      1: { id: 1, n: 'Bulbasaur', efrm: [], eto: [], det: [], baby: false, cr: 45 },
      2: { id: 2, n: 'Ivysaur', efrm: [1], eto: [], det: [], baby: false, cr: 45 },
      3: { id: 3, n: 'Venusaur', efrm: [2, 1], eto: [], det: [], baby: false, cr: 45 },
      4: { id: 4, n: 'Charmander', efrm: [], eto: [], det: [], baby: false, cr: 45 },
      5: { id: 5, n: 'Charmeleon', efrm: [4], eto: [], det: [], baby: false, cr: 45 },
      6: { id: 6, n: 'Charizard', efrm: [5, 4], eto: [], det: [], baby: false, cr: 45 },
      7: { id: 7, n: 'Squirtle', efrm: [], eto: [], det: [], baby: false, cr: 45 },
    };

    const evolvable = getMissingEvolutionsFromDuplicates(ghosts, duplicates, mockMetadata);

    expect(evolvable).toHaveLength(3);
    // Ivysaur from Bulbasaur
    expect(evolvable).toContainEqual({ missingSpeciesId: 2, duplicateSpeciesId: 1 });
    // Venusaur from Bulbasaur (since we have duplicate Bulbasaur)
    expect(evolvable).toContainEqual({ missingSpeciesId: 3, duplicateSpeciesId: 1 });
    // Charizard from Charmander
    expect(evolvable).toContainEqual({ missingSpeciesId: 6, duplicateSpeciesId: 4 });
  });

  it('returns empty array if no duplicates match', () => {
    const ghosts = [2, 3, 6]; // Missing Ivysaur, Venusaur, Charizard
    const duplicates = new Set([7, 10]); // No extra Bulbasaur/Charmander

    const mockMetadata: Record<number, PokemonMetadata | null> = {
      2: { id: 2, n: 'Ivysaur', efrm: [1], eto: [], det: [], baby: false, cr: 45 },
      3: { id: 3, n: 'Venusaur', efrm: [2, 1], eto: [], det: [], baby: false, cr: 45 },
      6: { id: 6, n: 'Charizard', efrm: [5, 4], eto: [], det: [], baby: false, cr: 45 },
    };

    const evolvable = getMissingEvolutionsFromDuplicates(ghosts, duplicates, mockMetadata);

    expect(evolvable).toHaveLength(0);
  });

  it('ignores missing metadata', () => {
    const ghosts = [2, 999];
    const duplicates = new Set([1]);

    const mockMetadata: Record<number, PokemonMetadata | null> = {
      2: { id: 2, n: 'Ivysaur', efrm: [1], eto: [], det: [], baby: false, cr: 45 },
      // 999 is missing
    };

    const evolvable = getMissingEvolutionsFromDuplicates(ghosts, duplicates, mockMetadata);

    expect(evolvable).toHaveLength(1);
    expect(evolvable).toContainEqual({ missingSpeciesId: 2, duplicateSpeciesId: 1 });
  });
});
