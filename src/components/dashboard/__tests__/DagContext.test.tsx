import React from 'react';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagProvider, useDagContext } from '../DagContext';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  override render() {
    if (this.state.hasError) {
      return <div data-testid="error">{this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

function ErrorConsumer() {
  useDagContext();
  return <div>Should not see this</div>;
}

test('DagContext throws error outside provider', async () => {
  render(
    <ErrorBoundary>
      <ErrorConsumer />
    </ErrorBoundary>
  );

  await expect.element(page.getByTestId('error')).toHaveTextContent('useDagContext must be used within a DagProvider');
});

function ValidConsumer() {
  const context = useDagContext();
  return (
    <div>
      <div data-testid="active-view">{context.activeView}</div>
      <div data-testid="is-loading">{context.isLoading.toString()}</div>
      <button type="button" data-testid="set-board" onClick={() => context.setActiveView('board')}>Set Board</button>
      <button type="button" data-testid="set-loading" onClick={() => context.setIsLoading(false)}>Set Loading</button>
      <button type="button" data-testid="set-nodes" onClick={() => context.setNodes([{ id: '1', type: 'task', position: {x: 0, y:0}, data: { id: '1', type: 'TASK', status: 'READY', owner_persona: 'coder', depends_on: [], rejection_count: 0 } }])}>Set Nodes</button>
      <div data-testid="nodes-count">{context.nodes.length.toString()}</div>
      <button type="button" data-testid="set-edges" onClick={() => context.setEdges([{ id: 'e1', source: 'a', target: 'b' }])}>Set Edges</button>
      <div data-testid="edges-count">{context.edges.length.toString()}</div>
    </div>
  );
}

test('DagProvider provides default state and allows updates', async () => {
  render(
    <DagProvider>
      <ValidConsumer />
    </DagProvider>
  );

  // Check initial state
  await expect.element(page.getByTestId('active-view')).toHaveTextContent('graph');
  await expect.element(page.getByTestId('is-loading')).toHaveTextContent('true');
  await expect.element(page.getByTestId('nodes-count')).toHaveTextContent('0');
  await expect.element(page.getByTestId('edges-count')).toHaveTextContent('0');

  // Perform updates
  await page.getByTestId('set-board').click();
  await page.getByTestId('set-loading').click();
  await page.getByTestId('set-nodes').click();
  await page.getByTestId('set-edges').click();

  // Check updated state
  await expect.element(page.getByTestId('active-view')).toHaveTextContent('board');
  await expect.element(page.getByTestId('is-loading')).toHaveTextContent('false');
  await expect.element(page.getByTestId('nodes-count')).toHaveTextContent('1');
  await expect.element(page.getByTestId('edges-count')).toHaveTextContent('1');
});
