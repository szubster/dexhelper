import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { getMostRecentSave, getPreviousSave, initHistoryDb, writeSaveState } from './historyDb';

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

  describe('writeSaveState', () => {
    it('should successfully write save data and metadata', async () => {
      const id = 'test-id';
      const saveData = new Uint8Array([1, 2, 3]);
      const metadata = { name: 'Test Save', timestamp: 12345 };

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
      const invalidMetadata = { badField: () => {} };

      await expect(writeSaveState(id, saveData, invalidMetadata)).rejects.toThrow('could not be cloned');
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

  describe('getPreviousSave', () => {
    it('should return null if the save ID does not exist', async () => {
      const result = await getPreviousSave('non-existent-save');
      expect(result).toBeNull();
    });

    it('should return null if the playthroughId or timestamp is missing in metadata', async () => {
      await writeSaveState('save-bad-metadata', new Uint8Array([1]), { timestamp: 100 });
      let result = await getPreviousSave('save-bad-metadata');
      expect(result).toBeNull();

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
