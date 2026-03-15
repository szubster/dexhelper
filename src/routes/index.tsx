import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PokedexGrid } from '../components/PokedexGrid';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { pokeapi } from '../utils/pokeapi';

export const Route = createFileRoute('/')({
  component: Index,
});

const pokemonQueryOptions = {
  queryKey: ['pokemonList'],
  queryFn: async () => {
    const data = await pokeapi.getPokemonsList({ limit: 251, offset: 0 });
    return data.results.map((p: any) => {
      const urlParts = p.url.split('/').filter(Boolean);
      const id = parseInt(urlParts[urlParts.length - 1]);
      return {
        id,
        name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      };
    }).sort((a: any, b: any) => a.id - b.id);
  }
};

function Index() {
  const { data: pokemonList } = useSuspenseQuery(pokemonQueryOptions);
  
  return (
    <>
      <SearchAndFilters />
      <PokedexGrid pokemonList={pokemonList} />
    </>
  );
}
