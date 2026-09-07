import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { preloadFonts } from './font';

describe('preloadFonts', () => {
  let originalFonts: unknown;
  let styleElements: HTMLStyleElement[] = [];

  beforeEach(() => {
    if (typeof document !== 'undefined') {
      originalFonts = document.fonts;
      vi.stubGlobal(
        'fetch',
        vi.fn().mockImplementation((url: string) => {
          if (url.includes('css2')) {
            return Promise.resolve({
              ok: true,
              text: () =>
                Promise.resolve("@font-face { font-family: 'Test'; src: url(https://example.com/font.woff2); }"),
            });
          }
          if (url.includes('example.com/font.woff2')) {
            return Promise.resolve({
              ok: true,
              blob: () => Promise.resolve(new Blob(['test font data'], { type: 'font/woff2' })),
            });
          }
          return Promise.resolve({ ok: false });
        }),
      );

      const origAppendChild = document.head.appendChild.bind(document.head);
      vi.spyOn(document.head, 'appendChild').mockImplementation((node) => {
        if (node instanceof HTMLStyleElement) {
          styleElements.push(node);
        }
        return origAppendChild(node);
      });
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (typeof document !== 'undefined') {
      Object.defineProperty(document, 'fonts', {
        value: originalFonts,
        configurable: true,
      });
      // Cleanup styles
      for (const el of styleElements) {
        el.remove();
      }
      styleElements = [];
    }
  });

  it('should wait for document.fonts.ready and embed styles if available', async () => {
    if (typeof document === 'undefined') return;

    let resolved = false;
    const readyPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolved = true;
        resolve();
      }, 10);
    });

    Object.defineProperty(document, 'fonts', {
      value: { ready: readyPromise },
      configurable: true,
    });

    const promise = preloadFonts();
    expect(resolved).toBe(false);
    await promise;
    expect(resolved).toBe(true);

    const injectedStyle = document.getElementById('embedded-hof-fonts');
    expect(injectedStyle).toBeDefined();
    expect(injectedStyle?.textContent).toContain('data:font/woff2;base64,');
  });

  it('should resolve immediately if document.fonts is undefined', async () => {
    if (typeof document === 'undefined') return;

    Object.defineProperty(document, 'fonts', {
      value: undefined,
      configurable: true,
    });

    await expect(preloadFonts()).resolves.toBeUndefined();
  });
});
