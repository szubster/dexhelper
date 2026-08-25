import { expect, test } from '@playwright/test';
import { initializeWithSave } from './test-utils';

test.describe('Save State Read/Write API', () => {
  test('should write and read save states using exposed historyDb API', async ({ page }) => {
    await initializeWithSave(page);

    const result = await page.evaluate(async () => {
      // @ts-expect-error accessing window/module exports is tricky, we exposed __historyDbAPI for E2E tests.
      const api = window.__historyDbAPI;
      if (!api) throw new Error('historyDbAPI not exposed on window');

      const ptId = 'test-pt-1';
      await api.writeSaveState('save-1', new Uint8Array([1]), { playthroughId: ptId, timestamp: 100 });
      await api.writeSaveState('save-2', new Uint8Array([2]), { playthroughId: ptId, timestamp: 300 });
      await api.writeSaveState('save-3', new Uint8Array([3]), { playthroughId: ptId, timestamp: 200 });

      const mostRecent = await api.getMostRecentSave(ptId);
      const previous = await api.getPreviousSave('save-2');

      return {
        mostRecentData: mostRecent ? Array.from(mostRecent.saveData) : null,
        mostRecentMeta: mostRecent ? mostRecent.metadata : null,
        previousData: previous ? Array.from(previous.saveData) : null,
        previousMeta: previous ? previous.metadata : null,
      };
    });

    expect(result.mostRecentData).toEqual([2]);
    expect(result.mostRecentMeta).toEqual({ playthroughId: 'test-pt-1', timestamp: 300 });
    expect(result.previousData).toEqual([3]);
    expect(result.previousMeta).toEqual({ playthroughId: 'test-pt-1', timestamp: 200 });
  });
});
