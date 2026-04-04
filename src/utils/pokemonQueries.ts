import { queryOptions } from '@tanstack/solid-query';
import { pokeapi } from './pokeapi';
import { MAX_DEX_ACROSS_GENS } from './generationConfig';

export interface PokemonListItem {
  id: number;
  name: string;
}

export const pokemonListQueryOptions = queryOptions({
  queryKey: ['pokemonList'],
  queryFn: async (): Promise<PokemonListItem[]> => {
    const data = await pokeapi.getPokemonsList({ limit: MAX_DEX_ACROSS_GENS, offset: 0 });
    return data.results
      .map((p: { name: string; url: string }) => {
        const urlParts = p.url.split('/').filter(Boolean);
        const id = parseInt(urlParts[urlParts.length - 1]!);
        return {
          id,
          name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
        };
      })
      .sort((a: PokemonListItem, b: PokemonListItem) => a.id - b.id);
  },
  staleTime: Infinity,
});
