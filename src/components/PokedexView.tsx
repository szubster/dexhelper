import React from 'react';
import { PokedexGrid } from './PokedexGrid';
import { SearchAndFilters } from './SearchAndFilters';
import { ReactQueryProvider } from './ReactQueryProvider';

export function PokedexView({ pokemonList }: { pokemonList: { id: number; name: string }[] }) {
  return (
    <ReactQueryProvider>
      <SearchAndFilters />
      <PokedexGrid pokemonList={pokemonList} />
    </ReactQueryProvider>
  );
}
