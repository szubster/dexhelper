import { expect, test } from '@playwright/test';
import { MAX_REJECTION_THRESHOLD } from '../../../src/utils/constants';

test.describe('Permanent Failures Dashboard', () => {
  test('should correctly filter and display permanent failures', async ({ page }) => {
    // Mock the data/foundry.json fetch request
    await page.route('**/data/foundry.json', async (route) => {
      const mockData = [
        {
          filePath: 'tasks/task-1.md',
          data: {
            id: 'task-1',
            type: 'TASK',
            status: 'FAILED',
            owner_persona: 'coder',
            rejection_count: MAX_REJECTION_THRESHOLD, // Permanent failure
            depends_on: [],
            title: 'Task 1 - Permanent Failure',
          },
        },
        {
          filePath: 'tasks/task-2.md',
          data: {
            id: 'task-2',
            type: 'TASK',
            status: 'FAILED',
            owner_persona: 'coder',
            rejection_count: MAX_REJECTION_THRESHOLD - 1, // Regular failure
            depends_on: [],
            title: 'Task 2 - Regular Failure',
          },
        },
        {
          filePath: 'tasks/task-3.md',
          data: {
            id: 'task-3',
            type: 'TASK',
            status: 'COMPLETED',
            owner_persona: 'coder',
            rejection_count: 0,
            depends_on: [],
            title: 'Task 3 - Completed',
          },
        },
      ];
      await route.fulfill({ json: mockData });
    });

    // Navigate to the DAG dashboard
    await page.goto('./dag');

    // Wait for the DAG to load and render nodes
    await expect(page.locator('text=task-1')).toBeVisible();
    await expect(page.locator('text=task-2')).toBeVisible();
    await expect(page.locator('text=task-3')).toBeVisible();

    // Click the "Permanent failures only" toggle
    await page.getByText('[ PERMANENT_FAILURES_ONLY ]').click();

    // Assert that only the permanent failure node is visible
    await expect(page.locator('text=task-1')).toBeVisible();

    // The other nodes should not be in the document
    await expect(page.locator('text=task-2')).toHaveCount(0);
    await expect(page.locator('text=task-3')).toHaveCount(0);

    // Toggle off to make sure they come back
    await page.getByText('[ PERMANENT_FAILURES_ONLY ]').click();

    await expect(page.locator('text=task-1')).toBeVisible();
    await expect(page.locator('text=task-2')).toBeVisible();
    await expect(page.locator('text=task-3')).toBeVisible();
  });
});
