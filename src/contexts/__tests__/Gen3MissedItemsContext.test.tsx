import type React from 'react';
import { Component } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { Gen3SaveData } from '../../engine/saveParser/parsers/common';
import { useStore } from '../../store';
import { Gen3MissedItemsProvider, useGen3MissedItems } from '../Gen3MissedItemsContext';

vi.mock('../../store', () => ({
  useStore: vi.fn<() => void>(),
}));

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return <div>Error caught</div>;
    }
    return this.props.children;
  }
}

const TestComponentForState = () => {
  const { missedItemsData } = useGen3MissedItems();
  return <div data-testid="test-comp">{missedItemsData ? JSON.stringify(missedItemsData) : 'null'}</div>;
};

const TestComponentForError = () => {
  useGen3MissedItems();
  return <div data-testid="error-message">Should not render</div>;
};

describe('Gen3MissedItemsContext', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const renderWithProvider = async (saveData: Partial<Gen3SaveData> | null) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // biome-ignore lint/suspicious/noExplicitAny: Mock function implementation
    vi.mocked(useStore).mockImplementation((selector: any) => selector({ saveData }));

    await render(
      <Gen3MissedItemsProvider>
        <TestComponentForState />
      </Gen3MissedItemsProvider>,
    );
  };

  it('provides null when no save data exists', async () => {
    await renderWithProvider(null);
    await expect.element(page.getByTestId('test-comp')).toHaveTextContent('null');
  });

  it('provides null when save data is not gen 3', async () => {
    await renderWithProvider({ generation: 2 } as unknown as Gen3SaveData);
    await expect.element(page.getByTestId('test-comp')).toHaveTextContent('null');
  });

  it('provides null when gen3MissedItemsAndMilestones is missing from gen 3 save', async () => {
    await renderWithProvider({ generation: 3 } as unknown as Gen3SaveData);
    await expect.element(page.getByTestId('test-comp')).toHaveTextContent('null');
  });

  it('provides missed items data from a valid gen 3 save', async () => {
    const mockData = { missedMasterBall: true, missedLegendaries: ['Kyogre'] };
    await renderWithProvider({
      generation: 3,
      gen3MissedItemsAndMilestones: mockData,
    } as unknown as Gen3SaveData);
    await expect.element(page.getByTestId('test-comp')).toHaveTextContent(JSON.stringify(mockData));
  });

  it('throws an error if used outside of provider', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    await render(
      <ErrorBoundary>
        <TestComponentForError />
      </ErrorBoundary>,
    );

    await expect.element(page.getByText('Error caught')).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
