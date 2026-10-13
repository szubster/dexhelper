import { expect, test } from '@playwright/test';

test.describe('Agent Confidence Capability E2E', () => {
  test('surfaces confidence_score in the UI', async ({ page }) => {
    // Override the dag data endpoint with mock data representing the new capability
    await page.route(/.*\/data\/foundry\.json/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            filePath: '.foundry/tasks/task-test-confidence.md',
            data: {
              id: 'task-test-confidence',
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
      'xpath=//div[@data-testid="dag-node" and .//*[contains(text(), "task-test-confidence")]]',
    );
    await expect(node).toBeVisible();
    await expect(node.getByText('CONF: 45%')).toBeVisible();
  });
});
