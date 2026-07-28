import { type IDBPDatabase, openDB } from 'idb';
import { SAVE_HISTORY_DB_CONFIG, type SaveHistoryDBSchema } from './schema';

// Fallback mechanisms for environments where IndexedDB is unavailable
const fallbackStorageSaves = new Map<string, Uint8Array>();
const fallbackStorageMetadata = new Map<string, Record<string, unknown>>();
const fallbackStorageIndexes = new Map<string, Record<string, unknown>>();

let dbPromise: Promise<IDBPDatabase<SaveHistoryDBSchema>> | null = null;

const getDB = async (): Promise<IDBPDatabase<SaveHistoryDBSchema>> => {
  if (!dbPromise) {
    dbPromise = openDB<SaveHistoryDBSchema>(SAVE_HISTORY_DB_CONFIG.NAME, SAVE_HISTORY_DB_CONFIG.VERSION, {
      upgrade(db, oldVersion, _newVersion, _transaction) {
        if (oldVersion < 1) {
          db.createObjectStore(SAVE_HISTORY_DB_CONFIG.STORES.SAVES);
          db.createObjectStore(SAVE_HISTORY_DB_CONFIG.STORES.METADATA);
          db.createObjectStore(SAVE_HISTORY_DB_CONFIG.STORES.INDEXES);
        }
      },
    });
  }
  return dbPromise;
};

export const saveHistoryDB = {
  async getSave(id: string): Promise<Uint8Array | undefined> {
    try {
      const db = await getDB();
      return await db.get(SAVE_HISTORY_DB_CONFIG.STORES.SAVES, id);
    } catch {
      console.error('System: sync failed');
      return fallbackStorageSaves.get(id);
    }
  },

  async putSave(id: string, data: Uint8Array): Promise<void> {
    try {
      const db = await getDB();
      await db.put(SAVE_HISTORY_DB_CONFIG.STORES.SAVES, data, id);
    } catch {
      console.error('System: sync failed');
      fallbackStorageSaves.set(id, data);
    }
  },

  async deleteSave(id: string): Promise<void> {
    try {
      const db = await getDB();
      await db.delete(SAVE_HISTORY_DB_CONFIG.STORES.SAVES, id);
    } catch {
      console.error('System: sync failed');
      fallbackStorageSaves.delete(id);
    }
  },

  async getMetadata(id: string): Promise<Record<string, unknown> | undefined> {
    try {
      const db = await getDB();
      return await db.get(SAVE_HISTORY_DB_CONFIG.STORES.METADATA, id);
    } catch {
      console.error('System: sync failed');
      return fallbackStorageMetadata.get(id);
    }
  },

  async putMetadata(id: string, data: Record<string, unknown>): Promise<void> {
    try {
      const db = await getDB();
      await db.put(SAVE_HISTORY_DB_CONFIG.STORES.METADATA, data, id);
    } catch {
      console.error('System: sync failed');
      fallbackStorageMetadata.set(id, data);
    }
  },

  async deleteMetadata(id: string): Promise<void> {
    try {
      const db = await getDB();
      await db.delete(SAVE_HISTORY_DB_CONFIG.STORES.METADATA, id);
    } catch {
      console.error('System: sync failed');
      fallbackStorageMetadata.delete(id);
    }
  },

  async getIndex(id: string): Promise<Record<string, unknown> | undefined> {
    try {
      const db = await getDB();
      return await db.get(SAVE_HISTORY_DB_CONFIG.STORES.INDEXES, id);
    } catch {
      console.error('System: sync failed');
      return fallbackStorageIndexes.get(id);
    }
  },

  async putIndex(id: string, data: Record<string, unknown>): Promise<void> {
    try {
      const db = await getDB();
      await db.put(SAVE_HISTORY_DB_CONFIG.STORES.INDEXES, data, id);
    } catch {
      console.error('System: sync failed');
      fallbackStorageIndexes.set(id, data);
    }
  },

  async deleteIndex(id: string): Promise<void> {
    try {
      const db = await getDB();
      await db.delete(SAVE_HISTORY_DB_CONFIG.STORES.INDEXES, id);
    } catch {
      console.error('System: sync failed');
      fallbackStorageIndexes.delete(id);
    }
  },
};
