import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Settings', () => {
  test('should open settings and toggle living dex mode and persist across reload', async ({ page }) => {
    await initializeWithSave(page);

    await page.getByRole('button', { name: 'System Settings' }).click();

    await expect(page.getByText('SYS.CONFIG').first()).toBeVisible();

    const livingDexBtn = page.getByText('[ LIVING DEX ]');
    await livingDexBtn.click();

    await page.getByRole('button', { name: 'Close settings' }).click();

    await page.waitForTimeout(500);

    await page.reload();
    await waitForSync(page);

    await page.getByRole('button', { name: 'System Settings' }).click();
    await expect(page.getByText('SYS.CONFIG').first()).toBeVisible();

    await expect(page.getByText('[ LIVING DEX ]')).toHaveClass(/bg-emerald-500/);
  });
});
