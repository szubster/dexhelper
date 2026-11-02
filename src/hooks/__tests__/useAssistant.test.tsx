import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { useEffect } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import type { PokemonMetadata } from '../../db/schema';
import { gen1Strategy } from '../../engine/assistant/strategies/gen1Strategy';
import * as strategies from '../../engine/assistant/strategies/index';
import { fetchAssistantApiData, generateSuggestions } from '../../engine/assistant/suggestionEngine';
import type { AssistantApiData } from '../../engine/assistant/suggestionEngineTypes';
import type { SaveData } from '../../engine/saveParser/index';
import { getGenerationConfig } from '../../utils/generationConfig';
import { useAssistant } from '../useAssistant';

vi.mock('../../engine/assistant/suggestionEngine', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../engine/assistant/suggestionEngine')>();
  return {
    ...actual,
    fetchAssistantApiData: vi.fn<(...args: unknown[]) => Promise<unknown>>(),
  };
});

vi.mock('../../engine/assistant/strategies/index', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../engine/assistant/strategies/index')>();
  return {
    ...actual,
    getStrategy: vi.fn<(...args: unknown[]) => Promise<unknown>>(),
  };
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mockSaveData = {
  generation: 1 as const,
  gameVersion: 'red',
  trainerName: 'ASH',
  trainerId: 12345,
  money: 0,
  coins: 0,
  playTime: '00:00:00',
  badges: 0,
  owned: new Set([1]),
  seen: new Set([1]),
  party: [1],
  pc: [],
  items: [],
  currentMapId: 0,
  pokedexCount: 1,
  hallOfFameCount: 0,
  eventFlags: new Uint8Array(300),
  partyDetails: [],
  pcDetails: [],
  trainerIdRaw: new Uint8Array(2),
} as unknown as SaveData;

const emptyAssistantApiData: AssistantApiData = {
  areaNames: {},
  missingEncounters: {},
  localEncounters: [],
  localAid: null,
  ancestralEncounters: {},
  pokemonMetadata: {},
  allLocations: [],
};

describe('useAssistant', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return empty state when no saveData is provided', async () => {
    let hookResult: ReturnType<typeof useAssistant> | undefined;

    const TestComponent = () => {
      const result = useAssistant(null, false);
      useEffect(() => {
        hookResult = result;
      }, [result]);
      return null;
    };

    const Wrapper = createWrapper();
    void render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    await vi.waitFor(() => {
      expect(hookResult).toBeDefined();
    });

    expect(hookResult?.suggestions).toEqual([]);
    expect(hookResult?.isLoading).toBe(false);
  });

  it('should filter out Mewtwo in Gen 1 if Hall of Fame count is 0', async () => {
    let hookResult: ReturnType<typeof useAssistant> | undefined;

    vi.mocked(fetchAssistantApiData).mockResolvedValue(emptyAssistantApiData as never);
    vi.mocked(strategies.getStrategy).mockResolvedValue(gen1Strategy as never);

    const maxDex = getGenerationConfig(1).maxDex;
    const owned = new Set<number>();
    for (let i = 1; i <= maxDex; i++) {
      if (i !== 150) owned.add(i);
    }

    const testSaveData = {
      ...mockSaveData,
      generation: 1,
      hallOfFameCount: 0,
      owned,
    } as unknown as SaveData;

    const TestComponent = () => {
      const result = useAssistant(testSaveData, false);
      useEffect(() => {
        hookResult = result;
      }, [result]);
      return null;
    };

    const Wrapper = createWrapper();
    void render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    await vi.waitFor(() => {
      expect(hookResult).toBeDefined();
    });

    await vi.waitFor(() => {
      expect(fetchAssistantApiData).toHaveBeenCalled();
    });

    expect(fetchAssistantApiData).toHaveBeenCalledWith(testSaveData, expect.not.arrayContaining([150]));
  });

  it('should include Mewtwo in Gen 1 if Hall of Fame count > 0', async () => {
    let hookResult: ReturnType<typeof useAssistant> | undefined;

    vi.mocked(fetchAssistantApiData).mockResolvedValue(emptyAssistantApiData as never);
    vi.mocked(strategies.getStrategy).mockResolvedValue(gen1Strategy as never);

    const maxDex = getGenerationConfig(1).maxDex;
    const owned = new Set<number>();
    for (let i = 1; i <= maxDex; i++) {
      if (i !== 150) owned.add(i);
    }

    const testSaveData = {
      ...mockSaveData,
      generation: 1,
      hallOfFameCount: 1,
      owned,
    } as unknown as SaveData;

    const TestComponent = () => {
      const result = useAssistant(testSaveData, false);
      useEffect(() => {
        hookResult = result;
      }, [result]);
      return null;
    };

    const Wrapper = createWrapper();
    void render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    await vi.waitFor(() => {
      expect(hookResult).toBeDefined();
    });

    await vi.waitFor(() => {
      expect(fetchAssistantApiData).toHaveBeenCalledWith(testSaveData, expect.arrayContaining([150]));
    });
  });

  it('should evaluate living dex ownership correctly', async () => {
    let hookResult: ReturnType<typeof useAssistant> | undefined;

    vi.mocked(fetchAssistantApiData).mockResolvedValue(emptyAssistantApiData as never);
    vi.mocked(strategies.getStrategy).mockResolvedValue(gen1Strategy as never);

    const maxDex = getGenerationConfig(1).maxDex;
    const owned = new Set<number>();
    for (let i = 3; i <= maxDex; i++) {
      owned.add(i);
    }

    const party = [1];
    const pc = [2];

    const testSaveData = {
      ...mockSaveData,
      generation: 1,
      hallOfFameCount: 1,
      owned,
      party,
      pc,
    } as unknown as SaveData;

    const TestComponent = () => {
      const result = useAssistant(testSaveData, true);
      useEffect(() => {
        hookResult = result;
      }, [result]);
      return null;
    };

    const Wrapper = createWrapper();
    void render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    await vi.waitFor(() => {
      expect(hookResult).toBeDefined();
    });

    await vi.waitFor(() => {
      const expectedMissing = [];
      for (let i = 3; i <= 32; i++) {
        expectedMissing.push(i);
      }
      expect(fetchAssistantApiData).toHaveBeenCalledWith(testSaveData, expectedMissing);
    });
  });

  it('should pass manualVersion correctly to suggestion engine', async () => {
    let hookResult: ReturnType<typeof useAssistant> | undefined;

    vi.mocked(fetchAssistantApiData).mockResolvedValue(emptyAssistantApiData as never);
    vi.mocked(strategies.getStrategy).mockResolvedValue(gen1Strategy as never);

    const testSaveData = {
      ...mockSaveData,
    } as unknown as SaveData;

    const TestComponent = () => {
      const result = useAssistant(testSaveData, false, 'blue');
      useEffect(() => {
        hookResult = result;
      }, [result]);
      return null;
    };

    const Wrapper = createWrapper();
    void render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    await vi.waitFor(() => {
      expect(hookResult).toBeDefined();
    });

    await vi.waitFor(() => {
      expect(fetchAssistantApiData).toHaveBeenCalled();
    });
  });

  it('should generate heatmap based on suggestions', async () => {
    let hookResult: ReturnType<typeof useAssistant> | undefined;

    vi.mocked(fetchAssistantApiData).mockResolvedValue({
      ...emptyAssistantApiData,
      localEncounters: [
        {
          pid: 16,
          enc: [{ aid: 1, v: 1, d: [{ c: 50, method: 1, min: 2, max: 4 }] }],
        },
      ],
    } as never);
    vi.mocked(strategies.getStrategy).mockResolvedValue(gen1Strategy as never);

    const testSaveData = {
      ...mockSaveData,
    } as unknown as SaveData;

    const TestComponent = () => {
      const result = useAssistant(testSaveData, false);
      useEffect(() => {
        hookResult = result;
      }, [result]);
      return null;
    };

    const Wrapper = createWrapper();
    void render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    await vi.waitFor(() => {
      expect(hookResult).toBeDefined();
    });

    await vi.waitFor(() => {
      expect(hookResult?.heatmap).toBeDefined();
    });
  });
});

describe('useAssistant - generateSuggestions logic', () => {
  const gen1SaveData: SaveData = {
    generation: 1,
    gameVersion: 'yellow',
    trainerName: 'YELLOW',
    trainerId: 12345,
    badges: 0,
    owned: new Set([25]),
    seen: new Set([25]),
    party: [25],
    pc: [],
    inventory: [],
    currentMapId: 0,
    currentBoxCount: 1,
    hallOfFameCount: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [
      {
        speciesId: 25,
        level: 5,
        otName: 'YELLOW',
        moves: [],
        isShiny: false,
        hash: '',
        dvs: { hp: 10, atk: 10, def: 10, spd: 10, spc: 10 },
        storageLocation: 'Party',
      },
    ],
    pcDetails: [],
    trainerIdRaw: new Uint8Array(2),
  } as unknown as SaveData;

  const mockApiData: AssistantApiData = {
    localEncounters: [],
    localAid: null,
    missingEncounters: {
      39: null,
      40: null,
      62: null,
    },
    areaNames: {},
    ancestralEncounters: {
      40: {
        39: { pid: 39, enc: [{ aid: 100, v: 3, d: [{ c: 50, method: 1, min: 2, max: 4 }] }] },
      },
      62: {
        60: { pid: 60, enc: [{ aid: 101, v: 3, d: [{ c: 50, method: 1, min: 2, max: 4 }] }] },
        61: null,
      },
    },
    pokemonMetadata: {
      39: {
        id: 39,
        n: 'Jigglypuff',
        cr: 170,
        gr: 6,
        baby: false,
        efrm: [],
        eto: [],
        det: [],
      } as unknown as PokemonMetadata,
      40: {
        id: 40,
        n: 'Wigglytuff',
        cr: 50,
        gr: 6,
        baby: false,
        efrm: [39],
        det: [{ trigger: 3, item: 81 }],
        eto: [],
      } as unknown as PokemonMetadata,
      62: {
        id: 62,
        n: 'Poliwrath',
        cr: 45,
        gr: 4,
        baby: false,
        efrm: [61, 60],
        det: [{ trigger: 3, item: 84 }],
        eto: [],
      } as unknown as PokemonMetadata,
    },
    allLocations: [],
  };

  it('should NOT mark Wigglytuff as Trade Required in Pokémon Yellow (ancestor logic)', async () => {
    const { suggestions } = await generateSuggestions(gen1SaveData, false, 'yellow', mockApiData, gen1Strategy);
    const wigglyTrade = suggestions.find((s) => s.pokemonId === 40 && s.category === 'Trade');
    expect(wigglyTrade).toBeUndefined();
  });

  it('should NOT mark Poliwrath as Trade Required in Pokémon Yellow if Poliwag is catchable', async () => {
    const { suggestions } = await generateSuggestions(gen1SaveData, false, 'yellow', mockApiData, gen1Strategy);
    const poliTrade = suggestions.find((s) => s.pokemonId === 62 && s.category === 'Trade');
    expect(poliTrade).toBeUndefined();
  });

  it('should mark Version Exclusives as Trade Required', async () => {
    const exclusiveApiData: AssistantApiData = {
      ...mockApiData,
      missingEncounters: {
        13: null,
      },
      ancestralEncounters: {
        13: {},
      },
      pokemonMetadata: {
        ...mockApiData.pokemonMetadata,
        13: {
          id: 13,
          n: 'Weedle',
          cr: 255,
          gr: 4,
          baby: false,
          efrm: [],
          det: [],
          eto: [],
        } as unknown as PokemonMetadata,
      },
    };

    const { suggestions } = await generateSuggestions(gen1SaveData, false, 'yellow', exclusiveApiData, gen1Strategy);
    const weedleTrade = suggestions.find((s) => s.pokemonId === 13 && s.category === 'Trade');
    expect(weedleTrade).toBeDefined();
    expect(weedleTrade?.title).toContain('Version Exclusive');
  });

  it('should NOT duplicate "Catch Right Here" when found in both local and nearby logic', async () => {
    const duplicateApiData: AssistantApiData = {
      ...mockApiData,
      localEncounters: [
        {
          pid: 16,
          enc: [{ aid: 1, v: 3, d: [{ c: 50, method: 1, min: 2, max: 4 }] }],
        },
      ],
      localAid: 1,
      missingEncounters: {
        16: {
          pid: 16,
          enc: [{ aid: 1, v: 3, d: [{ c: 50, method: 1, min: 2, max: 4 }] }],
        },
      },
    };

    const testSaveData = { ...gen1SaveData, currentMapId: 0x0c, owned: new Set([25]) } as unknown as SaveData;
    const { suggestions } = await generateSuggestions(testSaveData, false, 'yellow', duplicateApiData, gen1Strategy);

    const catchRightHereTips = suggestions.filter((s) => s.title === 'Catch Right Here');
    expect(catchRightHereTips.length).toBe(1);
    expect(catchRightHereTips[0]?.id).toBe('catch-local');
  });
});
