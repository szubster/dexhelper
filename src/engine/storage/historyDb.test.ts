import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { MAX_SAVE_STATES_PER_PLAYTHROUGH } from './constants';
import {
  countSavesForPlaythrough,
  deleteSaveState,
  getMostRecentSave,
  getOldestSaves,
  getPreviousSave,
  initHistoryDb,
  writeSaveState,
} from './historyDb';

describe('SaveHistoryDB', () => {
  it('should initialize the database with correct name and version', async () => {
    const db = await initHistoryDb();
    expect(db.name).toBe('SaveHistoryDB');
    expect(db.version).toBe(2);
    db.close();
  });

  it('should define the correct object stores', async () => {
    const db = await initHistoryDb();
    expect(db.objectStoreNames.contains('saves')).toBe(true);
    expect(db.objectStoreNames.contains('metadata')).toBe(true);
    expect(db.objectStoreNames.contains('indexes')).toBe(true);
    db.close();
  });

  describe('deleteSaveState', () => {
    it('should successfully delete save data and metadata', async () => {
      const id = 'test-delete-id';
      const saveData = new Uint8Array([1, 2, 3]);
      const metadata = { playthroughId: 'pt-test-delete', timestamp: 12345, name: 'Test Save to Delete' };

      await writeSaveState(id, saveData, metadata);

      // Verify it exists first
      let db = await initHistoryDb();
      let tx = db.transaction(['saves', 'metadata'], 'readonly');
      let storedSaveData = await tx.objectStore('saves').get(id);
      let storedMetadata = await tx.objectStore('metadata').get(id);

      expect(storedSaveData).toEqual(saveData);
      expect(storedMetadata).toEqual(metadata);
      db.close();

      // Delete it
      await deleteSaveState(id);

      // Verify it's gone
      db = await initHistoryDb();
      tx = db.transaction(['saves', 'metadata'], 'readonly');
      storedSaveData = await tx.objectStore('saves').get(id);
      storedMetadata = await tx.objectStore('metadata').get(id);

      expect(storedSaveData).toBeUndefined();
      expect(storedMetadata).toBeUndefined();
      db.close();
    });

    it('should propagate errors if a delete fails', async () => {
      // @ts-expect-error - testing invalid input
      await expect(deleteSaveState(Symbol('bad-id'))).rejects.toThrow(
        'Data provided to an operation does not meet requirements',
      );
    });
  });

  describe('writeSaveState', () => {
    it('should successfully write save data and metadata', async () => {
      const id = 'test-id';
      const saveData = new Uint8Array([1, 2, 3]);
      const metadata = { playthroughId: 'pt-test', timestamp: 12345, name: 'Test Save' };

      await writeSaveState(id, saveData, metadata);

      const db = await initHistoryDb();
      const tx = db.transaction(['saves', 'metadata'], 'readonly');

      const storedSaveData = await tx.objectStore('saves').get(id);
      const storedMetadata = await tx.objectStore('metadata').get(id);

      expect(storedSaveData).toEqual(saveData);
      expect(storedMetadata).toEqual(metadata);

      db.close();
    });

    it('should propagate errors if a write fails', async () => {
      // Override openDB momentarily or just write an invalid object
      // DataCloneError can be triggered by writing an object with a function
      const id = 'error-id';
      const saveData = new Uint8Array([1, 2, 3]);

      // Functions are not clonable by IndexedDB
      const invalidMetadata = { playthroughId: 'pt-error', timestamp: 100, badField: () => {} };

      await expect(writeSaveState(id, saveData, invalidMetadata)).rejects.toThrow('could not be cloned');
    });

    it('should throw an error if maximum number of saves per playthrough is reached', async () => {
      const ptId = 'limit-test';

      // Insert maximum allowed saves
      for (let i = 0; i < MAX_SAVE_STATES_PER_PLAYTHROUGH; i++) {
        await writeSaveState(`limit-save-${i}`, new Uint8Array([1]), {
          playthroughId: ptId,
          timestamp: i,
        });
      }

      // The next save should fail
      await expect(
        writeSaveState('limit-save-final', new Uint8Array([1]), { playthroughId: ptId, timestamp: 1000 }),
      ).rejects.toThrow('Maximum number of save states reached for this playthrough');
    });
  });

  describe('getMostRecentSave', () => {
    it('should return null if no saves exist for the playthrough', async () => {
      const result = await getMostRecentSave('non-existent-pt');
      expect(result).toBeNull();
    });

    it('should propagate errors if querying fails', async () => {
      // @ts-expect-error - testing invalid input
      await expect(getMostRecentSave(Symbol('bad-id'))).rejects.toThrow(
        'Data provided to an operation does not meet requirements',
      );
    });

    it('should return the most recent save state for a playthrough', async () => {
      const ptId = 'pt-1';
      await writeSaveState('save-1', new Uint8Array([1]), { playthroughId: ptId, timestamp: 100 });
      await writeSaveState('save-2', new Uint8Array([2]), { playthroughId: ptId, timestamp: 300 });
      await writeSaveState('save-3', new Uint8Array([3]), { playthroughId: ptId, timestamp: 200 });
      await writeSaveState('save-4', new Uint8Array([4]), { playthroughId: 'pt-2', timestamp: 400 });

      const result = await getMostRecentSave(ptId);

      expect(result).not.toBeNull();
      expect(result?.saveData).toEqual(new Uint8Array([2]));
      expect(result?.metadata).toEqual({ playthroughId: ptId, timestamp: 300 });
    });
  });

  describe('countSavesForPlaythrough', () => {
    it('should return 0 for a playthrough with no saves', async () => {
      const count = await countSavesForPlaythrough('empty-pt');
      expect(count).toBe(0);
    });

    it('should accurately count the number of saves for a given playthrough', async () => {
      const ptId1 = 'pt-count-1';
      const ptId2 = 'pt-count-2';

      await writeSaveState('count-1', new Uint8Array([1]), { playthroughId: ptId1, timestamp: 100 });
      await writeSaveState('count-2', new Uint8Array([2]), { playthroughId: ptId1, timestamp: 200 });
      await writeSaveState('count-3', new Uint8Array([3]), { playthroughId: ptId2, timestamp: 300 });

      const count1 = await countSavesForPlaythrough(ptId1);
      const count2 = await countSavesForPlaythrough(ptId2);

      expect(count1).toBe(2);
      expect(count2).toBe(1);
    });

    it('should propagate errors if counting fails', async () => {
      // @ts-expect-error - testing invalid input
      await expect(countSavesForPlaythrough(Symbol('bad-id'))).rejects.toThrow(
        'Data provided to an operation does not meet requirements',
      );
    });
  });

  describe('getPreviousSave', () => {
    it('should return null if the save ID does not exist', async () => {
      const result = await getPreviousSave('non-existent-save');
      expect(result).toBeNull();
    });

    it('should return null if the playthroughId or timestamp is missing in metadata', async () => {
      // @ts-expect-error Testing missing playthroughId
      await writeSaveState('save-bad-metadata', new Uint8Array([1]), { timestamp: 100 });
      let result = await getPreviousSave('save-bad-metadata');
      expect(result).toBeNull();

      // @ts-expect-error Testing missing timestamp
      await writeSaveState('save-bad-metadata-2', new Uint8Array([1]), { playthroughId: 'pt-5' });
      result = await getPreviousSave('save-bad-metadata-2');
      expect(result).toBeNull();
    });

    it('should propagate errors if querying fails', async () => {
      // Write valid data, but call getPreviousSave with invalid saveId type
      // @ts-expect-error - testing invalid input
      await expect(getPreviousSave(Symbol('bad-id'))).rejects.toThrow(
        'Data provided to an operation does not meet requirements',
      );
    });

    it('should return null if the current save has no previous save in the same playthrough', async () => {
      const ptId = 'pt-3';
      await writeSaveState('save-5', new Uint8Array([5]), { playthroughId: ptId, timestamp: 100 });

      const result = await getPreviousSave('save-5');
      expect(result).toBeNull();
    });

    it('should return the immediately preceding save state for the same playthrough', async () => {
      const ptId = 'pt-4';
      await writeSaveState('save-6', new Uint8Array([6]), { playthroughId: ptId, timestamp: 100 });
      await writeSaveState('save-7', new Uint8Array([7]), { playthroughId: ptId, timestamp: 300 });
      await writeSaveState('save-8', new Uint8Array([8]), { playthroughId: ptId, timestamp: 200 });
      await writeSaveState('save-9', new Uint8Array([9]), { playthroughId: 'pt-other', timestamp: 250 });

      // Previous save to timestamp 300 should be the one with timestamp 200
      const result = await getPreviousSave('save-7');

      expect(result).not.toBeNull();
      expect(result?.saveData).toEqual(new Uint8Array([8]));
      expect(result?.metadata).toEqual({ playthroughId: ptId, timestamp: 200 });
    });
  });
});

describe('getOldestSaves', () => {
  it('should return an empty array if no saves exist for the playthrough', async () => {
    const result = await getOldestSaves('non-existent-pt', 5);
    expect(result).toEqual([]);
  });

  it('should correctly order saves by timestamp ascending and limit the results', async () => {
    const ptId = 'pt-oldest-test';
    await writeSaveState('save-t100', new Uint8Array([1]), { playthroughId: ptId, timestamp: 100 });
    await writeSaveState('save-t300', new Uint8Array([3]), { playthroughId: ptId, timestamp: 300 });
    await writeSaveState('save-t50', new Uint8Array([5]), { playthroughId: ptId, timestamp: 50 });
    await writeSaveState('save-t200', new Uint8Array([2]), { playthroughId: ptId, timestamp: 200 });

    const result = await getOldestSaves(ptId, 2);

    expect(result.length).toBe(2);
    // t50 and t100 are the oldest
    expect(result).toEqual(['save-t50', 'save-t100']);
  });

  it('should return all available saves if the limit is greater than the total saves', async () => {
    const ptId = 'pt-oldest-test-2';
    await writeSaveState('save-1', new Uint8Array([1]), { playthroughId: ptId, timestamp: 100 });
    await writeSaveState('save-2', new Uint8Array([2]), { playthroughId: ptId, timestamp: 200 });

    const result = await getOldestSaves(ptId, 10);

    expect(result.length).toBe(2);
    expect(result).toEqual(['save-1', 'save-2']);
  });

  it('should propagate errors if querying fails', async () => {
    // @ts-expect-error - testing invalid input
    await expect(getOldestSaves(Symbol('bad-id'), 5)).rejects.toThrow(
      'Data provided to an operation does not meet requirements',
    );
  });
});
