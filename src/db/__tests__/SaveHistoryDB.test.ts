import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import 'fake-indexeddb/auto';
import { deleteDB } from 'idb';

describe('SaveHistoryDB normal operation', () => {
  let saveHistoryDB: typeof import('../SaveHistoryDB').saveHistoryDB;

  beforeEach(async () => {
    vi.resetModules();
    const mod = await import('../SaveHistoryDB');
    saveHistoryDB = mod.saveHistoryDB;
    await deleteDB('SaveHistoryDB');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should store, retrieve and delete saves, metadata, and indexes', async () => {
    const data = new Uint8Array([1, 2, 3]);
    await saveHistoryDB.putSave('save1', data);

    const retrieved = await saveHistoryDB.getSave('save1');
    expect(retrieved).toEqual(data);

    await saveHistoryDB.deleteSave('save1');
    const retrievedAfterDelete = await saveHistoryDB.getSave('save1');
    expect(retrievedAfterDelete).toBeUndefined();

    const meta = { test: 123 };
    await saveHistoryDB.putMetadata('meta1', meta);

    const retrievedMeta = await saveHistoryDB.getMetadata('meta1');
    expect(retrievedMeta).toEqual(meta);

    await saveHistoryDB.deleteMetadata('meta1');
    const retrievedMetaAfterDelete = await saveHistoryDB.getMetadata('meta1');
    expect(retrievedMetaAfterDelete).toBeUndefined();

    const indexData = { someId: 'a' };
    await saveHistoryDB.putIndex('index1', indexData);

    const retrievedIndex = await saveHistoryDB.getIndex('index1');
    expect(retrievedIndex).toEqual(indexData);

    await saveHistoryDB.deleteIndex('index1');
    const retrievedIndexAfterDelete = await saveHistoryDB.getIndex('index1');
    expect(retrievedIndexAfterDelete).toBeUndefined();
  });
});

describe('SaveHistoryDB fallback operation', () => {
  let saveHistoryDB: typeof import('../SaveHistoryDB').saveHistoryDB;

  beforeEach(async () => {
    vi.resetModules();
    vi.doMock('idb', () => ({
      openDB: vi.fn<() => Promise<never>>().mockRejectedValue(new Error('IndexedDB not available')),
    }));
    const mod = await import('../SaveHistoryDB');
    saveHistoryDB = mod.saveHistoryDB;
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.doUnmock('idb');
    vi.restoreAllMocks();
  });

  it('should use fallback storage when indexedDB fails for saves, metadata, and indexes', async () => {
    const data = new Uint8Array([4, 5, 6]);
    await saveHistoryDB.putSave('fallback1', data);

    const retrieved = await saveHistoryDB.getSave('fallback1');
    expect(retrieved).toEqual(data);

    await saveHistoryDB.deleteSave('fallback1');
    const retrievedAfterDelete = await saveHistoryDB.getSave('fallback1');
    expect(retrievedAfterDelete).toBeUndefined();

    const metaData = { a: 1 };
    await saveHistoryDB.putMetadata('fallbackMeta', metaData);

    const retrievedMeta = await saveHistoryDB.getMetadata('fallbackMeta');
    expect(retrievedMeta).toEqual(metaData);

    await saveHistoryDB.deleteMetadata('fallbackMeta');
    const retrievedMetaAfterDelete = await saveHistoryDB.getMetadata('fallbackMeta');
    expect(retrievedMetaAfterDelete).toBeUndefined();

    const indexData = { b: 2 };
    await saveHistoryDB.putIndex('fallbackIndex', indexData);

    const retrievedIndex = await saveHistoryDB.getIndex('fallbackIndex');
    expect(retrievedIndex).toEqual(indexData);

    await saveHistoryDB.deleteIndex('fallbackIndex');
    const retrievedIndexAfterDelete = await saveHistoryDB.getIndex('fallbackIndex');
    expect(retrievedIndexAfterDelete).toBeUndefined();

    expect(console.error).toHaveBeenCalledWith('System: sync failed');
  });
});
