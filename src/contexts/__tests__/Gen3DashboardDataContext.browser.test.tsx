import type { ErrorInfo, ReactNode } from 'react';
import { Component, useEffect } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { type Gen3DashboardData, Gen3DashboardDataProvider, useGen3DashboardData } from '../Gen3DashboardDataContext';

vi.mock('../../store', () => ({
  useStore: vi.fn<() => void>(),
}));

function TestComponent({ onRender }: { onRender: (data: ReturnType<typeof useGen3DashboardData>) => void }) {
  const data = useGen3DashboardData();

  useEffect(() => {
    onRender(data);
  }, [data, onRender]);

  return null;
}

class ErrorBoundary extends Component<{ children: ReactNode; onError: (error: Error) => void }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
    this.props.onError(error);
  }

  override render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

describe('Gen3DashboardDataContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return empty/default data when generation is not 3', async () => {
    vi.mocked(useStore).mockReturnValue({ generation: 2 });

    let renderResult = null as Gen3DashboardData | null;
    const handleRender = vi.fn<(data: Gen3DashboardData) => void>((data: Gen3DashboardData) => {
      renderResult = data;
    });

    await render(
      <Gen3DashboardDataProvider>
        <TestComponent onRender={handleRender} />
      </Gen3DashboardDataProvider>,
    );

    await vi.waitFor(() => {
      expect(handleRender).toHaveBeenCalled();
    });

    expect(renderResult?.missingNational.size).toBe(0);
    expect(renderResult?.missingHoenn.size).toBe(0);
    expect(renderResult?.missedMasterBall).toBe(false);
    expect(renderResult?.missedLegendaries).toEqual([]);
    expect(renderResult?.trainerCard).toBeNull();
  });

  it('should extract correct data when generation is 3', async () => {
    const mockSaveData = {
      generation: 3,
      missingNationalDex: new Set([1, 2, 3]),
      missingHoennDex: new Set([4, 5]),
      gen3MissedItemsAndMilestones: {
        missedMasterBall: true,
        missedLegendaries: ['Groudon'],
      },
      gen3TrainerCard: {
        hasHallOfFame: true,
        hasHoennDex: false,
        hasNationalDex: false,
        hasBattleFrontier: true,
        hasContestMaster: false,
      },
    };

    vi.mocked(useStore).mockImplementation((selector: unknown) => {
      const s = selector as (state: unknown) => unknown;
      return s({ saveData: mockSaveData });
    });

    let renderResult = null as Gen3DashboardData | null;
    const handleRender = vi.fn<(data: Gen3DashboardData) => void>((data: Gen3DashboardData) => {
      renderResult = data;
    });

    await render(
      <Gen3DashboardDataProvider>
        <TestComponent onRender={handleRender} />
      </Gen3DashboardDataProvider>,
    );

    await vi.waitFor(() => {
      expect(handleRender).toHaveBeenCalled();
    });

    expect(renderResult?.missingNational).toEqual(new Set([1, 2, 3]));
    expect(renderResult?.missingHoenn).toEqual(new Set([4, 5]));
    expect(renderResult?.missedMasterBall).toBe(true);
    expect(renderResult?.missedLegendaries).toEqual(['Groudon']);
    expect(renderResult?.trainerCard).toEqual({
      hasHallOfFame: true,
      hasHoennDex: false,
      hasNationalDex: false,
      hasBattleFrontier: true,
      hasContestMaster: false,
    });
  });

  it('should handle missing optional properties in Gen 3 save data', async () => {
    const mockSaveData = {
      generation: 3,
    };

    vi.mocked(useStore).mockImplementation((selector: unknown) => {
      const s = selector as (state: unknown) => unknown;
      return s({ saveData: mockSaveData });
    });

    let renderResult = null as Gen3DashboardData | null;
    const handleRender = vi.fn<(data: Gen3DashboardData) => void>((data: Gen3DashboardData) => {
      renderResult = data;
    });

    await render(
      <Gen3DashboardDataProvider>
        <TestComponent onRender={handleRender} />
      </Gen3DashboardDataProvider>,
    );

    await vi.waitFor(() => {
      expect(handleRender).toHaveBeenCalled();
    });

    expect(renderResult?.missingNational.size).toBe(0);
    expect(renderResult?.missingHoenn.size).toBe(0);
    expect(renderResult?.missedMasterBall).toBe(false);
    expect(renderResult?.missedLegendaries).toEqual([]);
    expect(renderResult?.trainerCard).toBeNull();
  });

  it('should throw an error when useGen3DashboardData is used outside of provider', async () => {
    let capturedError: Error | null = null;

    const originalError = console.error;
    console.error = vi.fn<() => void>();

    await render(
      <ErrorBoundary
        onError={(e) => {
          capturedError = e;
        }}
      >
        <TestComponent onRender={() => {}} />
      </ErrorBoundary>,
    );

    await vi.waitFor(() => {
      expect(capturedError).not.toBeNull();
    });

    expect((capturedError as Error | null)?.message).toBe(
      'useGen3DashboardData must be used within a Gen3DashboardDataProvider',
    );

    console.error = originalError;
  });
});
