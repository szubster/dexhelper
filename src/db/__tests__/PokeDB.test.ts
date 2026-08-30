import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDB, pokeDB } from '../PokeDB';
import 'fake-indexeddb/auto';
import { Packr } from 'msgpackr';

const packr = new Packr({ useRecords: true, variableMapSize: true, bundleStrings: true });
const pack = (data: unknown) => packr.pack(data);

import { DB_CONFIG } from '../schema';

// Mock build hash
vi.stubGlobal('__POKEDATA_HASH__', 'test-hash');
vi.stubGlobal(
  'fetch',
  vi.fn<() => Promise<Response>>().mockResolvedValue({
    ok: true,
    arrayBuffer: async () =>
      pack({
        hash: 'test-hash',
        poke: [],
        enc: [],
        loc: [],
        items: [],
      }),
  } as unknown as Response),
);

describe('PokeDB', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      arrayBuffer: async () =>
        pack({
          hash: 'test-hash',
          poke: [],
          enc: [],
          loc: [],
          items: [],
          berries: [],
          moves: [],
          matchCalls: [],
        }),
    } as unknown as Response);
    pokeDB._resetSync();
    const db = await getDB();
    const tx = db.transaction(Object.values(DB_CONFIG.STORES), 'readwrite');
    await Promise.all(
      [
        DB_CONFIG.STORES.POKEMON,
        DB_CONFIG.STORES.ENCOUNTERS,
        DB_CONFIG.STORES.LOCATIONS,
        DB_CONFIG.STORES.ITEMS,
        DB_CONFIG.STORES.BERRIES,
        DB_CONFIG.STORES.MOVES,
        DB_CONFIG.STORES.MATCH_CALLS,
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

  it('retries sync if fetch fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as unknown as Response);

    await expect(pokeDB.sync()).rejects.toThrow('Failed to fetch pokedata.msgpack: 500 Internal Server Error');

    // Verify it was reset by calling again with a successful fetch
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      arrayBuffer: async () => pack({ hash: 'test-hash-2', poke: [], enc: [], loc: [], items: [] }),
    } as unknown as Response);

    await pokeDB.sync();
    expect(fetch).toHaveBeenCalledTimes(2);

    errorSpy.mockRestore();
  });

  it('fetches and propagates error if global hash is initial', async () => {
    vi.mocked(fetch).mockClear();
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const db = await getDB();
    const tx = db.transaction(DB_CONFIG.STORES.METADATA, 'readwrite');
    await tx.objectStore(DB_CONFIG.STORES.METADATA).put({ key: 'hash', value: 'initial' });
    await tx.done;

    vi.stubGlobal('__POKEDATA_HASH__', 'initial');

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as unknown as Response);

    await expect(pokeDB.sync()).rejects.toThrow('Failed to fetch pokedata.msgpack: 404 Not Found');

    expect(fetch).toHaveBeenCalledTimes(1);

    vi.stubGlobal('__POKEDATA_HASH__', 'test-hash'); // Restore to previous stubbed value
    errorSpy.mockRestore();
  });

  it('skips parsing and updates metadata if fetched data hash matches existing DB hash', async () => {
    const db = await getDB();
    const tx = db.transaction(DB_CONFIG.STORES.METADATA, 'readwrite');
    await tx.objectStore(DB_CONFIG.STORES.METADATA).put({ key: 'hash', value: 'old-hash' });
    await tx.done;

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      arrayBuffer: async () => pack({ hash: 'old-hash', poke: [], enc: [], loc: [], items: [] }),
    } as unknown as Response);

    const transactionSpy = vi.spyOn(db, 'transaction');

    await pokeDB.sync();

    expect(fetch).toHaveBeenCalledTimes(1);

    const allStoreNames = [
      DB_CONFIG.STORES.POKEMON,
      DB_CONFIG.STORES.ENCOUNTERS,
      DB_CONFIG.STORES.LOCATIONS,
      DB_CONFIG.STORES.ITEMS,
      DB_CONFIG.STORES.MOVES,
      DB_CONFIG.STORES.BERRIES,
      DB_CONFIG.STORES.MATCH_CALLS,
      DB_CONFIG.STORES.METADATA,
    ];
    expect(transactionSpy).not.toHaveBeenCalledWith(allStoreNames, 'readwrite');

    transactionSpy.mockRestore();
  });

  it('emits progress events during sync', async () => {
    const originalWindow = global.window;
    const dispatchEventMock = vi.fn<(event: CustomEvent) => boolean>();

    // @ts-expect-error
    global.window = { dispatchEvent: dispatchEventMock };

    await pokeDB.sync();

    const events = dispatchEventMock.mock.calls.map((call) => call[0] as CustomEvent);
    const progressEvents = events.filter((e) => e.type === 'pokedata-sync-progress');

    expect(progressEvents).toHaveLength(7);
    expect(progressEvents[0]?.detail).toEqual({ current: 1, total: 7, stage: 'Pokemon' });
    expect(progressEvents[1]?.detail).toEqual({ current: 2, total: 7, stage: 'Encounters' });
    expect(progressEvents[2]?.detail).toEqual({ current: 3, total: 7, stage: 'Locations' });
    expect(progressEvents[3]?.detail).toEqual({ current: 4, total: 7, stage: 'Items' });
    expect(progressEvents[4]?.detail).toEqual({ current: 6, total: 7, stage: 'Berries' });
    expect(progressEvents[5]?.detail).toEqual({ current: 7, total: 7, stage: 'Match Calls' });
    expect(progressEvents[6]?.detail).toEqual({ current: 5, total: 7, stage: 'Moves' });

    global.window = originalWindow;
  });

  it('syncs data correctly', async () => {
    const mockData = {
      items: [],
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
      arrayBuffer: async () => pack(mockData),
    } as unknown as Response);

    await pokeDB.sync();

    const p = await pokeDB.getPokemon(1);
    expect(p?.n).toBe('Bulbasaur');
    expect(p?.cr).toBe(45);
  });

  it('fetches single item correctly', async () => {
    const mockData = {
      items: [{ id: 81, name: 'Moon Stone', gen1_id: 10, gen2_id: 8, gen3_id: 94 }],
      hash: 'item-hash',
      poke: [],
      enc: [],
      loc: [],
    };
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      arrayBuffer: async () => pack(mockData),
    } as unknown as Response);
    await pokeDB.sync();

    const item = await pokeDB.getItem(81);
    expect(item?.name).toBe('Moon Stone');
    expect(item?.gen1_id).toBe(10);
  });

  it('retrieves single moves correctly', async () => {
    const mockData = {
      items: [],
      moves: [{ id: 10, name: 'Scratch', type: 1, p: 40, pp: 35, dmg_class: 1, effect: 0 }],
      hash: 'move-hash',
      poke: [],
      enc: [],
      loc: [],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      arrayBuffer: async () => pack(mockData),
    } as unknown as Response);
    await pokeDB.sync();

    const move = await pokeDB.getMove(10);
    expect(move?.name).toBe('Scratch');
    expect(move?.p).toBe(40);
    expect(move?.acc).toBe(100); // Check inflation
  });

  it('performs bulk operations for moves', async () => {
    const mockData = {
      items: [],
      moves: [
        { id: 1, name: 'M1', type: 1, p: 40, pp: 35, dmg_class: 1, effect: 0 },
        { id: 2, name: 'M2', type: 1, p: 40, pp: 35, dmg_class: 1, effect: 0 },
      ],
      hash: 'bulk-move-hash',
      poke: [],
      enc: [],
      loc: [],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      arrayBuffer: async () => pack(mockData),
    } as unknown as Response);

    await pokeDB.sync();

    const results = await pokeDB.getMovesBulk([1, 2, 999]);
    expect(results).toHaveLength(3);

    const r1 = results[0];
    if (!r1 || r1 instanceof Error) throw r1 ?? new Error('r1 undefined');
    expect(r1.name).toBe('M1');

    const r2 = results[1];
    if (!r2 || r2 instanceof Error) throw r2 ?? new Error('r2 undefined');
    expect(r2.name).toBe('M2');

    expect(results[2]).toBeInstanceOf(Error);
  });

  it('performs bulk operations for pokemons', async () => {
    const mockData = {
      items: [],
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
      arrayBuffer: async () => pack(mockData),
    } as unknown as Response);

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

  it('inflates recursive evo chains correctly', async () => {
    const mockData = {
      items: [],
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
      arrayBuffer: async () => pack(mockData),
    } as unknown as Response);

    await pokeDB.sync();

    const p1 = await pokeDB.getPokemon(1);
    expect(p1?.eto?.[0]?.id).toBe(2);
    expect(p1?.eto?.[0]?.det?.[0]?.tr).toBe(1);
    expect(p1?.eto?.[0]?.eto?.[0]?.id).toBe(3);
    expect(p1?.eto?.[0]?.eto?.[0]?.det?.[0]?.tr).toBe(2);
  });

  it('resolves area names correctly', async () => {
    const mockData = {
      items: [],
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
      arrayBuffer: async () => pack(mockData),
    } as unknown as Response);

    await pokeDB.sync();

    const names = await pokeDB.getAreaNames([1, 2, 999]);
    expect(names).toEqual({
      1: 'Viridian Forest',
      2: 'Route 1',
    });
  });

  it('inflates egg move chains correctly', async () => {
    const mockData = {
      items: [],
      hash: 'em-hash',
      poke: [
        {
          id: 1,
          n: 'Bulbasaur',
          cr: 45,
          gr: 1,
          baby: false,
          efrm: [],
          det: [],
          eto: [],
          em: {
            '13': [274, 1],
            '80': [43, 1],
          },
        },
      ],
      enc: [],
      loc: [],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      arrayBuffer: async () => pack(mockData),
    } as unknown as Response);

    await pokeDB.sync();

    const p1 = await pokeDB.getPokemon(1);
    expect(p1?.em).toBeDefined();
    expect(p1?.em?.['13']).toEqual([274, 1]);
    expect(p1?.em?.['80']).toEqual([43, 1]);
  });

  describe('Queries', () => {
    it('returns correct status when synced', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack({ hash: 'new-hash', poke: [], enc: [], loc: [], items: [] }),
      } as unknown as Response);

      await pokeDB.sync();

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
        arrayBuffer: async () => pack({ hash: 'synced-hash', poke: [], enc: [], loc: [], items: [] }),
      } as unknown as Response);

      await pokeDB.ready();
      expect(fetch).toHaveBeenCalled();
    });

    it('getAllPokemon returns all pokemon', async () => {
      const mockData = {
        items: [],
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
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const all = await pokeDB.getAllPokemon();
      expect(all).toHaveLength(2);
      expect(all[0]?.n).toBe('Bulbasaur');
    });

    it('getBerry returns berry data', async () => {
      const mockData = {
        items: [],
        berries: [
          {
            id: 1,
            name: 'cheri',
            item_id: 126,
            growth_time: 3,
            max_harvest: 5,
            size: 20,
            smoothness: 25,
            soil_dryness: 15,
            firmness: 2,
            flavors: { spicy: 10, dry: 0, sweet: 0, bitter: 0, sour: 0 },
          },
        ],
        hash: 'new-hash',
        poke: [],
        enc: [],
        loc: [],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const b = await pokeDB.getBerry(1);
      expect(b?.name).toBe('cheri');
    });

    it('getBerry returns undefined for invalid id', async () => {
      expect(await pokeDB.getBerry(NaN)).toBeUndefined();
    });

    it('getAllMatchCalls returns all match calls', async () => {
      const mockData = {
        berries: [],
        moves: [],

        items: [],
        matchCalls: [
          {
            id: 'REMATCH_ROSE',
            name: 'ROSE',
            map: 'MAP_ROUTE118',
            tiers: [],
          },
          {
            id: 'REMATCH_ANDRES',
            name: 'ANDRES',
            map: 'MAP_ROUTE105',
            tiers: [],
          },
        ],
        hash: 'test-hash-mc',
        poke: [],
        enc: [],
        loc: [],
      };

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const all = await pokeDB.getAllMatchCalls();
      expect(all).toHaveLength(2);
      expect(all[0]?.name).toBe('ANDRES');
      expect(all[1]?.name).toBe('ROSE');
    });

    it('getAllBerries returns all berries', async () => {
      const mockData = {
        items: [],
        berries: [
          {
            id: 1,
            name: 'cheri',
            item_id: 126,
            growth_time: 3,
            max_harvest: 5,
            size: 20,
            smoothness: 25,
            soil_dryness: 15,
            firmness: 2,
            flavors: { spicy: 10, dry: 0, sweet: 0, bitter: 0, sour: 0 },
          },
          {
            id: 2,
            name: 'chesto',
            item_id: 127,
            growth_time: 3,
            max_harvest: 5,
            size: 80,
            smoothness: 25,
            soil_dryness: 15,
            firmness: 5,
            flavors: { spicy: 0, dry: 10, sweet: 0, bitter: 0, sour: 0 },
          },
        ],
        hash: 'new-hash',
        poke: [],
        enc: [],
        loc: [],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const all = await pokeDB.getAllBerries();
      expect(all).toHaveLength(2);
      expect(all[0]?.name).toBe('cheri');
      expect(all[1]?.name).toBe('chesto');
    });

    it('getEncounters returns undefined for invalid id', async () => {
      expect(await pokeDB.getEncounters(NaN)).toBeUndefined();
    });

    it('getEncounters returns encounter data', async () => {
      const mockData = {
        items: [],
        hash: 'new-hash',
        poke: [],
        enc: [{ pid: 1, enc: [] }],
        loc: [],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const enc = await pokeDB.getEncounters(1);
      expect(enc?.pid).toBe(1);
    });

    it('getEncountersBulk returns correctly', async () => {
      const mockData = {
        items: [],
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
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const results = await pokeDB.getEncountersBulk([1, 2, 999]);
      expect(results).toHaveLength(3);
      expect((results[0] as { pid: number }).pid).toBe(1);
      expect((results[1] as { pid: number }).pid).toBe(2);
      expect(results[2]).toBeInstanceOf(Error);
    });

    it('getEncountersBulk returns errors for invalid ids', async () => {
      const manyResult = await pokeDB.getEncountersBulk([NaN]);
      expect(manyResult[0]).toBeInstanceOf(Error);
    });

    it('getAllEncounters returns all encounters', async () => {
      const mockData = {
        items: [],
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
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const all = await pokeDB.getAllEncounters();
      expect(all).toHaveLength(2);
    });

    it('getLocation returns undefined for invalid id', async () => {
      expect(await pokeDB.getLocation(NaN)).toBeUndefined();
    });

    it('getLocation returns location', async () => {
      const mockData = {
        items: [],
        hash: 'new-hash',
        poke: [],
        enc: [],
        loc: [{ id: 1, n: 'Pallet Town', pids: [1], dist: {} }],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const loc = await pokeDB.getLocation(1);
      expect(loc?.n).toBe('Pallet Town');
    });

    it('getLocations returns all locations', async () => {
      const mockData = {
        items: [],
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
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const locs = await pokeDB.getLocations();
      expect(locs).toHaveLength(2);
    });

    it('getAreas returns empty array for invalid id', async () => {
      expect(await pokeDB.getAreas(NaN)).toEqual([]);
    });

    it('getAreas returns area if found', async () => {
      const mockData = {
        items: [],
        hash: 'new-hash',
        poke: [],
        enc: [],
        loc: [{ id: 1, n: 'Pallet Town', pids: [1], dist: {} }],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const areas = await pokeDB.getAreas(1);
      expect(areas).toHaveLength(1);
      expect(areas[0]?.n).toBe('Pallet Town');
    });

    it('getAllAreas returns all locations', async () => {
      const mockData = {
        items: [],
        hash: 'new-hash',
        poke: [],
        enc: [],
        loc: [{ id: 1, n: 'Pallet Town', pids: [1], dist: {} }],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const areas = await pokeDB.getAllAreas();
      expect(areas).toHaveLength(1);
    });

    it('getInverseIndex returns undefined for invalid id', async () => {
      expect(await pokeDB.getInverseIndex(NaN)).toBeUndefined();
    });

    it('getInverseIndex returns pids array', async () => {
      const mockData = {
        items: [],
        hash: 'new-hash',
        poke: [],
        enc: [],
        loc: [{ id: 1, n: 'Pallet Town', pids: [1, 2], dist: {} }],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const pids = await pokeDB.getInverseIndex(1);
      expect(pids).toEqual([1, 2]);
    });

    it('getInverseIndexBulk returns array of pids or undefined', async () => {
      const mockData = {
        items: [],
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
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const results = await pokeDB.getInverseIndexBulk([1, 999, 2, NaN]);
      expect(results).toEqual([[1, 2], undefined, [3], undefined]);
    });

    it('getInverseIndexBulk returns array of undefined for empty/invalid input', async () => {
      expect(await pokeDB.getInverseIndexBulk([])).toEqual([]);
      expect(await pokeDB.getInverseIndexBulk([NaN, NaN])).toEqual([undefined, undefined]);
    });
  });
});
