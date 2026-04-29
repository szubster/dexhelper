import * as idb from 'idb';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('idb', () => ({
  openDB: vi.fn<() => Promise<unknown>>(),
}));

describe('SaveDB', () => {
  const testId = 'test-save-id';
  const testData = new Uint8Array([1, 2, 3]);
  // biome-ignore lint/suspicious/noExplicitAny: Mock DB type
  let mockDb: any;

  beforeEach(() => {
    mockDb = {
      get: vi.fn<() => Promise<Uint8Array | undefined>>(),
      put: vi.fn<() => Promise<void>>(),
      delete: vi.fn<() => Promise<void>>(),
      objectStoreNames: {
        contains: vi.fn<() => boolean>().mockReturnValue(true),
      },
      createObjectStore: vi.fn<() => void>(),
    };
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Clear dbPromise from SaveDB module for test isolation
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Happy path (IndexedDB works)', () => {
    it('should save data successfully', async () => {
      vi.mocked(idb.openDB).mockResolvedValue(mockDb);
      const { saveDB: localSaveDB } = await import('../SaveDB');
      await localSaveDB.putSave(testId, testData);
      expect(mockDb.put).toHaveBeenCalledWith('saves', testData, testId);
    });

    it('should retrieve data successfully', async () => {
      vi.mocked(idb.openDB).mockResolvedValue(mockDb);
      mockDb.get.mockResolvedValue(testData);
      const { saveDB: localSaveDB } = await import('../SaveDB');
      const result = await localSaveDB.getSave(testId);
      expect(mockDb.get).toHaveBeenCalledWith('saves', testId);
      expect(result).toBe(testData);
    });

    it('should delete data successfully', async () => {
      vi.mocked(idb.openDB).mockResolvedValue(mockDb);
      const { saveDB: localSaveDB } = await import('../SaveDB');
      await localSaveDB.deleteSave(testId);
      expect(mockDb.delete).toHaveBeenCalledWith('saves', testId);
    });
  });

  describe('Fallback path (IndexedDB fails)', () => {
    it('should fallback to memory storage for putSave and getSave', async () => {
      vi.mocked(idb.openDB).mockRejectedValue(new Error('IndexedDB not available'));
      const { saveDB: localSaveDB } = await import('../SaveDB');

      await localSaveDB.putSave(testId, testData);
      expect(console.error).toHaveBeenCalledWith('System: sync failed');

      const result = await localSaveDB.getSave(testId);
      expect(console.error).toHaveBeenCalledWith('System: sync failed');
      expect(result).toStrictEqual(testData);
    });

    it('should fallback to memory storage for deleteSave', async () => {
      vi.mocked(idb.openDB).mockRejectedValue(new Error('IndexedDB not available'));
      const { saveDB: localSaveDB } = await import('../SaveDB');

      await localSaveDB.putSave(testId, testData);
      await localSaveDB.deleteSave(testId);
      expect(console.error).toHaveBeenCalledWith('System: sync failed');

      const result = await localSaveDB.getSave(testId);
      expect(result).toBeUndefined();
    });
  });
});
