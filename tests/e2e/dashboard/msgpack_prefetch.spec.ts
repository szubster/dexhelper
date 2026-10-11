import { expect, test } from '@playwright/test';

test.describe('Msgpack Prefetching', () => {
  // The prefetch tags are only injected in production builds by the Vite plugin
  test.skip(() => process.env['CI'] !== 'true', 'Prefetch tags are only injected in production build (CI mode)');

  test('should trigger and complete generation-specific msgpack prefetching after initial load', async ({ page }) => {
    const prefetchRequests = new Set<string>();
    const completedRequests = new Set<string>();

    page.on('request', (request) => {
      if (request.url().match(/pokedata-gen[123]\.msgpack/)) {
        prefetchRequests.add(request.url());
      }
    });

    page.on('requestfinished', (request) => {
      if (request.url().match(/pokedata-gen[123]\.msgpack/)) {
        completedRequests.add(request.url());
      }
    });

    await page.goto('./');

    // Wait for the prefetch requests to trigger and finish
    await expect(async () => {
      expect(completedRequests.size).toBeGreaterThanOrEqual(3);
    }).toPass({ timeout: 15000 });

    const urls = Array.from(completedRequests);
    expect(urls.some((url) => url.includes('pokedata-gen1.msgpack'))).toBeTruthy();
    expect(urls.some((url) => url.includes('pokedata-gen2.msgpack'))).toBeTruthy();
    expect(urls.some((url) => url.includes('pokedata-gen3.msgpack'))).toBeTruthy();
  });
});
