import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { LivingDexGrid } from '../components/LivingDexGrid';
import { PokedexGrid } from '../components/PokedexGrid';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { TacticalKitchenSink } from '../components/TacticalKitchenSink';
import { useStore } from '../store';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);
  const isLivingDex = useStore((s) => s.isLivingDex);
  const isKitchenSink = new URLSearchParams(window.location.search).has('kitchen_sink');
  if (isKitchenSink) return <TacticalKitchenSink />;

  return (
    <>
      <SearchAndFilters />
      {isLivingDex ? <LivingDexGrid /> : <PokedexGrid pokemonList={pokemonList} />}
    </>
  );
}
