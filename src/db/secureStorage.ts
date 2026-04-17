import { openDB } from 'idb';

const DB_NAME = 'dexhelper-secure-storage';
const STORE_NAME = 'secure-saves';
const KEY_STORE = 'crypto-keys';
const MASTER_KEY_ID = 'master-key';
const SAVE_DATA_ID = 'primary-save';

async function getSecureDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
      if (!db.objectStoreNames.contains(KEY_STORE)) {
        db.createObjectStore(KEY_STORE);
      }
    },
  });
}

async function getOrCreateKey(): Promise<CryptoKey> {
  const db = await getSecureDB();
  let key = await db.get(KEY_STORE, MASTER_KEY_ID);

  if (!key) {
    key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    await db.put(KEY_STORE, key, MASTER_KEY_ID);
  }

  return key;
}

export async function storeSaveData(buffer: ArrayBuffer): Promise<void> {
  try {
    const key = await getOrCreateKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, buffer);

    const db = await getSecureDB();
    await db.put(STORE_NAME, { iv, data: encrypted }, SAVE_DATA_ID);
  } catch (error) {
    console.error('Failed to securely store save data:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function loadSaveData(): Promise<ArrayBuffer | undefined> {
  try {
    const db = await getSecureDB();
    const record = await db.get(STORE_NAME, SAVE_DATA_ID);

    if (!record?.iv || !record.data) {
      return undefined;
    }

    const key = await getOrCreateKey();
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: record.iv }, key, record.data);

    return decrypted;
  } catch (error) {
    console.error('Failed to load secure save data:', error instanceof Error ? error.message : String(error));
    return undefined;
  }
}

export async function clearSaveData(): Promise<void> {
  try {
    const db = await getSecureDB();
    await db.delete(STORE_NAME, SAVE_DATA_ID);
  } catch (error) {
    console.error('Failed to clear secure save data:', error instanceof Error ? error.message : String(error));
  }
}
