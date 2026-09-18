import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import type { ParsedNode } from '../../../src/utils/dag/builder';
import { parseFoundryNode } from '../../../src/utils/dag/parser';

test.describe('Parsing Refactor Data Flow E2E', () => {
  test('end-to-end extraction and context delivery of rejection_count', async ({ page }) => {
    // 1. Read mock markdown fixtures
    const fixturesDir = path.join(process.cwd(), 'tests/fixtures/dag');
    const files = ['mock-task-perm-fail.md', 'mock-task-temp-fail.md', 'mock-task-success.md'];

    const parsedNodes: ParsedNode[] = [];
    for (const file of files) {
      const filePath = path.join(fixturesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = parseFoundryNode(content);
      if (data) {
        parsedNodes.push({ filePath: `.foundry/tasks/${file}`, data });
      }
    }

    // Verify extraction works correctly
    expect(parsedNodes.length).toBe(3);
    const permFailNode = parsedNodes.find((n) => n.data.id === 'mock-task-perm-fail');
    expect(permFailNode?.data.rejection_count).toBe(4);
    const tempFailNode = parsedNodes.find((n) => n.data.id === 'mock-task-temp-fail');
    expect(tempFailNode?.data.rejection_count).toBe(1);

    // Provide the parsed data to the frontend
    await page.unrouteAll({ behavior: 'ignoreErrors' });

    await page.route('**/data/foundry.json*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(parsedNodes),
      });
    });

    await page.goto('./dag');

    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden({ timeout: 15000 });

    // Verify rejection_count is correctly passed to DagContext and rendered
    const permFailLocator = page.locator(
      'xpath=//div[@data-testid="dag-node" and .//*[contains(text(), "mock-task-perm-fail")]]',
    );
    await expect(permFailLocator).toBeVisible();
    await expect(permFailLocator).toHaveClass(/border-red-500/);
    await expect(permFailLocator).toHaveClass(/brightness-125/);
    await expect(permFailLocator.getByTitle('Permanent Failure')).toBeVisible();

    const tempFailLocator = page.locator(
      'xpath=//div[@data-testid="dag-node" and .//*[contains(text(), "mock-task-temp-fail")]]',
    );
    await expect(tempFailLocator).toBeVisible();
    // It's a temporary failure, it has border-red-500/50 but NOT border-red-500 which we strictly match using a regex that checks for boundary
    await expect(tempFailLocator).not.toHaveClass(/(^|\s)border-red-500(\s|$)/);
    // But it will have border-red-500/50
    await expect(tempFailLocator).toHaveClass(/border-red-500\/50/);

    // Toggle the filter and verify it works (testing the Context again)
    const toggleButton = page.getByRole('button', { name: 'Toggle permanent failures only' });
    await toggleButton.click();

    await expect(permFailLocator).toBeVisible();
    await expect(tempFailLocator).not.toBeVisible();

    const successLocator = page.locator(
      'xpath=//div[@data-testid="dag-node" and .//*[contains(text(), "mock-task-success")]]',
    );
    await expect(successLocator).not.toBeVisible();
  });
});
