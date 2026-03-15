import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { StorageGrid } from '../components/StorageGrid';
import { pokeapi } from '../utils/pokeapi';

export const Route = createFileRoute('/storage')({
  component: StoragePage,
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

function StoragePage() {
  const { data: pokemonList } = useSuspenseQuery(pokemonQueryOptions);

  return (
    <StorageGrid pokemonList={pokemonList} />
  );
}
