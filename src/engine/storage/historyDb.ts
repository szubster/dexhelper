import { type DBSchema, type IDBPDatabase, openDB } from 'idb';
import { MAX_SAVE_STATES_PER_PLAYTHROUGH } from './constants';

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
      const saveId = typeof cursor.primaryKey === 'string' ? cursor.primaryKey : String(cursor.primaryKey);
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
      const prevSaveId = typeof cursor.primaryKey === 'string' ? cursor.primaryKey : String(cursor.primaryKey);
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

export const countSavesForPlaythrough = async (playthroughId: string): Promise<number> => {
  try {
    const db = await initHistoryDb();
    const tx = db.transaction('metadata', 'readonly');
    const metadataStore = tx.objectStore('metadata');
    const index = metadataStore.index('by-playthrough-timestamp');

    const range = IDBKeyRange.bound([playthroughId, -Infinity], [playthroughId, Infinity]);
    const count = await index.count(range);

    return count;
  } catch (error) {
    console.error('Failed to count saves for playthrough:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

export const deleteSaveState = async (id: string): Promise<void> => {
  try {
    const db = await initHistoryDb();
    const tx = db.transaction(['saves', 'metadata'], 'readwrite');

    const savesStore = tx.objectStore('saves');
    const metadataStore = tx.objectStore('metadata');

    await Promise.all([savesStore.delete(id), metadataStore.delete(id), tx.done]);
  } catch (error) {
    console.error('Failed to delete save state:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

export const writeSaveState = async (id: string, saveData: Uint8Array, metadata: SaveMetadata): Promise<void> => {
  try {
    if (metadata.playthroughId) {
      const currentCount = await countSavesForPlaythrough(metadata.playthroughId);
      if (currentCount >= MAX_SAVE_STATES_PER_PLAYTHROUGH) {
        const numToDelete = currentCount - MAX_SAVE_STATES_PER_PLAYTHROUGH + 1;
        const oldestSaves = await getOldestSaves(metadata.playthroughId, numToDelete);
        for (const oldSaveId of oldestSaves) {
          await deleteSaveState(oldSaveId);
        }
      }
    }

    const db = await initHistoryDb();
    const tx = db.transaction(['saves', 'metadata'], 'readwrite');

    const savesStore = tx.objectStore('saves');
    const metadataStore = tx.objectStore('metadata');

    await Promise.all([savesStore.put(saveData, id), metadataStore.put(metadata, id), tx.done]);
  } catch (error) {
    if (error instanceof Error && error.name === 'QuotaExceededError' && metadata.playthroughId) {
      console.warn('QuotaExceededError caught, attempting aggressive eviction...');
      try {
        const currentCount = await countSavesForPlaythrough(metadata.playthroughId);
        const limit = Math.max(1, Math.floor(currentCount / 2));
        const oldestSaves = await getOldestSaves(metadata.playthroughId, limit);
        for (const oldSaveId of oldestSaves) {
          await deleteSaveState(oldSaveId);
        }

        const retryDb = await initHistoryDb();
        const retryTx = retryDb.transaction(['saves', 'metadata'], 'readwrite');

        const retrySavesStore = retryTx.objectStore('saves');
        const retryMetadataStore = retryTx.objectStore('metadata');

        await Promise.all([retrySavesStore.put(saveData, id), retryMetadataStore.put(metadata, id), retryTx.done]);
        return;
      } catch (retryError) {
        console.error(
          'Aggressive eviction and retry failed',
          retryError instanceof Error ? retryError.message : 'Unknown error',
        );
        throw retryError;
      }
    }

    console.error('Failed to write save state', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};

export const getOldestSaves = async (playthroughId: string, limit: number): Promise<string[]> => {
  try {
    const db = await initHistoryDb();
    const tx = db.transaction('metadata', 'readonly');
    const metadataStore = tx.objectStore('metadata');
    const index = metadataStore.index('by-playthrough-timestamp');

    const range = IDBKeyRange.bound([playthroughId, -Infinity], [playthroughId, Infinity]);
    let cursor = await index.openCursor(range, 'next');

    const result: string[] = [];
    while (cursor && result.length < limit) {
      if (typeof cursor.primaryKey === 'string') {
        result.push(cursor.primaryKey);
      } else {
        result.push(String(cursor.primaryKey));
      }
      cursor = await cursor.continue();
    }

    return result;
  } catch (error) {
    console.error('Failed to get oldest saves:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};
