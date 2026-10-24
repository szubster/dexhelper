import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 1 Static Encounters', () => {
  test('should display Gen 1 Static Encounters for complete Blue save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/blue-complete.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.locator('text=STATIC ENCOUNTERS')).toBeVisible();
    await expect(
      page.locator('.tactical-panel').filter({ hasText: 'STATIC ENCOUNTERS' }).getByText('MEWTWO').first(),
    ).toBeVisible();
    await expect(
      page.locator('.tactical-panel').filter({ hasText: 'STATIC ENCOUNTERS' }).getByText('ZAPDOS').first(),
    ).toBeVisible();
    await expect(
      page.locator('.tactical-panel').filter({ hasText: 'STATIC ENCOUNTERS' }).getByText('ARTICUNO').first(),
    ).toBeVisible();
    await expect(
      page.locator('.tactical-panel').filter({ hasText: 'STATIC ENCOUNTERS' }).getByText('MOLTRES').first(),
    ).toBeVisible();
    await expect(
      page
        .locator('.tactical-panel')
        .filter({ hasText: 'STATIC ENCOUNTERS' })
        .getByText('SNORLAX', { exact: true })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator('.tactical-panel')
        .filter({ hasText: 'STATIC ENCOUNTERS' })
        .getByText('LAPRAS', { exact: true })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .locator('.tactical-panel')
        .filter({ hasText: 'STATIC ENCOUNTERS' })
        .getByText('EEVEE', { exact: true })
        .first(),
    ).toBeVisible();
  });

  test('should display Gen 1 Static Encounters for incomplete Red save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/red.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.locator('text=STATIC ENCOUNTERS')).toBeVisible();
    await expect(
      page.locator('.tactical-panel').filter({ hasText: 'STATIC ENCOUNTERS' }).getByText('MEWTWO').first(),
    ).toBeVisible();
    await expect(
      page.locator('.tactical-panel').filter({ hasText: 'STATIC ENCOUNTERS' }).getByText('ZAPDOS').first(),
    ).toBeVisible();
    await expect(
      page.locator('.tactical-panel').filter({ hasText: 'STATIC ENCOUNTERS' }).getByText('ARTICUNO').first(),
    ).toBeVisible();
    await expect(
      page.locator('.tactical-panel').filter({ hasText: 'STATIC ENCOUNTERS' }).getByText('MOLTRES').first(),
    ).toBeVisible();
    await expect(
      page
        .locator('.tactical-panel')
        .filter({ hasText: 'STATIC ENCOUNTERS' })
        .getByText('SNORLAX', { exact: true })
        .first(),
    ).toBeVisible();
  });
});
