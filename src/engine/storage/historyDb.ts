import { type DBSchema, type IDBPDatabase, openDB } from 'idb';

export interface SaveHistoryDBSchema extends DBSchema {
  saves: {
    key: string;
    value: Uint8Array;
  };
  metadata: {
    key: string;
    value: Record<string, unknown>;
  };
  indexes: {
    key: string;
    value: Record<string, unknown>;
  };
}

export const initHistoryDb = async (): Promise<IDBPDatabase<SaveHistoryDBSchema>> => {
  return openDB<SaveHistoryDBSchema>('SaveHistoryDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('saves')) {
        db.createObjectStore('saves');
      }
      if (!db.objectStoreNames.contains('metadata')) {
        db.createObjectStore('metadata');
      }
      if (!db.objectStoreNames.contains('indexes')) {
        db.createObjectStore('indexes');
      }
    },
  });
};

export const writeSaveState = async (
  id: string,
  saveData: Uint8Array,
  metadata: Record<string, unknown>,
): Promise<void> => {
  try {
    const db = await initHistoryDb();
    const tx = db.transaction(['saves', 'metadata'], 'readwrite');

    const savesStore = tx.objectStore('saves');
    const metadataStore = tx.objectStore('metadata');

    await Promise.all([savesStore.put(saveData, id), metadataStore.put(metadata, id), tx.done]);
  } catch (error) {
    console.error('Failed to write save state:', error);
    throw error;
  }
};
