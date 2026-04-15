import DataLoader from 'dataloader';
import { pokeDB } from './PokeDB';
import type { CompactChainLink, LocationAreaEncounters, PokemonMetadata } from './schema';

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
    nameMap: Record<number, string>;
    areaNames: Record<number, string>;
  }> => {
    const pokemon = await dexDataLoader.pokemon.load(id);
    if (!pokemon || pokemon instanceof Error) throw new Error(`Pokemon #${id} not found`);

    const encounters = await dexDataLoader.encounters.load(id);

    // Build a map of names for all species in the evolution chain
    const nameMap: Record<number, string> = {};
    // Current species
    nameMap[pokemon.id] = pokemon.n;
    // Ancestors
    for (const ancestorId of pokemon.evolves_from) {
      nameMap[ancestorId] = '';
    }
    // Descendants
    const traverse = (node: CompactChainLink) => {
      nameMap[node.id] = '';
      node.evolves_to.forEach(traverse);
    };
    pokemon.evolves_to.forEach(traverse);

    const ids = Object.keys(nameMap)
      .filter((idStr) => nameMap[Number(idStr)] === '')
      .map(Number);
    const chainSpecies = await Promise.all(ids.map((id) => dexDataLoader.pokemon.load(id)));
    for (const p of chainSpecies) {
      if (p && !(p instanceof Error)) nameMap[p.id] = p.n;
    }

    // Resolve area names for all encounters
    const areaIds = [
      ...new Set((encounters && !(encounters instanceof Error) ? encounters.encounters : []).map((e) => e.aid)),
    ];
    const areaNames = await pokeDB.getAreaNames(areaIds);

    return {
      pokemon,
      encounters: encounters && !(encounters instanceof Error) ? encounters.encounters : [],
      nameMap,
      areaNames,
    };
  },
};
