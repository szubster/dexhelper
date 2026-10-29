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
    await page.goto('/');

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
    // Navigate to a valid application route that has a file input
    await page.goto('/');

    // We need to attach an input element to the DOM since one isn't immediately visible
    await page.evaluate(() => {
      const input = document.createElement('input');
      input.type = 'file';
      input.id = 'test-file-input';
      document.body.appendChild(input);
    });

    const fileInput = page.locator('#test-file-input').first();
    // Call our mock utility
    await mockFilePicker(page, fileInput, 'hello world', 'test.txt');

    // Wait for the input to register the files
    await page.waitForTimeout(50);

    // We can evaluate the input to see its files property directly
    const files = await fileInput.evaluate((node: HTMLInputElement) => node.files?.length);
    expect(files).toBe(1);
  });

  test('mockOfflineState should set offline status and trigger events', async ({ page }) => {
    await page.goto('/');

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

    const isOffline = await page.evaluate(() => !navigator.onLine);
    const offlineFired = await page.evaluate(() => window.offlineFired);

    expect(isOffline).toBe(true);
    expect(offlineFired).toBe(true);

    await mockOfflineState(page, false);

    const isOnline = await page.evaluate(() => navigator.onLine);
    const onlineFired = await page.evaluate(() => window.onlineFired);

    expect(isOnline).toBe(true);
    expect(onlineFired).toBe(true);
  });
});
