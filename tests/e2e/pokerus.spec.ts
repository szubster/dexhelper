import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Pokerus State Exfiltration', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('displays pokerus badge for infected pokemon', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/gold-pokerus.sav');

    // Wait for CYNDAQUIL to appear
    await expect(page.getByText('CYNDAQUIL', { exact: false }).first()).toBeVisible({ timeout: 15000 });

    await page
      .locator('button', { hasText: /CYNDAQUIL/i })
      .first()
      .click();

    // The details dialog or panel should have the badge.
    const badge = page.locator('.tactical-badge', { hasText: 'PKRS STRN' }).first();
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('1'); // The strain we set

    // Verify the duration/status is correctly displayed alongside it
    await expect(page.getByText('[10D]')).toBeVisible();
  });

  test('displays pokerus badge for PC pokemon', async ({ page }) => {
    // 148 is Dragonair, which has pokerus in this save
    await initializeWithSave(page, 'tests/fixtures/gold-tid-15051.sav');

    // Wait for the PC list to render
    await expect(page.getByText('DRAGONAIR', { exact: false }).first()).toBeVisible({ timeout: 15000 });

    await page
      .locator('button', { hasText: /DRAGONAIR/i })
      .first()
      .click();

    // The details dialog or panel should have the badge.
    const badge = page.locator('.tactical-badge', { hasText: 'PKRS STRN' }).first();
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('10'); // The strain we set

    // Verify the duration/status is correctly displayed alongside it
    await expect(page.getByText('[15D]')).toBeVisible();
  });
});
