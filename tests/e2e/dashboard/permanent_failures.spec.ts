import { expect, test } from '@playwright/test';
import { initializeWithSave } from '../test-utils';

test.describe('Permanent Failures Dashboard', () => {
  // Setup mock route to provide dummy foundry.json
  test.beforeEach(async ({ page }) => {
    await page.route('**/data/foundry.json', async (route) => {
      const json = [
        {
          filePath: '.foundry/tasks/task-permanent-failure.md',
          data: {
            id: 'task-permanent-failure',
            type: 'TASK',
            status: 'FAILED',
            owner_persona: 'coder',
            depends_on: [],
            rejection_count: 3,
          },
        },
        {
          filePath: '.foundry/tasks/task-regular-failure.md',
          data: {
            id: 'task-regular-failure',
            type: 'TASK',
            status: 'FAILED',
            owner_persona: 'coder',
            depends_on: [],
            rejection_count: 1,
          },
        },
        {
          filePath: '.foundry/tasks/task-completed.md',
          data: {
            id: 'task-completed',
            type: 'TASK',
            status: 'COMPLETED',
            owner_persona: 'coder',
            depends_on: [],
            rejection_count: 0,
          },
        },
      ];
      await route.fulfill({ json, contentType: 'application/json' });
    });
  });

  test('should display permanent failures on the DAG dashboard', async ({ page }) => {
    // Navigate to the DAG dashboard
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');

    // Go directly to the dag page so we avoid navigating problems via UI
    await page.goto('./dag');

    // Wait for the loading text to disappear
    await expect(page.getByText('[ SYSTEM.LOADING_DAG ]')).toBeHidden({ timeout: 15000 });

    const permFilterBtn = page.locator('button[title="Toggle permanent failures only"]');

    await expect(permFilterBtn).toBeVisible({ timeout: 15000 });
    await permFilterBtn.click();

    // Verify a permanent failure node is displayed
    const dagNodes = page.getByTestId('dag-node');
    // Ensure that at least one node is visible
    await expect(dagNodes.first()).toBeVisible({ timeout: 15000 });

    // We expect the visible nodes to only be the permanent failure
    // Adding toPass block to account for state propagation delays
    await expect(async () => {
      const allVisibleNodes = await dagNodes.all();
      expect(allVisibleNodes.length).toBe(1);
    }).toPass({ timeout: 15000 });

    const allVisibleNodes = await dagNodes.all();
    const firstNode = allVisibleNodes[0];
    if (!firstNode) {
      throw new Error('Expected at least one node');
    }

    await expect(firstNode.getByText('task-permanent-failure')).toBeVisible();
    await expect(firstNode.getByText('FAILED')).toBeVisible();
  });
});
