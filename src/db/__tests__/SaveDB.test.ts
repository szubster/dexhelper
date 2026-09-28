import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import 'fake-indexeddb/auto';

describe('SaveDB normal operation', () => {
  let saveDB: typeof import('../SaveDB').saveDB;

  beforeEach(async () => {
    vi.resetModules();
    const mod = await import('../SaveDB');
    saveDB = mod.saveDB;
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

  it('should store and retrieve a file handle', async () => {
    const mockHandle = { name: 'test.sav', kind: 'file' } as unknown as FileSystemFileHandle;
    await saveDB.putHandle('handle1', mockHandle);

    const retrievedHandle = await saveDB.getHandle('handle1');
    expect(retrievedHandle).toEqual(mockHandle);
  });

  it('should execute upgrade callbacks for version 0 to 2 correctly', async () => {
    // Test openDB upgrade callback directly by invoking openDB with custom mock
    const createObjectStoreMock = vi.fn<(name: string) => void>();
    const mockDb = {
      createObjectStore: createObjectStoreMock,
      get: vi.fn<() => Promise<undefined>>().mockResolvedValue(undefined),
    };

    let upgradeCallback: ((db: typeof mockDb, oldVersion: number) => void) | undefined;

    vi.doMock('idb', () => ({
      openDB: vi.fn<
        (
          name: string,
          version: number,
          options: { upgrade: (db: typeof mockDb, oldVersion: number) => void },
        ) => Promise<typeof mockDb>
      >((_name, _version, options) => {
        upgradeCallback = options.upgrade;
        return Promise.resolve(mockDb);
      }),
    }));

    vi.resetModules();
    const freshMod = await import('../SaveDB');
    await freshMod.saveDB.getSave('test');

    expect(upgradeCallback).toBeDefined();
    // Simulate upgrading from version 0
    upgradeCallback?.(mockDb, 0);
    expect(createObjectStoreMock).toHaveBeenCalledWith('saves');
    expect(createObjectStoreMock).toHaveBeenCalledWith('handles');

    // Reset calls and simulate upgrading from version 1 (where saves store already exists)
    createObjectStoreMock.mockClear();
    upgradeCallback?.(mockDb, 1);
    expect(createObjectStoreMock).not.toHaveBeenCalledWith('saves');
    expect(createObjectStoreMock).toHaveBeenCalledWith('handles');

    vi.doUnmock('idb');
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

  it('should log error when getHandle or putHandle fails due to indexedDB error', async () => {
    const mockHandle = { name: 'test.sav' } as unknown as FileSystemFileHandle;
    await saveDB.putHandle('h1', mockHandle);
    const retrieved = await saveDB.getHandle('h1');

    expect(retrieved).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith('System: sync failed');
    expect(console.error).toHaveBeenCalledTimes(2);
  });
});
