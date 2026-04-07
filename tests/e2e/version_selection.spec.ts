import { test, expect } from '@playwright/test';
import { argosScreenshot } from '../../src/utils/argos';

test.describe('Version Selection', () => {
  test('should allow selecting a version manually and update UI', async ({ page }) => {
    await page.goto('/');

    // 1. Initial State - Check that we can open the selector
    const versionBtn = page.getByRole('button', { name: /select version|yellow|red|blue/i }).first();
    await versionBtn.click();

    // 2. Select Red in the modal
    await page.getByRole('button', { name: 'RED', exact: true }).click();

    // 3. Check if the version indicator updated (Case-Insensitive)
    await expect(page.getByText(/RED/i).first()).toBeVisible();
    
    // 4. Toggle back to YELLOW via header
    await page.getByRole('button', { name: /RED/i }).first().click();
    await page.getByRole('button', { name: 'YELLOW', exact: true }).click();
    await expect(page.getByText(/YELLOW/i).first()).toBeVisible();

    await argosScreenshot(page, 'version-selected-yellow');
  });

  test('should persist version selection across reloads', async ({ page }) => {
    await page.goto('/');

    // Select Blue
    await page.getByRole('button', { name: /select version|yellow/i }).first().click();
    await page.getByRole('button', { name: 'BLUE', exact: true }).click();
    await expect(page.getByText(/BLUE/i).first()).toBeVisible();

    // Reload
    await page.reload();

    // Should still be BLUE
    await expect(page.getByText(/BLUE/i).first()).toBeVisible();
  });
});
