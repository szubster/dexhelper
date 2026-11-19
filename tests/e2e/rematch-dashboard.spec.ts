import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Rematch Dashboard Layout and Routing', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
    await waitForSync(page);
  });

  test('verifies navigation from layout using locator.or and tactical primitives', async ({ page }) => {
    // Navigate via UI to test desktop/mobile navigation elements
    const desktopNav = page.locator('a', { hasText: 'SYS.RMTCH' });
    const mobileNav = page.locator('button[aria-label="Rematches"]');

    // Check if either is visible in the layout
    const navElement = desktopNav.first().or(mobileNav.first()).first();
    await navElement.waitFor({ state: 'attached' });

    // Simulate real user interaction instead of goto
    await navElement.dispatchEvent('click');
    await waitForSync(page);

    // Wait for the route to load using the literal text inside the h1 element
    const mainTitle = page.locator('h1.tactical-text').filter({ hasText: '[REMATCH_DASHBOARD]' }).first();
    await expect(mainTitle).toBeVisible();

    // Verify STATUS ONLINE text
    const statusText = page.locator('span.tactical-text').filter({ hasText: '[STATUS: ONLINE]' }).first();
    await expect(statusText).toBeVisible();

    // Verify sections with tactical-panel
    const availableRematchesSection = page
      .locator('section.tactical-panel')
      .filter({ hasText: '[AVAILABLE_REMATCHES]' })
      .first();
    await expect(availableRematchesSection).toBeVisible();
    await expect(
      availableRematchesSection.locator('h2.tactical-text', { hasText: '[AVAILABLE_REMATCHES]' }).first(),
    ).toBeVisible();
    await expect(
      availableRematchesSection.locator('div.tactical-text', { hasText: '[AWAITING_DATA]' }).first(),
    ).toBeVisible();

    const locationDataSection = page.locator('section.tactical-panel').filter({ hasText: '[LOCATION_DATA]' }).first();
    await expect(locationDataSection).toBeVisible();
    await expect(locationDataSection.locator('h2.tactical-text', { hasText: '[LOCATION_DATA]' }).first()).toBeVisible();
    await expect(
      locationDataSection.locator('div.tactical-text', { hasText: '[AWAITING_DATA]' }).first(),
    ).toBeVisible();
  });
});
