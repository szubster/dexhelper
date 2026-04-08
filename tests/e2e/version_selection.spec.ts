import { test, expect } from '@playwright/test';
import { argosScreenshot } from '../../src/utils/argos';
import { initializeWithSave } from './test-utils';

test.describe('Version Selection', () => {
  test('should allow selecting a version manually and update UI', async ({ page }) => {
    // Start with a clean state and initialize
    await initializeWithSave(page);

    // 1. Check that we can open the selector
    // The button displays the current version name (Yellow if fixture loaded)
    const versionBtn = page.getByRole('button', { name: /YELLOW/i }).first();
    await versionBtn.click();

    // 2. Select Red in the modal
    await page.getByRole('button', { name: 'Red', exact: true }).click();

    // 3. Check if the version indicator updated
    await expect(page.getByText(/RED/i).first()).toBeVisible();

    // 4. Toggle back to YELLOW via header
    await page.getByRole('button', { name: /RED/i }).first().click();
    await page.getByRole('button', { name: 'Yellow', exact: true }).click();
    await expect(page.getByText(/YELLOW/i).first()).toBeVisible();

    await argosScreenshot(page, 'version-selected-yellow');
  });

  test('should persist version selection across reloads', async ({ page }) => {
    await initializeWithSave(page);

    // Select Blue
    await page
      .getByRole('button', { name: /YELLOW/i })
      .first()
      .click();
    await page.getByRole('button', { name: 'Blue', exact: true }).click();
    await expect(page.getByText(/BLUE/i).first()).toBeVisible();

    // Reload
    await page.reload();

    // Should still be BLUE (persisted in localStorage)
    await expect(page.getByText(/BLUE/i).first()).toBeVisible();
  });
});
