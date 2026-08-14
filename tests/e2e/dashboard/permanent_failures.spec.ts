import { expect, test } from '@playwright/test';
import { MAX_REJECTION_THRESHOLD } from '../../../src/utils/constants';

test.describe('Permanent Failures Dashboard Filter', () => {
  test('correctly filters and highlights permanent failures', async ({ page }) => {
    // 1. Mock the API response to return deterministic data
    await page.route('**/data/foundry.json', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            filePath: '.foundry/tasks/task-perm-fail.md',
            data: {
              id: 'task-perm-fail',
              type: 'TASK',
              title: 'Permanent Failure Task',
              status: 'FAILED',
              rejection_count: MAX_REJECTION_THRESHOLD,
              depends_on: [],
              owner_persona: 'coder',
            },
          },
          {
            filePath: '.foundry/tasks/task-temp-fail.md',
            data: {
              id: 'task-temp-fail',
              type: 'TASK',
              title: 'Temporary Failure Task',
              status: 'FAILED',
              rejection_count: 1,
              depends_on: [],
              owner_persona: 'coder',
            },
          },
          {
            filePath: '.foundry/tasks/task-success.md',
            data: {
              id: 'task-success',
              type: 'TASK',
              title: 'Successful Task',
              status: 'COMPLETED',
              rejection_count: 0,
              depends_on: [],
              owner_persona: 'coder',
            },
          },
        ]),
      });
    });

    // 2. Navigate to the DAG dashboard
    await page.goto('./dag');

    // 3. Wait for the loading screen to disappear
    const loadingEl = page.getByText('[ SYSTEM.LOADING_DAG ]');
    await expect(loadingEl).toHaveCount(0);

    // Initial state: all nodes should be visible
    await expect(page.getByText('task-perm-fail')).toBeVisible();
    await expect(page.getByText('task-temp-fail')).toBeVisible();
    await expect(page.getByText('task-success')).toBeVisible();

    // 4. Toggle the permanent failures only filter
    const toggleButton = page.getByRole('button', { name: 'Toggle permanent failures only' });
    await toggleButton.click();

    // 5. Assert that only the permanent failure is visible
    await expect(page.getByText('task-perm-fail')).toBeVisible();
    await expect(page.getByText('task-temp-fail')).not.toBeVisible();
    await expect(page.getByText('task-success')).not.toBeVisible();

    // 6. Assert that the permanent failure has the correct styling classes
    const permFailNode = page.locator('.react-flow__node').filter({ hasText: 'task-perm-fail' });

    // Check for styling classes (border-red-500, brightness-125) applied by DagNode.tsx
    await expect(permFailNode.locator('div').first()).toHaveClass(/border-red-500/);
    await expect(permFailNode.locator('div').first()).toHaveClass(/brightness-125/);
  });
});
