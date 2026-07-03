import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagWrapper } from '../DagWrapper';

test('DagWrapper renders DagProvider and DagDashboard without crashing', async () => {
  // We can just render the wrapper to get coverage
  // Need to mock fetch to prevent the provider from trying to fetch real data and crashing/hanging
  globalThis.fetch = vi.fn<typeof fetch>().mockResolvedValue({
    ok: true,
    json: async () => [],
  } as unknown as Response);

  await render(
    <div style={{ width: '800px', height: '600px' }}>
      <DagWrapper />
    </div>,
  );

  // Since nodes/edges are empty it will just render the ReactFlow container and the filter panel.
  await vi.waitUntil(
    async () => {
      const loadingEl = page.getByText('[ SYSTEM.LOADING_DAG ]').all();
      return loadingEl.length === 0;
    },
    { timeout: 2000 },
  );

  await expect.element(page.getByText('IDEA')).toBeInTheDocument();

  // Clean up
  vi.restoreAllMocks();
});
