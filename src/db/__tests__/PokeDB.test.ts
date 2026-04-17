import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDB, pokeDB } from '../PokeDB';
import 'fake-indexeddb/auto';
import { DB_CONFIG } from '../schema';

// Mock build hash
vi.stubGlobal('__POKEDATA_HASH__', 'test-hash');
vi.stubGlobal(
  'fetch',
  vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      hash: 'test-hash',
      poke: [],
      enc: [],
      loc: [],
    }),
  } as Response),
);

describe('PokeDB', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({
        hash: 'test-hash',
        poke: [],
        enc: [],
        loc: [],
      }),
    } as Response);
    pokeDB._resetSync();
    const db = await getDB();
    const tx = db.transaction(Object.values(DB_CONFIG.STORES), 'readwrite');
    await Promise.all(
      [
        DB_CONFIG.STORES.POKEMON,
        DB_CONFIG.STORES.ENCOUNTERS,
        DB_CONFIG.STORES.LOCATIONS,
        DB_CONFIG.STORES.METADATA,
      ].map((s) => tx.objectStore(s).clear()),
    );
    await tx.done;
  });

  it('skips fetch if IndexedDB has the same build hash', async () => {
    const db = await getDB();
    const tx = db.transaction(DB_CONFIG.STORES.METADATA, 'readwrite');
    await tx.objectStore(DB_CONFIG.STORES.METADATA).put({ key: 'hash', value: __POKEDATA_HASH__ });
    await tx.done;

    vi.mocked(fetch).mockClear();
    await pokeDB.sync();

    expect(fetch).not.toHaveBeenCalled();
  });

  it('resets syncPromise if fetch fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response);

    await expect(pokeDB.sync()).rejects.toThrow('Failed to fetch pokedata.json: 500 Internal Server Error');

    // Verify it was reset by calling again with a successful fetch
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ hash: 'test-hash-2', poke: [], enc: [], loc: [] }),
    } as Response);

    await pokeDB.sync();
    expect(fetch).toHaveBeenCalledTimes(2);

    errorSpy.mockRestore();
  });

  it('skips parsing and updates metadata if fetched data hash matches existing DB hash', async () => {
    const db = await getDB();
    const tx = db.transaction(DB_CONFIG.STORES.METADATA, 'readwrite');
    await tx.objectStore(DB_CONFIG.STORES.METADATA).put({ key: 'hash', value: 'old-hash' });
    await tx.done;

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ hash: 'old-hash', poke: [], enc: [], loc: [] }),
    } as Response);

    const transactionSpy = vi.spyOn(db, 'transaction');

    await pokeDB.sync();

    expect(fetch).toHaveBeenCalledTimes(1);

    const allStoreNames = [
      DB_CONFIG.STORES.POKEMON,
      DB_CONFIG.STORES.ENCOUNTERS,
      DB_CONFIG.STORES.LOCATIONS,
      DB_CONFIG.STORES.METADATA,
    ];
    expect(transactionSpy).not.toHaveBeenCalledWith(allStoreNames, 'readwrite');

    transactionSpy.mockRestore();
  });

  it('deduplicates concurrent sync requests', async () => {
    vi.mocked(fetch).mockClear();

    const sync1 = pokeDB.sync();
    const sync2 = pokeDB.sync();

    await Promise.all([sync1, sync2]);

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('emits progress events during sync', async () => {
    // We cannot easily spy on window if it's undefined, let's inject it into global context
    const originalWindow = global.window;
    const dispatchEventMock = vi.fn();

    // @ts-expect-error
    global.window = { dispatchEvent: dispatchEventMock };

    await pokeDB.sync();

    const events = dispatchEventMock.mock.calls.map((call) => call[0] as CustomEvent);
    const progressEvents = events.filter((e) => e.type === 'pokedata-sync-progress');

    expect(progressEvents).toHaveLength(3);
    expect(progressEvents[0]?.detail).toEqual({ current: 1, total: 3, stage: 'Pokemon' });
    expect(progressEvents[1]?.detail).toEqual({ current: 2, total: 3, stage: 'Encounters' });
    expect(progressEvents[2]?.detail).toEqual({ current: 3, total: 3, stage: 'Locations' });

    global.window = originalWindow;
  });

  it('syncs data correctly', async () => {
    const mockData = {
      hash: 'new-hash',
      poke: [
        {
          id: 1,
          n: 'Bulbasaur',
          cr: 45,
          gr: 1,
          baby: false,
          eto: [],
          efrm: [],
          det: [],
        },
      ],
      enc: [{ pid: 1, enc: [] }],
      loc: [{ id: 1, n: 'Pallet Town', pids: [1], dist: {} }],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    await pokeDB.sync();

    const p = await pokeDB.getPokemon(1);
    expect(p?.n).toBe('Bulbasaur');
    expect(p?.cr).toBe(45);
  });

  it('performs bulk operations for pokemons', async () => {
    const mockData = {
      hash: 'bulk-hash',
      poke: [
        { id: 1, n: 'P1', cr: 10, gr: 1, baby: false, eto: [], efrm: [], det: [] },
        { id: 2, n: 'P2', cr: 10, gr: 1, baby: false, eto: [], efrm: [], det: [] },
      ],
      enc: [],
      loc: [],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    await pokeDB.sync();

    const results = await pokeDB.getPokemons([1, 2, 999]);
    expect(results).toHaveLength(3);

    const r1 = results[0];
    if (!r1 || r1 instanceof Error) throw r1 ?? new Error('r1 undefined');
    expect(r1.n).toBe('P1');

    const r2 = results[1];
    if (!r2 || r2 instanceof Error) throw r2 ?? new Error('r2 undefined');
    expect(r2.n).toBe('P2');

    expect(results[2]).toBeInstanceOf(Error);
  });

  it('handles invalid IDs gracefully', async () => {
    expect(await pokeDB.getPokemon(NaN)).toBeUndefined();
    expect(await pokeDB.getPokemon(null as unknown as number)).toBeUndefined();

    const manyResult = await pokeDB.getPokemons([NaN]);
    expect(manyResult[0]).toBeInstanceOf(Error);
  });

  it('resolves area names correctly', async () => {
    const mockData = {
      hash: 'area-hash',
      poke: [],
      enc: [],
      loc: [
        { id: 1, n: 'Viridian Forest', pids: [], dist: {} },
        { id: 2, n: 'Route 1', pids: [], dist: {} },
      ],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    await pokeDB.sync();

    const names = await pokeDB.getAreaNames([1, 2, 999]);
    expect(names).toEqual({
      1: 'Viridian Forest',
      2: 'Route 1',
    });
  });
});
