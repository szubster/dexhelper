import { expect, test } from '@playwright/test';

test.describe('Agent Confidence Capability E2E', () => {
  test('surfaces confidence_score in the UI with red color for score < 70', async ({ page }) => {
    await page.route(/.*\/data\/foundry\.json/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            filePath: '.foundry/tasks/task-test-confidence-red.md',
            data: {
              id: 'task-test-confidence-red',
              type: 'TASK',
              status: 'READY',
              owner_persona: 'coder',
              depends_on: [],
              rejection_count: 0,
              confidence_score: 45,
            },
          },
        ]),
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    });

    await page.goto('./dag');
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden();

    const node = page.locator(
      'xpath=//div[@data-testid="dag-node" and .//*[contains(text(), "task-test-confidence-red")]]',
    );
    await expect(node).toBeVisible();
    const confElement = node.getByText('CONF: 45%');
    await expect(confElement).toBeVisible();
    await expect(confElement).toHaveClass(/text-red-500/);
  });

  test('surfaces confidence_score in the UI with emerald color for score >= 90', async ({ page }) => {
    await page.route(/.*\/data\/foundry\.json/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            filePath: '.foundry/tasks/task-test-confidence-emerald.md',
            data: {
              id: 'task-test-confidence-emerald',
              type: 'TASK',
              status: 'READY',
              owner_persona: 'coder',
              depends_on: [],
              rejection_count: 0,
              confidence_score: 95,
            },
          },
        ]),
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    });

    await page.goto('./dag');
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden();

    const node = page.locator(
      'xpath=//div[@data-testid="dag-node" and .//*[contains(text(), "task-test-confidence-emerald")]]',
    );
    await expect(node).toBeVisible();
    const confElement = node.getByText('CONF: 95%');
    await expect(confElement).toBeVisible();
    await expect(confElement).toHaveClass(/text-emerald-500/);
  });
});
