import { type DBSchema, type IDBPDatabase, openDB } from 'idb';

export interface SaveMetadata {
  playthroughId: string;
  timestamp: number;
  type?: string;
  description?: string;
  [key: string]: unknown;
}

export interface SaveHistoryDBSchema extends DBSchema {
  saves: {
    key: string;
    value: Uint8Array;
  };
  metadata: {
    key: string;
    value: SaveMetadata;
    indexes: {
      'by-playthrough-timestamp': [string, number];
    };
  };
  indexes: {
    key: string;
    value: Record<string, unknown>;
  };
}

export const initHistoryDb = async (): Promise<IDBPDatabase<SaveHistoryDBSchema>> => {
  return openDB<SaveHistoryDBSchema>('SaveHistoryDB', 2, {
    upgrade(db, oldVersion, _newVersion, tx) {
      if (oldVersion < 1) {
        if (!db.objectStoreNames.contains('saves')) {
          db.createObjectStore('saves');
        }
        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata');
        }
        if (!db.objectStoreNames.contains('indexes')) {
          db.createObjectStore('indexes');
        }
      }

      if (oldVersion < 2) {
        const metadataStore = tx.objectStore('metadata');
        if (!metadataStore.indexNames.contains('by-playthrough-timestamp')) {
          metadataStore.createIndex('by-playthrough-timestamp', ['playthroughId', 'timestamp']);
        }
      }
    },
  });
};

export const getMostRecentSave = async (
  playthroughId: string,
): Promise<{ saveData: Uint8Array; metadata: SaveMetadata } | null> => {
  try {
    const db = await initHistoryDb();
    const tx = db.transaction(['saves', 'metadata'], 'readonly');
    const metadataStore = tx.objectStore('metadata');
    const index = metadataStore.index('by-playthrough-timestamp');

    // Use bound to query all saves for this playthroughId, then sort by timestamp descending via 'prev'
    const range = IDBKeyRange.bound([playthroughId, -Infinity], [playthroughId, Infinity]);
    const cursor = await index.openCursor(range, 'prev');

    if (cursor) {
      const saveId = cursor.primaryKey as string;
      const metadata = cursor.value;
      const savesStore = tx.objectStore('saves');
      const saveData = await savesStore.get(saveId);

      if (saveData) {
        return { saveData, metadata };
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to get most recent save:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

export const getPreviousSave = async (
  saveId: string,
): Promise<{ saveData: Uint8Array; metadata: SaveMetadata } | null> => {
  try {
    const db = await initHistoryDb();
    const tx = db.transaction(['saves', 'metadata'], 'readonly');
    const metadataStore = tx.objectStore('metadata');

    // First, find the metadata of the current saveId
    const currentSaveMetadata = await metadataStore.get(saveId);
    if (!currentSaveMetadata) {
      return null;
    }

    const playthroughId = currentSaveMetadata.playthroughId;
    const timestamp = currentSaveMetadata.timestamp;

    if (!playthroughId || typeof timestamp !== 'number') {
      return null;
    }

    const index = metadataStore.index('by-playthrough-timestamp');

    // Find the save with the same playthroughId but a timestamp immediately prior to this one
    const range = IDBKeyRange.bound([playthroughId, -Infinity], [playthroughId, timestamp - 1]);
    const cursor = await index.openCursor(range, 'prev');

    if (cursor) {
      const prevSaveId = cursor.primaryKey as string;
      const prevMetadata = cursor.value;
      const savesStore = tx.objectStore('saves');
      const prevSaveData = await savesStore.get(prevSaveId);

      if (prevSaveData) {
        return { saveData: prevSaveData, metadata: prevMetadata };
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to get previous save:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

export const writeSaveState = async (id: string, saveData: Uint8Array, metadata: SaveMetadata): Promise<void> => {
  try {
    const db = await initHistoryDb();
    const tx = db.transaction(['saves', 'metadata'], 'readwrite');

    const savesStore = tx.objectStore('saves');
    const metadataStore = tx.objectStore('metadata');

    await Promise.all([savesStore.put(saveData, id), metadataStore.put(metadata, id), tx.done]);
  } catch (error) {
    console.error('Failed to write save state', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

// Expose API for E2E testing
if (typeof window !== 'undefined' && (import.meta.env.DEV || import.meta.env.MODE === 'test')) {
  // @ts-expect-error E2E testing hook
  window.__historyDbAPI = {
    writeSaveState,
    getMostRecentSave,
    getPreviousSave,
  };
}
