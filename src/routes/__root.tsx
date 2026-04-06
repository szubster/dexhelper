import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import React, { Suspense, useEffect } from 'react';
import { AppLayout } from '../components/AppLayout';
import { useStore } from '../store';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production' || !!window.navigator.webdriver
    ? () => null // Render nothing in production or automated tests
    : React.lazy(() =>
        import('@tanstack/react-router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export interface RootContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootContext>()({
  loader: async ({ context }) => {
    const pokemonList = await context.queryClient.ensureQueryData(
      pokemonListQueryOptions,
    );
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
