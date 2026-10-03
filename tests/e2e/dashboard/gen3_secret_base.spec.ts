import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 3 Secret Base Rematches E2E', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');
  });

  test('should render Gen 3 Secret Base Rematches section when mock state is valid', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('./dashboard');
    await waitForSync(page);

    // Mock state in Zustand store based on research findings
    await page.evaluate(() => {
      // biome-ignore lint/suspicious/noExplicitAny: window.__store is untyped
      const store = (window as typeof window & { __store: () => any }).__store();
      store.setSaveData({
        ...store.saveData,
        generation: 3,
        gen3SecretBases: [
          {
            trainerName: 'MOCK TRAINER',
            battledOwnerToday: false,
          },
          {
            trainerName: 'BEATEN TRAINER',
            battledOwnerToday: true,
          },
        ],
        gen3TrainerRematchFlags: [0, 1],
      });
    });

    // Verify "SECRET BASE REMATCHES" heading is visible
    await expect(page.getByText(/SECRET BASE REMATCHES/i)).toBeVisible();

    // Verify individual trainer panels
    await expect(page.getByText('MOCK TRAINER')).toBeVisible();
    await expect(page.getByText('[ BATTLE AVAILABLE ]')).toBeVisible();

    await expect(page.getByText('BEATEN TRAINER')).toBeVisible();
    await expect(page.getByText('[ ALREADY BATTLED ]')).toBeVisible();
  });
});
