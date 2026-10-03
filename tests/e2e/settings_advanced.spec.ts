import { test } from '@playwright/test';
import { SettingsModalModel } from './models/SettingsModalModel';
import { initializeWithSave, waitForSync } from './test-utils';

test.describe('Advanced Settings Persistence', () => {
  test('should persist Game Version and Ball Style across reloads', async ({ page }) => {
    await initializeWithSave(page);

    const settingsModal = new SettingsModalModel(page);

    // Open settings modal
    await settingsModal.open();

    // 1. Change Game Version to Yellow
    await settingsModal.setGameVersion('Yellow');

    // 2. Change Ball Style to Great Ball
    await settingsModal.setBallStyle('Great Ball');

    // Close settings
    await settingsModal.close();

    // Wait for the modal to be removed from the DOM / animation to finish
    await page.waitForTimeout(500);

    // Reload and wait for sync
    await page.reload();
    await waitForSync(page);

    // Re-open settings
    await settingsModal.open();

    // Verify persistence via checked state of the radio buttons
    await settingsModal.assertGameVersion('Yellow');
    await settingsModal.assertBallStyle('Great Ball');
  });
});
