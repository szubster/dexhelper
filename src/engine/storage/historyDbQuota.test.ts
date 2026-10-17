import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { countSavesForPlaythrough, writeSaveState } from './historyDb';

describe('quota exceeded mock', () => {
  it('should throw QuotaExceededError and catch it', async () => {
    // Write 4 saves
    for (let i = 0; i < 4; i++) {
      await writeSaveState(`save-${i}`, new Uint8Array([i]), { playthroughId: 'mock', timestamp: i });
    }

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const originalPut = IDBObjectStore.prototype.put;
    let putCalled = 0;

    // Mock the put method globally
    IDBObjectStore.prototype.put = function (value, key) {
      if (this.name === 'saves' && putCalled === 0) {
        putCalled++;
        const err = new Error('Quota exceeded');
        err.name = 'QuotaExceededError';
        throw err;
      }
      return originalPut.call(this, value, key);
    };

    try {
      await writeSaveState('save-new', new Uint8Array([9]), { playthroughId: 'mock', timestamp: 100 });
      const currentCount = await countSavesForPlaythrough('mock');
      // Original 4, write failed (threw quota error), evicted 2, retried write
      // So final count should be 4 - 2 + 1 = 3 saves
      expect(currentCount).toBe(3);
    } finally {
      IDBObjectStore.prototype.put = originalPut;
    }
  });
});
