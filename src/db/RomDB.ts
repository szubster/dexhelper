import { type DBSchema, type IDBPDatabase, openDB } from 'idb';

const ROM_DB_NAME = 'RomDB';
const ROM_DB_VERSION = 1;
const STORE_NAME = 'roms';

interface RomDBSchema extends DBSchema {
  [STORE_NAME]: {
    key: string;
    value: Uint8Array;
  };
}

// Fallback mechanism for environments where IndexedDB is unavailable
const fallbackStorage = new Map<string, Uint8Array>();

let dbPromise: Promise<IDBPDatabase<RomDBSchema>> | null = null;

const getDB = async (): Promise<IDBPDatabase<RomDBSchema>> => {
  if (!dbPromise) {
    dbPromise = openDB<RomDBSchema>(ROM_DB_NAME, ROM_DB_VERSION, {
      upgrade(db) {
        db.createObjectStore(STORE_NAME);
      },
    });
  }
  return dbPromise;
};

export const romDB = {
  async getRom(id: string): Promise<Uint8Array | undefined> {
    try {
      const db = await getDB();
      return await db.get(STORE_NAME, id);
    } catch {
      console.error('System: sync failed');
      return fallbackStorage.get(id);
    }
  },

  async putRom(id: string, data: Uint8Array): Promise<void> {
    try {
      const db = await getDB();
      await db.put(STORE_NAME, data, id);
    } catch {
      console.error('System: sync failed');
      fallbackStorage.set(id, data);
    }
  },

  async deleteRom(id: string): Promise<void> {
    try {
      const db = await getDB();
      await db.delete(STORE_NAME, id);
    } catch {
      console.error('System: sync failed');
      fallbackStorage.delete(id);
    }
  },
};
