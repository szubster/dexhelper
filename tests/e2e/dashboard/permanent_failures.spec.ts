import { expect, test } from '@playwright/test';
import { MAX_REJECTION_THRESHOLD } from '../../../src/utils/constants';

test.describe('Permanent Failures Dashboard', () => {
  test('displays correctly and filters permanent failures', async ({ page }) => {
    // 1. Deterministic Mocking
    await page.route('**/data/foundry.json', async (route) => {
      const json = [
        {
          filePath: 'mock-1.md',
          id: 'node-permanent-failure',
          data: {
            id: 'node-permanent-failure',
            type: 'TASK',
            status: 'FAILED',
            owner_persona: 'human',
            label: 'node-permanent-failure',
            title: 'Node Permanent Failure',
            rejection_count: MAX_REJECTION_THRESHOLD,
            depends_on: [],
          },
        },
        {
          filePath: 'mock-2.md',
          id: 'node-regular-failure',
          data: {
            id: 'node-regular-failure',
            type: 'TASK',
            status: 'FAILED',
            owner_persona: 'human',
            label: 'node-regular-failure',
            title: 'Node Regular Failure',
            rejection_count: 1,
            depends_on: [],
          },
        },
      ];
      await route.fulfill({ json });
    });

    // 2. Dashboard Routing
    await page.goto('./dag');

    // 3. Wait for Load
    await expect(page.getByText('[ SYSTEM.LOADING_DAG ]')).toBeHidden({ timeout: 10000 });

    // The react flow graph rendering is not totally deterministic
    // We add an extra wait block to allow the canvas to fully mount.
    await page.waitForTimeout(2000);

    // Ensure the nodes are rendered by React Flow
    // The nodes are rendered in `DagNode` which displays `data.label` inside a `div`
    // Assert initial state: both nodes should be visible
    await expect(page.getByText('node-permanent-failure')).toBeVisible();
    await expect(page.getByText('node-regular-failure')).toBeVisible();

    // 4. Visual Assertion after toggle
    await page.getByText('[ PERMANENT_FAILURES_ONLY ]', { exact: true }).click();

    // The permanent failure node should still be visible
    const permNode = page.getByText('node-permanent-failure');
    await expect(permNode).toBeVisible();

    // The regular failure node should be hidden
    await expect(page.getByText('node-regular-failure')).toBeHidden();

    // explicitly check for the permanent failure styling classes applied by DagNode.tsx
    const dagNodeWrapper = permNode.locator('xpath=ancestor::div[@data-testid="dag-node"]').first();

    // Check for border-red-500 and brightness-125
    await expect(dagNodeWrapper).toHaveClass(/border-red-500/);
    await expect(dagNodeWrapper).toHaveClass(/brightness-125/);
  });
});
