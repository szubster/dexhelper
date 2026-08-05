import { expect, test } from '@playwright/test';
import { MAX_REJECTION_THRESHOLD } from '../../../src/utils/constants';

test.describe('Permanent Failures Dashboard', () => {
  test('should correctly filter and display permanent failures', async ({ page }) => {
    // Mock the data/foundry.json fetch request
    await page.route('**/data/foundry.json', async (route) => {
      const mockData = [
        {
          filePath: 'tasks/task-permanent-failure.md',
          data: {
            id: 'task-permanent-failure',
            type: 'TASK',
            status: 'FAILED',
            owner_persona: 'coder',
            rejection_count: MAX_REJECTION_THRESHOLD, // Permanent failure
            depends_on: [],
            title: 'Task 1 - Permanent Failure',
          },
        },
        {
          filePath: 'tasks/task-regular-failure.md',
          data: {
            id: 'task-regular-failure',
            type: 'TASK',
            status: 'FAILED',
            owner_persona: 'coder',
            rejection_count: MAX_REJECTION_THRESHOLD - 1, // Regular failure
            depends_on: [],
            title: 'Task 2 - Regular Failure',
          },
        },
        {
          filePath: 'tasks/task-completed.md',
          data: {
            id: 'task-completed',
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

    // The node label is rendered as data.label which is set to node.id in DagContext.tsx
    // so we should look for 'task-permanent-failure' as the text.
    const task1Node = page.getByTestId('dag-node').filter({ hasText: 'task-permanent-failure' });
    const task2Node = page.getByTestId('dag-node').filter({ hasText: 'task-regular-failure' });
    const task3Node = page.getByTestId('dag-node').filter({ hasText: 'task-completed' });

    await expect(task1Node).toBeVisible();
    await expect(task2Node).toBeVisible();
    await expect(task3Node).toBeVisible();

    // Click the "Permanent failures only" toggle
    await page.getByText('[ PERMANENT_FAILURES_ONLY ]').click();

    // Assert that only the permanent failure node is visible
    await expect(task1Node).toBeVisible();

    // The other nodes should not be in the document
    await expect(task2Node).toHaveCount(0);
    await expect(task3Node).toHaveCount(0);

    // Toggle off to make sure they come back
    await page.getByText('[ PERMANENT_FAILURES_ONLY ]').click();

    await expect(task1Node).toBeVisible();
    await expect(task2Node).toBeVisible();
    await expect(task3Node).toBeVisible();
  });
});
