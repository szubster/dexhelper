import DataLoader from 'dataloader';
import { pokeDB } from './PokeDB';
import type { CompactChainLink, LocationAreaEncounters, PokemonMetadata } from './schema';

/**
 * Request Batching layer for IndexedDB.
 *
 * Why this is needed:
 * The application frequently renders large lists of Pokémon (like the Pokédex or PC Boxes)
 * where each list item component independently requests data for its specific `id`.
 * If these components directly called IndexedDB, it would create hundreds of separate
 * database transactions, causing massive N+1 query bottlenecks and locking the main thread.
 * `DataLoader` aggregates these synchronous, independent requests into a single
 * `bulkGet` database transaction on the next tick, ensuring O(1) transaction overhead.
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

  /**
   * Fetches the complete contextual data required to render a Pokémon's detail view.
   *
   * @param id - The Pokédex ID of the target Pokémon.
   * @returns An object containing the base metadata, encounters, a map of evolution chain names, and a map of encounter area names.
   *
   * @remarks
   * Why build a name map?
   * The `pokemon.jsonl` data structure is highly normalized to save disk space. Evolution chains (`eto`, `efrm`)
   * and encounter tables only store numeric IDs, not the actual string names. This function recursively walks
   * the evolution tree and aggregates all referenced area IDs, then fetches their string names in a single batched pass.
   */
  getPokemonDetails: async (
    id: number,
  ): Promise<{
    pokemon: PokemonMetadata;
    enc: LocationAreaEncounters['enc'];
    nameMap: Record<number, string>;
    areaNames: Record<number, string>;
  }> => {
    // ⚡ Bolt: Fetch pokemon and encounters concurrently to prevent sequential DataLoader blocking
    const [pokemon, encounters] = await Promise.all([
      dexDataLoader.pokemon.load(id),
      dexDataLoader.encounters.load(id),
    ]);
    if (!pokemon || pokemon instanceof Error) throw new Error(`Pokemon #${id} not found`);

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
