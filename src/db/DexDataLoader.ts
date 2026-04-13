import DataLoader from 'dataloader';
import { pokeDB } from './PokeDB';
import type { CompactEvolutionChain, LocationAreaEncounters, PokemonMetadata } from './schema';

/**
 * Request Batching layer for IndexedDB.
 */
export const dexDataLoader = {
  pokemon: new DataLoader<number, PokemonMetadata>(
    async (ids) => {
      return pokeDB.getPokemons([...ids]);
    },
    { cache: true },
  ),

  chains: new DataLoader<number, CompactEvolutionChain>(
    async (ids) => {
      return Promise.all(ids.map((id) => pokeDB.getChain(id) as Promise<CompactEvolutionChain>));
    },
    { cache: true },
  ),

  encounters: new DataLoader<number, LocationAreaEncounters>(
    async (ids) => {
      return Promise.all(ids.map((id) => pokeDB.getEncounters(id) as Promise<LocationAreaEncounters>));
    },
    { cache: true },
  ),

  getPokemonDetails: async (id: number) => {
    const pokemon = await dexDataLoader.pokemon.load(id);

    const encounters = await dexDataLoader.encounters.load(id);
    const evolutionChain = pokemon.cid ? await dexDataLoader.chains.load(pokemon.cid) : undefined;

    return {
      pokemon,
      encounters: encounters?.encounters || [],
      evolutionChain,
    };
  },
};
