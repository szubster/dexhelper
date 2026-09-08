import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';

// ⚡ Bolt: Lazy load PokedexGrid to reduce initial JS payload size
const PokedexGrid = React.lazy(() => import('../components/PokedexGrid').then((m) => ({ default: m.PokedexGrid })));

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);

  return (
    <>
      <SearchAndFilters />
      <Suspense fallback={<div className="tactical-skeleton h-32" />}>
        <PokedexGrid pokemonList={pokemonList} />
      </Suspense>
    </>
  );
}
