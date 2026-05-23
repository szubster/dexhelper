import { type DBSchema, type IDBPDatabase, openDB } from 'idb';

const SAVE_DB_NAME = 'SaveDB';
const SAVE_DB_VERSION = 2;
const STORE_NAME = 'saves';

interface SaveDBSchema extends DBSchema {
  [STORE_NAME]: {
    key: string;
    value: Uint8Array;
  };
  handles: {
    key: string;
    value: FileSystemFileHandle;
  };
}

// Fallback mechanism for environments where IndexedDB is unavailable
const fallbackStorage = new Map<string, Uint8Array>();

let dbPromise: Promise<IDBPDatabase<SaveDBSchema>> | null = null;

const getDB = async (): Promise<IDBPDatabase<SaveDBSchema>> => {
  if (!dbPromise) {
    dbPromise = openDB<SaveDBSchema>(SAVE_DB_NAME, SAVE_DB_VERSION, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore(STORE_NAME);
        }
        if (oldVersion < 2) {
          db.createObjectStore('handles');
        }
      },
    });
  }
  return dbPromise;
};

export const saveDB = {
  async getHandle(id: string): Promise<FileSystemFileHandle | undefined> {
    try {
      const db = await getDB();
      return await db.get('handles', id);
    } catch {
      console.error('System: sync failed');
      return undefined;
    }
  },

  async putHandle(id: string, handle: FileSystemFileHandle): Promise<void> {
    try {
      const db = await getDB();
      await db.put('handles', handle, id);
    } catch {
      console.error('System: sync failed');
    }
  },

  async getSave(id: string): Promise<Uint8Array | undefined> {
    try {
      const db = await getDB();
      return await db.get(STORE_NAME, id);
    } catch {
      console.error('System: sync failed');
      return fallbackStorage.get(id);
    }
  },

  async putSave(id: string, data: Uint8Array): Promise<void> {
    try {
      const db = await getDB();
      await db.put(STORE_NAME, data, id);
    } catch {
      console.error('System: sync failed');
      fallbackStorage.set(id, data);
    }
  },

  async deleteSave(id: string): Promise<void> {
    try {
      const db = await getDB();
      await db.delete(STORE_NAME, id);
    } catch {
      console.error('System: sync failed');
      fallbackStorage.delete(id);
    }
  },
};
