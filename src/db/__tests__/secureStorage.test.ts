import { describe, expect, it, vi, beforeEach } from 'vitest';
import 'fake-indexeddb/auto';
import { storeSaveData, loadSaveData, clearSaveData } from '../secureStorage';
import { openDB } from 'idb';

describe('secureStorage', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    await clearSaveData();
  });

  it('should store and load save data correctly', async () => {
    const data = new Uint8Array([1, 2, 3]).buffer;
    await storeSaveData(data);
    const loaded = await loadSaveData();
    expect(loaded).toBeDefined();
    if (loaded) {
      expect(new Uint8Array(loaded)).toEqual(new Uint8Array([1, 2, 3]));
    }
  });

  it('should return undefined if no data exists', async () => {
    const loaded = await loadSaveData();
    expect(loaded).toBeUndefined();
  });

  it('should return undefined and catch errors if decryption fails', async () => {
    // create fake bad data
    const db = await openDB('dexhelper-secure-storage', 1);
    await db.put('secure-saves', { iv: new Uint8Array(12), data: new Uint8Array(1).buffer }, 'primary-save');

    const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const loaded = await loadSaveData();
    expect(loaded).toBeUndefined();
    expect(mockConsoleError).toHaveBeenCalled();
  });

  it('should catch errors when storage fails', async () => {
    // Mock crypto to force error
    const originalEncrypt = crypto.subtle.encrypt;
    crypto.subtle.encrypt = vi.fn().mockRejectedValue(new Error('Crypto failed'));

    const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const data = new Uint8Array([1, 2, 3]).buffer;
    await expect(storeSaveData(data)).rejects.toThrow('Crypto failed');
    expect(mockConsoleError).toHaveBeenCalled();

    crypto.subtle.encrypt = originalEncrypt;
  });
});
