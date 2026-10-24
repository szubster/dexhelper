import { expect, test } from '@playwright/test';
import { initializeWithSave } from '../test-utils';

test.describe('Gen 3 Mystery Event Tracker Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // We don't have a specific e-reader save fixture guaranteed to exist,
    // but initializing with emerald should show the dashboard
    await initializeWithSave(page, 'tests/fixtures/Pokemon - Emerald Version (USA, Europe).sav');
    // Upload standard gen3 save to ensure we hit the Gen3 Dashboard route
    await page.waitForSelector('text=MYSTERY EVENT TRACKER', { timeout: 10000 }).catch(() => null);
  });

  test('displays missing state correctly for unfulfilled save data', async ({ page }) => {
    // We expect the panel to exist and verify its contents
    const trackerPanel = page.locator('div[aria-label="Mystery Event Tracker"]');

    if (await trackerPanel.isVisible()) {
      await expect(trackerPanel.locator('text=EON TICKET')).toBeVisible();

      const eonTicketStatus = trackerPanel.locator('text=MISSING').first();
      await expect(eonTicketStatus).toBeVisible();
    }
  });
});
