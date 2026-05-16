import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagDashboard } from '../DagDashboard';

test('DagDashboard renders correctly on successful load', async () => {
  // Mock fetch to return some dummy DAG data corresponding to ParsedNode structure
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
          title: 'Node 1',
          depends_on: [],
        },
      },
      {
        filePath: 'node-2.md',
        data: {
          id: 'node-2',
          type: 'TASK',
          status: 'ACTIVE',
          owner_persona: 'human',
          title: 'Node 2',
          parent: 'node-1.md',
          depends_on: ['node-1.md'],
        },
      },
    ],
  } as unknown as Response);

  await render(
    <div style={{ width: '800px', height: '600px' }}>
      <DagDashboard />
    </div>,
  );

  // Wait for fetch to complete and nodes to be rendered
  await vi.waitUntil(
    async () => {
      // DagDashboard maps the graph node id to data.label. The element is rendered in a div with text content matching the id.
      const nodes = page.getByText('node-1').all();
      return nodes.length > 0;
    },
    { timeout: 2000 },
  );

  await expect.element(page.getByText('node-1')).toBeInTheDocument();
  await expect.element(page.getByText('node-2')).toBeInTheDocument();
});

test('DagDashboard catches and logs fetch errors securely', async () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  // Mock fetch to fail
  globalThis.fetch = vi.fn<typeof fetch>().mockRejectedValue(new Error('Network error'));

  await render(
    <div style={{ width: '800px', height: '600px' }}>
      <DagDashboard />
    </div>,
  );

  // Wait for the finally block to execute (loading is false)
  // Even if nodes fail to load, the loading indicator should disappear.
  await vi.waitUntil(async () => {
    // Check that we aren't seeing the loading text
    const loadingEl = page.getByText('[ SYSTEM.LOADING_DAG ]').all();
    return loadingEl.length === 0;
  });

  // Verify generic log
  expect(consoleErrorSpy).toHaveBeenCalledWith('System: DAG loading failed');

  consoleErrorSpy.mockRestore();
});
