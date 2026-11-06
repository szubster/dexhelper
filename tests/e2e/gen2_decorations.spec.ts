import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 2 Decorations E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should display Gen 2 decorations correctly for Crystal save', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/crystal.sav');
    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('ROOM DECORATIONS').first()).toBeVisible();

    // We want to test that mystery gift exclusives are correctly highlighted in the UI.
    // There are mystery gift items like Snorlax Doll, Pikachu Doll, Surf Pikachu Doll, etc.
    // Some are definitely unlocked in the crystal.sav

    // Let's assert a few categories directly using exact match.
    // In Gen2RoomDecorationDashboard, the names are Beds, Plants, Posters, Consoles, Ornaments, Dolls

    await expect(page.getByText('Beds').first()).toBeVisible();
    await expect(page.getByText('Consoles').first()).toBeVisible();
    await expect(page.getByText('Dolls').first()).toBeVisible();
    await expect(page.getByText('Ornaments').first()).toBeVisible();
    await expect(page.getByText('Plants').first()).toBeVisible();
    await expect(page.getByText('Posters').first()).toBeVisible();

    // Test that the [MG] badge exists for Mystery Gift items.
    // And test that ACTIVE badge exists for active items.
    await expect(page.getByText('[MG]').first()).toBeVisible();
    await expect(page.getByText('ACTIVE').first()).toBeVisible();
  });
});
