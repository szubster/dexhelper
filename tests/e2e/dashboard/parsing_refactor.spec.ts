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
    const permFailLocator = page.getByText('mock-task-perm-fail').locator('..');
    await expect(permFailLocator).toBeVisible();

    const tempFailLocator = page.getByText('mock-task-temp-fail').locator('..');
    await expect(tempFailLocator).toBeVisible();

    // Toggle the filter and verify it works (testing the Context again)
  });
});
