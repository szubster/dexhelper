import type { Page } from '@playwright/test';

/**
 * Mocks the File System Access API (\`window['showOpenFilePicker']\`) to return a simulated file.
 */
export async function mockFileSystemAccess(
  page: Page,
  fileContent: Uint8Array | number[] | string,
  fileName: string = 'test.sav',
) {
  let fileArray: number[];
  if (typeof fileContent === 'string') {
    // Basic conversion for simple strings
    fileArray = Array.from(new TextEncoder().encode(fileContent));
  } else {
    fileArray = Array.from(fileContent);
  }

  await page.addInitScript(
    ({ fileArray, fileName }) => {
      Object.defineProperty(window, 'showOpenFilePicker', {
        value: async () => {
          return [
            {
              name: fileName,
              kind: 'file',
              getFile: async () => {
                const uint8Array = new Uint8Array(fileArray);
                return new File([uint8Array], fileName);
              },
            },
          ];
        },
        configurable: true,
      });
    },
    { fileArray, fileName },
  );
}

/**
 * Mocks the offline state.
 */
export async function mockOfflineState(page: Page, isOffline: boolean = true) {
  await page.context().setOffline(isOffline);

  // Ensure the DOM fires the event immediately if already loaded
  await page.evaluate((offline) => {
    Object.defineProperty(navigator, 'onLine', {
      value: !offline,
      configurable: true,
    });
    window.dispatchEvent(new Event(offline ? 'offline' : 'online'));
  }, isOffline);
}
