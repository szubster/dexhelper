import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import type { BaseSaveData } from '../../engine/saveParser/parsers/common';
import { useStore } from '../../store';
import { Gen3BattleFrontierProvider, useGen3BattleFrontier } from '../Gen3BattleFrontierContext';

vi.mock('../../store', () => ({
  useStore: vi.fn<typeof useStore>(),
}));

const TestComponent = () => {
  const { gen3BattleFrontierWinStreaks, gen3BattleFrontierSymbols } = useGen3BattleFrontier();
  return (
    <div>
      <div data-testid="streaks">{gen3BattleFrontierWinStreaks ? 'has_streaks' : 'no_streaks'}</div>
      <div data-testid="symbols">{gen3BattleFrontierSymbols ? 'has_symbols' : 'no_symbols'}</div>
    </div>
  );
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error) {
    if (error.message === 'useGen3BattleFrontier must be used within a Gen3BattleFrontierProvider') {
      // Do nothing, we expect this
    }
  }

  override render() {
    if (this.state.hasError) {
      return <div data-testid="error">Caught Error</div>;
    }
    return this.props.children;
  }
}

describe('Gen3BattleFrontierContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides null defaults when not generation 3', async () => {
    vi.mocked(useStore).mockReturnValue({ generation: 1 } as unknown as BaseSaveData);

    const screen = render(
      <Gen3BattleFrontierProvider>
        <TestComponent />
      </Gen3BattleFrontierProvider>,
    );

    await expect.element((await screen).getByTestId('streaks')).toHaveTextContent('no_streaks');
    await expect.element((await screen).getByTestId('symbols')).toHaveTextContent('no_symbols');
  });

  it('provides data when present and generation 3', async () => {
    vi.mocked(useStore).mockReturnValue({
      generation: 3,
      gen3BattleFrontierWinStreaks: { tower: { current: 1, record: 2 } },
      gen3BattleFrontierSymbols: { tower: { silver: true, gold: false } },
    } as unknown as BaseSaveData);

    const screen = render(
      <Gen3BattleFrontierProvider>
        <TestComponent />
      </Gen3BattleFrontierProvider>,
    );

    await expect.element((await screen).getByTestId('streaks')).toHaveTextContent('has_streaks');
    await expect.element((await screen).getByTestId('symbols')).toHaveTextContent('has_symbols');
  });

  it('throws an error if useGen3BattleFrontier is used outside of provider', async () => {
    const screen = render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>,
    );

    await expect.element((await screen).getByTestId('error')).toHaveTextContent('Caught Error');
  });
});
