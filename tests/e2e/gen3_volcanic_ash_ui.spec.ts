import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Gen 3 Volcanic Ash UI', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should render Volcanic Ash count when present in Gen 3 save', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Explicitly navigate by click if mobile, or just go to URL
    await page.goto('./assistant');

    await expect(page.getByText(/AI Assistant/i)).toBeVisible();

    // Toggle debug mode
    await page.getByRole('button', { name: /Toggle Debug Mode/i }).click();

    // Verify ash count
    await expect(page.getByText('ASH.CNT')).toBeVisible();
    await expect(page.getByText('Volcanic Ash')).toBeVisible();
    await expect(page.getByText('49155')).toBeVisible();
  });

  test('should not crash if volcanic ash is 0', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/ruby-vithuang.sav');
    await page.goto('./assistant');

    await expect(page.getByText(/AI Assistant/i)).toBeVisible();

    await page.getByRole('button', { name: /Toggle Debug Mode/i }).click();

    await expect(page.getByText('ASH.CNT')).toBeVisible();
    await expect(page.getByText('Volcanic Ash')).toBeVisible();
    await expect(page.getByText('0', { exact: true })).toBeVisible();
  });
});
