import { type IDBPDatabase, openDB, unwrap } from 'idb';
import { Unpackr } from 'msgpackr';
import { objectValues } from '../utils/object';
import {
  type BerryMetadata,
  type CompactChainLink,
  DB_CONFIG,
  type ItemMetadata,
  type LocationAreaEncounters,
  type MoveMetadata,
  type PokeDataExport,
  type PokeDBSchema,
  type PokemonMetadata,
  type UnifiedLocation,
} from './schema';

let dbPromise: Promise<IDBPDatabase<PokeDBSchema>> | null = null;

/**
 * A utility function to fetch multiple records from IndexedDB by their keys simultaneously.
 * Why it exists: IndexedDB lacks a native `getAll(keys)` method. To avoid the overhead of
 * initiating separate transactions or sequential N+1 `get` requests, this function
 * fires multiple `get` requests in parallel within the same transaction.
 *
 * @param store - The active IDBObjectStore to read from.
 * @param ids - An array of valid keys to fetch.
 * @returns A promise that resolves to an array of results matching the order of `ids`.
 */
async function bulkGet<T>(store: IDBObjectStore, ids: readonly number[]): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    const res = Array.from<T>({ length: ids.length });
    let pending = ids.length;
    if (pending === 0) return resolve([]);
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      if (id === undefined) {
        if (--pending === 0) resolve(res);
        continue;
      }
      const req = store.get(id);
      req.onsuccess = () => {
        res[i] = req.result;
        if (--pending === 0) resolve(res);
      };
      req.onerror = () => reject(req.error);
    }
  });
}

const DEFAULT_POKEMON_METADATA = {
  gr: 4,
  baby: false,
  types: [],
  eto: [],
  efrm: [],
  det: [],
  em: undefined,
};

const DEFAULT_EVO_DETAIL = {
  tr: 1,
  mh: 160,
};

const DEFAULT_ENCOUNTER_DETAIL = {
  m: 1,
};

const DEFAULT_LOCATION = {
  conn: [],
  pids: [],
  dist: {},
};

const DEFAULT_MOVE_METADATA = {
  acc: 100,
};

type ValidStoreName = (typeof DB_CONFIG.STORES)[keyof typeof DB_CONFIG.STORES];

/**
 * Retrieves the singleton instance of the IndexedDB database.
 *
 * **Architecture Note:**
 * This uses a singleton promise (`dbPromise`) to prevent race conditions where multiple
 * components attempt to open the database simultaneously on app load. By returning the same
 * promise, all callers gracefully wait for the initial connection and schema upgrade to finish.
 */
export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<PokeDBSchema>(DB_CONFIG.NAME, DB_CONFIG.VERSION, {
      /* v8 ignore start */
      upgrade(db) {
        const currentStores = Array.from(db.objectStoreNames);
        const targetStores = objectValues(DB_CONFIG.STORES);

        // Define key paths for each store
        const keyPaths: Record<ValidStoreName, string> = {
          [DB_CONFIG.STORES.POKEMON]: 'id',
          [DB_CONFIG.STORES.ENCOUNTERS]: 'pid',
          [DB_CONFIG.STORES.LOCATIONS]: 'id',
          [DB_CONFIG.STORES.METADATA]: 'key',
          [DB_CONFIG.STORES.ITEMS]: 'id',
          [DB_CONFIG.STORES.MOVES]: 'id',
          [DB_CONFIG.STORES.BERRIES]: 'id',
        };

        // Always delete existing stores to ensure keyPaths are applied correctly
        for (const store of currentStores) {
          db.deleteObjectStore(store);
        }

        for (const store of targetStores) {
          const options = keyPaths[store] ? { keyPath: keyPaths[store] } : undefined;
          db.createObjectStore(store, options);
        }
      },
      /* v8 ignore stop */
    });
  }
  return dbPromise;
};

/**
 * Downloads the pre-built `pokedata.msgpack` bundle from the server and hydrates
 * the local IndexedDB stores.
 *
 * **Architecture Note:**
 * We use `msgpackr` (MessagePack) over JSON because the Pokemon dataset is massive
 * (thousands of encounter arrays and evolution trees). MessagePack dramatically reduces
 * the payload size and parsing time over the wire compared to raw JSON strings.
 *
 * It prevents redundant network requests by comparing the application's current
 * build hash (`__POKEDATA_HASH__`) against the hash stored in IndexedDB.
 * If a sync is needed, it fetches the compact data, inflates nested data structures
 * (like evolution chains and encounter details), and populates the stores.
 *
 * @returns A Promise that resolves when the synchronization is complete.
 */
const syncData = async () => {
  try {
    const db = await getDB();

    // 1. Check if already synced using build-time hash
    const existingHash = await db.get(DB_CONFIG.STORES.METADATA, 'hash');

    // Skip fetch if the build-in hash matches what we have in indexedDB
    if (existingHash?.value === __POKEDATA_HASH__ && __POKEDATA_HASH__ !== 'initial') {
      return;
    }

    // 2. Fetch current data
    const baseUrl = typeof window !== 'undefined' ? import.meta.env.BASE_URL : 'http://localhost:3000/dexhelper/';
    const response = await fetch(`${baseUrl}data/pokedata.msgpack`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokedata.msgpack: ${response.status} ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();

    const unpackr = new Unpackr({ useRecords: true, variableMapSize: true, bundleStrings: true });
    const data: PokeDataExport = unpackr.unpack(new Uint8Array(buffer));

    // Guard against outdated build hash vs actual data hash (rare edge case)
    if (existingHash?.value === data.hash) {
      // Sync the build hash back to metadata just in case
      await db.put(DB_CONFIG.STORES.METADATA, { key: 'hash', value: data.hash });
      return;
    }

    const emit = (current: number, total: number, stage: string) => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('pokedata-sync-progress', {
            detail: { current, total, stage },
          }),
        );
      }
    };

    const tx = db.transaction(
      [
        DB_CONFIG.STORES.POKEMON,
        DB_CONFIG.STORES.ENCOUNTERS,
        DB_CONFIG.STORES.LOCATIONS,
        DB_CONFIG.STORES.ITEMS,
        DB_CONFIG.STORES.MOVES,
        DB_CONFIG.STORES.BERRIES,
        DB_CONFIG.STORES.METADATA,
      ],
      'readwrite',
    );

    // 3. Populate stores with inflated data
    const pStore = tx.objectStore(DB_CONFIG.STORES.POKEMON);
    const eStore = tx.objectStore(DB_CONFIG.STORES.ENCOUNTERS);
    const lStore = tx.objectStore(DB_CONFIG.STORES.LOCATIONS);
    const iStore = tx.objectStore(DB_CONFIG.STORES.ITEMS);
    const mvStore = tx.objectStore(DB_CONFIG.STORES.MOVES);
    const bStore = tx.objectStore(DB_CONFIG.STORES.BERRIES);
    const mStore = tx.objectStore(DB_CONFIG.STORES.METADATA);

    // Clear old data
    await Promise.all([
      pStore.clear(),
      eStore.clear(),
      lStore.clear(),
      iStore.clear(),
      mvStore.clear(),
      bStore.clear(),
      mStore.clear(),
    ]);

    emit(1, 5, 'Pokemon');
    const inflateChain = (links: CompactChainLink[] | undefined): CompactChainLink[] => {
      return (links || []).map((l) => ({
        ...l,
        det: (l.det || []).map((d) => ({
          ...DEFAULT_EVO_DETAIL,
          ...d,
        })),
        eto: inflateChain(l.eto),
      }));
    };

    for (const p of data.poke) {
      const inflatedDet = (p.det || []).map((d) => ({
        ...DEFAULT_EVO_DETAIL,
        ...d,
      }));

      void pStore.put({
        ...DEFAULT_POKEMON_METADATA,
        ...p,
        det: inflatedDet,
        eto: inflateChain(p.eto),
      });
    }

    emit(2, 5, 'Encounters');
    for (const e of data.enc) {
      const inflatedEnc = e.enc.map((enc) => ({
        ...enc,
        d: (enc.d || []).map((d) => ({
          ...DEFAULT_ENCOUNTER_DETAIL,
          ...d,
          max: d.max ?? d.min,
        })),
      }));
      void eStore.put({ pid: e.pid, enc: inflatedEnc });
    }

    emit(3, 5, 'Locations');
    for (const l of data.loc) {
      void lStore.put({
        ...DEFAULT_LOCATION,
        ...l,
        prnt: l.prnt, // stay undefined if omitted
      });
    }

    emit(4, 5, 'Items');
    for (const item of data.items || []) {
      void iStore.put(item);
    }
    for (const berry of data.berries || []) {
      void bStore.put(berry);
    }

    emit(5, 5, 'Moves');
    for (const move of data.moves || []) {
      void mvStore.put({
        ...DEFAULT_MOVE_METADATA,
        ...move,
      });
    }

    await mStore.put({ key: 'hash', value: data.hash });
    await tx.done;
  } catch (err) {
    console.error('System: sync failed');
    throw err;
  }
};

/**
 * The core IndexedDB abstraction layer for DexHelper.
 *
 * This object manages the offline-first data lifecycle:
 * 1. **Synchronization (`syncData`)**: Ingests massive JSONL payloads generated by the build-time ETL scripts.
 * 2. **Initialization Guard (`ready`)**: Blocks UI queries until the background database is fully populated.
 * 3. **Batched Retrieval (`getPokemons`, `getEncountersBulk`)**: Facilitates `DexDataLoader` by fetching multiple records
 *    in a single database transaction, eliminating the `N+1` transaction overhead that would otherwise block the main UI thread.
 */
export const pokeDB = {
  /**
   * Triggers the ingestion of static `.jsonl` and `.msgpack` data generated by the ETL pipeline into IndexedDB.
   * This is typically called only on the first visit or after an application update invalidates the metadata hash.
   */
  sync: syncData,

  /**
   * Initialization lock for the database.
   * Every read query must `await pokeDB.ready()` before proceeding. If the database is empty or outdated
   * (determined by checking the metadata hash), this function transparently halts the query, triggers
   * the `syncData` operation, and resumes once the DB is fully populated.
   */
  ready: async () => {
    const db = await getDB();
    const entry = await db.get(DB_CONFIG.STORES.METADATA, 'hash');
    const hash = entry?.value;
    if (!hash || hash === 'initial') {
      return syncData();
    }
  },

  /**
   * Returns the current synchronization status of the local database.
   */
  getStatus: async () => {
    const db = await getDB();
    const entry = await db.get(DB_CONFIG.STORES.METADATA, 'hash');
    const hash = entry?.value;
    return {
      isComplete: !!hash && hash !== 'initial',
      isSyncing: false,
    };
  },
  /**
   * Fetches a single Pokémon's metadata (stats, types, evolutions) by its Pokédex ID.
   * Note: For rendering lists, use `DexDataLoader.pokemon.loadMany` instead to leverage batched `getPokemons`.
   */
  getPokemon: async (id: number): Promise<PokemonMetadata | undefined> => {
    await pokeDB.ready();
    if (id === undefined || id === null || Number.isNaN(id)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.POKEMON, id);
  },

  /**
   * Fetches a single Item's metadata by its ID.
   */
  getItem: async (id: number): Promise<ItemMetadata | undefined> => {
    await pokeDB.ready();
    if (id === undefined || id === null || Number.isNaN(id)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.ITEMS, id);
  },

  /**
   * Fetches a single Berry's metadata by its ID.
   */
  getBerry: async (id: number): Promise<BerryMetadata | undefined> => {
    await pokeDB.ready();
    if (id === undefined || id === null || Number.isNaN(id)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.BERRIES, id);
  },

  /**
   * Fetches all berry metadata.
   */
  getAllBerries: async (): Promise<BerryMetadata[]> => {
    await pokeDB.ready();
    return (await getDB()).getAll(DB_CONFIG.STORES.BERRIES);
  },

  /**
   * Fetches a single Move's metadata by its ID.
   */
  getMove: async (id: number): Promise<MoveMetadata | undefined> => {
    await pokeDB.ready();
    if (id === undefined || id === null || Number.isNaN(id)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.MOVES, id);
  },

  /**
   * Fetches the encounter tables for a specific Pokemon by its Pokedex ID.
   *
   * @param pid - The Pokedex ID of the Pokemon.
   * @returns The encounter data or undefined if not found.
   */
  getEncounters: async (pid: number): Promise<LocationAreaEncounters | undefined> => {
    await pokeDB.ready();
    if (pid === undefined || pid === null || Number.isNaN(pid)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.ENCOUNTERS, pid);
  },
  /**
   * Fetches all encounter tables in the database.
   * This is heavily used by the suggestion engine during app startup to pre-load O(1) lookups.
   */
  getAllEncounters: async (): Promise<LocationAreaEncounters[]> => {
    await pokeDB.ready();
    return (await getDB()).getAll(DB_CONFIG.STORES.ENCOUNTERS);
  },
  /**
   * Fetches all location mappings, including Floyd-Warshall distance tables.
   */
  getLocations: async () => {
    await pokeDB.ready();
    return (await getDB()).getAll(DB_CONFIG.STORES.LOCATIONS);
  },
  /**
   * Retrieves a specific location node by its ID.
   */
  getLocation: async (id: number) => {
    await pokeDB.ready();
    if (id === undefined || id === null || Number.isNaN(id)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.LOCATIONS, id);
  },
  /**
   * Retrieves the area data corresponding to a specific map ID.
   */
  getAreas: async (mid: number): Promise<UnifiedLocation[]> => {
    await pokeDB.ready();
    if (mid === undefined || mid === null || Number.isNaN(mid)) return [];
    const db = await getDB();
    const loc = await db.get(DB_CONFIG.STORES.LOCATIONS, mid);
    return loc ? [loc] : [];
  },
  /**
   * Retrieves the inverse index (pids) of Pokemon that can be encountered at a specific location.
   */
  getInverseIndex: async (mid: number): Promise<number[] | undefined> => {
    await pokeDB.ready();
    if (mid === undefined || mid === null || Number.isNaN(mid)) return undefined;
    const res = await (await getDB()).get(DB_CONFIG.STORES.LOCATIONS, mid);
    return res?.pids;
  },
  getInverseIndexBulk: async (mids: number[]): Promise<(number[] | undefined)[]> => {
    await pokeDB.ready();
    const db = await getDB();
    const validIds = mids.filter((id) => typeof id === 'number' && !Number.isNaN(id));
    if (validIds.length === 0) return mids.map(() => undefined);

    const tx = db.transaction(DB_CONFIG.STORES.LOCATIONS, 'readonly');
    const store = unwrap(tx.objectStore(DB_CONFIG.STORES.LOCATIONS));
    const fetched = await bulkGet<UnifiedLocation>(store, validIds);
    await tx.done;

    const resultMap = new Map<number, number[] | undefined>();
    for (const loc of fetched) {
      if (loc) resultMap.set(loc.id, loc.pids);
    }

    return mids.map((id) => {
      if (typeof id !== 'number' || Number.isNaN(id)) return undefined;
      return resultMap.get(id);
    });
  },
  getAllAreas: async (): Promise<UnifiedLocation[]> => {
    await pokeDB.ready();
    return (await getDB()).getAll(DB_CONFIG.STORES.LOCATIONS);
  },
  getAreaNames: async (ids: number[]): Promise<Record<number, string>> => {
    await pokeDB.ready();
    const db = await getDB();
    const names: Record<number, string> = {};
    const tx = db.transaction(DB_CONFIG.STORES.LOCATIONS, 'readonly');
    const store = unwrap(tx.objectStore(DB_CONFIG.STORES.LOCATIONS));
    const locations = await bulkGet<UnifiedLocation>(store, ids);
    await tx.done;
    for (const loc of locations) {
      if (loc) {
        names[loc.id] = loc.n;
      }
    }
    return names;
  },

  // Bulk versions for DataLoader
  /**
   * Fetches multiple Pokémon records in a single database transaction using `bulkGet`.
   * Designed to be called exclusively by `DexDataLoader` to prevent N+1 IDB query bottlenecks.
   */
  getPokemons: async (ids: number[]): Promise<(PokemonMetadata | Error)[]> => {
    await pokeDB.ready();
    const db = await getDB();
    const validIds = ids.filter((id) => typeof id === 'number' && !Number.isNaN(id));
    if (validIds.length === 0) return ids.map(() => new Error('Invalid ID provided'));

    const tx = db.transaction(DB_CONFIG.STORES.POKEMON, 'readonly');
    const store = unwrap(tx.objectStore(DB_CONFIG.STORES.POKEMON));
    const fetched = await bulkGet<PokemonMetadata>(store, validIds);
    await tx.done;
    const resultMap = new Map<number, PokemonMetadata>();
    for (const p of fetched) {
      if (p) resultMap.set(p.id, p);
    }

    // Map back to original order, filling in gaps
    return ids.map((id) => {
      if (typeof id !== 'number' || Number.isNaN(id)) return new Error('Invalid ID');
      const found = resultMap.get(id);
      return found ?? new Error('Pokemon not found');
    });
  },
  getAllPokemon: async (): Promise<PokemonMetadata[]> => {
    await pokeDB.ready();
    return (await getDB()).getAll(DB_CONFIG.STORES.POKEMON);
  },
  /**
   * Fetches multiple Move records in a single database transaction using `bulkGet`.
   * Designed to be called exclusively by `DexDataLoader` to prevent N+1 IDB query bottlenecks.
   */
  getMovesBulk: async (ids: number[]): Promise<(MoveMetadata | Error)[]> => {
    await pokeDB.ready();
    const db = await getDB();
    const validIds = ids.filter((id) => typeof id === 'number' && !Number.isNaN(id));
    if (validIds.length === 0) return ids.map(() => new Error('Invalid ID provided'));

    const tx = db.transaction(DB_CONFIG.STORES.MOVES, 'readonly');
    const store = unwrap(tx.objectStore(DB_CONFIG.STORES.MOVES));
    const fetched = await bulkGet<MoveMetadata>(store, validIds);
    await tx.done;

    const resultMap = new Map<number, MoveMetadata>();
    for (const mv of fetched) {
      if (mv) resultMap.set(mv.id, mv);
    }

    return ids.map((id) => {
      if (typeof id !== 'number' || Number.isNaN(id)) return new Error('Invalid ID');
      const found = resultMap.get(id);
      return found ?? new Error(`Move not found for ${id}`);
    });
  },

  /**
   * Fetches multiple Encounter records in a single database transaction using `bulkGet`.
   * Designed to be called exclusively by `DexDataLoader` to prevent N+1 IDB query bottlenecks.
   */
  getEncountersBulk: async (ids: number[]): Promise<(LocationAreaEncounters | Error)[]> => {
    await pokeDB.ready();
    const db = await getDB();
    const validIds = ids.filter((id) => typeof id === 'number' && !Number.isNaN(id));
    if (validIds.length === 0) return ids.map(() => new Error('Invalid ID provided'));

    const tx = db.transaction(DB_CONFIG.STORES.ENCOUNTERS, 'readonly');
    const store = unwrap(tx.objectStore(DB_CONFIG.STORES.ENCOUNTERS));
    const fetched = await bulkGet<LocationAreaEncounters>(store, validIds);
    await tx.done;

    const resultMap = new Map<number, LocationAreaEncounters>();
    for (const e of fetched) {
      if (e) resultMap.set(e.pid, e);
    }

    return ids.map((id) => {
      if (typeof id !== 'number' || Number.isNaN(id)) return new Error('Invalid ID');
      const found = resultMap.get(id);
      return found ?? new Error(`Encounters not found for ${id}`);
    });
  },

  // Internal/Test helper to reset the sync state
  _resetSync: () => {},
};
