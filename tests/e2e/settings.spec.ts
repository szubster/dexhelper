import { test } from './fixtures';
import { SettingsModalModel } from './models/SettingsModalModel';
import { waitForSync } from './test-utils';

test.describe('Settings', () => {
  test('should open settings and toggle living dex mode and persist across reload', async ({ page, loadSave }) => {
    await loadSave();

    const settingsModal = new SettingsModalModel(page);
    await settingsModal.open();

    await settingsModal.toggleLivingDexMode();

    await settingsModal.close();

    await page.waitForTimeout(500);

    await page.reload();
    await waitForSync(page);

    await settingsModal.open();

    await settingsModal.assertLivingDexModeEnabled();
  });
});
