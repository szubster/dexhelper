import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 3 Trainer Data Extraction E2E', () => {
  test('verifies TID and SID are rendered correctly for Gen 3', async ({ page }) => {
    await clearStorage(page);

    // We use emerald.sav to test Gen 3 specific trainer data
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    await waitForSync(page);

    // Verify TID is visible in header RNG TID/SID display
    const tidElement = page.getByText('TID', { exact: true });
    await expect(tidElement).toBeVisible();

    // Verify SID is visible in header RNG TID/SID display
    const sidElement = page.getByText('SID', { exact: true });
    await expect(sidElement).toBeVisible();

    const tidValueStr = await tidElement.evaluate((node) => node.nextElementSibling?.textContent);
    const sidValueStr = await sidElement.evaluate((node) => node.nextElementSibling?.textContent);

    expect(tidValueStr).toMatch(/^\d{5}$/);
    expect(sidValueStr).toMatch(/^\d{5}$/);
  });
});
