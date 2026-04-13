import { type IDBPDatabase, openDB } from 'idb';
import {
  type CompactEvolutionChain,
  DB_CONFIG,
  type LocationAreaEncounters,
  type PokeDataExport,
  type PokemonCompact,
  type SpeciesCompact,
} from './schema';

let dbPromise: Promise<IDBPDatabase> | null = null;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB(DB_CONFIG.NAME, DB_CONFIG.VERSION, {
      upgrade(db) {
        Object.values(DB_CONFIG.STORES).forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
          }
        });
      },
    });
  }
  return dbPromise;
};

export const syncData = async () => {
  const db = await getDB();

  // 1. Fetch current data
  const response = await fetch('/data/pokedata.json');
  const data: PokeDataExport = await response.json();

  // 2. Check if already synced
  const existingHash = await db.get(DB_CONFIG.STORES.METADATA, 'hash');
  if (existingHash === data.hash) {
    console.log('PokeDB: Already up to date (hash match)');
    return;
  }

  console.log('PokeDB: Syncing new data...');

  const emit = (current: number, total: number, stage: string) => {
    window.dispatchEvent(
      new CustomEvent('pokedata-sync-progress', {
        detail: { current, total, stage },
      }),
    );
  };

  const tx = db.transaction(
    [
      DB_CONFIG.STORES.POKEMON,
      DB_CONFIG.STORES.SPECIES,
      DB_CONFIG.STORES.ENCOUNTERS,
      DB_CONFIG.STORES.CHAINS,
      DB_CONFIG.STORES.METADATA,
    ],
    'readwrite',
  );

  // 3. Populate stores
  const pStore = tx.objectStore(DB_CONFIG.STORES.POKEMON);
  const sStore = tx.objectStore(DB_CONFIG.STORES.SPECIES);
  const eStore = tx.objectStore(DB_CONFIG.STORES.ENCOUNTERS);
  const cStore = tx.objectStore(DB_CONFIG.STORES.CHAINS);
  const mStore = tx.objectStore(DB_CONFIG.STORES.METADATA);

  // Clear old data
  await Promise.all([pStore.clear(), sStore.clear(), eStore.clear(), cStore.clear(), mStore.clear()]);

  emit(1, 4, 'Pokemon');
  for (const p of data.pokemon) pStore.put(p, p.id);

  emit(2, 4, 'Species');
  for (const s of data.species) sStore.put(s, s.id);

  emit(3, 4, 'Encounters');
  for (const e of data.encounters) eStore.put(e, e.pid);

  emit(4, 4, 'Chains');
  for (const c of data.chains) cStore.put(c, c.id);

  await mStore.put(data.hash, 'hash');
  await tx.done;

  console.log('PokeDB: Sync complete.');
};

export const pokeDB = {
  sync: syncData,
  getPokemon: async (id: number): Promise<PokemonCompact | undefined> =>
    (await getDB()).get(DB_CONFIG.STORES.POKEMON, id),
  getSpecies: async (id: number): Promise<SpeciesCompact | undefined> =>
    (await getDB()).get(DB_CONFIG.STORES.SPECIES, id),
  getEncounters: async (pid: number): Promise<LocationAreaEncounters | undefined> =>
    (await getDB()).get(DB_CONFIG.STORES.ENCOUNTERS, pid),
  getAllEncounters: async (): Promise<LocationAreaEncounters[]> => (await getDB()).getAll(DB_CONFIG.STORES.ENCOUNTERS),
  getChain: async (id: number): Promise<CompactEvolutionChain | undefined> =>
    (await getDB()).get(DB_CONFIG.STORES.CHAINS, id),

  // Bulk versions for DataLoader
  getPokemons: async (ids: number[]): Promise<(PokemonCompact | Error)[]> => {
    const db = await getDB();
    const results = await Promise.all(ids.map((id) => db.get(DB_CONFIG.STORES.POKEMON, id)));
    return results.map((r) => r ?? new Error('Pokemon not found'));
  },
  getManySpecies: async (ids: number[]): Promise<(SpeciesCompact | Error)[]> => {
    const db = await getDB();
    const results = await Promise.all(ids.map((id) => db.get(DB_CONFIG.STORES.SPECIES, id)));
    return results.map((r) => r ?? new Error('Species not found'));
  },
};
