import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient } from '@tanstack/react-query';
import { AppProvider } from '../state';
import { AppLayout } from '../components/AppLayout';
import { pokeapi } from '../utils/pokeapi';

export interface RootContext {
  queryClient: QueryClient;
  pokemonList?: { id: number; name: string }[];
}

const pokemonQueryOptions = {
  queryKey: ['pokemonList'],
  queryFn: async () => {
    const data = await pokeapi.getPokemonsList({ limit: 251, offset: 0 });
    return data.results.map((p: any) => {
      const urlParts = p.url.split('/').filter(Boolean);
      const id = parseInt(urlParts[urlParts.length - 1]);
      return {
        id,
        name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      };
    }).sort((a: any, b: any) => a.id - b.id);
  }
};

export const Route = createRootRouteWithContext<RootContext>()({
  loader: async ({ context }) => {
    const pokemonList = await context.queryClient.ensureQueryData(pokemonQueryOptions);
    return { pokemonList };
  },
  component: RootComponent,
});

function RootComponent() {
  const { pokemonList } = Route.useLoaderData();

  return (
    <AppProvider>
      <AppLayout>
        <Outlet context={{ pokemonList }} />
      </AppLayout>
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </AppProvider>
  );
}
