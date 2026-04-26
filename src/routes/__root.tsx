import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import { AppLayout } from '../components/AppLayout';
import { SyncProgress } from '../components/SyncProgress';
import { pokeDB } from '../db/PokeDB';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';

const TanStackRouterDevtools =
  import.meta.env.PROD || window.navigator.webdriver
    ? () => null // Render nothing in production or automated tests
    : React.lazy(() =>
        import('@tanstack/react-router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const ReactQueryDevtools =
  import.meta.env.PROD || window.navigator.webdriver
    ? () => null
    : React.lazy(() =>
        import('@tanstack/react-query-devtools').then((res) => ({
          default: res.ReactQueryDevtools,
        })),
      );

interface RootContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootContext>()({
  loader: async ({ context }) => {
    // Ensure database is synchronized before initial data fetch
    await pokeDB.ready();
    const pokemonList = await context.queryClient.ensureQueryData(pokemonListQueryOptions);
    return { pokemonList };
  },
  pendingComponent: SyncProgress,
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppLayout>
      <Outlet />
      <Suspense>
        <SyncProgress />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </Suspense>
    </AppLayout>
  );
}
