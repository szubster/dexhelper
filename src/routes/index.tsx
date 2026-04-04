import { createQuery } from '@tanstack/solid-query';
import { PokedexGrid } from '../components/PokedexGrid';
import { SearchAndFilters } from '../components/SearchAndFilters';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';
import { Show } from 'solid-js';

export function IndexRoute() {
  const query = createQuery(() => pokemonListQueryOptions);

  return (
    <>
      <SearchAndFilters />
      <Show when={query.data} fallback={<div class="p-8 text-center text-zinc-500">Loading Pokedex Data...</div>}>
        {(data) => <PokedexGrid pokemonList={data()} />}
      </Show>
    </>
  );
}
