import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import React, { Suspense, useEffect } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { AppLayout } from '../components/AppLayout';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';
import { useStore } from '../store';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export interface RootContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootContext>()({
  loader: async ({ context }) => {
    const pokemonList = await context.queryClient.ensureQueryData(pokemonListQueryOptions);
    return { pokemonList };
  },
  component: RootComponent,
});

function RootComponent() {
  const loadSaveFromStorage = useStore((s) => s.loadSaveFromStorage);

  // Load saved data from localStorage on mount
  useEffect(() => {
    loadSaveFromStorage();
  }, [loadSaveFromStorage]);

  return (
    <AppLayout>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </AppLayout>
  );
}
