import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonMetadata } from '../db/schema';
import { gen1Strategy } from '@dexhelper/engine/assistant/strategies/gen1Strategy';
import { generateSuggestions } from '@dexhelper/engine/assistant/suggestionEngine';
import type { AssistantApiData } from '@dexhelper/engine/assistant/suggestionEngineTypes';
import type { SaveData } from '@dexhelper/engine/saveParser/index';
import { useAssistant } from './useAssistant';

// We mock fetchAssistantApiData to simulate network/DB queries
vi.mock('@dexhelper/engine/assistant/suggestionEngine', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@dexhelper/engine/assistant/suggestionEngine')>();
  return {
    ...actual,
    // biome-ignore lint/suspicious/noExplicitAny: generic fn mock
    fetchAssistantApiData: vi.fn<(...args: any[]) => Promise<any>>(),
  };
});

import { fetchAssistantApiData } from '@dexhelper/engine/assistant/suggestionEngine';

describe('useAssistant hook logic', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
      },
    });
  });

  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'yellow',
    trainerName: 'YELLOW',
    trainerId: 12345,
    badges: 0,
    owned: new Set([25]), // Only Pikachu
    seen: new Set([25]),
    party: [25],
    pc: [],
    inventory: [],
    currentMapId: 0,
    currentBoxCount: 1,
    hallOfFameCount: 0,
    eventFlags: new Uint8Array(300),
    partyDetails: [],
    pcDetails: [],
    trainerIdRaw: new Uint8Array(2),
  } as unknown as SaveData;

  const HookWrapper = ({
    saveData,
    isLivingDex,
    manualVersion,
  }: {
    saveData: SaveData | null;
    isLivingDex: boolean;
    manualVersion?: string;
  }) => {
    const result = useAssistant(saveData, isLivingDex, manualVersion);
    return (
      <div data-testid="result">
        <span data-testid="isLoading">{String(result.isLoading)}</span>
        <span data-testid="suggestionsCount">{result.suggestions.length}</span>
      </div>
    );
  };

  it('returns default state when saveData is null', async () => {
    await render(
      <QueryClientProvider client={queryClient}>
        <HookWrapper saveData={null} isLivingDex={false} manualVersion="red" />
      </QueryClientProvider>,
    );

    await expect.element(page.getByTestId('isLoading')).toHaveTextContent('false');
    await expect.element(page.getByTestId('suggestionsCount')).toHaveTextContent('0');
  });

  it('identifies missing Pokemon and fetches data', async () => {
    const apiData: AssistantApiData = {
      areaNames: { 1: 'Pallet Town' },
      missingEncounters: {},
      localEncounters: [],
      localAid: null,
      ancestralEncounters: {},
      pokemonMetadata: {},
      allLocations: [],
    };
    // biome-ignore lint/suspicious/noExplicitAny: Required to bypass recursive type complexities in mock data
    vi.mocked(fetchAssistantApiData).mockReturnValue(Promise.resolve(apiData as unknown as any));

    await render(
      <QueryClientProvider client={queryClient}>
        <HookWrapper saveData={mockSaveData} isLivingDex={false} manualVersion="yellow" />
      </QueryClientProvider>,
    );

    // Initial state will be loading
    await expect.element(page.getByTestId('isLoading')).toHaveTextContent('true');

    // Wait for the query to resolve
    await expect.element(page.getByTestId('isLoading')).toHaveTextContent('false');

    expect(fetchAssistantApiData).toHaveBeenCalled();
  });

  it('handles living dex check correctly', async () => {
    const apiData: AssistantApiData = {
      areaNames: {},
      missingEncounters: {},
      localEncounters: [],
      localAid: null,
      ancestralEncounters: {},
      pokemonMetadata: {},
      allLocations: [],
    };
    // biome-ignore lint/suspicious/noExplicitAny: Required to bypass recursive type complexities in mock data
    vi.mocked(fetchAssistantApiData).mockReturnValue(Promise.resolve(apiData as unknown as any));

    const livingDexSave = {
      ...mockSaveData,
      owned: new Set([1]),
      party: [2],
      pc: [],
    };

    await render(
      <QueryClientProvider client={queryClient}>
        <HookWrapper saveData={livingDexSave as unknown as SaveData} isLivingDex={true} manualVersion="yellow" />
      </QueryClientProvider>,
    );

    await expect.element(page.getByTestId('isLoading')).toHaveTextContent('false');

    expect(fetchAssistantApiData).toHaveBeenCalled();
    // 1 should be considered missing in living dex if it's not in party/pc
    const callArgs = vi.mocked(fetchAssistantApiData).mock.calls[0]?.[1];
    expect(callArgs).toContain(1);
  });

  it('ignores Mewtwo in gen 1 if HoF count is 0', async () => {
    const apiData: AssistantApiData = {
      areaNames: {},
      missingEncounters: {},
      localEncounters: [],
      localAid: null,
      ancestralEncounters: {},
      pokemonMetadata: {},
      allLocations: [],
    };
    // biome-ignore lint/suspicious/noExplicitAny: Required to bypass recursive type complexities in mock data
    vi.mocked(fetchAssistantApiData).mockReturnValue(Promise.resolve(apiData as unknown as any));

    const saveWithoutHoF = {
      ...mockSaveData,
      generation: 1,
      hallOfFameCount: 0,
    };

    await render(
      <QueryClientProvider client={queryClient}>
        <HookWrapper saveData={saveWithoutHoF as unknown as SaveData} isLivingDex={false} manualVersion="yellow" />
      </QueryClientProvider>,
    );

    await expect.element(page.getByTestId('isLoading')).toHaveTextContent('false');

    const callArgs = vi.mocked(fetchAssistantApiData).mock.calls[0]?.[1];
    expect(callArgs).not.toContain(150);
  });
});

describe('useAssistant - generateSuggestions logic', () => {
  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'yellow',
    trainerName: 'YELLOW',
    trainerId: 12345,
    badges: 0,
    owned: new Set([25]), // Only Pikachu
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

  const mockApiData: Partial<AssistantApiData> = {
    localEncounters: [],
    missingEncounters: {
      39: null, // Jigglypuff
      40: null, // Wigglytuff
      62: null, // Poliwrath
    },
    areaNames: {},
    ancestralEncounters: {
      40: {
        39: { pid: 39, enc: [{ aid: 100, v: 3, d: [{ c: 50, m: 1, min: 2, max: 4 }] }] }, // Jigglypuff in Yellow
      },
      62: {
        60: { pid: 60, enc: [{ aid: 101, v: 3, d: [{ c: 50, m: 1, min: 2, max: 4 }] }] }, // Poliwag catchable
        61: null, // Poliwhirl not directly catchable
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
        det: [{ tr: 3, item: 81 }],
        eto: [],
      } as unknown as PokemonMetadata,
      62: {
        id: 62,
        n: 'Poliwrath',
        cr: 45,
        gr: 4,
        baby: false,
        efrm: [61, 60],
        det: [{ tr: 3, item: 84 }],
        eto: [],
      } as unknown as PokemonMetadata,
    },
    allLocations: [],
  };

  it('should NOT mark Wigglytuff as Trade Required in Pokémon Yellow (ancestor logic)', async () => {
    const { suggestions } = await generateSuggestions(
      mockSaveData,
      false,
      'yellow',
      mockApiData as AssistantApiData,
      gen1Strategy,
    );
    const wigglyTrade = suggestions.find((s) => s.pokemonId === 40 && s.category === 'Trade');
    expect(wigglyTrade).toBeUndefined();
  });

  it('should NOT mark Poliwrath as Trade Required in Pokémon Yellow if Poliwag is catchable', async () => {
    const { suggestions } = await generateSuggestions(
      mockSaveData,
      false,
      'yellow',
      mockApiData as AssistantApiData,
      gen1Strategy,
    );
    const poliTrade = suggestions.find((s) => s.pokemonId === 62 && s.category === 'Trade');
    expect(poliTrade).toBeUndefined();
  });

  it('should mark Version Exclusives as Trade Required', async () => {
    const exclusiveApiData = {
      ...mockApiData,
      missingEncounters: {
        13: null,
      },
      ancestralEncounters: {
        13: {}, // No ancestors catchable either
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

    const { suggestions } = await generateSuggestions(
      mockSaveData,
      false,
      'yellow',
      exclusiveApiData as unknown as AssistantApiData,
      gen1Strategy,
    );
    const weedleTrade = suggestions.find((s) => s.pokemonId === 13 && s.category === 'Trade');
    expect(weedleTrade).toBeDefined();
    expect(weedleTrade?.title).toContain('Version Exclusive');
  });

  it('should NOT duplicate "Catch Right Here" when found in both local and nearby logic', async () => {
    const duplicateApiData = {
      ...mockApiData,
      localEncounters: [
        {
          pid: 16,
          enc: [{ aid: 1, v: 3, d: [{ c: 50, m: 1, min: 2, max: 4 }] }],
        },
      ],
      localAid: 1,
      missingEncounters: {
        16: {
          pid: 16,
          enc: [{ aid: 1, v: 3, d: [{ c: 50, m: 1, min: 2, max: 4 }] }],
        },
      },
    };

    // Current map matches localAid slug
    const testSaveData = { ...mockSaveData, currentMapId: 0x0c, owned: new Set([25]) } as unknown as SaveData;
    const { suggestions } = await generateSuggestions(
      testSaveData,
      false,
      'yellow',
      duplicateApiData as unknown as AssistantApiData,
      gen1Strategy,
    );

    const catchRightHereTips = suggestions.filter((s) => s.title === 'Catch Right Here');
    expect(catchRightHereTips.length).toBe(1);
    expect(catchRightHereTips[0]?.id).toBe('catch-local');
  });
});
