import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Route } from '../../../routes/dag';
import { DagWrapper } from '../DagWrapper';

test('DagWrapper renders DagProvider and DagDashboard without crashing', async () => {
  // We can just render the wrapper to get coverage
  // Need to mock fetch to prevent the provider from trying to fetch real data and crashing/hanging
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
          rejection_count: 0,
          depends_on: [],
        },
      },
    ],
  } as unknown as Response);

  await render(
    <div style={{ width: '800px', height: '600px' }}>
      <DagWrapper />
    </div>,
  );

  await vi.waitUntil(
    async () => {
      const loadingEl = page.getByText('[ SYSTEM.LOADING_DAG ]').all();
      return loadingEl.length === 0;
    },
    { timeout: 2000 },
  );

  await expect.element(page.getByText('node-1')).toBeInTheDocument();

  // Test clicking heatmap overlay button
  const heatmapBtn = page.getByRole('button', { name: 'Toggle heatmap overlay' });
  await expect.element(heatmapBtn.first()).toBeInTheDocument();
  await heatmapBtn.first().click();

  // Test switching view mode to tree
  const treeTab = page.getByTestId('view-mode-tree');
  await expect.element(treeTab).toBeInTheDocument();
  await treeTab.click();

  // Switch back to board
  const boardTab = page.getByTestId('view-mode-board');
  await expect.element(boardTab).toBeInTheDocument();
  await boardTab.click();

  // Clean up
  vi.restoreAllMocks();
});

test('Dag route definition is correct', () => {
  expect(Route).toBeDefined();
  expect(Route.options.component).toBeDefined();
});
