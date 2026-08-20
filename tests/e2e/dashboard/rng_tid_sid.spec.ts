import { expect, test } from '@playwright/test';
import { initializeWithSave } from '../test-utils';

test.describe('RNG TID and SID Display UI', () => {
  test('should display TID and SID and copy to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions for testing copy to clipboard
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // Initialize with emerald save file to ensure SID is present
    await initializeWithSave(page, 'tests/fixtures/emerald.sav');

    // Wait for header to be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Verify TID is visible
    const tidElement = page.getByText('TID', { exact: true });
    await expect(tidElement).toBeVisible();

    // Verify SID is visible
    const sidElement = page.getByText('SID', { exact: true });
    await expect(sidElement).toBeVisible();

    // Get the actual values to verify clipboard functionality
    // These should be padded to 5 digits, as displayed
    const tidValueStr = await tidElement.evaluate((node) => node.nextElementSibling?.textContent);
    const sidValueStr = await sidElement.evaluate((node) => node.nextElementSibling?.textContent);

    expect(tidValueStr).toBeTruthy();
    expect(sidValueStr).toBeTruthy();

    const tidValue = parseInt(tidValueStr || '0', 10);
    const sidValue = parseInt(sidValueStr || '0', 10);

    // Click the copy button
    const copyButton = page.getByTitle('Copy TID/SID');
    await expect(copyButton).toBeVisible();
    await copyButton.click();

    // Verify clipboard content
    const clipboardText = await page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });

    expect(clipboardText).toBe(`TID: ${tidValue}, SID: ${sidValue}`);
  });
});
