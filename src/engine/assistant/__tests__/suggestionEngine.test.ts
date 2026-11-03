import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getGenerationConfig } from '../../../utils/generationConfig';
import type { PokemonInstance, SaveData } from '../../saveParser/parsers/common';
import * as breedGen from '../generators/breedGenerator';
import * as catchGen from '../generators/catchGenerator';
import * as evoGen from '../generators/evolutionGenerator';
import * as tradeGen from '../generators/tradeGenerator';
import type { AssistantStrategy, Suggestion } from '../strategies/types';
import { generateSuggestions } from '../suggestionEngine';
import type { AssistantApiData } from '../suggestionEngineTypes';

vi.mock('../../../utils/generationConfig', () => ({
  getGenerationConfig: vi.fn<() => unknown>(),
}));

describe('generateSuggestions', () => {
  let mockApiData: AssistantApiData;
  let mockStrategy: AssistantStrategy;
  let mockSaveData: SaveData;

  beforeEach(() => {
    vi.resetAllMocks();

    mockApiData = {
      encounters: [],
      evolutions: [],
      evolutionItems: [],
      pokemon: [],
      areas: [],
      missingEncounters: {},
      ancestralEncounters: {},
      pokemonMetadata: {},
      areaNames: {},
      allLocations: [],
    } as unknown as AssistantApiData;

    mockStrategy = {
      getSpecialSuggestions: vi.fn<() => Suggestion[]>().mockReturnValue([]),
      postProcessSuggestions: vi.fn<() => void>(),
      getBoxCapacity: vi.fn<() => number>().mockReturnValue(20),
      getTradeStrategy: vi.fn<() => unknown[]>().mockReturnValue([]),
    } as unknown as AssistantStrategy;

    mockSaveData = {
      generation: 1,
      gameVersion: 'red',
      trainerName: 'ASH',
      owned: new Set([1]),
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      hallOfFameCount: 1,
    } as unknown as SaveData;

    vi.mocked(getGenerationConfig).mockReturnValue({
      maxDex: 151,
      defaultVersion: 'red',
    } as unknown as ReturnType<typeof getGenerationConfig>);

    vi.spyOn(catchGen, 'generateCatchSuggestions').mockImplementation(() => {});
    vi.spyOn(tradeGen, 'generateGiftAndTradeSuggestions').mockImplementation(() => {});
    vi.spyOn(breedGen, 'generateBreedingSuggestions').mockImplementation(() => {});
    vi.spyOn(evoGen, 'generateEvolutionSuggestions').mockResolvedValue();
  });

  it('handles null saveData or apiData', async () => {
    const result1 = await generateSuggestions(null, false, undefined, mockApiData, mockStrategy);
    expect(result1.suggestions).toEqual([]);

    const result2 = await generateSuggestions(mockSaveData, false, undefined, null, mockStrategy);
    expect(result2.suggestions).toEqual([]);
  });

  it('generates missing ids and skips mewtwo when hof count is 0 in gen 1', async () => {
    mockSaveData.hallOfFameCount = 0;
    mockSaveData.owned = new Set(Array.from({ length: 149 }, (_, i) => i + 1));

    const result = await generateSuggestions(mockSaveData, false, undefined, mockApiData, mockStrategy);

    expect(result.debug.rejected).toEqual([
      {
        pokemonId: 150,
        reason: 'Hall of Fame count is 0. Mewtwo is locked.',
        code: 'HOF_LOCKED',
      },
    ]);
  });

  it('caps queryTargets to 100', async () => {
    mockSaveData.owned = new Set();

    await generateSuggestions(mockSaveData, false, undefined, mockApiData, mockStrategy);

    expect(catchGen.generateCatchSuggestions).toHaveBeenCalled();
    const mockCalls = vi.mocked(catchGen.generateCatchSuggestions).mock.calls;
    const call = mockCalls[0];
    const queryTargetsArg = (call?.[4] || []) as unknown[];
    expect(queryTargetsArg.length).toBe(100);
  });

  it('filters by missing tools as a post process', async () => {
    const mockSuggestion: Suggestion = {
      id: 'mock-1',
      pokemonId: 1,
      category: 'Catch',
      encounterInfo: {
        '1': [{ method: 'surf', locationId: 1 }],
      },
      priority: 100,
      pokemonIds: [1],
    } as unknown as Suggestion;

    mockStrategy.getSpecialSuggestions = vi.fn<() => Suggestion[]>().mockReturnValue([mockSuggestion]);

    const result = await generateSuggestions(mockSaveData, false, undefined, mockApiData, mockStrategy);

    const firstSug = result.suggestions[0] as Suggestion;
    expect(firstSug.priority).toBe(45);
    expect(firstSug.warning).toContain('Requires Surf');
  });

  it('identifies myOtIds based on trainerName', async () => {
    mockSaveData.partyDetails = [
      { speciesId: 12, otName: 'ASH' },
      { speciesId: 13, otName: 'GARY' },
    ] as unknown as PokemonInstance[];

    await generateSuggestions(mockSaveData, false, undefined, mockApiData, mockStrategy);

    const mockCalls = vi.mocked(catchGen.generateCatchSuggestions).mock.calls;
    const call = mockCalls[0];
    const myOtIds = (call?.[2] || new Set()) as Set<number>;
    expect(myOtIds.has(12)).toBe(true);
    expect(myOtIds.has(13)).toBe(false);
  });

  it('groups instances by species for subgenerators', async () => {
    mockSaveData.partyDetails = [
      { speciesId: 12, otName: 'ASH' },
      { speciesId: 12, otName: 'GARY' },
    ] as unknown as PokemonInstance[];
    mockSaveData.pcDetails = [{ speciesId: 15, otName: 'ASH' }] as unknown as PokemonInstance[];

    await generateSuggestions(mockSaveData, false, undefined, mockApiData, mockStrategy);

    const mockCalls = vi.mocked(tradeGen.generateGiftAndTradeSuggestions).mock.calls;
    const call = mockCalls[0];
    const instancesBySpecies = (call?.[5] || new Map()) as Map<number, unknown[]>;
    expect(instancesBySpecies.get(12)?.length).toBe(2);
    expect(instancesBySpecies.get(15)?.length).toBe(1);
  });

  it('sorts suggestions by priority', async () => {
    const mockSuggestion1: Suggestion = { id: 'mock-1', priority: 10 } as unknown as Suggestion;
    const mockSuggestion2: Suggestion = { id: 'mock-2', priority: 50 } as unknown as Suggestion;
    const mockSuggestion3: Suggestion = { id: 'mock-3', priority: 30 } as unknown as Suggestion;

    mockStrategy.getSpecialSuggestions = vi
      .fn<() => Suggestion[]>()
      .mockReturnValue([mockSuggestion1, mockSuggestion2, mockSuggestion3]);

    const result = await generateSuggestions(mockSaveData, false, undefined, mockApiData, mockStrategy);

    const s1 = (result.suggestions[0] || {}) as Suggestion;
    const s2 = (result.suggestions[1] || {}) as Suggestion;
    const s3 = (result.suggestions[2] || {}) as Suggestion;
    expect(s1.priority).toBe(50);
    expect(s2.priority).toBe(30);
    expect(s3.priority).toBe(10);
  });

  it('deduplicates suggestions by id', async () => {
    const mockSuggestion1: Suggestion = { id: 'mock-1', priority: 10 } as unknown as Suggestion;
    const mockSuggestion2: Suggestion = { id: 'mock-1', priority: 50 } as unknown as Suggestion;

    mockStrategy.getSpecialSuggestions = vi
      .fn<() => Suggestion[]>()
      .mockReturnValue([mockSuggestion1, mockSuggestion2]);

    const result = await generateSuggestions(mockSaveData, false, undefined, mockApiData, mockStrategy);

    expect(result.suggestions.length).toBe(1);
    const s1 = (result.suggestions[0] || {}) as Suggestion;
    expect(s1.priority).toBe(50);
  });

  it('populates ownedSet from party and pc when isLivingDex is true', async () => {
    mockSaveData.party = [10, 11];
    mockSaveData.pc = [12, 13];
    mockSaveData.owned = new Set([1, 2, 3]);

    await generateSuggestions(mockSaveData, true, undefined, mockApiData, mockStrategy);

    expect(tradeGen.generateGiftAndTradeSuggestions).toHaveBeenCalled();
    const mockCalls = vi.mocked(tradeGen.generateGiftAndTradeSuggestions).mock.calls;
    const call = mockCalls[0];
    const ownedSet = (call?.[3] || new Set()) as Set<number>;

    expect(ownedSet.has(10)).toBe(true);
    expect(ownedSet.has(11)).toBe(true);
    expect(ownedSet.has(12)).toBe(true);
    expect(ownedSet.has(13)).toBe(true);
    expect(ownedSet.has(1)).toBe(false);
  });

  it('falls back to empty Set when owned is undefined and isLivingDex is false', async () => {
    mockSaveData.owned = undefined as unknown as Set<number>;

    await generateSuggestions(mockSaveData, false, undefined, mockApiData, mockStrategy);

    expect(tradeGen.generateGiftAndTradeSuggestions).toHaveBeenCalled();
    const mockCalls = vi.mocked(tradeGen.generateGiftAndTradeSuggestions).mock.calls;
    const call = mockCalls[0];
    const ownedSet = (call?.[3] || new Set()) as Set<number>;

    expect(ownedSet.size).toBe(0);
  });

  it('falls back to genConfig.defaultVersion when effectiveVersion is unknown', async () => {
    mockSaveData.gameVersion = 'unknown';

    await generateSuggestions(mockSaveData, false, undefined, mockApiData, mockStrategy);

    expect(tradeGen.generateGiftAndTradeSuggestions).toHaveBeenCalled();
    const mockCalls = vi.mocked(tradeGen.generateGiftAndTradeSuggestions).mock.calls;
    const call = mockCalls[0];
    const displayVersion = call?.[2];

    expect(displayVersion).toBe('red');
  });

  it('sorts suggestions with identical priority by pokemonId, pokemonIds array, or fallback 9999', async () => {
    const sFallback: Suggestion = {
      id: 's-fallback',
      priority: 50,
      pokemonId: undefined,
      pokemonIds: [],
    } as unknown as Suggestion;
    const sArrayMin: Suggestion = {
      id: 's-array-min',
      priority: 50,
      pokemonId: undefined,
      pokemonIds: [30, 15],
    } as unknown as Suggestion;
    const sSingleId: Suggestion = {
      id: 's-single-id',
      priority: 50,
      pokemonId: 5,
    } as unknown as Suggestion;

    mockStrategy.getSpecialSuggestions = vi.fn<() => Suggestion[]>().mockReturnValue([sFallback, sArrayMin, sSingleId]);

    const result = await generateSuggestions(mockSaveData, false, undefined, mockApiData, mockStrategy);

    expect(result.suggestions.map((s) => s.id)).toEqual(['s-single-id', 's-array-min', 's-fallback']);
  });
});
