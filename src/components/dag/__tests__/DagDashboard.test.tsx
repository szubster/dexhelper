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
          label: 'node',
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
          label: 'node',
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

  // Test filtering functionality
  // node-1 is TASK/COMPLETED, node-2 is TASK/ACTIVE

  // Toggle off ACTIVE nodes
  const activeStatusButton = page.getByRole('button', { name: 'ACTIVE' });
  await activeStatusButton.click();

  // node-2 should disappear from the graph (and document)
  await expect.element(page.getByText('node-2')).not.toBeInTheDocument();
  // node-1 should still be visible
  await expect.element(page.getByText('node-1')).toBeInTheDocument();

  // Toggle off TASK type
  const taskTypeButton = page.getByRole('button', { name: 'TASK' });
  await taskTypeButton.click();

  // node-1 should also disappear
  await expect.element(page.getByText('node-1')).not.toBeInTheDocument();

  // Toggle TASK type back on
  await taskTypeButton.click();
  // node-1 should reappear
  await expect.element(page.getByText('node-1')).toBeInTheDocument();
});

test('DagDashboard handles selection and highlighting', async () => {
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
          label: 'node',
          title: 'Node 2',
          parent: 'node-1.md',
          depends_on: ['node-1.md'],
        },
      },
      {
        filePath: 'node-3.md',
        data: {
          id: 'node-3',
          type: 'TASK',
          status: 'PENDING',
          owner_persona: 'human',
          label: 'node-3',
          title: 'Node 3',
          depends_on: [],
        },
      },
      {
        filePath: 'node-4.md',
        data: {
          id: 'node-4',
          type: 'TASK',
          status: 'READY',
          owner_persona: 'human',
          label: 'node-4',
          title: 'Node 4',
          depends_on: [],
        },
      },
      {
        filePath: 'node-5.md',
        data: {
          id: 'node-5',
          type: 'TASK',
          status: 'FAILED',
          owner_persona: 'human',
          label: 'node-5',
          title: 'Node 5',
          depends_on: [],
        },
      },
    ],
  } as unknown as Response);

  await render(
    <div style={{ width: '800px', height: '600px' }}>
      <DagDashboard />
    </div>,
  );

  await vi.waitUntil(
    async () => {
      const nodes = page.getByText('node-1').all();
      return nodes.length > 0;
    },
    { timeout: 2000 },
  );

  // Wait for React Flow nodes to be rendered
  await vi.waitUntil(
    async () => {
      const nodes = page.getByText('node-1').all();
      return nodes.length > 0;
    },
    { timeout: 2000 },
  );

  // In React Flow, the custom node content is inside the wrapping div.
  // We can find the custom div by test id, but getting the specific one is easier with getByText
  const n1 = page.getByText('node-1');
  const n2 = page.getByText('node-2');
  const n3 = page.getByText('node-3');

  // Since multiple wrappers might match our ancestor xpath, grab the first one specifically
  const n1DagNode = page.elementLocator(n1.element().closest('[data-testid="dag-node"]') as HTMLElement);
  const n2DagNode = page.elementLocator(n2.element().closest('[data-testid="dag-node"]') as HTMLElement);
  const n3DagNode = page.elementLocator(n3.element().closest('[data-testid="dag-node"]') as HTMLElement);

  // Click directly on the inner dag node div since vitest has better click hit-testing now.
  // Wait a small bit in case React Flow is still laying out.
  await new Promise((r) => setTimeout(r, 100));

  // Initially, none are highlighted/dimmed
  await expect.element(n1DagNode).not.toHaveClass('!border-cyan-500');
  await expect.element(n3DagNode).not.toHaveClass('opacity-30');

  // Since Vitest Browser struggles with finding the actual interactive rect in React Flow
  // we dispatch the click event directly on the component div
  const n2El = n2DagNode.element() as HTMLElement;
  n2El.click();

  // node-2 is highlighted
  await vi.waitFor(async () => await expect.element(n2DagNode).toHaveClass('!border-cyan-500'), { timeout: 3000 });

  // node-1 is upstream of node-2, so it is highlighted
  await expect.element(n1DagNode).toHaveClass('!border-cyan-500');
  // node-3 is unconnected, so it is dimmed
  await expect.element(n3DagNode).toHaveClass('opacity-30');

  // Click to un-toggle
  n2El.click();

  await vi.waitFor(async () => await expect.element(n2DagNode).not.toHaveClass('!border-cyan-500'), { timeout: 3000 });
  await expect.element(n3DagNode).not.toHaveClass('opacity-30');
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
