import { expect } from '@playwright/test';
import { test } from './fixtures';
import { SettingsModalModel } from './models/SettingsModalModel';

test.describe('WIP Signaling System', () => {
  test('should ensure WIP elements are walled off by default and toggleable via feature flags UI', async ({
    page,
    loadSave,
  }) => {
    // 1. Initial State: The WIP experimental feature flag should be OFF by default
    // when no VITE_FF_ experimental env variables are set.

    // Create a mock feature flag state for testing
    await page.addInitScript(() => {
      window.localStorage.setItem(
        'dexhelper-feature-flags',
        JSON.stringify({
          state: {
            flags: {
              WIP_TEST_EXPERIMENTAL_NODE: false,
            },
          },
          version: 0,
        }),
      );
    });

    await loadSave();

    // 2. Open Settings
    const settingsModal = new SettingsModalModel(page);
    await settingsModal.open();

    const devHeader = page.getByRole('button', { name: 'SYS.CONFIG' });

    // Click 5 times to reveal feature flags
    for (let i = 0; i < 5; i++) {
      await devHeader.click();
    }

    const featureFlagsHeader = page.getByText('FEATURE.FLAGS');
    await expect(featureFlagsHeader).toBeVisible();

    // Verify WIP flag button exists and is initially OFF
    const wipFlagBtn = page.getByRole('button', { name: /WIP_TEST_EXPERIMENTAL_NODE/ });
    await expect(wipFlagBtn).toBeVisible();
    await expect(wipFlagBtn).toContainText('OFF');

    // Toggle the WIP flag ON
    await wipFlagBtn.click();
    await expect(wipFlagBtn).toContainText('ON');

    // Toggle the WIP flag OFF
    await wipFlagBtn.click();
    await expect(wipFlagBtn).toContainText('OFF');
  });
});
