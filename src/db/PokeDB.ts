import { type IDBPDatabase, openDB } from 'idb';
import {
  type CompactChainLink,
  DB_CONFIG,
  type LocationAreaEncounters,
  type PokeDataExport,
  type PokeDBSchema,
  type PokemonMetadata,
  type UnifiedLocation,
} from './schema';

let dbPromise: Promise<IDBPDatabase<PokeDBSchema>> | null = null;
let syncPromise: Promise<void> | null = null;

const DEFAULT_POKEMON_METADATA = {
  gr: 4,
  baby: false,
  eto: [],
  efrm: [],
  det: [],
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

type ValidStoreName = (typeof DB_CONFIG.STORES)[keyof typeof DB_CONFIG.STORES];

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<PokeDBSchema>(DB_CONFIG.NAME, DB_CONFIG.VERSION, {
      /* v8 ignore start */
      upgrade(db) {
        const currentStores = Array.from(db.objectStoreNames);
        const targetStores = Object.values(DB_CONFIG.STORES) as readonly ValidStoreName[];

        // Define key paths for each store
        const keyPaths: Record<ValidStoreName, string> = {
          [DB_CONFIG.STORES.POKEMON]: 'id',
          [DB_CONFIG.STORES.ENCOUNTERS]: 'pid',
          [DB_CONFIG.STORES.LOCATIONS]: 'id',
          [DB_CONFIG.STORES.METADATA]: 'key',
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

const syncData = async () => {
  if (syncPromise) {
    return syncPromise;
  }

  syncPromise = (async () => {
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
      const response = await fetch(`${baseUrl}data/pokedata.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch pokedata.json: ${response.status} ${response.statusText}`);
      }
      const data: PokeDataExport = await response.json();

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
        [DB_CONFIG.STORES.POKEMON, DB_CONFIG.STORES.ENCOUNTERS, DB_CONFIG.STORES.LOCATIONS, DB_CONFIG.STORES.METADATA],
        'readwrite',
      );

      // 3. Populate stores with inflated data
      const pStore = tx.objectStore(DB_CONFIG.STORES.POKEMON);
      const eStore = tx.objectStore(DB_CONFIG.STORES.ENCOUNTERS);
      const lStore = tx.objectStore(DB_CONFIG.STORES.LOCATIONS);
      const mStore = tx.objectStore(DB_CONFIG.STORES.METADATA);

      // Clear old data
      await Promise.all([pStore.clear(), eStore.clear(), lStore.clear(), mStore.clear()]);

      emit(1, 3, 'Pokemon');
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

        pStore.put({
          ...DEFAULT_POKEMON_METADATA,
          ...p,
          det: inflatedDet,
          eto: inflateChain(p.eto),
        });
      }

      emit(2, 3, 'Encounters');
      for (const e of data.enc) {
        const inflatedEnc = e.enc.map((enc) => ({
          ...enc,
          d: (enc.d || []).map((d) => ({
            ...DEFAULT_ENCOUNTER_DETAIL,
            ...d,
            max: d.max ?? d.min,
          })),
        }));
        eStore.put({ pid: e.pid, enc: inflatedEnc });
      }

      emit(3, 3, 'Locations');
      for (const l of data.loc) {
        lStore.put({
          ...DEFAULT_LOCATION,
          ...l,
          prnt: l.prnt, // stay undefined if omitted
        });
      }

      await mStore.put({ key: 'hash', value: data.hash });
      await tx.done;
    } catch (err) {
      console.error('PokeDB: Sync failed', err instanceof Error ? err.message : String(err));
      // Reset promise so we can retry later if needed
      syncPromise = null;
      throw err;
    }
  })();

  return syncPromise;
};

export const pokeDB = {
  sync: syncData,
  ready: async () => {
    if (syncPromise) return syncPromise;
    const db = await getDB();
    const entry = await db.get(DB_CONFIG.STORES.METADATA, 'hash');
    const hash = entry?.value;
    if (!hash || hash === 'initial') {
      return syncData();
    }
  },
  getStatus: async () => {
    const db = await getDB();
    const entry = await db.get(DB_CONFIG.STORES.METADATA, 'hash');
    const hash = entry?.value;
    return {
      isComplete: !!hash && hash !== 'initial',
      isSyncing: !!syncPromise,
    };
  },
  getPokemon: async (id: number): Promise<PokemonMetadata | undefined> => {
    await pokeDB.ready();
    if (id === undefined || id === null || Number.isNaN(id)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.POKEMON, id);
  },
  getEncounters: async (pid: number): Promise<LocationAreaEncounters | undefined> => {
    await pokeDB.ready();
    if (pid === undefined || pid === null || Number.isNaN(pid)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.ENCOUNTERS, pid);
  },
  getAllEncounters: async (): Promise<LocationAreaEncounters[]> => {
    await pokeDB.ready();
    return (await getDB()).getAll(DB_CONFIG.STORES.ENCOUNTERS);
  },
  getLocations: async () => {
    await pokeDB.ready();
    return (await getDB()).getAll(DB_CONFIG.STORES.LOCATIONS);
  },
  getLocation: async (id: number) => {
    await pokeDB.ready();
    if (id === undefined || id === null || Number.isNaN(id)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.LOCATIONS, id);
  },
  getAreas: async (mid: number): Promise<UnifiedLocation[]> => {
    await pokeDB.ready();
    if (mid === undefined || mid === null || Number.isNaN(mid)) return [];
    const db = await getDB();
    const loc = await db.get(DB_CONFIG.STORES.LOCATIONS, mid);
    return loc ? [loc] : [];
  },
  getInverseIndex: async (mid: number): Promise<number[] | undefined> => {
    await pokeDB.ready();
    if (mid === undefined || mid === null || Number.isNaN(mid)) return undefined;
    const res = await (await getDB()).get(DB_CONFIG.STORES.LOCATIONS, mid);
    return res?.pids;
  },
  getAllAreas: async (): Promise<UnifiedLocation[]> => {
    await pokeDB.ready();
    return (await getDB()).getAll(DB_CONFIG.STORES.LOCATIONS);
  },
  getAreaNames: async (ids: number[]): Promise<Record<number, string>> => {
    await pokeDB.ready();
    const db = await getDB();
    const names: Record<number, string> = {};
    // ⚡ Bolt: Used single readonly transaction to prevent N+1 IDB overhead
    const tx = db.transaction(DB_CONFIG.STORES.LOCATIONS, 'readonly');
    const store = tx.objectStore(DB_CONFIG.STORES.LOCATIONS);
    const locations = await Promise.all(ids.map((id) => store.get(id)));
    await tx.done;
    for (const loc of locations) {
      if (loc) {
        names[loc.id] = loc.n;
      }
    }
    return names;
  },

  // Bulk versions for DataLoader
  getPokemons: async (ids: number[]): Promise<(PokemonMetadata | Error)[]> => {
    await pokeDB.ready();
    const db = await getDB();
    const validIds = ids.filter((id) => typeof id === 'number' && !Number.isNaN(id));
    if (validIds.length === 0) return ids.map(() => new Error('Invalid ID provided'));

    const tx = db.transaction(DB_CONFIG.STORES.POKEMON, 'readonly');
    const store = tx.objectStore(DB_CONFIG.STORES.POKEMON);
    const fetched = await Promise.all(validIds.map((id) => store.get(id)));
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
  getEncountersBulk: async (ids: number[]): Promise<(LocationAreaEncounters | Error)[]> => {
    await pokeDB.ready();
    const db = await getDB();
    const validIds = ids.filter((id) => typeof id === 'number' && !Number.isNaN(id));
    if (validIds.length === 0) return ids.map(() => new Error('Invalid ID provided'));

    // ⚡ Bolt: Used single readonly transaction to prevent N+1 IDB overhead for encounters
    const tx = db.transaction(DB_CONFIG.STORES.ENCOUNTERS, 'readonly');
    const store = tx.objectStore(DB_CONFIG.STORES.ENCOUNTERS);
    const fetched = await Promise.all(validIds.map((id) => store.get(id)));
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
  _resetSync: () => {
    syncPromise = null;
  },
};
