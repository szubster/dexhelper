import { expect, test } from '@playwright/test';
import { MAX_REJECTION_THRESHOLD } from '../../../src/utils/constants';
import { initializeWithSave } from '../test-utils';

test.describe('Permanent Failures Dashboard', () => {
  test('should display nodes and filter correctly based on permanent failure status', async ({ page }) => {
    // Intercept with high priority by intercepting specifically exact endsWith match
    // since some other requests or initial loads might trigger interceptors
    await page.route(
      (url) => url.pathname.endsWith('data/foundry.json'),
      async (route) => {
        const json = [
          {
            filePath: '.foundry/tasks/task-1.md',
            data: {
              id: 'task-1',
              type: 'TASK',
              status: 'FAILED',
              rejection_count: MAX_REJECTION_THRESHOLD,
              owner_persona: 'coder',
              depends_on: [],
            },
          },
          {
            filePath: '.foundry/tasks/task-2.md',
            data: {
              id: 'task-2',
              type: 'TASK',
              status: 'FAILED',
              rejection_count: MAX_REJECTION_THRESHOLD - 1,
              owner_persona: 'coder',
              depends_on: [],
            },
          },
          {
            filePath: '.foundry/tasks/task-3.md',
            data: {
              id: 'task-3',
              type: 'TASK',
              status: 'COMPLETED',
              rejection_count: 0,
              owner_persona: 'coder',
              depends_on: [],
            },
          },
        ];
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(json),
        });
      },
    );

    // We must initialize first to have access to the app
    await initializeWithSave(page);

    // Let's navigate directly using page.goto but to the correct base URL
    await page.goto('./dag');

    // Wait for the loading text to disappear
    await expect(page.getByText('[ SYSTEM.LOADING_DAG ]')).toBeHidden({ timeout: 15000 });

    // Check nodes are present
    await expect(page.locator('[data-testid="dag-node"]')).toHaveCount(3, { timeout: 10000 });

    // Check filtering
    const toggleButton = page.getByRole('button', { name: 'Toggle permanent failures only' });
    await toggleButton.click();

    // Now only task-1 should be shown
    await expect(page.locator('[data-testid="dag-node"]')).toHaveCount(1, { timeout: 10000 });
    await expect(page.locator('[data-testid="dag-node"]')).toContainText('task-1');
  });
});
