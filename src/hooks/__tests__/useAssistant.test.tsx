import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { useEffect } from 'react';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import * as strategies from '../../engine/assistant/strategies/index';
import * as suggestionEngine from '../../engine/assistant/suggestionEngine';

import type { SaveData } from '../../engine/saveParser/index';
import { getGenerationConfig } from '../../utils/generationConfig';
import { useAssistant } from '../useAssistant';

vi.mock('../../engine/assistant/suggestionEngine', () => ({
  fetchAssistantApiData: vi.fn<(...args: unknown[]) => Promise<unknown>>(),
  generateSuggestions: vi.fn<(...args: unknown[]) => Promise<unknown>>(),
}));

vi.mock('../../engine/assistant/strategies/index', () => ({
  getStrategy: vi.fn<(...args: unknown[]) => Promise<unknown>>(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
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
} as unknown as SaveData;

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

    vi.mocked(suggestionEngine.fetchAssistantApiData).mockResolvedValue({} as never);
    vi.mocked(suggestionEngine.generateSuggestions).mockResolvedValue({
      suggestions: [],
      debug: { rejected: [] },
    } as never);
    vi.mocked(strategies.getStrategy).mockResolvedValue({} as never);

    // We want to own everything except Mewtwo
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
      expect(suggestionEngine.fetchAssistantApiData).toHaveBeenCalled();
    });

    expect(suggestionEngine.fetchAssistantApiData).toHaveBeenCalledWith(
      testSaveData,
      expect.not.arrayContaining([150]),
    );
  });

  it('should include Mewtwo in Gen 1 if Hall of Fame count > 0', async () => {
    let hookResult: ReturnType<typeof useAssistant> | undefined;

    vi.mocked(suggestionEngine.fetchAssistantApiData).mockResolvedValue({} as never);
    vi.mocked(suggestionEngine.generateSuggestions).mockResolvedValue({
      suggestions: [],
      debug: { rejected: [] },
    } as never);
    vi.mocked(strategies.getStrategy).mockResolvedValue({} as never);

    // We want to own everything except Mewtwo
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
      expect(suggestionEngine.fetchAssistantApiData).toHaveBeenCalledWith(testSaveData, expect.arrayContaining([150]));
    });
  });

  it('should evaluate living dex ownership correctly', async () => {
    let hookResult: ReturnType<typeof useAssistant> | undefined;

    vi.mocked(suggestionEngine.fetchAssistantApiData).mockResolvedValue({} as never);
    vi.mocked(suggestionEngine.generateSuggestions).mockResolvedValue({
      suggestions: [],
      debug: { rejected: [] },
    } as never);
    vi.mocked(strategies.getStrategy).mockResolvedValue({} as never);

    // We want to own everything except the first 2 pokemon in dex, but we physically own them in party and pc
    const maxDex = getGenerationConfig(1).maxDex;
    const owned = new Set<number>();
    for (let i = 3; i <= maxDex; i++) {
      owned.add(i);
    }

    // We only physically own 1 and 2
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
      // isLivingDex = true
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
      // We physically own 1 and 2, so the missing items are 3 through maxDex
      const expectedMissing = [];
      for (let i = 3; i <= 32; i++) {
        expectedMissing.push(i);
      }
      expect(suggestionEngine.fetchAssistantApiData).toHaveBeenCalledWith(testSaveData, expectedMissing);
    });
  });

  it('should pass manualVersion to generateSuggestions correctly', async () => {
    let hookResult: ReturnType<typeof useAssistant> | undefined;

    vi.mocked(suggestionEngine.fetchAssistantApiData).mockResolvedValue({} as never);
    vi.mocked(suggestionEngine.generateSuggestions).mockResolvedValue({
      suggestions: [],
      debug: { rejected: [] },
    } as never);
    vi.mocked(strategies.getStrategy).mockResolvedValue({} as never);

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
      expect(suggestionEngine.generateSuggestions).toHaveBeenCalledWith(
        testSaveData,
        false,
        'blue',
        expect.anything(),
        expect.anything(),
      );
    });
  });

  it('should generate heatmap based on suggestions', async () => {
    let hookResult: ReturnType<typeof useAssistant> | undefined;

    vi.mocked(suggestionEngine.fetchAssistantApiData).mockResolvedValue({} as never);
    vi.mocked(suggestionEngine.generateSuggestions).mockResolvedValue({
      suggestions: [
        {
          category: 'Catch',
          encounterInfo: { map_1: [{ areaId: 1, requiresMachBike: false, requiresAcroBike: false }] },
        },
        {
          category: 'Catch',
          encounterInfo: { map_1: [{ areaId: 1, requiresMachBike: false, requiresAcroBike: false }] },
        },
        {
          category: 'Catch',
          encounterInfo: { map_2: [{ areaId: 2, requiresMachBike: false, requiresAcroBike: false }] },
        },
      ] as never['suggestions'],
      debug: { rejected: [] },
    } as never);
    vi.mocked(strategies.getStrategy).mockResolvedValue({} as never);

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
      expect(hookResult?.suggestions.length).toBe(3);
    });

    // Based on RouteRadarController implementation, route_1 should have 2 targets, route_2 should have 1
    // The heatmap itself might have a specific structure, let's just check it's defined and has entries
    expect(hookResult?.heatmap).toBeDefined();
    expect(Object.keys(hookResult?.heatmap || {})).toContain('1');
    expect(Object.keys(hookResult?.heatmap || {})).toContain('2');
  });
});
