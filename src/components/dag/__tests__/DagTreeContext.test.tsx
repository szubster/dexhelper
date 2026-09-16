import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagTreeProvider, useDagTreeContext } from '../DagTreeContext';

function TestComponent() {
  const { expandedNodes, toggleNode, expandAll, collapseAll } = useDagTreeContext();
  return (
    <div>
      <div data-testid="expanded-count">{expandedNodes.size}</div>
      <div data-testid="has-node-1">{expandedNodes.has('node-1') ? 'yes' : 'no'}</div>
      <button type="button" onClick={() => toggleNode('node-1')}>
        Toggle Node 1
      </button>
      <button type="button" onClick={() => expandAll(['node-1', 'node-2'])}>
        Expand All
      </button>
      <button type="button" onClick={() => collapseAll()}>
        Collapse All
      </button>
    </div>
  );
}

// Separate component to test the throw
function TestThrow() {
  useDagTreeContext();
  return null;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (e: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: (e: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  override render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

describe('DagTreeContext', () => {
  it('throws an error if used outside of DagTreeProvider', async () => {
    const onError = vi.fn<(e: Error) => void>();

    // Suppress React error logging for the expected throw
    const originalError = console.error;
    console.error = () => {};

    await render(
      <ErrorBoundary onError={onError}>
        <TestThrow />
      </ErrorBoundary>,
    );

    await expect.poll(() => onError).toHaveBeenCalled();
    expect(onError.mock.calls[0]?.[0]?.message).toBe('useDagTreeContext must be used within a DagTreeProvider');

    console.error = originalError;
  });

  it('provides state and functions', async () => {
    await render(
      <DagTreeProvider>
        <TestComponent />
      </DagTreeProvider>,
    );

    // Initial state
    await expect.element(page.getByTestId('expanded-count')).toHaveTextContent('0');
    await expect.element(page.getByTestId('has-node-1')).toHaveTextContent('no');

    // Toggle Node 1
    await page.getByRole('button', { name: 'Toggle Node 1' }).click();
    await expect.element(page.getByTestId('expanded-count')).toHaveTextContent('1');
    await expect.element(page.getByTestId('has-node-1')).toHaveTextContent('yes');

    // Toggle Node 1 again
    await page.getByRole('button', { name: 'Toggle Node 1' }).click();
    await expect.element(page.getByTestId('expanded-count')).toHaveTextContent('0');
    await expect.element(page.getByTestId('has-node-1')).toHaveTextContent('no');

    // Expand All
    await page.getByRole('button', { name: 'Expand All' }).click();
    await expect.element(page.getByTestId('expanded-count')).toHaveTextContent('2');
    await expect.element(page.getByTestId('has-node-1')).toHaveTextContent('yes');

    // Collapse All
    await page.getByRole('button', { name: 'Collapse All' }).click();
    await expect.element(page.getByTestId('expanded-count')).toHaveTextContent('0');
    await expect.element(page.getByTestId('has-node-1')).toHaveTextContent('no');
  });
});
