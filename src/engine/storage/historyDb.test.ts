import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { initHistoryDb, writeSaveState } from './historyDb';

describe('SaveHistoryDB', () => {
  it('should initialize the database with correct name and version', async () => {
    const db = await initHistoryDb();
    expect(db.name).toBe('SaveHistoryDB');
    expect(db.version).toBe(1);
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
});
