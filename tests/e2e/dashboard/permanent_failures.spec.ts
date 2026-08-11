import { expect, test } from '@playwright/test';
import { MAX_REJECTION_THRESHOLD } from '../../../src/utils/constants';

test.describe('DAG Dashboard - Permanent Failures', () => {
  test('should correctly filter and highlight permanent failures', async ({ page }) => {
    // 1. Intercept the network request to provide deterministic mock data
    await page.route('**/data/foundry.json', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            filePath: '.foundry/tasks/task-mock-001-permanent-failure.md',
            data: {
              id: 'task-mock-001-permanent-failure',
              type: 'TASK',
              title: 'Mock Permanent Failure',
              status: 'FAILED',
              owner_persona: 'coder',
              rejection_count: MAX_REJECTION_THRESHOLD,
              depends_on: [],
            },
            body: '...',
          },
          {
            filePath: '.foundry/tasks/task-mock-002-regular-failure.md',
            data: {
              id: 'task-mock-002-regular-failure',
              type: 'TASK',
              title: 'Mock Regular Failure',
              status: 'FAILED',
              owner_persona: 'coder',
              rejection_count: 1,
              depends_on: [],
            },
            body: '...',
          },
        ]),
      });
    });

    // 2. Navigate to the DAG dashboard
    await page.goto('./dag');

    // 3. Wait for the loading screen to disappear
    await expect(page.getByText('[ SYSTEM.LOADING_DAG ]')).toBeHidden({ timeout: 10000 });

    // ReactFlow takes some time to layout the nodes
    await page.waitForTimeout(2000);

    // Ensure the nodes are rendered before proceeding
    // The DagNode component renders the label. In DagContext.tsx, label is set to node.id.
    const permanentFailureNode = page.getByTestId('dag-node').filter({ hasText: 'task-mock-001-permanent-failure' });
    const regularFailureNode = page.getByTestId('dag-node').filter({ hasText: 'task-mock-002-regular-failure' });

    await expect(permanentFailureNode).toBeVisible({ timeout: 10000 });
    await expect(regularFailureNode).toBeVisible({ timeout: 10000 });

    // 4. Toggle the "Permanent failures only" filter
    const toggleButton = page.getByRole('button', { name: 'Toggle permanent failures only' });
    await toggleButton.click();

    // 5. Assert that the regular failure node is hidden, but the permanent failure node is visible
    await expect(regularFailureNode).toBeHidden();

    // Check if the permanent failure is correctly highlighted
    // By locating the node container that contains the title text
    await expect(permanentFailureNode).toBeVisible();
    await expect(permanentFailureNode).toHaveClass(/brightness-125/);
    await expect(permanentFailureNode).toHaveClass(/border-red-500/);

    // Playwright fails here because ReactFlow renders nodes on a canvas and maybe Playwright needs a delay
    await page.waitForTimeout(500);
  });
});
