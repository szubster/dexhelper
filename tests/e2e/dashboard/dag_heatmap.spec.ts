import { expect, test } from '@playwright/test';

test.describe('DAG Heatmap UI', () => {
  test('renders rejection count heatmap colors correctly', async ({ page }) => {
    await page.unrouteAll({ behavior: 'ignoreErrors' });

    await page.addInitScript(() => {
      const originalFetch = window.fetch;
      window.fetch = async (input, init) => {
        let url = '';
        if (typeof input === 'string') {
          url = input;
        } else if (input instanceof URL) {
          url = input.toString();
        } else if (input && typeof input === 'object' && 'url' in input) {
          url = input.url;
        }

        if (url.includes('foundry.json')) {
          return new Response(
            JSON.stringify([
              {
                filePath: '.foundry/tasks/task-zero.md',
                data: {
                  id: 'task-zero',
                  type: 'TASK',
                  status: 'COMPLETED',
                  owner_persona: 'coder',
                  depends_on: [],
                  rejection_count: 0,
                },
              },
              {
                filePath: '.foundry/tasks/task-low.md',
                data: {
                  id: 'task-low',
                  type: 'TASK',
                  status: 'FAILED',
                  owner_persona: 'coder',
                  depends_on: [],
                  rejection_count: 1,
                },
              },
              {
                filePath: '.foundry/tasks/task-medium.md',
                data: {
                  id: 'task-medium',
                  type: 'TASK',
                  status: 'FAILED',
                  owner_persona: 'coder',
                  depends_on: [],
                  rejection_count: 2,
                },
              },
              {
                filePath: '.foundry/tasks/task-critical.md',
                data: {
                  id: 'task-critical',
                  type: 'TASK',
                  status: 'FAILED',
                  owner_persona: 'coder',
                  depends_on: [],
                  rejection_count: 3,
                },
              },
            ]),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }
        return originalFetch(input, init);
      };
    });

    await page.goto('./dag');
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden({ timeout: 15000 });

    const toggleBtn = page.getByRole('button', { name: 'Toggle heatmap overlay' });
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();

    const lowNode = page.getByText('task-low').locator('..');
    await expect(lowNode).toHaveClass(/bg-blue-900/);

    const mediumNode = page.getByText('task-medium').locator('..');
    await expect(mediumNode).toHaveClass(/bg-yellow-900/);

    const criticalNode = page.getByText('task-critical').locator('..');
    await expect(criticalNode).toHaveClass(/bg-red-900/);
  });
});
