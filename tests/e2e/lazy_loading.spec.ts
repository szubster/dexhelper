import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Lazy Loading Components E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
  });

  test('Dashboard route loads lazy components', async ({ page }) => {
    // Collect unhandled rejections or errors
    const errors: Error[] = [];
    page.on('pageerror', (exception) => {
      errors.push(exception);
    });

    await page.goto('./dashboard');
    await waitForSync(page);

    // Verify some text or a known element on dashboard
    // Let's use getByText for something that appears on Emerald dashboard.
    // e.g. "SYS.DASHBOARD" or "ROAMER DOSSIER" or "TRAINER CARD" or similar.
    await expect(
      page
        .getByText(/SYS\./i)
        .first()
        .or(page.getByText(/DOSSIER/i).first())
        .or(page.getByText(/CHECKLIST/i).first())
        .first(),
    ).toBeVisible({ timeout: 10000 });

    expect(errors.length).toBe(0);
  });

  test('Pokemon Details route loads lazy components', async ({ page }) => {
    const errors: Error[] = [];
    page.on('pageerror', (exception) => {
      errors.push(exception);
    });

    await page.goto('./pokemon/25'); // Pikachu
    await waitForSync(page);

    // Wait for the Pikachu page to load
    await expect(
      page
        .getByText(/Catch Probability/i)
        .first()
        .or(page.getByText(/Locations/i).first())
        .first(),
    ).toBeVisible({ timeout: 10000 });

    expect(errors.length).toBe(0);
  });
});
