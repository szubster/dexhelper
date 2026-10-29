import { expect, test } from '@playwright/test';
import { mockDagData } from '../test-utils';

test.describe('DagTree UI Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.unrouteAll({ behavior: 'ignoreErrors' });
    await mockDagData(page);
    await page.goto('./dag');
    await expect(page.locator('text=[ SYSTEM.LOADING_DAG ]')).not.toBeAttached();

    // Switch to tree view
    await page.getByTestId('view-mode-tree').click();
  });

  test('collapses and expands nodes correctly', async ({ page }) => {
    // Initial state is all collapsed
    await expect(page.locator('span.truncate', { hasText: /^idea-001$/ })).toBeAttached();
    await expect(page.locator('span.truncate', { hasText: /^prd-001-001$/ })).not.toBeAttached();

    // Click expand all just to get a predictable state
    await page.getByRole('button', { name: 'Expand All' }).scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Expand All' }).scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Expand All' }).click({ force: true });

    await expect(page.locator('span.truncate', { hasText: /^idea-001$/ })).toBeAttached();
    await page.locator('span.truncate', { hasText: /^prd-001-001$/ }).scrollIntoViewIfNeeded();
    await page.locator('span.truncate', { hasText: /^prd-001-001$/ }).scrollIntoViewIfNeeded();
    await expect(page.locator('span.truncate', { hasText: /^prd-001-001$/ })).toBeAttached();
    await page.locator('span.truncate', { hasText: /^task-001-001-001$/ }).scrollIntoViewIfNeeded();
    await page.locator('span.truncate', { hasText: /^task-001-001-001$/ }).scrollIntoViewIfNeeded();
    await expect(page.locator('span.truncate', { hasText: /^task-001-001-001$/ })).toBeAttached();

    // Find the collapse button for idea-001
    // It's the first button inside the row
    const rootRow = page
      .locator('li')
      .filter({ hasText: /^\s*\[\w+\]\s*idea-001/ })
      .first()
      .locator('> div');
    const toggleBtn = rootRow.locator('button').first();

    await toggleBtn.click();

    // Check prd is hidden
    await expect(page.locator('span.truncate', { hasText: /^prd-001-001$/ })).not.toBeAttached();

    // Expand root node
    await toggleBtn.click();

    // Check children are visible
    await expect(page.locator('span.truncate', { hasText: /^prd-001-001$/ })).toBeAttached();

    // Find the toggle button for prd
    const prdRow = page
      .locator('li')
      .filter({ hasText: /^\s*\[\w+\]\s*prd-001-001/ })
      .first()
      .locator('> div');
    const collapsePrdBtn = prdRow.locator('button').first();
    await collapsePrdBtn.click();

    // Check task is hidden
    await expect(page.locator('span.truncate', { hasText: /^task-001-001-001$/ })).not.toBeAttached();
  });

  test('Expand All and Collapse All buttons work globally', async ({ page }) => {
    // Initial state: collapsed
    await expect(page.locator('span.truncate', { hasText: /^idea-001$/ })).toBeAttached();
    await expect(page.locator('span.truncate', { hasText: /^prd-001-001$/ })).not.toBeAttached();

    // Click Expand All
    await page.getByRole('button', { name: 'Expand All' }).click({ force: true });

    // Now all should be visible
    await expect(page.locator('span.truncate', { hasText: /^idea-001$/ })).toBeAttached();
    await expect(page.locator('span.truncate', { hasText: /^prd-001-001$/ })).toBeAttached();
    await expect(page.locator('span.truncate', { hasText: /^task-001-001-001$/ })).toBeAttached();

    // Click Collapse All
    await page.getByRole('button', { name: 'Collapse All' }).scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Collapse All' }).click();

    // Now only root should be visible
    await expect(page.locator('span.truncate', { hasText: /^idea-001$/ })).toBeAttached();
    await expect(page.locator('span.truncate', { hasText: /^prd-001-001$/ })).not.toBeAttached();
    await expect(page.locator('span.truncate', { hasText: /^task-001-001-001$/ })).not.toBeAttached();
  });
});
