import { expect, test } from '@playwright/test';
import { clearStorage } from './test-utils';

test.describe('Save State Read/Write APIs (E2E)', () => {
  test.beforeEach(async ({ page }) => {
    await clearStorage(page);
    await page.goto('.');
    // Wait for the application logic and window exports to load
    await page.waitForLoadState('networkidle');
  });

  test('should accurately write saves, retrieve most recent, and retrieve previous saves', async ({ page }) => {
    const result = await page.evaluate(async () => {
      const playthroughId = 'test-playthrough-123';

      // Save 1
      const save1Id = 'save-1';
      const save1Data = new Uint8Array([1, 1, 1]);
      const save1Metadata = { playthroughId, timestamp: 1000, type: 'auto' };

      // Save 2
      const save2Id = 'save-2';
      const save2Data = new Uint8Array([2, 2, 2]);
      const save2Metadata = { playthroughId, timestamp: 2000, type: 'manual' };

      // Save 3 (Different playthrough)
      const save3Id = 'save-3-other';
      const save3Data = new Uint8Array([3, 3, 3]);
      const save3Metadata = { playthroughId: 'other-playthrough', timestamp: 3000, type: 'auto' };

      // Save 4 (Most recent for playthrough 1)
      const save4Id = 'save-4';
      const save4Data = new Uint8Array([4, 4, 4]);
      const save4Metadata = { playthroughId, timestamp: 4000, type: 'auto' };

      await window.writeSaveState(save1Id, save1Data, save1Metadata);
      await window.writeSaveState(save2Id, save2Data, save2Metadata);
      await window.writeSaveState(save3Id, save3Data, save3Metadata);
      await window.writeSaveState(save4Id, save4Data, save4Metadata);

      // Verify most recent save
      const mostRecent = await window.getMostRecentSave(playthroughId);

      // Verify previous save (relative to save-4)
      const prevFromSave4 = await window.getPreviousSave(save4Id);

      // Verify previous save (relative to save-2)
      const prevFromSave2 = await window.getPreviousSave(save2Id);

      // Verify previous save (relative to save-1)
      const prevFromSave1 = await window.getPreviousSave(save1Id);

      return {
        mostRecent: mostRecent
          ? {
              data: Array.from(mostRecent.saveData),
              metadata: mostRecent.metadata,
            }
          : null,
        prevFromSave4: prevFromSave4
          ? {
              data: Array.from(prevFromSave4.saveData),
              metadata: prevFromSave4.metadata,
            }
          : null,
        prevFromSave2: prevFromSave2
          ? {
              data: Array.from(prevFromSave2.saveData),
              metadata: prevFromSave2.metadata,
            }
          : null,
        prevFromSave1: prevFromSave1
          ? {
              data: Array.from(prevFromSave1.saveData),
              metadata: prevFromSave1.metadata,
            }
          : null,
      };
    });

    // Assert Most Recent Save
    expect(result.mostRecent).not.toBeNull();
    expect(result.mostRecent?.data).toEqual([4, 4, 4]);
    expect(result.mostRecent?.metadata.timestamp).toBe(4000);

    // Assert Previous Save from Save 4
    expect(result.prevFromSave4).not.toBeNull();
    expect(result.prevFromSave4?.data).toEqual([2, 2, 2]);
    expect(result.prevFromSave4?.metadata.timestamp).toBe(2000);

    // Assert Previous Save from Save 2
    expect(result.prevFromSave2).not.toBeNull();
    expect(result.prevFromSave2?.data).toEqual([1, 1, 1]);
    expect(result.prevFromSave2?.metadata.timestamp).toBe(1000);

    // Assert Previous Save from Save 1 (Should be null as there is no previous)
    expect(result.prevFromSave1).toBeNull();
  });
});
