import { Component, type ReactNode } from 'react';
import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagProvider, useDagContext, usePermanentlyFailedNodes } from '../DagContext';

const TestComponent = () => {
  const { maxRejectionThreshold, setActiveView, nodes } = useDagContext();
  const permanentlyFailedNodes = usePermanentlyFailedNodes();
  return (
    <div>
      <div data-testid="threshold">{maxRejectionThreshold}</div>
      <div data-testid="node-count">{nodes.length}</div>
      {nodes.length > 0 && <div data-testid="node-rejection">{nodes[0]?.data.rejection_count}</div>}
      <div data-testid="failed-count">{permanentlyFailedNodes.length}</div>
      <button type="button" data-testid="btn" onClick={() => setActiveView('board')}>
        Set View
      </button>
    </div>
  );
};

test('DagProvider provides maxRejectionThreshold and handles data loading correctly', async () => {
  globalThis.fetch = vi.fn<typeof fetch>().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        filePath: 'node-1.md',
        data: {
          id: 'node-1',
          type: 'TASK',
          status: 'COMPLETED',
          owner_persona: 'human',
          label: 'node',
          title: 'Node 1',
          rejection_count: 3,
          depends_on: [],
        },
      },
      {
        filePath: 'node-2.md',
        data: {
          id: 'node-2',
          type: 'TASK',
          status: 'FAILED',
          owner_persona: 'human',
          label: 'node',
          title: 'Node 2',
          rejection_count: 3,
          depends_on: [],
        },
      },
    ],
  } as unknown as Response);

  await render(
    <DagProvider>
      <TestComponent />
    </DagProvider>,
  );

  await expect.element(page.getByTestId('threshold')).toHaveTextContent('3');
  await expect.element(page.getByTestId('node-rejection')).toHaveTextContent('3');
  await expect.element(page.getByTestId('failed-count')).toHaveTextContent('1');
  await page.getByTestId('btn').click();
});

test('DagProvider handles load error gracefully', async () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  globalThis.fetch = vi.fn<typeof fetch>().mockResolvedValue({
    ok: false,
  } as unknown as Response);

  await render(
    <DagProvider>
      <TestComponent />
    </DagProvider>,
  );

  await expect.element(page.getByTestId('threshold')).toHaveTextContent('3');
  consoleErrorSpy.mockRestore();
});

class TestBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  override componentDidCatch(_error: Error) {
    // catch
  }
  override render() {
    if (this.state.hasError) {
      return <div data-testid="error">{this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

const ThrowingComponent = () => {
  useDagContext();
  return <div>test</div>;
};

test('useDagContext throws outside of provider', async () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  await render(
    <TestBoundary>
      <ThrowingComponent />
    </TestBoundary>,
  );

  await expect.element(page.getByTestId('error')).toHaveTextContent('useDagContext must be used within a DagProvider');

  consoleErrorSpy.mockRestore();
});
