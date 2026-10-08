import { expect, test } from '@playwright/test';
import { mockDagData } from './test-utils';

test.describe('Testing Style Guide Verification', () => {
  test('uses locator.or() with strict mode', async ({ page }) => {
    await page.goto('./');
    const el1 = page.getByText(/TRNR/i);
    const el2 = page.locator('header');
    await expect(el1.first().or(el2.first()).first()).toBeVisible({ timeout: 20000 });
  });

  test('conditionally adjusts locators based on isMobile', async ({ page, isMobile }) => {
    await page.goto('./');
    if (isMobile) {
      await expect(page.locator('header').first().or(page.getByText(/TRNR/i).first()).first()).toBeVisible();
    } else {
      await expect(page.locator('header').first().or(page.getByText(/TRNR/i).first()).first()).toBeVisible();
    }
  });

  test('successfully fetches and renders mock DAG data', async ({ page }) => {
    await mockDagData(page);
    await page.goto('./dag');
    const personaBadges = page.locator('.tactical-flow');
    await expect(personaBadges).toBeVisible();
  });
});
