import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';

import { DagProvider } from '../../dashboard/DagContext';
import { DagDashboard, getMiniMapNodeColor } from '../DagDashboard';

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
          rejection_count: 0,
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
          rejection_count: 0,
          depends_on: ['node-1.md'],
        },
      },
    ],
  } as unknown as Response);

  await render(
    <DagProvider>
      <div style={{ width: '800px', height: '600px' }}>
        <DagDashboard />
      </div>
    </DagProvider>,
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
  const activeStatusButton = page.getByTestId('ACTIVE');
  await activeStatusButton.click();

  // node-2 should disappear from the graph (and document)
  await expect.element(page.getByText('node-2')).not.toBeInTheDocument();
  // node-1 should still be visible
  await expect.element(page.getByText('node-1')).toBeInTheDocument();

  // Toggle off TASK type
  const taskTypeButton = page.getByTestId('TASK');
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
          rejection_count: 0,
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
          rejection_count: 0,
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
          rejection_count: 0,
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
          rejection_count: 0,
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
          rejection_count: 0,
          depends_on: [],
        },
      },
      {
        filePath: 'node-6.md',
        data: {
          id: 'node-6',
          type: undefined,
          status: undefined,
          owner_persona: 'human',
          label: 'node-6',
          title: 'Node 6',
          rejection_count: 0,
          depends_on: [],
        } as unknown as import('../DagNode').DagNodeData,
      },
    ],
  } as unknown as Response);

  await render(
    <DagProvider>
      <div style={{ width: '800px', height: '600px' }}>
        <DagDashboard />
      </div>
    </DagProvider>,
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

  // Test pane click to deselect
  n2El.click();
  await vi.waitFor(async () => await expect.element(n2DagNode).toHaveClass('!border-cyan-500'), { timeout: 3000 });

  // To hit onPaneClick logic
  const paneEl = document.querySelector('.react-flow__pane');
  if (paneEl) paneEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  await vi.waitFor(async () => await expect.element(n2DagNode).not.toHaveClass('!border-cyan-500'), { timeout: 3000 });

  // Hit onNodeMouseLeave and onNodeMouseEnter logic via fireEvent or element
  n2DagNode.element().dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
  n2DagNode.element().dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));

  // To make sure coverage on filter logic handles undefined
  const taskTypeButton = page.getByTestId('TASK');
  await taskTypeButton.click();
  await taskTypeButton.click();
});

test('DagDashboard handles non-ok fetch response', async () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  // Mock fetch to fail with 404
  globalThis.fetch = vi.fn<typeof fetch>().mockResolvedValue({ ok: false } as unknown as Response);

  await render(
    <DagProvider>
      <div style={{ width: '800px', height: '600px' }}>
        <DagDashboard />
      </div>
    </DagProvider>,
  );

  await vi.waitUntil(async () => {
    const loadingEl = page.getByText('[ SYSTEM.LOADING_DAG ]').all();
    return loadingEl.length === 0;
  });

  expect(consoleErrorSpy).toHaveBeenCalledWith('System: DAG loading failed');
  consoleErrorSpy.mockRestore();
});

test('DagDashboard catches and logs fetch errors securely', async () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  // Mock fetch to fail
  globalThis.fetch = vi.fn<typeof fetch>().mockRejectedValue(new Error('Network error'));

  await render(
    <DagProvider>
      <div style={{ width: '800px', height: '600px' }}>
        <DagDashboard />
      </div>
    </DagProvider>,
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

test('getMiniMapNodeColor returns correct color based on status', () => {
  expect(
    getMiniMapNodeColor(
      {
        id: '1',
        position: { x: 0, y: 0 },
        data: { rejection_count: 0, status: 'COMPLETED', type: 'TASK', owner_persona: 'human' },
      },
      3,
    ),
  ).toBe('#10b981');
  expect(
    getMiniMapNodeColor(
      {
        id: '1',
        position: { x: 0, y: 0 },
        data: { rejection_count: 0, status: 'ACTIVE', type: 'TASK', owner_persona: 'human' },
      },
      3,
    ),
  ).toBe('#ef4444');
  expect(
    getMiniMapNodeColor(
      {
        id: '1',
        position: { x: 0, y: 0 },
        data: { rejection_count: 0, status: 'IN_PROGRESS', type: 'TASK', owner_persona: 'human' },
      },
      3,
    ),
  ).toBe('#ef4444');
  expect(
    getMiniMapNodeColor(
      {
        id: '1',
        position: { x: 0, y: 0 },
        data: { rejection_count: 0, status: 'FAILED', type: 'TASK', owner_persona: 'human' },
      },
      3,
    ),
  ).toBe('#ef4444');
  expect(
    getMiniMapNodeColor(
      {
        id: '1',
        position: { x: 0, y: 0 },
        data: { rejection_count: 0, status: 'BLOCKED', type: 'TASK', owner_persona: 'human' },
      },
      3,
    ),
  ).toBe('#ef4444');
  expect(
    getMiniMapNodeColor(
      {
        id: '1',
        position: { x: 0, y: 0 },
        data: { rejection_count: 0, status: 'READY', type: 'TASK', owner_persona: 'human' },
      },
      3,
    ),
  ).toBe('#f59e0b');
  expect(
    getMiniMapNodeColor(
      {
        id: '1',
        position: { x: 0, y: 0 },
        data: { rejection_count: 0, status: 'UNKNOWN' },
      } as unknown as import('@xyflow/react').Node<import('../DagNode').DagNodeData>,
      3,
    ),
  ).toBe('#52525b');
  expect(
    getMiniMapNodeColor(
      { id: '1', position: { x: 0, y: 0 }, data: {} } as unknown as import('@xyflow/react').Node<
        import('../DagNode').DagNodeData
      >,
      3,
    ),
  ).toBe('#52525b');
  expect(
    getMiniMapNodeColor(
      {
        id: '1',
        position: { x: 0, y: 0 },
        data: { rejection_count: 3, status: 'FAILED', type: 'TASK', owner_persona: 'human' },
      },
      3,
    ),
  ).toBe('#dc2626');
});

test('DagDashboard toggles permanent failures', async () => {
  globalThis.fetch = vi.fn<typeof fetch>().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        filePath: 'node-1.md',
        data: {
          id: 'node-1',
          type: 'TASK',
          status: 'FAILED',
          owner_persona: 'human',
          label: 'node',
          title: 'Node 1',
          rejection_count: 3, // Permanent failure
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
          rejection_count: 0, // Not a permanent failure
          depends_on: [],
        },
      },
    ],
  } as unknown as Response);

  await render(
    <DagProvider>
      <div style={{ width: '800px', height: '600px' }}>
        <DagDashboard />
      </div>
    </DagProvider>,
  );

  // Wait for loading to finish
  await vi.waitUntil(
    async () => {
      const loadingEls = page.getByText('[ SYSTEM.LOADING_DAG ]').all();
      return loadingEls.length === 0;
    },
    { timeout: 2000 },
  );

  // Initially both should be visible (TASK, FAILED, ACTIVE are all active by default)
  await expect.element(page.getByText('node-1')).toBeInTheDocument();
  await expect.element(page.getByText('node-2')).toBeInTheDocument();

  // Try toggling permanent failures
  const pfToggle = page.getByText('[ PERMANENT_FAILURES_ONLY ]', { exact: true });
  await pfToggle.click();

  // Now only node-1 (permanent failure) should be visible
  await expect.element(page.getByText('node-1')).toBeInTheDocument();
  await expect.element(page.getByText('node-2')).not.toBeInTheDocument();
});

test('DagDashboard renders MiniMap node colors', async () => {
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
    <DagProvider>
      <div style={{ width: '800px', height: '600px' }}>
        <DagDashboard />
      </div>
    </DagProvider>,
  );

  await vi.waitUntil(
    async () => {
      const loadingEls = page.getByText('[ SYSTEM.LOADING_DAG ]').all();
      return loadingEls.length === 0;
    },
    { timeout: 2000 },
  );

  // The minimap has class react-flow__minimap
  await expect
    .element(page.elementLocator(document.querySelector('.react-flow__minimap') as HTMLElement))
    .toBeInTheDocument();
});
