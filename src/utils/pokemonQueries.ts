import { queryOptions } from '@tanstack/react-query';
import { pokeDB } from '../db/PokeDB';

export interface PokemonListItem {
  id: number;
  name: string;
  nameLower: string;
  idString: string;
}

export const pokemonListQueryOptions = queryOptions({
  queryKey: ['pokemonList'],
  queryFn: async (): Promise<PokemonListItem[]> => {
    const data = await pokeDB.getAllPokemon();

    return data
      .map((p) => ({
        id: p.id,
        name: p.n.charAt(0).toUpperCase() + p.n.slice(1),
        nameLower: p.n.toLowerCase(),
        idString: p.id.toString(),
      }))
      .sort((a, b) => a.id - b.id);
  },
  staleTime: Infinity,
});
