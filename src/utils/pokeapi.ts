import { dexDataLoader } from '../db/DexDataLoader';
import { pokeDB } from '../db/PokeDB';

/**
 * Compatibility layer that redirects PokeAPI calls to local IndexedDB.
 * Returns structures that mimic simplified PokeAPI responses to avoid breaking UI.
 */
export const pokeapi = {
  getPokemonsList: async ({ limit, offset }: { limit: number; offset: number }) => {
    // For the list, we can just return all from local DB
    // but the list query in pokemonQueries.ts only needs id and name
    const db = await (await import('../db/PokeDB')).getDB();
    const all = await db.getAll('pokemon');
    const results = all.slice(offset, offset + limit).map((p) => ({
      name: p.n,
      url: `https://pokeapi.co/api/v2/pokemon/${p.id}/`,
    }));
    return { results };
  },

  getPokemonByName: async (idOrName: string | number) => {
    const id = typeof idOrName === 'number' ? idOrName : parseInt(idOrName, 10);
    const p = await dexDataLoader.pokemon.load(id);
    if (!p) throw new Error(`Pokemon ${id} not found locally`);

    // Mimic PokeAPI Pokemon structure
    return {
      id: p.id,
      name: p.n,
      types: p.t.map((typeName) => ({ type: { name: typeName } })),
      stats: [
        { base_stat: p.s[0], stat: { name: 'hp' } },
        { base_stat: p.s[1], stat: { name: 'attack' } },
        { base_stat: p.s[2], stat: { name: 'defense' } },
        { base_stat: p.s[3], stat: { name: 'special-attack' } },
        { base_stat: p.s[4], stat: { name: 'special-defense' } },
        { base_stat: p.s[5], stat: { name: 'speed' } },
      ],
      species: { url: `https://pokeapi.co/api/v2/pokemon-species/${p.sid}/` },
    };
  },

  getPokemonSpeciesByName: async (idOrName: string | number) => {
    const id = typeof idOrName === 'number' ? idOrName : parseInt(idOrName, 10);
    const s = await dexDataLoader.species.load(id);
    if (!s) throw new Error(`Species ${id} not found locally`);

    return {
      id: s.id,
      name: s.n,
      capture_rate: s.cr,
      gender_rate: s.gr,
      is_baby: s.baby,
      evolution_chain: { url: `https://pokeapi.co/api/v2/evolution-chain/${s.cid}/` },
      evolves_from_species: s.pre
        ? {
            name: 'unknown', // We don't store pre-evo name directly to save space, components usually parse ID from URL anyway
            url: `https://pokeapi.co/api/v2/pokemon-species/${s.pre}/`,
          }
        : null,
    };
  },

  getPokemonEncounterAreasByName: async (idOrName: string | number) => {
    // Slug for encounters is usually the name, but our DB uses ID in scripts?
    // Wait, generate-pokedata.ts used pData.name as slug.
    // Let's check.
    const id = typeof idOrName === 'number' ? idOrName : parseInt(idOrName, 10);
    // Need to find the name first if we only have ID
    const p = await dexDataLoader.pokemon.load(id);
    if (!p) return [];

    const e = await pokeDB.getEncounters(p.id);
    return e?.encounters || [];
  },

  resource: async (url: string) => {
    // Used for evolution chains
    if (url.includes('evolution-chain')) {
      const id = parseInt(url.split('/').filter(Boolean).pop() || '0', 10);
      return dexDataLoader.chains.load(id);
    }
    throw new Error(`Local resource for ${url} not implemented`);
  },

  // Fluff/unused in core dex functionality but kept for type safety if needed
  getItem: async (_idOrName?: string | number) => ({}),
  getLocationArea: async (_idOrName?: string | number) => ({}),
};
