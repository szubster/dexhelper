import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Settings', () => {
  test('should open settings and toggle living dex mode and persist across reload', async ({ page }) => {
    await initializeWithSave(page);

    const settingsBtn = page.getByTestId('settings-button');
    if (await settingsBtn.isVisible()) {
      await settingsBtn.click();
    } else {
      await page.getByRole('button', { name: 'System Settings' }).click();
    }

    await expect(page.getByText('SYS.CONFIG').first()).toBeVisible();

    const livingDexBtn = page.getByRole('radio', { name: '[ LIVING DEX ]' });
    await livingDexBtn.click();

    await page.getByRole('button', { name: 'Close settings' }).click();

    await page.waitForTimeout(500);

    await page.reload();
    await waitForSync(page);

    if (await settingsBtn.isVisible()) {
      await settingsBtn.click();
    } else {
      await page.getByRole('button', { name: 'System Settings' }).click();
    }
    await expect(page.getByText('SYS.CONFIG').first()).toBeVisible();

    await expect(page.getByRole('radio', { name: '[ LIVING DEX ]' })).toHaveClass(/bg-emerald-500/);
  });
});
