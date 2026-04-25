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

  it('performs bulk operations for pokemons > 50', async () => {
    const poke = Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      n: `P${i + 1}`,
      cr: 10,
      gr: 1,
      baby: false,
      eto: [],
      efrm: [],
      det: [],
    }));
    const mockData = { hash: 'bulk-hash-60', poke, enc: [], loc: [] };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    await pokeDB.sync();

    const ids = Array.from({ length: 60 }, (_, i) => i + 1);
    const results = await pokeDB.getPokemons(ids);
    expect(results).toHaveLength(60);
  });

  it('handles invalid IDs gracefully', async () => {
    expect(await pokeDB.getPokemon(NaN)).toBeUndefined();
    expect(await pokeDB.getPokemon(null as unknown as number)).toBeUndefined();

    const manyResult = await pokeDB.getPokemons([NaN]);
    expect(manyResult[0]).toBeInstanceOf(Error);
  });

  it('inflates recursive evo chains correctly', async () => {
    const mockData = {
      hash: 'evo-chain-hash',
      poke: [
        {
          id: 1,
          n: 'P1',
          cr: 10,
          gr: 1,
          baby: false,
          efrm: [],
          det: [],
          eto: [
            {
              id: 2,
              det: [{ tr: 1 }],
              eto: [
                {
                  id: 3,
                  det: [{ tr: 2 }],
                  eto: [],
                },
              ],
            },
          ],
        },
      ],
      enc: [],
      loc: [],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    await pokeDB.sync();

    const p1 = await pokeDB.getPokemon(1);
    expect(p1?.eto?.[0]?.id).toBe(2);
    expect(p1?.eto?.[0]?.det?.[0]?.tr).toBe(1);
    expect(p1?.eto?.[0]?.eto?.[0]?.id).toBe(3);
    expect(p1?.eto?.[0]?.eto?.[0]?.det?.[0]?.tr).toBe(2);
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

  describe('Queries', () => {
    it('returns correct status when synced', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ hash: 'new-hash', poke: [], enc: [], loc: [] }),
      } as Response);
      const syncPromise = pokeDB.sync();

      const statusSyncing = await pokeDB.getStatus();
      expect(statusSyncing.isSyncing).toBe(true);

      await syncPromise;
      pokeDB._resetSync();

      const status = await pokeDB.getStatus();
      expect(status.isComplete).toBe(true);
      expect(status.isSyncing).toBe(false);
    });

    it('returns correct status when hash is initial', async () => {
      const db = await getDB();
      const tx = db.transaction(DB_CONFIG.STORES.METADATA, 'readwrite');
      await tx.objectStore(DB_CONFIG.STORES.METADATA).put({ key: 'hash', value: 'initial' });
      await tx.done;

      const status = await pokeDB.getStatus();
      expect(status.isComplete).toBe(false);
      expect(status.isSyncing).toBe(false);
    });

    it('handles ready() correctly when hash is initial or missing', async () => {
      const db = await getDB();
      const tx = db.transaction(DB_CONFIG.STORES.METADATA, 'readwrite');
      await tx.objectStore(DB_CONFIG.STORES.METADATA).put({ key: 'hash', value: 'initial' });
      await tx.done;

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ hash: 'synced-hash', poke: [], enc: [], loc: [] }),
      } as Response);

      await pokeDB.ready();
      expect(fetch).toHaveBeenCalled();
    });

    it('getAllPokemon returns all pokemon', async () => {
      const mockData = {
        hash: 'new-hash',
        poke: [
          { id: 1, n: 'Bulbasaur', cr: 45, gr: 1, baby: false, eto: [], efrm: [], det: [] },
          { id: 2, n: 'Ivysaur', cr: 45, gr: 1, baby: false, eto: [], efrm: [], det: [] },
        ],
        enc: [],
        loc: [],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const all = await pokeDB.getAllPokemon();
      expect(all).toHaveLength(2);
      expect(all[0]?.n).toBe('Bulbasaur');
    });

    it('getEncounters returns undefined for invalid id', async () => {
      expect(await pokeDB.getEncounters(NaN)).toBeUndefined();
    });

    it('getEncounters returns encounter data', async () => {
      const mockData = {
        hash: 'new-hash',
        poke: [],
        enc: [{ pid: 1, enc: [] }],
        loc: [],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const enc = await pokeDB.getEncounters(1);
      expect(enc?.pid).toBe(1);
    });

    it('getEncountersBulk returns correctly', async () => {
      const mockData = {
        hash: 'new-hash',
        poke: [],
        enc: [
          { pid: 1, enc: [] },
          { pid: 2, enc: [] },
        ],
        loc: [],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const results = await pokeDB.getEncountersBulk([1, 2, 999]);
      expect(results).toHaveLength(3);
      expect((results[0] as { pid: number }).pid).toBe(1);
      expect((results[1] as { pid: number }).pid).toBe(2);
      expect(results[2]).toBeInstanceOf(Error);
    });

    it('getEncountersBulk returns correctly for > 50 ids', async () => {
      const enc = Array.from({ length: 60 }, (_, i) => ({ pid: i + 1, enc: [] }));
      const mockData = { hash: 'new-hash-bulk-enc', poke: [], enc, loc: [] };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const ids = Array.from({ length: 60 }, (_, i) => i + 1);
      const results = await pokeDB.getEncountersBulk(ids);
      expect(results).toHaveLength(60);
      expect((results[0] as { pid: number }).pid).toBe(1);
    });

    it('getEncountersBulk returns errors for invalid ids', async () => {
      const manyResult = await pokeDB.getEncountersBulk([NaN]);
      expect(manyResult[0]).toBeInstanceOf(Error);
    });

    it('getAllEncounters returns all encounters', async () => {
      const mockData = {
        hash: 'new-hash',
        poke: [],
        enc: [
          { pid: 1, enc: [] },
          { pid: 2, enc: [] },
        ],
        loc: [],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const all = await pokeDB.getAllEncounters();
      expect(all).toHaveLength(2);
    });

    it('getLocation returns undefined for invalid id', async () => {
      expect(await pokeDB.getLocation(NaN)).toBeUndefined();
    });

    it('getLocation returns location', async () => {
      const mockData = {
        hash: 'new-hash',
        poke: [],
        enc: [],
        loc: [{ id: 1, n: 'Pallet Town', pids: [1], dist: {} }],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const loc = await pokeDB.getLocation(1);
      expect(loc?.n).toBe('Pallet Town');
    });

    it('getLocations returns all locations', async () => {
      const mockData = {
        hash: 'new-hash',
        poke: [],
        enc: [],
        loc: [
          { id: 1, n: 'Pallet Town', pids: [1], dist: {} },
          { id: 2, n: 'Route 1', pids: [1], dist: {} },
        ],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const locs = await pokeDB.getLocations();
      expect(locs).toHaveLength(2);
    });

    it('getAreas returns empty array for invalid id', async () => {
      expect(await pokeDB.getAreas(NaN)).toEqual([]);
    });

    it('getAreas returns area if found', async () => {
      const mockData = {
        hash: 'new-hash',
        poke: [],
        enc: [],
        loc: [{ id: 1, n: 'Pallet Town', pids: [1], dist: {} }],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const areas = await pokeDB.getAreas(1);
      expect(areas).toHaveLength(1);
      expect(areas[0]?.n).toBe('Pallet Town');
    });

    it('getAllAreas returns all locations', async () => {
      const mockData = {
        hash: 'new-hash',
        poke: [],
        enc: [],
        loc: [{ id: 1, n: 'Pallet Town', pids: [1], dist: {} }],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const areas = await pokeDB.getAllAreas();
      expect(areas).toHaveLength(1);
    });

    it('getInverseIndex returns undefined for invalid id', async () => {
      expect(await pokeDB.getInverseIndex(NaN)).toBeUndefined();
    });

    it('getInverseIndex returns pids array', async () => {
      const mockData = {
        hash: 'new-hash',
        poke: [],
        enc: [],
        loc: [{ id: 1, n: 'Pallet Town', pids: [1, 2], dist: {} }],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const pids = await pokeDB.getInverseIndex(1);
      expect(pids).toEqual([1, 2]);
    });

    it('getInverseIndexBulk returns correctly for > 50 ids', async () => {
      const loc = Array.from({ length: 60 }, (_, i) => ({ id: i + 1, n: `Loc${i + 1}`, pids: [i + 1], dist: {} }));
      const mockData = { hash: 'new-hash-bulk-inv', poke: [], enc: [], loc };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const ids = Array.from({ length: 60 }, (_, i) => i + 1);
      const results = await pokeDB.getInverseIndexBulk(ids);
      expect(results).toHaveLength(60);
      expect(results[0]).toEqual([1]);
      expect(results[59]).toEqual([60]);
    });

    it('getInverseIndexBulk returns array of pids or undefined', async () => {
      const mockData = {
        hash: 'new-hash-bulk',
        poke: [],
        enc: [],
        loc: [
          { id: 1, n: 'Pallet Town', pids: [1, 2], dist: {} },
          { id: 2, n: 'Route 1', pids: [3], dist: {} },
        ],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const results = await pokeDB.getInverseIndexBulk([1, 999, 2, NaN]);
      expect(results).toEqual([[1, 2], undefined, [3], undefined]);
    });

    it('getAreaNames returns correctly for > 50 ids', async () => {
      const loc = Array.from({ length: 60 }, (_, i) => ({ id: i + 1, n: `Loc${i + 1}`, pids: [i + 1], dist: {} }));
      const mockData = { hash: 'new-hash-bulk-areas', poke: [], enc: [], loc };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);
      await pokeDB.sync();

      const ids = Array.from({ length: 60 }, (_, i) => i + 1);
      const names = await pokeDB.getAreaNames(ids);
      expect(names[1]).toBe('Loc1');
    });

    it('getInverseIndexBulk returns array of undefined for empty/invalid input', async () => {
      expect(await pokeDB.getInverseIndexBulk([])).toEqual([]);
      expect(await pokeDB.getInverseIndexBulk([NaN, NaN])).toEqual([undefined, undefined]);
    });
  });
});
