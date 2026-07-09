import { expect, test } from '@playwright/test';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Advanced Settings Persistence', () => {
  test('should persist Game Version, Ball Style, and Nuzlocke Graveyard across reloads', async ({ page }) => {
    await initializeWithSave(page);

    // Open settings modal
    const settingsBtn = page.getByTestId('settings-button');
    if (await settingsBtn.isVisible()) {
      await settingsBtn.click();
    } else {
      await page.getByRole('button', { name: 'System Settings' }).click();
    }

    // Verify settings modal is open
    await expect(page.getByText('SYS.CONFIG').first()).toBeVisible();

    // 1. Change Game Version to Yellow
    await page.getByRole('radio', { name: 'Yellow', exact: true }).click();

    // 2. Change Ball Style to Great Ball
    await page.getByRole('radio', { name: 'Great Ball', exact: true }).click();

    // 3. Change Graveyard Box to Box 1
    await page.getByRole('radio', { name: '[ BOX 1 ]', exact: true }).click();

    // Close settings
    await page.getByRole('button', { name: 'Close settings' }).click();

    // Wait for the modal to be removed from the DOM / animation to finish
    await page.waitForTimeout(500);

    // Reload and wait for sync
    await page.reload();
    await waitForSync(page);

    // Re-open settings
    if (await settingsBtn.isVisible()) {
      await settingsBtn.click();
    } else {
      await page.getByRole('button', { name: 'System Settings' }).click();
    }
    await expect(page.getByText('SYS.CONFIG').first()).toBeVisible();

    // Verify persistence via checked state of the radio buttons
    await expect(page.getByRole('radio', { name: 'Yellow', exact: true })).toBeChecked();
    await expect(page.getByRole('radio', { name: 'Great Ball', exact: true })).toBeChecked();
    await expect(page.getByRole('radio', { name: '[ BOX 1 ]', exact: true })).toBeChecked();
  });
});
