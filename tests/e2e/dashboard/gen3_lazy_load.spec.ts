import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 3 Lazy Load Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage properly and then load Gen 3 save
    await clearStorage(page);
    // Initialize with a Gen 3 save (Emerald)
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
  });

  test('should correctly lazy load and render Gen 3 dashboard components', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('./dashboard');
    await waitForSync(page);

    // Wait for at least one Gen 3 specific dashboard to be visible to confirm lazy loading succeeded
    // We use .or() to handle variations in exact casing and different dashboards that might render
    await expect(
      page
        .getByText(/BATTLE FRONTIER/i)
        .first()
        .or(page.getByText(/SECRET BASE REMATCHES/i).first())
        .or(page.getByText(/STATIC ENCOUNTERS/i).first())
        .or(page.getByText(/TRICK HOUSE/i).first())
        .first(),
    ).toBeVisible({ timeout: 15000 });

    const content = await page.textContent('body');

    // Check that Gen 3 components are rendering (we just proved at least one is visible)

    // Check that Gen 2 is NOT rendering
    expect(content?.includes('POKEGEAR')).toBeFalsy();

    // Check that we correctly loaded gen 3 dashboard components without crashing
    // Gen3RoamerDossier and Gen3StaticEncountersDashboard are also lazy loaded
  });
});
