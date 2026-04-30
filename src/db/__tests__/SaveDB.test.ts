import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import 'fake-indexeddb/auto';
import { deleteDB } from 'idb';

describe('SaveDB normal operation', () => {
  let saveDB: typeof import('../SaveDB').saveDB;

  beforeEach(async () => {
    vi.resetModules();
    const mod = await import('../SaveDB');
    saveDB = mod.saveDB;
    await deleteDB('SaveDB');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should store, retrieve and delete a save', async () => {
    const data = new Uint8Array([1, 2, 3]);
    await saveDB.putSave('save1', data);

    const retrieved = await saveDB.getSave('save1');
    expect(retrieved).toEqual(data);

    await saveDB.deleteSave('save1');
    const retrievedAfterDelete = await saveDB.getSave('save1');
    expect(retrievedAfterDelete).toBeUndefined();
  });
});

describe('SaveDB fallback operation', () => {
  let saveDB: typeof import('../SaveDB').saveDB;

  beforeEach(async () => {
    vi.resetModules();
    vi.doMock('idb', () => ({
      openDB: vi.fn<() => Promise<never>>().mockRejectedValue(new Error('IndexedDB not available')),
    }));
    const mod = await import('../SaveDB');
    saveDB = mod.saveDB;
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.doUnmock('idb');
    vi.restoreAllMocks();
  });

  it('should use fallback storage when indexedDB fails for get, put, and delete', async () => {
    const data = new Uint8Array([4, 5, 6]);
    await saveDB.putSave('fallback1', data);

    const retrieved = await saveDB.getSave('fallback1');
    expect(retrieved).toEqual(data);

    await saveDB.deleteSave('fallback1');
    const retrievedAfterDelete = await saveDB.getSave('fallback1');
    expect(retrievedAfterDelete).toBeUndefined();

    expect(console.error).toHaveBeenCalledWith('System: sync failed');
    expect(console.error).toHaveBeenCalledTimes(4);
  });
});
