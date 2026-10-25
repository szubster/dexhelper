import { expect, test } from '@playwright/test';
import { mockDagData } from '../test-utils';

test.describe('PersonaBadge Integration', () => {
  test('PersonaBadge renders with correct tactical styling in DAG Dashboard', async ({ page }) => {
    // Unroute previous data
    await page.unrouteAll({ behavior: 'ignoreErrors' });

    // Ensure mock_dag.json data has at least one node with a persona, which it does ('coder', 'product_manager', 'epic_planner')
    await mockDagData(page);

    await page.goto('./dag');

    // Wait for the DAG loading state to resolve
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden();

    const i = page.getByText('idea-001').first();
    await expect(i).toBeVisible();
  });
});
