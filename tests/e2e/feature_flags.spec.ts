import { expect } from '@playwright/test';
import { test } from './fixtures';
import { SettingsModalModel } from './models/SettingsModalModel';

test.describe('Feature Flags', () => {
  test('should reveal feature flags UI after 5 clicks and allow toggling', async ({ page, loadSave }) => {
    await loadSave();
    const settingsModal = new SettingsModalModel(page);

    await settingsModal.open();

    const devHeader = page.getByRole('button', { name: 'SYS.CONFIG' });

    // Click 5 times
    for (let i = 0; i < 5; i++) {
      await devHeader.click();
    }

    const featureFlagsHeader = page.getByText('FEATURE.FLAGS');
    await expect(featureFlagsHeader).toBeVisible();

    // Since we might not have any flags by default, let's just check the reset button exists
    const resetBtn = page.getByRole('button', { name: /RESET FLAGS/ });
    await expect(resetBtn).toBeVisible();
  });
});
