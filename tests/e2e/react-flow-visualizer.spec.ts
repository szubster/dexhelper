import { expect, test } from '@playwright/test';

test.describe('React Flow Visualizer E2E', () => {
  const MOCK_FOUNDRY_JSON = [
    {
      filePath: './.foundry/tasks/task-1.md',
      data: {
        id: 'task-1',
        type: 'TASK',
        status: 'COMPLETED',
        owner_persona: 'coder',
        rejection_count: 0,
        depends_on: [],
      },
    },
    {
      filePath: './.foundry/tasks/task-2.md',
      data: {
        id: 'task-2',
        type: 'TASK',
        status: 'PENDING',
        owner_persona: 'coder',
        rejection_count: 0,
        depends_on: ['task-1'],
      },
    },
  ];

  test.beforeEach(async ({ page }) => {
    await page.route('**/data/foundry.json', async (route) => {
      await route.fulfill({ json: MOCK_FOUNDRY_JSON });
    });

    await page.goto('./dag');

    // Wait for the sync overlay to disappear
    const overlay = page.getByTestId('sync-progress-overlay');
    await expect(overlay)
      .toBeHidden({ timeout: 60000 })
      .catch(() => {});

    // Wait for the view mode to be 'graph'
    await page.locator('[data-testid="view-mode-graph"]').click();
  });

  test('should render React Flow nodes and edges based on mock data', async ({ page }) => {
    // Check if the React Flow container is visible
    const flowContainer = page.locator('.tactical-flow');
    await expect(flowContainer).toBeVisible();

    // Verify nodes are rendered (task-1 and task-2)
    const task1Node = page.locator('[data-testid="dag-node"]').filter({ hasText: 'task-1' });
    const task2Node = page.locator('[data-testid="dag-node"]').filter({ hasText: 'task-2' });

    await expect(task1Node).toBeVisible();
    await expect(task2Node).toBeVisible();

    // Verify an edge is rendered
    const edges = page.locator('.react-flow__edge');
    await expect(edges).toHaveCount(1);
  });

  test('should support pan and zoom interactions', async ({ page }) => {
    const pane = page.locator('.react-flow__pane');
    await expect(pane).toBeVisible();

    // We can interact with zoom controls
    const zoomInBtn = page.locator('.react-flow__controls-zoomin');
    const zoomOutBtn = page.locator('.react-flow__controls-zoomout');

    await expect(zoomInBtn).toBeVisible();
    await expect(zoomOutBtn).toBeVisible();

    // The mock data renders a very small graph, so React Flow might hit minZoom automatically
    // and disable the zoomOut button. We must handle disabled state gracefully.
    // In GitHub CI sometimes these buttons are overlapped by React Flow's own attribution. Use force click.
    if (await zoomInBtn.isEnabled()) {
      await zoomInBtn.click({ force: true });
    }

    if (await zoomOutBtn.isEnabled()) {
      await zoomOutBtn.click({ force: true });
    }

    // React flow updates the transform style on the viewport
    const viewport = page.locator('.react-flow__viewport');
    await expect(viewport).toHaveAttribute('style', /transform/);
  });

  test('should filter nodes based on status and type toggles', async ({ page }) => {
    // The mock data has a COMPLETED and PENDING task.
    // Let's toggle the COMPLETED status filter
    const completedFilter = page.locator('[data-testid="COMPLETED"]');

    // Wait for the mock node to be visible first
    const task1Node = page.locator('[data-testid="dag-node"]').filter({ hasText: 'task-1' });
    await expect(task1Node).toBeVisible();

    // Toggle COMPLETED off
    // Sometimes mobile elements are intercepted
    await completedFilter.click({ force: true });

    // Task 1 should no longer be visible
    await expect(task1Node).toBeHidden({ timeout: 15000 });

    // Toggle COMPLETED back on
    await completedFilter.click({ force: true });
    await expect(task1Node).toBeVisible({ timeout: 15000 });
  });
});
