import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import * as suggestionEngineModule from '../../engine/assistant/suggestionEngine';
import type { SaveData } from '../../engine/saveParser/index';
import { useAssistant } from '../useAssistant';

// Mock dependencies
vi.mock('../../engine/assistant/suggestionEngine', () => ({
  fetchAssistantApiData: vi.fn<(...args: unknown[]) => unknown>(),
  generateSuggestions: vi.fn<(...args: unknown[]) => unknown>(),
}));

vi.mock('../../engine/radar/RouteRadarController', () => {
  return {
    RouteRadarController: class {
      calculateHeatmap() {
        return [{ locationId: 1, intensity: 0.5 }];
      }
    },
  };
});

vi.mock('../../engine/assistant/strategies/index', () => ({
  getStrategy: vi.fn<(...args: unknown[]) => unknown>().mockResolvedValue({}),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

let hookResult: ReturnType<typeof useAssistant> | null = null;
const TestComponent = ({ saveData, isLivingDex }: { saveData: SaveData | null; isLivingDex: boolean }) => {
  const result = useAssistant(saveData, isLivingDex);
  React.useEffect(() => {
    hookResult = result;
  }, [result]);
  return <div data-testid="test-comp" />;
};

describe('useAssistant hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
    hookResult = null;
  });

  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'red',
    trainerName: 'Ash',
    trainerId: 12345,
    secretId: 0,
    playTime: { hours: 10, minutes: 20, seconds: 30 },
    party: [1],
    pc: [2, 3],
    owned: new Set([1, 2, 3]),
    badges: 8,
    money: 1000,
    inventory: [],
    currentMapId: 1,
    checksumValid: true,
  } as unknown as SaveData;

  it('should return empty suggestions when no save data is provided', async () => {
    await render(<TestComponent saveData={null} isLivingDex={false} />, { wrapper });

    await vi.waitFor(() => {
      expect(hookResult?.suggestions).toEqual([]);
      expect(hookResult?.isLoading).toBe(false);
      expect(hookResult?.debug.rejected).toEqual([]);
    });
  });

  it('should call fetchAssistantApiData and generateSuggestions with save data', async () => {
    const mockApiData = { areaNames: { 1: 'Pallet Town' }, localEncounters: [] };
    const mockSuggestionsResult = {
      suggestions: [{ id: 's1', pokemonId: 4, priority: 100 }],
      debug: { rejected: [] },
    };

    vi.mocked(suggestionEngineModule.fetchAssistantApiData).mockResolvedValue(mockApiData as never);
    vi.mocked(suggestionEngineModule.generateSuggestions).mockResolvedValue(mockSuggestionsResult as never);

    await render(<TestComponent saveData={mockSaveData} isLivingDex={false} />, { wrapper });

    await vi.waitFor(() => {
      expect(hookResult?.isLoading).toBe(false);
    });

    expect(suggestionEngineModule.fetchAssistantApiData).toHaveBeenCalledWith(
      mockSaveData,
      expect.any(Array), // queryTargetsSlice
    );

    expect(suggestionEngineModule.generateSuggestions).toHaveBeenCalledWith(
      mockSaveData,
      false, // isLivingDex
      undefined, // manualVersion
      mockApiData,
      expect.anything(), // strategy
    );

    expect(hookResult?.suggestions).toEqual(mockSuggestionsResult.suggestions);
    expect(hookResult?.areaNames).toEqual(mockApiData.areaNames);
    expect(hookResult?.heatmap).toEqual([{ locationId: 1, intensity: 0.5 }]);
  });

  it('should handle isLivingDex=true mode by using physical storage instead of owned flag', async () => {
    vi.mocked(suggestionEngineModule.fetchAssistantApiData).mockResolvedValue({ localEncounters: [] } as never);
    vi.mocked(suggestionEngineModule.generateSuggestions).mockResolvedValue({
      suggestions: [],
      debug: { rejected: [] },
    } as never);

    await render(<TestComponent saveData={mockSaveData} isLivingDex={true} />, { wrapper });

    await vi.waitFor(() => {
      expect(suggestionEngineModule.fetchAssistantApiData).toHaveBeenCalled();
    });

    expect(suggestionEngineModule.generateSuggestions).toHaveBeenCalledWith(
      mockSaveData,
      true, // isLivingDex
      undefined, // manualVersion
      expect.anything(),
      expect.anything(),
    );
  });

  it('should exclude Mewtwo logic if HOF count is 0 on Gen 1', async () => {
    vi.mocked(suggestionEngineModule.fetchAssistantApiData).mockResolvedValue({ localEncounters: [] } as never);
    vi.mocked(suggestionEngineModule.generateSuggestions).mockResolvedValue({
      suggestions: [],
      debug: { rejected: [] },
    } as never);

    const noHofGen1Save = { ...mockSaveData, hallOfFameCount: 0 };
    await render(<TestComponent saveData={noHofGen1Save as SaveData} isLivingDex={false} />, { wrapper });

    await vi.waitFor(() => {
      expect(suggestionEngineModule.fetchAssistantApiData).toHaveBeenCalled();
    });

    const queryTargetsSlice = vi.mocked(suggestionEngineModule.fetchAssistantApiData).mock.calls[0]?.[1] as number[];
    expect(queryTargetsSlice).not.toContain(150);
  });

  it('should include Mewtwo logic if HOF count is > 0 on Gen 1', async () => {
    queryClient.clear();

    vi.mocked(suggestionEngineModule.fetchAssistantApiData).mockResolvedValue({ localEncounters: [] } as never);
    vi.mocked(suggestionEngineModule.generateSuggestions).mockResolvedValue({
      suggestions: [],
      debug: { rejected: [] },
    } as never);

    const ownedArr = Array.from({ length: 145 }, (_, i) => i + 1);
    const hofGen1Save = { ...mockSaveData, hallOfFameCount: 1, owned: new Set(ownedArr) };
    await render(<TestComponent saveData={hofGen1Save as SaveData} isLivingDex={false} />, { wrapper });

    await vi.waitFor(() => {
      expect(suggestionEngineModule.fetchAssistantApiData).toHaveBeenCalled();
    });

    const queryTargetsSlice = vi.mocked(suggestionEngineModule.fetchAssistantApiData).mock.calls[0]?.[1] as number[];
    expect(queryTargetsSlice).toContain(150);
  });
});
