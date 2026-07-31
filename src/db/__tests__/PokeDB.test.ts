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
        pokemon: [],
        encounters: [],
        locations: [],
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
          pokemon: [],
          encounters: [],
          locations: [],
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
      arrayBuffer: async () => pack({ hash: 'test-hash-2', pokemon: [], encounters: [], locations: [] }),
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
      arrayBuffer: async () => pack({ hash: 'old-hash', pokemon: [], encounters: [], locations: [] }),
    } as unknown as Response);

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

  it('emits progress events during sync', async () => {
    // We cannot easily spy on window if it's undefined, let's inject it into global context
    const originalWindow = global.window;
    const dispatchEventMock = vi.fn<(event: CustomEvent) => boolean>();

    // @ts-expect-error
    global.window = { dispatchEvent: dispatchEventMock };

    await pokeDB.sync();

    const events = dispatchEventMock.mock.calls.map((call) => call[0] as CustomEvent);
    const progressEvents = events.filter((e) => e.type === 'pokedata-sync-progress');

    expect(progressEvents).toHaveLength(4);
    expect(progressEvents[0]?.detail).toEqual({ current: 1, total: 4, stage: 'Pokemon' });
    expect(progressEvents[1]?.detail).toEqual({ current: 2, total: 4, stage: 'Encounters' });
    expect(progressEvents[2]?.detail).toEqual({ current: 3, total: 4, stage: 'Locations' });
    expect(progressEvents[3]?.detail).toEqual({ current: 4, total: 4, stage: 'Items' });

    global.window = originalWindow;
  });

  it('syncs data correctly', async () => {
    const mockData = {
      items: [],
      hash: 'new-hash',
      pokemon: [
        {
          id: 1,
          n: 'Bulbasaur',
          cr: 45,
          gr: 1,
          baby: false,
          evolvesTo: [],
          evolvesFrom: [],
          evolutionDetails: [],
        },
      ],
      encounters: [{ pokemonId: 1, encounters: [] }],
      locations: [{ id: 1, n: 'Pallet Town', pids: [1], dist: {} }],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      arrayBuffer: async () => pack(mockData),
    } as unknown as Response);

    await pokeDB.sync();

    const p = await pokeDB.getPokemon(1);
    expect(p?.name).toBe('Bulbasaur');
    expect(p?.captureRate).toBe(45);
  });

  it('performs bulk operations for pokemons', async () => {
    const mockData = {
      items: [],
      hash: 'bulk-hash',
      pokemon: [
        { id: 1, n: 'P1', cr: 10, gr: 1, baby: false, evolvesTo: [], evolvesFrom: [], evolutionDetails: [] },
        { id: 2, n: 'P2', cr: 10, gr: 1, baby: false, evolvesTo: [], evolvesFrom: [], evolutionDetails: [] },
      ],
      encounters: [],
      locations: [],
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
    expect(r1.name).toBe('P1');

    const r2 = results[1];
    if (!r2 || r2 instanceof Error) throw r2 ?? new Error('r2 undefined');
    expect(r2.name).toBe('P2');

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
      pokemon: [
        {
          id: 1,
          n: 'P1',
          cr: 10,
          gr: 1,
          baby: false,
          evolvesFrom: [],
          evolutionDetails: [],
          evolvesTo: [
            {
              id: 2,
              evolutionDetails: [{ trigger: 1 }],
              evolvesTo: [
                {
                  id: 3,
                  evolutionDetails: [{ trigger: 2 }],
                  evolvesTo: [],
                },
              ],
            },
          ],
        },
      ],
      encounters: [],
      locations: [],
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      arrayBuffer: async () => pack(mockData),
    } as unknown as Response);

    await pokeDB.sync();

    const p1 = await pokeDB.getPokemon(1);
    expect(p1?.evolvesTo?.[0]?.id).toBe(2);
    expect(p1?.evolvesTo?.[0]?.evolutionDetails?.[0]?.trigger).toBe(1);
    expect(p1?.evolvesTo?.[0]?.evolvesTo?.[0]?.id).toBe(3);
    expect(p1?.evolvesTo?.[0]?.evolvesTo?.[0]?.evolutionDetails?.[0]?.trigger).toBe(2);
  });

  it('resolves area names correctly', async () => {
    const mockData = {
      items: [],
      hash: 'area-hash',
      pokemon: [],
      encounters: [],
      locations: [
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
      pokemon: [
        {
          id: 1,
          n: 'Bulbasaur',
          cr: 45,
          gr: 1,
          baby: false,
          evolvesFrom: [],
          evolutionDetails: [],
          evolvesTo: [],
          em: {
            '13': [274, 1],
            '80': [43, 1],
          },
        },
      ],
      encounters: [],
      locations: [],
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
        arrayBuffer: async () => pack({ hash: 'new-hash', pokemon: [], encounters: [], locations: [] }),
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
        arrayBuffer: async () => pack({ hash: 'synced-hash', pokemon: [], encounters: [], locations: [] }),
      } as unknown as Response);

      await pokeDB.ready();
      expect(fetch).toHaveBeenCalled();
    });

    it('getAllPokemon returns all pokemon', async () => {
      const mockData = {
        items: [],
        hash: 'new-hash',
        pokemon: [
          { id: 1, n: 'Bulbasaur', cr: 45, gr: 1, baby: false, evolvesTo: [], evolvesFrom: [], evolutionDetails: [] },
          { id: 2, n: 'Ivysaur', cr: 45, gr: 1, baby: false, evolvesTo: [], evolvesFrom: [], evolutionDetails: [] },
        ],
        encounters: [],
        locations: [],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const all = await pokeDB.getAllPokemon();
      expect(all).toHaveLength(2);
      expect(all[0]?.name).toBe('Bulbasaur');
    });

    it('getEncounters returns undefined for invalid id', async () => {
      expect(await pokeDB.getEncounters(NaN)).toBeUndefined();
    });

    it('getEncounters returns encounter data', async () => {
      const mockData = {
        items: [],
        hash: 'new-hash',
        pokemon: [],
        encounters: [{ pokemonId: 1, encounters: [] }],
        locations: [],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const enc = await pokeDB.getEncounters(1);
      expect(enc?.pokemonId).toBe(1);
    });

    it('getEncountersBulk returns correctly', async () => {
      const mockData = {
        items: [],
        hash: 'new-hash',
        pokemon: [],
        encounters: [
          { pokemonId: 1, encounters: [] },
          { pokemonId: 2, encounters: [] },
        ],
        locations: [],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const results = await pokeDB.getEncountersBulk([1, 2, 999]);
      expect(results).toHaveLength(3);
      expect((results[0] as { pokemonId: number }).pokemonId).toBe(1);
      expect((results[1] as { pokemonId: number }).pokemonId).toBe(2);
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
        pokemon: [],
        encounters: [
          { pokemonId: 1, encounters: [] },
          { pokemonId: 2, encounters: [] },
        ],
        locations: [],
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
        pokemon: [],
        encounters: [],
        locations: [{ id: 1, n: 'Pallet Town', pids: [1], dist: {} }],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const loc = await pokeDB.getLocation(1);
      expect(loc?.name).toBe('Pallet Town');
    });

    it('getLocations returns all locations', async () => {
      const mockData = {
        items: [],
        hash: 'new-hash',
        pokemon: [],
        encounters: [],
        locations: [
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
        pokemon: [],
        encounters: [],
        locations: [{ id: 1, n: 'Pallet Town', pids: [1], dist: {} }],
      };
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        arrayBuffer: async () => pack(mockData),
      } as unknown as Response);
      await pokeDB.sync();

      const areas = await pokeDB.getAreas(1);
      expect(areas).toHaveLength(1);
      expect(areas[0]?.name).toBe('Pallet Town');
    });

    it('getAllAreas returns all locations', async () => {
      const mockData = {
        items: [],
        hash: 'new-hash',
        pokemon: [],
        encounters: [],
        locations: [{ id: 1, n: 'Pallet Town', pids: [1], dist: {} }],
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
        pokemon: [],
        encounters: [],
        locations: [{ id: 1, n: 'Pallet Town', pids: [1, 2], dist: {} }],
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
        pokemon: [],
        encounters: [],
        locations: [
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
