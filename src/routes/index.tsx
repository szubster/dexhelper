import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { BootSequence } from '../components/BootSequence';
import { PokedexGrid } from '../components/PokedexGrid';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { useStore } from '../store';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);
  const saveData = useStore((s) => s.saveData);

  if (!saveData) {
    return <BootSequence />;
  }

  return (
    <>
      <SearchAndFilters />
      <PokedexGrid pokemonList={pokemonList} />
    </>
  );
}
