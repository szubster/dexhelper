import DataLoader from 'dataloader';
import { pokeDB } from './PokeDB';
import type { CompactChainLink, LocationAreaEncounters, PokemonEvolutionChain, PokemonMetadata } from './schema';

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

  chains: new DataLoader<number, PokemonEvolutionChain>(
    async (ids) => {
      return Promise.all(ids.map((id) => pokeDB.getChain(id) as Promise<PokemonEvolutionChain>));
    },
    { cache: true },
  ),

  encounters: new DataLoader<number, LocationAreaEncounters>(
    async (ids) => {
      return Promise.all(ids.map((id) => pokeDB.getEncounters(id) as Promise<LocationAreaEncounters>));
    },
    { cache: true },
  ),

  getPokemonDetails: async (
    id: number,
  ): Promise<{
    pokemon: PokemonMetadata;
    encounters: LocationAreaEncounters['encounters'];
    evolutionChain: PokemonEvolutionChain | undefined;
    nameMap: Record<number, string>;
    areaNames: Record<number, string>;
  }> => {
    const pokemon = await dexDataLoader.pokemon.load(id);
    if (!pokemon) throw new Error(`Pokemon #${id} not found`);

    const encounters = await dexDataLoader.encounters.load(id);
    const evolutionChain = await dexDataLoader.chains.load(id);

    // Build a map of names for all species in the evolution chain
    const nameMap: Record<number, string> = {};
    if (evolutionChain) {
      // Current species
      nameMap[evolutionChain.id] = '';
      // Ancestors
      for (const ancestorId of evolutionChain.evolves_from) {
        nameMap[ancestorId] = '';
      }
      // Descendants
      const traverse = (node: CompactChainLink) => {
        nameMap[node.id] = '';
        node.evolves_to.forEach(traverse);
      };
      evolutionChain.evolves_to.forEach(traverse);
    }

    const ids = Object.keys(nameMap).map(Number);
    const chainSpecies = await Promise.all(ids.map((id) => dexDataLoader.pokemon.load(id)));
    for (const p of chainSpecies) {
      if (p) nameMap[p.id] = p.n;
    }

    // Resolve area names for all encounters
    const areaIds = [...new Set((encounters?.encounters || []).map((e) => e.aid))];
    const areaNames = await pokeDB.getAreaNames(areaIds);

    return {
      pokemon,
      encounters: encounters?.encounters || [],
      evolutionChain,
      nameMap,
      areaNames,
    };
  },
};
