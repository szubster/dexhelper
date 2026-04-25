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
      // ⚡ Bolt: Use bulk fetch to prevent N+1 IDB queries
      return pokeDB.getEncountersBulk([...ids]);
    },
    { cache: true },
  ),

  getPokemonDetails: async (
    id: number,
  ): Promise<{
    pokemon: PokemonMetadata;
    enc: LocationAreaEncounters['enc'];
    nameMap: Record<number, string>;
    areaNames: Record<number, string>;
  }> => {
    const pokemon = await dexDataLoader.pokemon.load(id);
    if (!pokemon || pokemon instanceof Error) throw new Error(`Pokemon #${id} not found`);

    const encounters = await dexDataLoader.encounters.load(id);

    // Build a map of names for all species in the evolution chain
    const nameMap: Record<number, string> = {};
    const idsToLoad: number[] = [];
    // Current species
    nameMap[pokemon.id] = pokemon.n;
    // Ancestors
    for (const ancestorId of pokemon.efrm) {
      if (nameMap[ancestorId] === undefined) {
        nameMap[ancestorId] = '';
        idsToLoad.push(ancestorId);
      }
    }
    // Descendants
    const traverse = (node: CompactChainLink) => {
      if (nameMap[node.id] === undefined) {
        nameMap[node.id] = '';
        idsToLoad.push(node.id);
      }
      node.eto.forEach(traverse);
    };
    pokemon.eto.forEach(traverse);

    const chainSpecies = await dexDataLoader.pokemon.loadMany(idsToLoad);
    for (const p of chainSpecies) {
      if (p && !(p instanceof Error)) nameMap[p.id] = p.n;
    }

    // Resolve area names for all encounters
    const areaIds = [
      ...new Set((encounters && !(encounters instanceof Error) ? encounters.enc : []).map((e) => e.aid)),
    ];
    const areaNames = await pokeDB.getAreaNames(areaIds);

    return {
      pokemon,
      enc: encounters && !(encounters instanceof Error) ? encounters.enc : [],
      nameMap,
      areaNames,
    };
  },
};
