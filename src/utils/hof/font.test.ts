import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { preloadFonts } from './font';

vi.mock('@fontsource/outfit/100.css', () => ({}));
vi.mock('@fontsource/outfit/200.css', () => ({}));
vi.mock('@fontsource/outfit/300.css', () => ({}));
vi.mock('@fontsource/outfit/400.css', () => ({}));
vi.mock('@fontsource/outfit/500.css', () => ({}));
vi.mock('@fontsource/outfit/600.css', () => ({}));
vi.mock('@fontsource/outfit/700.css', () => ({}));
vi.mock('@fontsource/outfit/800.css', () => ({}));
vi.mock('@fontsource/outfit/900.css', () => ({}));
vi.mock('@fontsource/jetbrains-mono/100.css', () => ({}));
vi.mock('@fontsource/jetbrains-mono/200.css', () => ({}));
vi.mock('@fontsource/jetbrains-mono/300.css', () => ({}));
vi.mock('@fontsource/jetbrains-mono/400.css', () => ({}));
vi.mock('@fontsource/jetbrains-mono/500.css', () => ({}));
vi.mock('@fontsource/jetbrains-mono/600.css', () => ({}));
vi.mock('@fontsource/jetbrains-mono/700.css', () => ({}));
vi.mock('@fontsource/jetbrains-mono/800.css', () => ({}));
vi.mock('@fontsource/press-start-2p', () => ({}));

describe('preloadFonts', () => {
  let originalFonts: unknown;

  beforeEach(() => {
    if (typeof document !== 'undefined') {
      originalFonts = document.fonts;
    }
  });

  afterEach(() => {
    if (typeof document !== 'undefined') {
      Object.defineProperty(document, 'fonts', {
        value: originalFonts,
        configurable: true,
      });
    }
  });

  it('should lazy load fonts and wait for document.fonts.ready', async () => {
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
