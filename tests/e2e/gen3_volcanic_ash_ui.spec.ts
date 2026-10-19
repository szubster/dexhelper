import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave } from './test-utils';

test.describe('Gen 3 Volcanic Ash UI', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
  });

  test('should render Volcanic Ash count when present in Gen 3 save in assistant view', async ({ page }) => {
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

  test('should not crash if volcanic ash is 0 in assistant view', async ({ page, isMobile }) => {
    await initializeWithSave(page, 'tests/fixtures/ruby-vithuang.sav');
    await page.goto('./assistant');

    await expect(page.getByText(/AI Assistant/i)).toBeVisible();

    if (isMobile) {
      // Need to use dispatchEvent('click') for headless clicks on mobile viewports for some elements to avoid flakiness
      await page.getByRole('button', { name: /Toggle Debug Mode/i }).dispatchEvent('click');
    } else {
      await page.getByRole('button', { name: /Toggle Debug Mode/i }).click();
    }

    await expect(page.getByText('ASH.CNT')).toBeVisible();
    await expect(page.getByText('Volcanic Ash')).toBeVisible();
    await expect(page.getByText('0', { exact: true })).toBeVisible();
  });

  test('should render Volcanic Ash Tracker in dashboard with craftable items', async ({ page }) => {
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    await page.goto('./dashboard');

    await expect(page.getByText('VOLCANIC ASH TRACKER')).toBeVisible();

    // Check ash count
    await expect(page.getByTestId('ash-count')).toHaveText('49,155');

    // With 49,155 ash, all items should be craftable.
    // The "Need X" text should NOT be present.
    await expect(page.getByText(/Need \d+/i)).toBeHidden();

    // Check that craftable items are displayed
    await expect(page.getByText('Blue Flute', { exact: true })).toBeVisible();
    await expect(page.getByText('Pretty Desk', { exact: true })).toBeVisible();
  });

  test('should correctly show uncraftable items if volcanic ash is low', async ({ page }) => {
    // ruby-vithuang.sav has 0 ash
    await initializeWithSave(page, 'tests/fixtures/ruby-vithuang.sav');

    await page.goto('./dashboard');

    await expect(page.getByText('VOLCANIC ASH TRACKER')).toBeVisible();

    // Check ash count
    await expect(page.getByTestId('ash-count')).toHaveText('0');

    // "Need X" text should be present since ash is 0
    await expect(page.getByText('Need 250')).toBeVisible(); // Blue flute is 250
    await expect(page.getByText('Need 8000')).toBeVisible(); // Pretty desk is 8000
  });
});
