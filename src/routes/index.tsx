import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { pokeapi } from '../utils/pokeapi';
import { AppLayout } from '../components/AppLayout';
import { PokedexGrid } from '../components/PokedexGrid';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: pokemonList = [] } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: async () => {
      const data = await pokeapi.getPokemonsList({ limit: 251, offset: 0 });
      return data.results.map((p: any, index: number) => ({
        id: index + 1,
        name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      }));
    }
  });

  return (
    <AppLayout>
      <PokedexGrid pokemonList={pokemonList} />
    </AppLayout>
  );
}
