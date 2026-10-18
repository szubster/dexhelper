import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Generator Tree Traversals Integration', () => {
  test('should traverse the data tree structure correctly', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);

    // Verify that the save file was successfully loaded
    await expect(page.locator('header').getByText(/TRNR/i).first()).toBeVisible({ timeout: 15000 });

    // The storage page internally uses tree traversal on the parsed data to present the boxes
    await page.goto('./storage');
    await waitForSync(page);

    // Box tabs or headers should be rendered based on the parsed data tree
    await expect(page.getByText('Box 1').first()).toBeVisible({ timeout: 15000 });

    // Switch to Party tab to verify other branch of the save tree
    await expect(page.getByText('Party').first()).toBeVisible();

    // We should see a Pokemon in the party if traversal was successful
    await expect(page.getByText('LV.').first()).toBeVisible();
  });
});
