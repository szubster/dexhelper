import { type IDBPDatabase, openDB } from 'idb';
import {
  DB_CONFIG,
  type LocationAreaEncounters,
  type PokeDataExport,
  type PokeDBSchema,
  type PokemonEvolutionChain,
  type PokemonMetadata,
} from './schema';

let dbPromise: Promise<IDBPDatabase<PokeDBSchema>> | null = null;
let syncPromise: Promise<void> | null = null;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<PokeDBSchema>(DB_CONFIG.NAME, DB_CONFIG.VERSION, {
      upgrade(db) {
        const currentStores = Array.from(db.objectStoreNames) as string[];
        const targetStores = Object.values(DB_CONFIG.STORES) as string[];

        // Define key paths for each store
        const keyPaths: Record<string, string> = {
          [DB_CONFIG.STORES.POKEMON]: 'id',
          [DB_CONFIG.STORES.ENCOUNTERS]: 'pid',
          [DB_CONFIG.STORES.CHAINS]: 'id',
          [DB_CONFIG.STORES.LOCATIONS]: 'id',
          [DB_CONFIG.STORES.AREAS]: 'id',
          [DB_CONFIG.STORES.INDEX]: 'id',
          [DB_CONFIG.STORES.METADATA]: 'key',
        };

        // Always delete existing stores to ensure keyPaths are applied correctly
        for (const store of currentStores) {
          // biome-ignore lint/suspicious/noExplicitAny: Dynamic store management during upgrade
          db.deleteObjectStore(store as any);
        }

        for (const store of targetStores) {
          const options = keyPaths[store] ? { keyPath: keyPaths[store] } : undefined;
          // biome-ignore lint/suspicious/noExplicitAny: Dynamic store management during upgrade
          db.createObjectStore(store as any, options);
        }
      },
    });
  }
  return dbPromise;
};

export const syncData = async () => {
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
        [
          DB_CONFIG.STORES.POKEMON,
          DB_CONFIG.STORES.ENCOUNTERS,
          DB_CONFIG.STORES.CHAINS,
          DB_CONFIG.STORES.LOCATIONS,
          DB_CONFIG.STORES.AREAS,
          DB_CONFIG.STORES.INDEX,
          DB_CONFIG.STORES.METADATA,
        ],
        'readwrite',
      );

      // 3. Populate stores
      const pStore = tx.objectStore(DB_CONFIG.STORES.POKEMON);
      const eStore = tx.objectStore(DB_CONFIG.STORES.ENCOUNTERS);
      const cStore = tx.objectStore(DB_CONFIG.STORES.CHAINS);
      const lStore = tx.objectStore(DB_CONFIG.STORES.LOCATIONS);
      const aStore = tx.objectStore(DB_CONFIG.STORES.AREAS);
      const iStore = tx.objectStore(DB_CONFIG.STORES.INDEX);
      const mStore = tx.objectStore(DB_CONFIG.STORES.METADATA);

      // Clear old data
      await Promise.all([
        pStore.clear(),
        eStore.clear(),
        cStore.clear(),
        lStore.clear(),
        aStore.clear(),
        iStore.clear(),
        mStore.clear(),
      ]);

      const STAGES = 6;
      emit(1, STAGES, 'Pokemon');
      for (const p of data.pokemon) pStore.put(p);

      emit(2, STAGES, 'Encounters');
      for (const e of data.encounters) eStore.put(e);

      emit(3, STAGES, 'Chains');
      for (const c of data.chains) cStore.put(c);

      emit(4, STAGES, 'Locations');
      for (const l of data.locations) lStore.put(l);

      emit(5, STAGES, 'Areas');
      for (const a of data.areas) aStore.put(a);

      emit(6, STAGES, 'Index');
      for (const i of data.locationIndex) iStore.put(i);

      await mStore.put({ key: 'hash', value: data.hash });
      await tx.done;
    } catch (err) {
      console.error('PokeDB: Sync failed', err);
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
  getChain: async (pid: number): Promise<PokemonEvolutionChain | undefined> => {
    await pokeDB.ready();
    if (pid === undefined || pid === null || Number.isNaN(pid)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.CHAINS, pid);
  },

  // New location methods
  getLocations: async () => {
    await pokeDB.ready();
    return (await getDB()).getAll(DB_CONFIG.STORES.LOCATIONS);
  },
  getLocation: async (id: number) => {
    await pokeDB.ready();
    if (id === undefined || id === null || Number.isNaN(id)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.LOCATIONS, id);
  },
  getAreas: async (mid: number) => {
    await pokeDB.ready();
    if (mid === undefined || mid === null || Number.isNaN(mid)) return [];
    // Currently areas are 1:1 with map IDs (id), so we can just return the area with that id
    const db = await getDB();
    const area = await db.get(DB_CONFIG.STORES.AREAS, mid);
    return area ? [area] : [];
  },
  getInverseIndex: async (mid: number) => {
    await pokeDB.ready();
    if (mid === undefined || mid === null || Number.isNaN(mid)) return undefined;
    const res = await (await getDB()).get(DB_CONFIG.STORES.INDEX, mid);
    return res?.pids;
  },
  getAllAreas: async () => {
    await pokeDB.ready();
    return (await getDB()).getAll(DB_CONFIG.STORES.AREAS);
  },
  getAreaNames: async (ids: number[]): Promise<Record<number, string>> => {
    await pokeDB.ready();
    const db = await getDB();
    const names: Record<number, string> = {};
    const areas = await Promise.all(ids.map((id) => db.get(DB_CONFIG.STORES.AREAS, id)));
    for (const area of areas) {
      if (area) {
        names[area.id] = area.n;
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

    const fetched = await Promise.all(validIds.map((id) => db.get(DB_CONFIG.STORES.POKEMON, id)));
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

  // Internal/Test helper to reset the sync state
  _resetSync: () => {
    syncPromise = null;
  },
};
