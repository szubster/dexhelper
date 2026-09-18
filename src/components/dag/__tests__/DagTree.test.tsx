import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagTree } from '../DagTree';
import { DagTreeProvider } from '../DagTreeContext';

const mockExpandAll = vi.fn<() => void>();
const mockCollapseAll = vi.fn<() => void>();

vi.mock('../../dashboard/DagContext', () => ({
  useDagContext: () => ({
    nodes: [
      { id: '1', data: { status: 'COMPLETED', title: 'Root Node', type: 'STORY' } },
      { id: '2', data: { status: 'ACTIVE', title: 'Child Node 1', type: 'TASK' } },
      { id: '3', data: { status: 'READY', title: 'Child Node 2', type: 'TASK' } },
    ],
    edges: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
    ],
  }),
}));

vi.mock('../DagTreeContext', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../DagTreeContext')>();
  return {
    ...mod,
    useDagTreeContext: () => ({
      expandedNodes: new Set(['1']),
      toggleNode: vi.fn<() => void>(),
      expandAll: mockExpandAll,
      collapseAll: mockCollapseAll,
    }),
  };
});

describe('DagTree', () => {
  it('renders root nodes and their children based on edges', async () => {
    await render(
      <DagTreeProvider>
        <DagTree />
      </DagTreeProvider>,
    );

    await expect.element(page.getByText('Root Node')).toBeVisible();
    await expect.element(page.getByText('Child Node 1')).toBeVisible();
    await expect.element(page.getByText('Child Node 2')).toBeVisible();
  });

  it('renders Expand All and Collapse All buttons', async () => {
    await render(
      <DagTreeProvider>
        <DagTree />
      </DagTreeProvider>,
    );

    await expect.element(page.getByRole('button', { name: 'Expand All' })).toBeVisible();
    await expect.element(page.getByRole('button', { name: 'Collapse All' })).toBeVisible();
  });
});
