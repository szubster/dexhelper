import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('RNG Explainer', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald-egg.sav');
  });

  test('should render the RNG Tool Integration explainer correctly', async ({ page, isMobile }) => {
    await page.goto('./dashboard');

    // Wait for the dashboard block header to load.
    await expect(
      page
        .getByText('Trainer ID & Secret ID Info')
        .first()
        .or(page.getByText('RNG CALCULATOR TOOLBOX').first())
        .first(),
    ).toBeVisible();

    await expect(page.getByText('RNG Tool Integration')).toBeVisible();
    await expect(page.getByText(/Your Trainer ID \(TID\) and Secret ID \(SID\) are cryptographic keys/)).toBeVisible();

    if (isMobile) {
      await expect(page.getByText('RNG Tool Integration')).toBeVisible();
    }
  });
});
