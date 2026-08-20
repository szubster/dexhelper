import path from 'node:path';
import { expect, test } from '@playwright/test';
import { clearStorage } from './test-utils';

test.describe('Emulator UI Integration', () => {
  test('should render Emulator UI heading', async ({ page }) => {
    await page.goto('./emulator');
    await expect(page.getByRole('heading', { name: /Emulator UI/i })).toBeVisible();
  });

  test('should display drop-zone and file input elements', async ({ page }) => {
    await page.goto('./emulator');
    await expect(page.getByTestId('drop-zone')).toBeVisible();
    await expect(page.getByTestId('file-input')).toBeAttached();
  });

  test('should upload a ROM file and display success message', async ({ page }) => {
    await clearStorage(page);
    await page.goto('./emulator');

    const fileInput = page.getByTestId('file-input');
    await fileInput.setInputFiles(path.join('tests', 'fixtures', 'yellow.sav'));

    await expect(page.getByTestId('success-message')).toBeVisible();
    await expect(page.getByText(/yellow\.sav/i)).toBeVisible();
  });
});
