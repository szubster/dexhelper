import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../../saveParser/parsers/common';
import type { AssistantStrategy, CatchSuggestion, EncounterDetail } from '../strategies/types';
import { generateSuggestions } from '../suggestionEngine';
import type { AssistantApiData } from '../suggestionEngineTypes';

describe('Catch Encounter Filtering', () => {
  const createMockSaveData = (overrides?: Partial<SaveData>): SaveData =>
    ({
      trainerId: 12345,
      trainerName: 'ASH',
      gameVersion: 'crystal',
      generation: 2,
      playTime: { hours: 10, minutes: 20, seconds: 30, frames: 0 },
      party: [],
      partyDetails: [],
      pc: [],
      pcDetails: [],
      inventory: [],
      pcItems: [],
      badges: [],
      hallOfFameCount: 0,
      pokedex: { seen: new Set(), owned: new Set([1]) },
      owned: new Set([1]),
      seen: new Set([1]),
      ...overrides,
    }) as unknown as SaveData;

  const createMockApiData = (): AssistantApiData => ({
    localAid: null,
    localEncounters: null,
    missingEncounters: {},
    pokemonMetadata: {},
    ancestralEncounters: {},
    areaNames: {},
    allLocations: [],
  });

  const mockStrategy: AssistantStrategy = {
    generation: 2,
    resolveMapAid: () => null,
    getMapDistance: () => null,
    getUnobtainableReason: () => null,
    isInternallyObtainable: () => false,
    getSpecialSuggestions: () => [],
    postProcessSuggestions: () => {},
  };

  it('penalizes priority and adds warning for headbutt encounters if player lacks the TM', async () => {
    const mockStrategyWithCatch: AssistantStrategy = {
      ...mockStrategy,
      getSpecialSuggestions: () => [
        {
          id: 'catch-local',
          category: 'Catch',
          title: 'Catch Right Here',
          description: '...',
          pokemonIds: [16],
          priority: 120,
          encounterInfo: {
            16: [
              {
                method: 'headbutt',
                minLevel: 10,
                maxLevel: 10,
                chance: 50,
                aid: 1,
              },
            ],
          },
        } as unknown as CatchSuggestion,
      ],
    };

    const saveData = createMockSaveData({
      owned: new Set([16]),
    });
    const apiData = createMockApiData();

    const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
    const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
    expect(catchLocal).toBeDefined();
    expect(catchLocal?.priority).toBe(45);
    expect(catchLocal?.warning).toBe('Requires Headbutt');
  });

  it('retains headbutt encounters if player has the TM in inventory', async () => {
    const mockStrategyWithCatch: AssistantStrategy = {
      ...mockStrategy,
      getSpecialSuggestions: () => [
        {
          id: 'catch-local',
          category: 'Catch',
          title: 'Catch Right Here',
          description: '...',
          pokemonIds: [16],
          priority: 120,
          encounterInfo: {
            16: [
              {
                method: 'headbutt',
                minLevel: 10,
                maxLevel: 10,
                chance: 50,
                aid: 1,
              },
            ],
          },
        } as unknown as CatchSuggestion,
      ],
    };

    const saveData = createMockSaveData({
      owned: new Set([16]),
      // biome-ignore lint/suspicious/noExplicitAny: Required for mock data overrides
      inventory: [{ id: 192, quantity: 1 } as any],
    });
    const apiData = createMockApiData();

    const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
    const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
    expect(catchLocal).toBeDefined();
    expect(catchLocal?.encounterInfo?.[16]).toHaveLength(1);
  });

  it('penalizes priority and adds warning for rock-smash encounters if player lacks the TM', async () => {
    const mockStrategyWithCatch: AssistantStrategy = {
      ...mockStrategy,
      getSpecialSuggestions: () => [
        {
          id: 'catch-local',
          category: 'Catch',
          title: 'Catch Right Here',
          description: '...',
          pokemonIds: [16],
          priority: 120,
          encounterInfo: {
            16: [
              {
                method: 'rock-smash',
                minLevel: 10,
                maxLevel: 10,
                chance: 50,
                aid: 1,
              },
            ],
          },
        } as unknown as CatchSuggestion,
      ],
    };

    const saveData = createMockSaveData({
      owned: new Set([16]),
    });
    const apiData = createMockApiData();

    const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
    const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
    expect(catchLocal).toBeDefined();
    expect(catchLocal?.priority).toBe(45);
    expect(catchLocal?.warning).toBe('Requires Rock Smash');
  });

  it('retains rock-smash encounters if player has the TM in pcItems', async () => {
    const mockStrategyWithCatch: AssistantStrategy = {
      ...mockStrategy,
      getSpecialSuggestions: () => [
        {
          id: 'catch-local',
          category: 'Catch',
          title: 'Catch Right Here',
          description: '...',
          pokemonIds: [16],
          priority: 120,
          encounterInfo: {
            16: [
              {
                method: 'rock-smash',
                minLevel: 10,
                maxLevel: 10,
                chance: 50,
                aid: 1,
              },
            ],
          },
        } as unknown as CatchSuggestion,
      ],
    };

    const saveData = createMockSaveData({
      owned: new Set([16]),
      // biome-ignore lint/suspicious/noExplicitAny: Required for mock data overrides
      pcItems: [{ id: 198, quantity: 1 } as any],
    });
    const apiData = createMockApiData();

    const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
    const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
    expect(catchLocal).toBeDefined();
    expect(catchLocal?.encounterInfo?.[16]).toHaveLength(1);
  });

  it('retains headbutt encounters if a pokemon in party has the move', async () => {
    const mockStrategyWithCatch: AssistantStrategy = {
      ...mockStrategy,
      getSpecialSuggestions: () => [
        {
          id: 'catch-local',
          category: 'Catch',
          title: 'Catch Right Here',
          description: '...',
          pokemonIds: [16],
          priority: 120,
          encounterInfo: {
            16: [
              {
                method: 'headbutt',
                minLevel: 10,
                maxLevel: 10,
                chance: 50,
                aid: 1,
              },
            ],
          },
        } as unknown as CatchSuggestion,
      ],
    };

    const saveData = createMockSaveData({
      owned: new Set([16]),
      partyDetails: [
        { speciesId: 1, level: 10, otName: 'ASH', isShiny: false, hash: '', moves: [29], storageLocation: 'party' },
      ] as unknown as PokemonInstance[],
    });
    const apiData = createMockApiData();

    const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
    const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
    expect(catchLocal).toBeDefined();
    expect(catchLocal?.encounterInfo?.[16]).toHaveLength(1);
  });

  it('adds warnings to specific encounters when some pokemon lack tools but others have accessible methods', async () => {
    const mockStrategyWithCatch: AssistantStrategy = {
      ...mockStrategy,
      getSpecialSuggestions: () => [
        {
          id: 'catch-local',
          category: 'Catch',
          title: 'Catch Right Here',
          description: '...',
          pokemonIds: [16, 17],
          priority: 120,
          encounterInfo: {
            16: [
              {
                method: 'walk',
                minLevel: 10,
                maxLevel: 10,
                chance: 50,
                aid: 1,
              },
            ],
            17: [
              {
                method: 'headbutt',
                minLevel: 10,
                maxLevel: 10,
                chance: 50,
                aid: 1,
              },
            ],
          },
        } as unknown as CatchSuggestion,
      ],
    };

    const saveData = createMockSaveData({
      owned: new Set([16, 17]),
      inventory: [],
    });
    const apiData = createMockApiData();

    const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
    const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
    expect(catchLocal).toBeDefined();
    expect(catchLocal?.pokemonIds).toEqual([16, 17]);
    expect(catchLocal?.encounterInfo?.[16]).toBeDefined();
    expect(catchLocal?.encounterInfo?.[17]).toBeDefined();
    expect(catchLocal?.warning).toBe('Requires Headbutt');
    expect(catchLocal?.priority).toBe(45);
  });

  it('penalizes priority and adds warning for surf encounters if player lacks the HM and move', async () => {
    const mockStrategyWithCatch: AssistantStrategy = {
      ...mockStrategy,
      getSpecialSuggestions: () => [
        {
          id: 'catch-local',
          category: 'Catch',
          title: 'Catch Right Here',
          description: '...',
          pokemonIds: [16],
          priority: 120,
          encounterInfo: {
            16: [
              {
                method: 'surf',
                minLevel: 10,
                maxLevel: 10,
                chance: 50,
                aid: 1,
              },
            ],
          },
        } as unknown as CatchSuggestion,
      ],
    };

    const saveData = createMockSaveData({
      owned: new Set([16]),
    });
    const apiData = createMockApiData();

    const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
    const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
    expect(catchLocal).toBeDefined();
    expect(catchLocal?.priority).toBe(45);
    expect(catchLocal?.warning).toBe('Requires Surf');
  });

  it('retains surf encounters if player has the HM in inventory', async () => {
    const mockStrategyWithCatch: AssistantStrategy = {
      ...mockStrategy,
      getSpecialSuggestions: () => [
        {
          id: 'catch-local',
          category: 'Catch',
          title: 'Catch Right Here',
          description: '...',
          pokemonIds: [16],
          priority: 120,
          encounterInfo: {
            16: [
              {
                method: 'surf',
                minLevel: 10,
                maxLevel: 10,
                chance: 50,
                aid: 1,
              },
            ],
          },
        } as unknown as CatchSuggestion,
      ],
    };

    const saveData = createMockSaveData({
      owned: new Set([16]),
      // biome-ignore lint/suspicious/noExplicitAny: Required for mock data overrides
      inventory: [{ id: 399, quantity: 1 } as any],
    });
    const apiData = createMockApiData();

    const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
    const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
    expect(catchLocal).toBeDefined();
    expect(catchLocal?.encounterInfo?.[16]).toHaveLength(1);
  });

  it('retains surf encounters if a pokemon in party has the move', async () => {
    const mockStrategyWithCatch: AssistantStrategy = {
      ...mockStrategy,
      getSpecialSuggestions: () => [
        {
          id: 'catch-local',
          category: 'Catch',
          title: 'Catch Right Here',
          description: '...',
          pokemonIds: [16],
          priority: 120,
          encounterInfo: {
            16: [
              {
                method: 'surf',
                minLevel: 10,
                maxLevel: 10,
                chance: 50,
                aid: 1,
              },
            ],
          },
        } as unknown as CatchSuggestion,
      ],
    };

    const saveData = createMockSaveData({
      owned: new Set([16]),
      partyDetails: [
        { speciesId: 1, level: 10, otName: 'ASH', isShiny: false, hash: '', moves: [57], storageLocation: 'party' },
      ] as unknown as PokemonInstance[],
    });
    const apiData = createMockApiData();

    const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
    const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
    expect(catchLocal).toBeDefined();
    expect(catchLocal?.encounterInfo?.[16]).toHaveLength(1);
  });

  it('penalizes priority and adds warnings for rod encounters if player lacks the Rod item', async () => {
    const mockStrategyWithCatch: AssistantStrategy = {
      ...mockStrategy,
      getSpecialSuggestions: () => [
        {
          id: 'catch-local',
          category: 'Catch',
          title: 'Catch Right Here',
          description: '...',
          pokemonIds: [16, 17, 18],
          priority: 120,
          encounterInfo: {
            16: [{ method: 'old-rod', minLevel: 10, maxLevel: 10, chance: 50, aid: 1 }],
            17: [{ method: 'good-rod', minLevel: 10, maxLevel: 10, chance: 50, aid: 1 }],
            18: [{ method: 'super-rod', minLevel: 10, maxLevel: 10, chance: 50, aid: 1 }],
          },
        } as unknown as CatchSuggestion,
      ],
    };

    const saveData = createMockSaveData({
      owned: new Set([16, 17, 18]),
    });
    const apiData = createMockApiData();

    const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
    const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
    expect(catchLocal).toBeDefined();
    expect(catchLocal?.priority).toBe(45);
    expect(catchLocal?.warning).toBe('Requires Old Rod, Requires Good Rod, Requires Super Rod');
  });

  it('retains rod encounters if player has the correct rod in inventory', async () => {
    const mockStrategyWithCatch: AssistantStrategy = {
      ...mockStrategy,
      getSpecialSuggestions: () => [
        {
          id: 'catch-local',
          category: 'Catch',
          title: 'Catch Right Here',
          description: '...',
          pokemonIds: [16, 17, 18],
          priority: 120,
          encounterInfo: {
            16: [{ method: 'old-rod', minLevel: 10, maxLevel: 10, chance: 50, aid: 1 }],
            17: [{ method: 'good-rod', minLevel: 10, maxLevel: 10, chance: 50, aid: 1 }],
            18: [{ method: 'super-rod', minLevel: 10, maxLevel: 10, chance: 50, aid: 1 }],
          },
        } as unknown as CatchSuggestion,
      ],
    };

    const saveData = createMockSaveData({
      owned: new Set([16, 17, 18]),
      inventory: [
        { id: 69, quantity: 1 }, // Old Rod (Gen 2)
        { id: 70, quantity: 1 }, // Good Rod (Gen 2)
        { id: 71, quantity: 1 }, // Super Rod (Gen 2)
      ],
    });
    const apiData = createMockApiData();

    const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
    const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
    expect(catchLocal).toBeDefined();
    expect(catchLocal?.encounterInfo?.[16]).toHaveLength(1);
    expect(catchLocal?.encounterInfo?.[17]).toHaveLength(1);
    expect(catchLocal?.encounterInfo?.[18]).toHaveLength(1);
  });

  describe('Edge cases', () => {
    it('handles priority penalizing when encounterInfo details contains undefined elements', async () => {
      const mockStrategyWithCatch: AssistantStrategy = {
        ...mockStrategy,
        getSpecialSuggestions: () => [
          {
            id: 'catch-local',
            category: 'Catch',
            title: 'Catch Right Here',
            description: '...',
            pokemonIds: [16],
            priority: 120,
            encounterInfo: {
              16: [
                undefined as unknown as EncounterDetail,
                {
                  method: 'headbutt',
                  minLevel: 10,
                  maxLevel: 10,
                  chance: 50,
                  aid: 1,
                },
              ],
            },
          } as unknown as CatchSuggestion,
        ],
      };

      const saveData = createMockSaveData({
        owned: new Set([16]),
      });
      const apiData = createMockApiData();

      const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
      const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
      expect(catchLocal).toBeDefined();
      expect(catchLocal?.priority).toBe(45);
      expect(catchLocal?.warning).toBe('Requires Headbutt');
    });

    it('handles warning logic when single pokemonId is used instead of pokemonIds array', async () => {
      const mockStrategyWithCatch: AssistantStrategy = {
        ...mockStrategy,
        getSpecialSuggestions: () => [
          {
            id: 'catch-local',
            category: 'Catch',
            title: 'Catch Right Here',
            description: '...',
            pokemonId: 16,
            priority: 120,
            encounterInfo: {
              16: [
                {
                  method: 'headbutt',
                  minLevel: 10,
                  maxLevel: 10,
                  chance: 50,
                  aid: 1,
                },
              ],
            },
          } as unknown as CatchSuggestion,
        ],
      };

      const saveData = createMockSaveData({
        owned: new Set([16]),
      });
      const apiData = createMockApiData();

      const { suggestions } = await generateSuggestions(saveData, false, 'crystal', apiData, mockStrategyWithCatch);
      const catchLocal = suggestions.find((s) => s.id === 'catch-local') as CatchSuggestion | undefined;
      expect(catchLocal).toBeDefined();
      expect(catchLocal?.priority).toBe(45);
      expect(catchLocal?.warning).toBe('Requires Headbutt');
    });
  });
});
