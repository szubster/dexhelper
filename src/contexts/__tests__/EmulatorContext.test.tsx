import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { useEmulatorStore } from '../../emulator/state/emulatorStore';
import { EmulatorProvider, useEmulatorState, useParsedSaveData } from '../EmulatorContext';

const TestComponentForState = () => {
  const bufferSize = useEmulatorState((state) => state.bufferSize);
  return <div data-testid="buffer-size">{bufferSize}</div>;
};

const TestComponentForSaveData = () => {
  const saveData = useParsedSaveData();
  return <div data-testid="save-data">{saveData ? JSON.stringify(saveData) : 'null'}</div>;
};

// Component specifically to trigger the throw error test boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error) {
    // Only catch our expected error
    if (error.message === 'useEmulatorState must be used within an EmulatorProvider') {
      // Do nothing, we want to catch this.
    }
  }

  override render() {
    if (this.state.hasError) {
      return <div data-testid="error">Caught Error</div>;
    }
    return this.props.children;
  }
}

describe('EmulatorContext', () => {
  beforeEach(() => {
    // Reset the store state before each test
    const initialState = useEmulatorStore.getInitialState();
    useEmulatorStore.setState(initialState, true);
  });

  it('should throw an error if useEmulatorState is used outside of EmulatorProvider', async () => {
    // We expect ErrorBoundary to catch the error and render "Caught Error"
    const screen = await render(
      <ErrorBoundary>
        <TestComponentForState />
      </ErrorBoundary>,
    );

    await expect.element(screen.getByTestId('error')).toHaveTextContent('Caught Error');
  });

  it('should provide the state correctly when wrapped in EmulatorProvider', async () => {
    const screen = await render(
      <EmulatorProvider>
        <TestComponentForState />
      </EmulatorProvider>,
    );

    await expect.element(screen.getByTestId('buffer-size')).toHaveTextContent('0');

    // Update store state directly
    useEmulatorStore.setState({ bufferSize: 1024 });
    await expect.element(screen.getByTestId('buffer-size')).toHaveTextContent('1024');
  });

  it('should provide parsed save data correctly using useParsedSaveData', async () => {
    const screen = await render(
      <EmulatorProvider>
        <TestComponentForSaveData />
      </EmulatorProvider>,
    );

    await expect.element(screen.getByTestId('save-data')).toHaveTextContent('null');

    // Mock save data update
    // biome-ignore lint/suspicious/noExplicitAny: mocked save data
    const mockSaveData = { generation: 3, gameVersion: 'emerald' } as any;
    useEmulatorStore.setState({ saveData: mockSaveData });

    await expect.element(screen.getByTestId('save-data')).toHaveTextContent(JSON.stringify(mockSaveData));
  });
});
