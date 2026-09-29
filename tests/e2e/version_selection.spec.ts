import { expect, test } from './fixtures';

test.describe('Version Selection', () => {
  test('should allow selecting a version manually and update UI', async ({ page, loadSave }) => {
    // Start with a clean state and initialize
    await loadSave();

    // 1. Check that we can open the selector
    // The button displays the current version name (Yellow if fixture loaded)
    const versionBtn = page.getByTestId('version-selector');
    await versionBtn.click();

    // 2. Select Red in the modal
    await page.getByRole('button', { name: /Select Red version/i }).click();

    // 3. Check if the version indicator updated
    await expect(page.getByText(/RED/i).first()).toBeVisible();

    // 4. Toggle back to YELLOW via header
    await page.getByTestId('version-selector').click();
    await page.getByRole('button', { name: /Select Yellow version/i }).click();
    await expect(page.getByText(/YELLOW/i).first()).toBeVisible();
  });

  test('should persist version selection across reloads', async ({ page, loadSave }) => {
    await loadSave();

    // Select Blue
    await page.getByTestId('version-selector').click();
    await page.getByRole('button', { name: /Select Blue version/i }).click();
    await expect(page.getByText(/BLUE/i).first()).toBeVisible();

    // Reload
    await page.reload();

    // Should still be BLUE (persisted in localStorage)
    await expect(page.getByText(/BLUE/i).first()).toBeVisible();
  });
});
