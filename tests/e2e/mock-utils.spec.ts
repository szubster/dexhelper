declare global {
  interface Window {
    showOpenFilePicker: () => Promise<[{ getFile: () => Promise<File>; name: string }]>;
    offlineFired: boolean;
    onlineFired: boolean;
  }
}

import { expect, test } from '@playwright/test';
import { mockFilePicker, mockFileSystemAccess, mockOfflineState } from './mock-utils';

test.describe('Mock Utils', () => {
  test('mockFileSystemAccess should mock showOpenFilePicker', async ({ page }) => {
    await mockFileSystemAccess(page, 'hello world', 'test.txt');
    await page.goto('about:blank');

    const fileData = await page.evaluate(async () => {
      const handles = await window.showOpenFilePicker();
      const file = await handles[0].getFile();
      const text = await file.text();
      return { name: file.name, text };
    });

    expect(fileData.name).toBe('test.txt');
    expect(fileData.text).toBe('hello world');
  });

  test('mockFilePicker should mock file input correctly', async ({ page }) => {
    await page.goto('about:blank');

    await page.evaluate(() => {
      const input = document.createElement('input');
      input.type = 'file';
      input.id = 'test-file-input';
      document.body.appendChild(input);
    });

    const fileInput = page.locator('#test-file-input').first();
    await mockFilePicker(page, fileInput, 'hello world', 'test.txt');

    await page.waitForTimeout(50);

    const files = await fileInput.evaluate((node: HTMLInputElement) => node.files?.length);
    expect(files).toBe(1);
  });

  test('mockOfflineState should set offline status and trigger events', async ({ page }) => {
    await page.goto('about:blank');

    // Set up event listeners
    await page.evaluate(() => {
      window.offlineFired = false;
      window.onlineFired = false;
      window.addEventListener('offline', () => {
        window.offlineFired = true;
      });
      window.addEventListener('online', () => {
        window.onlineFired = true;
      });
    });

    await mockOfflineState(page, true);
    await page.waitForTimeout(100);

    const isOffline = await page.evaluate(() => !navigator.onLine);
    const offlineFired = await page.evaluate(() => window.offlineFired);

    expect(isOffline).toBe(true);
    expect(offlineFired).toBe(true);

    await mockOfflineState(page, false);
    await page.waitForTimeout(100);

    const isOnline = await page.evaluate(() => navigator.onLine);
    const onlineFired = await page.evaluate(() => window.onlineFired);

    expect(isOnline).toBe(true);
    expect(onlineFired).toBe(true);
  });
});
