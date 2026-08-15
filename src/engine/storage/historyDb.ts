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
