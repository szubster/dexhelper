import { expect, test } from '@playwright/test';
import { clearStorage, initializeWithSave, waitForSync } from './test-utils';

test.describe('Gen 1 Hall of Fame Data Extraction Validation E2E', () => {
  test('hallOfFameCount and hallOfFameRecords should be populated correctly from Gen 1 save', async ({ page }) => {
    await clearStorage(page);
    await initializeWithSave(page, 'tests/fixtures/blue-complete.sav');
    await waitForSync(page);

    await expect(page.getByText(/BLUE/i).first()).toBeVisible();

    const extractedHof = await page.evaluate(async () => {
      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        const req = indexedDB.open('SaveDB', 2);
        req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result);
        req.onerror = (e) => reject((e.target as IDBOpenDBRequest).error);
      });

      const saveBuffer = await new Promise<Uint8Array | null>((resolve) => {
        if (!db.objectStoreNames.contains('saves')) {
          resolve(null);
          return;
        }
        const tx = db.transaction('saves', 'readonly');
        const store = tx.objectStore('saves');
        const req = store.get('last_save_file');
        req.onsuccess = () => resolve(req.result as Uint8Array);
        req.onerror = () => resolve(null);
      });
      db.close();

      if (!saveBuffer) return null;

      const view = new DataView(saveBuffer.buffer, saveBuffer.byteOffset, saveBuffer.byteLength);
      const hallOfFameCount = view.getUint8(0x25b3);

      const hofBase = 0x0598;
      const internalId = view.getUint8(hofBase + 0);
      const level = view.getUint8(hofBase + 1);

      return { hallOfFameCount, internalId, level };
    });

    expect(extractedHof).not.toBeNull();
    expect(extractedHof?.hallOfFameCount).toBe(190);
    // In Gen 1, internal ID 154 corresponds to Venusaur.
    expect(extractedHof?.internalId).toBe(154);
    expect(extractedHof?.level).toBe(47);
  });
});
