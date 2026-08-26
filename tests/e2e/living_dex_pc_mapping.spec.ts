import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Living Dex PC Mapping', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/yellow.sav');
  });

  test('should display living dex ghosts', async ({ page }) => {
    const settingsBtn = page.getByTestId('settings-button');
    if (await settingsBtn.isVisible()) {
      await settingsBtn.click();
    } else {
      await page.getByRole('button', { name: 'System Settings' }).click();
    }

    await page.getByText('[ LIVING DEX ]').click();
    await page.getByRole('button', { name: 'Close settings' }).click();

    await page.waitForTimeout(500);

    await page.getByTestId('filter-missing').click();
    await expect(page.locator('[data-pokemon-id="1"]').first()).toBeVisible();
    await expect(page.locator('[data-pokemon-id="25"]').first()).not.toBeVisible();

    await page.getByTestId('filter-secured').click();
    await expect(page.locator('[data-pokemon-id="25"]').first()).toBeVisible();
    await expect(page.locator('[data-pokemon-id="1"]').first()).not.toBeVisible();
  });
});
