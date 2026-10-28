import { expect, test } from '@playwright/test';
import { mockDagData } from '../test-utils';

test.describe('DagTree UI Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockDagData(page);
    await page.goto('./dag');
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).toBeHidden();

    // Switch to tree view
    await page.getByTestId('view-mode-tree').click();
  });

  test('collapses and expands nodes correctly', async ({ page }) => {
    // Initial state is all collapsed
    await expect(page.getByText('idea-001')).toBeVisible();
    await expect(page.getByText('prd-001-001')).toBeHidden();

    // Click expand all just to get a predictable state
    await page.getByRole('button', { name: 'Expand All' }).click();

    await expect(page.getByText('idea-001')).toBeVisible();
    await expect(page.getByText('prd-001-001')).toBeVisible();
    await expect(page.getByText('task-001-001-001')).toBeVisible();

    // Find the collapse button for idea-001
    // It's the first button inside the row
    const rootRow = page.locator('li').filter({ hasText: 'idea-001' }).first().locator('> div');
    const toggleBtn = rootRow.locator('button').first();

    await toggleBtn.click();

    // Check prd is hidden
    await expect(page.getByText('prd-001-001')).toBeHidden();

    // Expand root node
    await toggleBtn.click();

    // Check children are visible
    await expect(page.getByText('prd-001-001')).toBeVisible();

    // Find the toggle button for prd
    const prdRow = page.locator('li').filter({ hasText: 'prd-001-001' }).first().locator('> div');
    const collapsePrdBtn = prdRow.locator('button').first();
    await collapsePrdBtn.click();

    // Check task is hidden
    await expect(page.getByText('task-001-001-001')).toBeHidden();
  });

  test('Expand All and Collapse All buttons work globally', async ({ page }) => {
    // Initial state: collapsed
    await expect(page.getByText('idea-001')).toBeVisible();
    await expect(page.getByText('prd-001-001')).toBeHidden();

    // Click Expand All
    await page.getByRole('button', { name: 'Expand All' }).click();

    // Now all should be visible
    await expect(page.getByText('idea-001')).toBeVisible();
    await expect(page.getByText('prd-001-001')).toBeVisible();
    await expect(page.getByText('task-001-001-001')).toBeVisible();

    // Click Collapse All
    await page.getByRole('button', { name: 'Collapse All' }).click();

    // Now only root should be visible
    await expect(page.getByText('idea-001')).toBeVisible();
    await expect(page.getByText('prd-001-001')).toBeHidden();
    await expect(page.getByText('task-001-001-001')).toBeHidden();
  });
});
