import { expect, test } from '@playwright/test';
import { MAX_REJECTION_THRESHOLD } from '../../../src/utils/constants';

test.describe('Permanent Failures Dashboard Filter', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('correctly filters and highlights permanent failures', async ({ page }) => {
    // We are getting 675 nodes because Vite's preview server in CI is fetching via native JS fetch,
    // and Playwright's `page.route` might be missing it due to Service Workers or Vite's dev/preview server network proxy setup.
    // Let's use evaluateOnNewDocument to mock the global window.fetch function
    await page.addInitScript((threshold) => {
      const mockData = [
        {
          filePath: '.foundry/tasks/task-perm-fail.md',
          data: {
            id: 'task-perm-fail',
            type: 'TASK',
            title: 'Permanent Failure Task',
            status: 'FAILED',
            rejection_count: threshold,
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
      ];

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
          return new Response(JSON.stringify(mockData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        return originalFetch(input, init);
      };
    }, MAX_REJECTION_THRESHOLD);

    // Also keep page.route just in case it works for some runtimes
    await page.route('**/*', async (route) => {
      const url = route.request().url();
      if (url.includes('foundry.json')) {
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
      } else {
        await route.continue();
      }
    });

    await page.goto('./dag');

    // Wait for the DAG loading screen to disappear
    const loadingEl = page.getByText('[ SYSTEM.LOADING_DAG ]');
    await expect(loadingEl).toHaveCount(0, { timeout: 15000 });

    // Look for our specific node using a generic locator
    const permFailText = page.getByText('task-perm-fail');
    await expect(permFailText.first()).toBeVisible({ timeout: 15000 });

    const tempFailText = page.getByText('task-temp-fail');
    await expect(tempFailText.first()).toBeVisible();

    const successText = page.getByText('task-success');
    await expect(successText.first()).toBeVisible();

    // Toggle the filter
    const toggleButton = page.getByRole('button', { name: 'Toggle permanent failures only' });
    await toggleButton.click();

    // The filter takes a moment to update the state and React Flow layout
    await page.waitForTimeout(500);

    // Assert only the permanent failure remains visible
    await expect(permFailText.first()).toBeVisible();
    await expect(tempFailText.first()).not.toBeVisible();
    await expect(successText.first()).not.toBeVisible();

    // Find the node container up from the text element
    const permFailNode = page.locator(
      'xpath=//div[@data-testid="dag-node" and .//*[contains(text(), "task-perm-fail")]]',
    );
    await expect(permFailNode).toHaveClass(/border-red-500/);
    await expect(permFailNode).toHaveClass(/brightness-125/);
  });
});
