import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import 'fake-indexeddb/auto';
import { deleteDB } from 'idb';

describe('RomDB normal operation', () => {
  let romDB: typeof import('../RomDB').romDB;

  beforeEach(async () => {
    vi.resetModules();
    const mod = await import('../RomDB');
    romDB = mod.romDB;
    await deleteDB('RomDB');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should store, retrieve and delete a rom', async () => {
    const data = new Uint8Array([1, 2, 3]);
    await romDB.putRom('rom1', data);

    const retrieved = await romDB.getRom('rom1');
    expect(retrieved).toEqual(data);

    await romDB.deleteRom('rom1');
    const retrievedAfterDelete = await romDB.getRom('rom1');
    expect(retrievedAfterDelete).toBeUndefined();
  });
});

describe('RomDB fallback operation', () => {
  let romDB: typeof import('../RomDB').romDB;

  beforeEach(async () => {
    vi.resetModules();
    vi.doMock('idb', () => ({
      openDB: vi.fn<() => Promise<never>>().mockRejectedValue(new Error('IndexedDB not available')),
    }));
    const mod = await import('../RomDB');
    romDB = mod.romDB;
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.doUnmock('idb');
    vi.restoreAllMocks();
  });

  it('should use fallback storage when indexedDB fails for get, put, and delete', async () => {
    const data = new Uint8Array([4, 5, 6]);
    await romDB.putRom('fallback1', data);

    const retrieved = await romDB.getRom('fallback1');
    expect(retrieved).toEqual(data);

    await romDB.deleteRom('fallback1');
    const retrievedAfterDelete = await romDB.getRom('fallback1');
    expect(retrievedAfterDelete).toBeUndefined();

    expect(console.error).toHaveBeenCalledWith('System: sync failed');
    expect(console.error).toHaveBeenCalledTimes(4);
  });
});
