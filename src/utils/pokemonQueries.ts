import { queryOptions } from '@tanstack/react-query';
import { getDB } from '../db/PokeDB';

interface PokemonListItem {
  id: number;
  name: string;
}

export const pokemonListQueryOptions = queryOptions({
  queryKey: ['pokemonList'],
  queryFn: async (): Promise<PokemonListItem[]> => {
    const db = await getDB();
    const data = await db.getAll('pokemon');
    return data
      .map((p) => ({
        id: p.id,
        name: p.n.charAt(0).toUpperCase() + p.n.slice(1),
      }))
      .sort((a, b) => a.id - b.id);
  },
  staleTime: Infinity,
});
