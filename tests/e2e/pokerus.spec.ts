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

    // Open details using keyboard navigation on the first focusable element inside the pokemon list
    await page.keyboard.press('Tab'); // Need to tab to it or just click the heading's parent

    // Evaluate and click the closest clickable wrapper
    await page.evaluate(() => {
      const textNode = Array.from(document.querySelectorAll('*')).find(
        (e) => e.textContent === 'CYNDAQUIL' || e.textContent === 'Cyndaquil',
      );
      if (textNode) {
        let parent: HTMLElement | null = textNode as HTMLElement;
        while (
          parent &&
          parent.tagName !== 'BUTTON' &&
          parent.tagName !== 'A' &&
          !('onclick' in parent && parent.onclick !== null)
        ) {
          if (parent.tagName === 'BODY') {
            parent = textNode as HTMLElement;
            break;
          }
          parent = parent.parentElement;
        }
        if (parent) {
          parent.click();
        }
      }
    });

    // The details dialog or panel should have the badge.
    const badge = page.locator('.tactical-badge', { hasText: 'PKRS STRN' }).first();
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('1'); // The strain we set

    // Verify the duration/status is correctly displayed alongside it
    await expect(page.getByText('DAYS_REMAINING: 10')).toBeVisible();
  });
});
