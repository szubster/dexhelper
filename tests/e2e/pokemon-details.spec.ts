import path from 'node:path';
import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('Pokemon Details Modal', () => {
  test('should display detailed information for a Pokemon', async ({ page }) => {
    // 1. Initialize with a Gen 2 save (Crystal)
    await initializeWithSave(page, path.join(process.cwd(), 'tests/fixtures/crystal_save.sav'));

    // 2. Click on a Pokemon (e.g., Crobat - ID 169)
    // We expect the grid to be loaded
    await expect(page.getByText('Crobat')).toBeVisible();
    await page.getByText('Crobat').click();

    // 3. Verify Modal Headers
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Index No. 169')).toBeVisible();
    await expect(page.getByText('Crobat', { exact: true }).nth(0)).toBeVisible();
    await expect(page.getByText('Poison')).toBeVisible();
    await expect(page.getByText('Flying')).toBeVisible();

    // 4. Verify Stats Section
    await expect(page.getByText('Base Stats')).toBeVisible();
    await expect(page.getByText('HP')).toBeVisible();
    await expect(page.getByText('Speed')).toBeVisible();

    // 5. Verify Collection Status (Crobat should be owned in the crystal save)
    await expect(page.getByText('Collection Secured')).toBeVisible();

    // 6. Verify Evolution Section
    await expect(page.getByText('Evolution Line')).toBeVisible();
    await expect(page.getByText('Golbat')).toBeVisible();

    // 7. Test Navigation (Click on Golbat in evolutions)
    await page.getByText('Golbat').nth(0).click();
    await expect(page.getByText('Index No. 042')).toBeVisible();
    await expect(page.getByText('Golbat', { exact: true }).nth(0)).toBeVisible();

    // 8. Capture visual regression
    // Note: We used a fixed viewport in test-utils or global config
    // We can use argosScreenshot if configured, but let's stick to standard playwright for now
  });

  test('should show correct locations for the version', async ({ page }) => {
    await initializeWithSave(page, path.join(process.cwd(), 'tests/fixtures/crystal_save.sav'));

    // Find Pikachu (ID 25)
    await page.getByText('Pikachu').click();

    // Check locations
    await expect(page.getByText('Route 2')).toBeVisible();
  });
});
