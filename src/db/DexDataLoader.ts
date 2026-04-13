import DataLoader from 'dataloader';
import { pokeDB } from './PokeDB';
import type { CompactEvolutionChain, LocationAreaEncounters, PokemonCompact, SpeciesCompact } from './schema';

/**
 * Request Batching layer for IndexedDB.
 */
export const dexDataLoader = {
  pokemon: new DataLoader<number, PokemonCompact>(
    async (ids) => {
      return pokeDB.getPokemons([...ids]);
    },
    { cache: true },
  ),

  species: new DataLoader<number, SpeciesCompact>(
    async (ids) => {
      return pokeDB.getManySpecies([...ids]);
    },
    { cache: true },
  ),

  chains: new DataLoader<number, CompactEvolutionChain>(
    async (ids) => {
      const db = await (await import('./PokeDB')).getDB();
      return Promise.all(ids.map((id) => db.get('chains', id)));
    },
    { cache: true },
  ),

  encounters: new DataLoader<number, LocationAreaEncounters>(
    async (ids) => {
      const db = await (await import('./PokeDB')).getDB();
      return Promise.all(ids.map((id) => db.get('encounters', id)));
    },
    { cache: true },
  ),

  getPokemonDetails: async (id: number) => {
    const [pokemon, species] = await Promise.all([dexDataLoader.pokemon.load(id), dexDataLoader.species.load(id)]);

    const encounters = await dexDataLoader.encounters.load(id);
    const evolutionChain = species.cid ? await dexDataLoader.chains.load(species.cid) : undefined;

    return {
      pokemon,
      species,
      encounters: encounters?.encounters || [],
      evolutionChain,
    };
  },
};
