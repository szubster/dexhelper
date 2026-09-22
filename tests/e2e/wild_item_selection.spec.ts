import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('Wild Item Selection', () => {
  test('should add and remove items', async ({ page }) => {
    // Load a Gen 3 save file (to make sure SearchAndFilters is shown and we have data)
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    const input = page.getByPlaceholder('[ ENTER ITEM ID ]');
    const addButton = page.getByRole('button', { name: 'ADD' });
    const clearButton = page.getByRole('button', { name: 'CLEAR', exact: true });

    await expect(page.getByText('NO ITEMS SELECTED FOR HUNTING')).toBeVisible();

    await input.fill('13');
    await addButton.click();

    await expect(page.getByText('ID:13')).toBeVisible();
    await expect(page.getByText('NO ITEMS SELECTED FOR HUNTING')).toBeHidden();

    await input.fill('42');
    await addButton.click();

    await expect(page.getByText('ID:42')).toBeVisible();

    // Remove one item
    const remove13 = page.getByTitle('Remove Item').first();
    await remove13.click();

    await expect(page.getByText('ID:13')).toBeHidden();
    await expect(page.getByText('ID:42')).toBeVisible();

    // Clear all
    await clearButton.click();

    await expect(page.getByText('ID:42')).toBeHidden();
    await expect(page.getByText('NO ITEMS SELECTED FOR HUNTING')).toBeVisible();
  });
});
