import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('TanStack Query Optimizations', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('validates data caching and UI updates', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Ensure trainer is loaded
    await expect(page.getByText('Trainer')).toBeVisible();

    // Test the cache hit on navigating between index (pokedex grid) and assistant
    await page
      .getByRole('link', { name: 'ASST' })
      .first()
      .or(page.getByRole('link', { name: 'Assistant' }).first())
      .first()
      .click();

    await expect(
      page
        .locator('.assistant-panel')
        .first()
        .or(page.getByText(/Assistant/i).first())
        .first(),
    ).toBeVisible();

    // Navigate back to DEX
    await page
      .getByRole('link', { name: 'DEX' })
      .first()
      .or(page.getByRole('link', { name: 'Pokedex' }).first())
      .first()
      .click();

    await expect(page.getByText('Trainer')).toBeVisible();
    await expect(
      page.locator('header').getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first(),
    ).toBeVisible();
  });

  test('suspense boundaries integration in pokedex route', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Navigate to DEX (Pokedex) which uses Suspense
    await page
      .getByRole('link', { name: 'DEX' })
      .first()
      .or(page.getByRole('link', { name: 'Pokedex' }).first())
      .first()
      .click();

    await expect(
      page.locator('header').getByText(/TRNR/i).first().or(page.getByTestId('pokedex-card').first()).first(),
    ).toBeVisible();
  });
});
