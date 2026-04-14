import { type IDBPDatabase, openDB } from 'idb';
import {
  type CompactEvolutionChain,
  DB_CONFIG,
  type LocationAreaEncounters,
  type PokeDataExport,
  type PokeDBSchema,
  type PokemonMetadata,
} from './schema';

let dbPromise: Promise<IDBPDatabase<PokeDBSchema>> | null = null;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<PokeDBSchema>(DB_CONFIG.NAME, DB_CONFIG.VERSION, {
      upgrade(db) {
        // Automatically handle additions/removals based on DB_CONFIG.STORES
        const currentStores = Array.from(db.objectStoreNames);
        const targetStores = Object.values(DB_CONFIG.STORES) as string[];

        for (const store of targetStores) {
          if (!(currentStores as string[]).includes(store)) {
            // biome-ignore lint/suspicious/noExplicitAny: Complex IDB schema upgrade logic
            (db as any).createObjectStore(store);
          }
        }

        for (const store of currentStores) {
          if (!targetStores.includes(store)) {
            // biome-ignore lint/suspicious/noExplicitAny: Complex IDB schema upgrade logic
            (db as any).deleteObjectStore(store);
          }
        }
      },
    });
  }
  return dbPromise;
};

export const syncData = async () => {
  const db = await getDB();

  // 1. Check if already synced using build-time hash
  const existingHash = await db.get(DB_CONFIG.STORES.METADATA, 'hash');

  // Skip fetch if the build-in hash matches what we have in indexedDB
  if (existingHash === __POKEDATA_HASH__ && __POKEDATA_HASH__ !== 'initial') {
    console.log('PokeDB: Already up to date (build hash match)');
    return;
  }

  // 2. Fetch current data
  const response = await fetch(`${import.meta.env.BASE_URL}data/pokedata.json`);
  const data: PokeDataExport = await response.json();

  // Guard against outdated build hash vs actual data hash (rare edge case)
  if (existingHash === data.hash) {
    console.log('PokeDB: Already up to date (data hash match)');
    // Sync the build hash back to metadata just in case
    await db.put(DB_CONFIG.STORES.METADATA, data.hash, 'hash');
    return;
  }

  console.log('PokeDB: Syncing new data...');

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
  for (const p of data.pokemon) pStore.put(p, p.id);

  emit(2, STAGES, 'Encounters');
  for (const e of data.encounters) eStore.put(e, e.pid);

  emit(3, STAGES, 'Chains');
  for (const c of data.chains) cStore.put(c, c.id);

  emit(4, STAGES, 'Locations');
  for (const l of data.locations) lStore.put(l, l.id);

  emit(5, STAGES, 'Areas');
  for (const a of data.areas) aStore.put(a, a.id);

  emit(6, STAGES, 'Index');
  for (const [lid, pids] of Object.entries(data.locationIndex)) {
    iStore.put(pids, Number(lid));
  }

  await mStore.put(data.hash, 'hash');
  await tx.done;

  console.log('PokeDB: Sync complete.');
};

export const pokeDB = {
  sync: syncData,
  getPokemon: async (id: number): Promise<PokemonMetadata | undefined> => {
    if (id === undefined || id === null || Number.isNaN(id)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.POKEMON, id);
  },
  getEncounters: async (pid: number): Promise<LocationAreaEncounters | undefined> => {
    if (pid === undefined || pid === null || Number.isNaN(pid)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.ENCOUNTERS, pid);
  },
  getAllEncounters: async (): Promise<LocationAreaEncounters[]> => (await getDB()).getAll(DB_CONFIG.STORES.ENCOUNTERS),
  getChain: async (id: number): Promise<CompactEvolutionChain | undefined> => {
    if (id === undefined || id === null || Number.isNaN(id)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.CHAINS, id);
  },

  // New location methods
  getLocations: async () => (await getDB()).getAll(DB_CONFIG.STORES.LOCATIONS),
  getLocation: async (id: number) => {
    if (id === undefined || id === null || Number.isNaN(id)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.LOCATIONS, id);
  },
  getAreas: async (lid: number) => {
    if (lid === undefined || lid === null || Number.isNaN(lid)) return [];
    const areas = await (await getDB()).getAll(DB_CONFIG.STORES.AREAS);
    return areas.filter((a) => a.lid === lid);
  },
  getInverseIndex: async (lid: number) => {
    if (lid === undefined || lid === null || Number.isNaN(lid)) return undefined;
    return (await getDB()).get(DB_CONFIG.STORES.INDEX, lid);
  },
  getAllAreas: async () => (await getDB()).getAll(DB_CONFIG.STORES.AREAS),

  // Bulk versions for DataLoader
  getPokemons: async (ids: number[]): Promise<(PokemonMetadata | Error)[]> => {
    const db = await getDB();
    const validIds = ids.filter((id) => typeof id === 'number' && !Number.isNaN(id));
    if (validIds.length === 0) return ids.map(() => new Error('Invalid ID provided'));

    const results = await Promise.all(validIds.map((id) => db.get(DB_CONFIG.STORES.POKEMON, id)));
    // Map back to original order, filling in gaps
    return ids.map((id) => {
      if (typeof id !== 'number' || Number.isNaN(id)) return new Error('Invalid ID');
      const found = results.find((r) => r?.id === id);
      return found ?? new Error('Pokemon not found');
    });
  },
  getAllPokemon: async (): Promise<PokemonMetadata[]> => (await getDB()).getAll(DB_CONFIG.STORES.POKEMON),
};
