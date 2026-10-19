import { expect, test } from '@playwright/test';
import { MAX_SAVE_STATES_PER_PLAYTHROUGH } from '../../src/engine/storage/constants';
import { clearStorage } from './test-utils';

test.describe('Save State Limits and Quota Handling (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await page.goto('.');
    await page.waitForLoadState('networkidle');
  });

  test('should enforce max save states limit and evict oldest', async ({ page }) => {
    const result = await page.evaluate(async (maxLimit) => {
      const playthroughId = 'test-limits';

      // Write maxLimit + 5 saves
      const numSaves = maxLimit + 5;
      for (let i = 0; i < numSaves; i++) {
        await window.writeSaveState(`limit-save-${i}`, new Uint8Array([i]), {
          playthroughId,
          timestamp: 1000 + i, // ascending timestamps
        });
      }

      // Check count
      const count = await window.countSavesForPlaythrough(playthroughId);

      // Try to get oldest ones to verify eviction
      // The oldest 5 should have been evicted, so the first remaining should be limit-save-5
      const oldestSaves = await window.getOldestSaves(playthroughId, 5);

      return { count, oldestSaves };
    }, MAX_SAVE_STATES_PER_PLAYTHROUGH);

    expect(result.count).toBe(MAX_SAVE_STATES_PER_PLAYTHROUGH);
    expect(result.oldestSaves).toEqual([
      'limit-save-5',
      'limit-save-6',
      'limit-save-7',
      'limit-save-8',
      'limit-save-9',
    ]);
  });

  test('should handle QuotaExceededError by evicting half the saves', async ({ page }) => {
    // This is hard to trigger exactly in a normal e2e run because we can't easily exhaust disk quota.
    // Instead we can mock the IDB put to throw a QuotaExceededError.
    const result = await page.evaluate(async () => {
      const playthroughId = 'test-quota';

      // Write 10 saves normally
      for (let i = 0; i < 10; i++) {
        await window.writeSaveState(`quota-save-${i}`, new Uint8Array([i]), {
          playthroughId,
          timestamp: 1000 + i,
        });
      }

      // We will override IDBObjectStore.prototype.put temporarily to throw QuotaExceededError
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const originalPut = IDBObjectStore.prototype.put;
      let throwQuotaError = true;

      IDBObjectStore.prototype.put = function (value, key) {
        if (this.name === 'saves' && throwQuotaError) {
          throwQuotaError = false; // Only throw once
          const err = new DOMException('Quota exceeded', 'QuotaExceededError');
          throw err;
        }
        return originalPut.call(this, value, key);
      };

      try {
        // This write should trigger the mocked quota error, which will be caught,
        // it will evict half (5) saves, and then retry successfully.
        await window.writeSaveState(`quota-save-new`, new Uint8Array([99]), {
          playthroughId,
          timestamp: 5000,
        });
      } finally {
        // Restore original put
        IDBObjectStore.prototype.put = originalPut;
      }

      const count = await window.countSavesForPlaythrough(playthroughId);
      const oldestSaves = await window.getOldestSaves(playthroughId, 10);

      return { count, oldestSaves };
    });

    // Started with 10. Evicted half (5). Added 1 new. Total should be 6.
    expect(result.count).toBe(6);
    // Oldest 5 should have been removed (quota-save-0 to quota-save-4).
    // Remaining should be 5 through 9, plus the new one.
    expect(result.oldestSaves).toEqual([
      'quota-save-5',
      'quota-save-6',
      'quota-save-7',
      'quota-save-8',
      'quota-save-9',
      'quota-save-new',
    ]);
  });
});
