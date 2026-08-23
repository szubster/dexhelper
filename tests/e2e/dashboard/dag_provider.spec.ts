import { expect, test } from '@playwright/test';
import { mockDagData } from '../test-utils';

test.describe('DagProvider Data Fetching', () => {
  test('successfully fetches and renders mock DAG data', async ({ page }) => {
    await page.unrouteAll();
    await mockDagData(page);
    await page.goto('dag'); // Try relative to baseURL (will be /dexhelper/dag instead of /dag which resolves to /dag at root)

    // Wait for the DAG loading state to resolve
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden();

    // With the mock data we expect 3 nodes to be rendered. We can check for a class or specific nodes from the mock graph.
    // Assuming mock_dag.json contains 'idea-001', 'prd-001-001', and 'task-001-001-001'
    const flowContainer = page.locator('.tactical-flow');
    await expect(flowContainer).toBeVisible();

    // In React Flow, nodes are rendered as divs with class .react-flow__node
    const nodes = page.locator('.react-flow__node');
    await expect(nodes).toHaveCount(3);

    // Check specific labels
    await expect(page.getByText('idea-001')).toBeVisible();
    await expect(page.getByText('prd-001-001')).toBeVisible();
    await expect(page.getByText('task-001-001-001')).toBeVisible();
  });

  test('handles failed data fetch gracefully', async ({ page }) => {
    // We must call unroute if it was routed before, but a new test context shouldn't need it.
    // However, to be safe, we route it explicitly.
    await page.unrouteAll();

    // Intercept with 500 error
    await page.route('**/data/foundry.json', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto('dag');

    // Wait for loading to finish
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden();

    // Test that the app doesn't crash completely - the flow container should still render, maybe empty
    const flowContainer = page.locator('.tactical-flow');
    await expect(flowContainer).toBeVisible();

    // The nodes count should be 0
    const nodes = page.locator('.react-flow__node');
    await expect(nodes).toHaveCount(0);

    // We could also check the console, but checking that the UI renders empty is good enough for 'graceful' without crashing.
  });
});
