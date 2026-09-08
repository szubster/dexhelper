import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';

// ⚡ Bolt: Lazy load StorageGrid to reduce initial JS payload size
const StorageGrid = React.lazy(() => import('../components/StorageGrid').then((m) => ({ default: m.StorageGrid })));

export const Route = createFileRoute('/storage')({
  component: StoragePage,
});

function StoragePage() {
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);

  return (
    <Suspense fallback={<div className="tactical-skeleton h-32" />}>
      <StorageGrid pokemonList={pokemonList} />
    </Suspense>
  );
}
