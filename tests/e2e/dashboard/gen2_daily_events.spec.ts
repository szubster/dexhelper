import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from '../test-utils';

test.describe('Gen 2 Daily/Weekly Events', () => {
  test('should display correctly for Gold save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/gold.sav');

    await page.goto('./dashboard');
    await waitForSync(page);

    await expect(page.getByText('DAILY / WEEKLY EVENTS')).toBeVisible();

    await expect(page.getByText('FRIDAY LAPRAS')).toBeVisible();
    await expect(page.getByText('BUG CATCHING CONTEST')).toBeVisible();
    await expect(page.getByText('HAIRCUT (OLDER)')).toBeVisible();
    await expect(page.getByText('HAIRCUT (YOUNGER)')).toBeVisible();
    await expect(page.getByText('MYSTERY GIFT')).toBeVisible();
    await expect(page.getByText('BUENA NO BLUE CARD')).toBeVisible();
    await expect(page.getByText('MONICA (MONDAY)')).toBeVisible();
    await expect(page.getByText('TUSCANY (TUESDAY)')).toBeVisible();
    await expect(page.getByText('WESLEY (WEDNESDAY)')).toBeVisible();
    await expect(page.getByText('ARTHUR (THURSDAY)')).toBeVisible();
    await expect(page.getByText('FRIEDA (FRIDAY)')).toBeVisible();
    await expect(page.getByText('SANTOS (SATURDAY)')).toBeVisible();
    await expect(page.getByText('SUNNY (SUNDAY)')).toBeVisible();
  });
});
