import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { afterEach, describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import type { PokemonListItem } from '../../utils/pokemonQueries';
import { PokedexCard } from '../PokedexCard';

const mockPokemon: PokemonListItem = {
  id: 1,
  name: 'Bulbasaur',
  idString: '001',
  nameLower: 'bulbasaur',
};

const createMockRouter = (component: React.ReactNode) => {
  const rootRoute = createRootRoute({
    component: () => component,
  });
  const routeTree = rootRoute.addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => component,
    }),
  ]);
  const history = createMemoryHistory();
  return createRouter({ routeTree, history });
};

describe('PokedexCard', () => {
  afterEach(async () => {
    await cleanup();
  });

  test('renders tactical elements in unknown state', async () => {
    const router = createMockRouter(
      <PokedexCard
        pokemon={mockPokemon}
        idx={0}
        saveData={null}
        isLivingDex={false}
        partySet={new Set()}
        pcSet={new Set()}
        shinySpeciesIds={new Set()}
      />,
    );

    await render(<RouterProvider router={router} />);

    // Test for new ID styling
    await expect.element(page.getByText('SBJ_001', { exact: true })).toBeInTheDocument();
  });

  test('renders [ SECURED ] when in storage', async () => {
    const router = createMockRouter(
      <PokedexCard
        pokemon={mockPokemon}
        idx={0}
        saveData={
          {
            owned: new Set([1]),
            seen: new Set([1]),
            // biome-ignore lint/suspicious/noExplicitAny: Required for partial save mock
          } as any
        }
        isLivingDex={false}
        partySet={new Set([1])}
        pcSet={new Set()}
        shinySpeciesIds={new Set()}
      />,
    );

    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('[ SECURED ]', { exact: true }).first()).toBeInTheDocument();
  });

  test('renders [ DEX_ONLY ] when owned but not in storage', async () => {
    const router = createMockRouter(
      <PokedexCard
        pokemon={mockPokemon}
        idx={0}
        saveData={
          {
            owned: new Set([1]),
            seen: new Set([1]),
            // biome-ignore lint/suspicious/noExplicitAny: Required for partial save mock
          } as any
        }
        isLivingDex={false}
        partySet={new Set()}
        pcSet={new Set()}
        shinySpeciesIds={new Set()}
      />,
    );

    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('[ DEX_ONLY ]', { exact: true })).toBeInTheDocument();
  });

  test('renders [ SEEN ] when seen but not owned', async () => {
    const router = createMockRouter(
      <PokedexCard
        pokemon={mockPokemon}
        idx={0}
        saveData={
          {
            owned: new Set(),
            seen: new Set([1]),
            // biome-ignore lint/suspicious/noExplicitAny: Required for partial save mock
          } as any
        }
        isLivingDex={false}
        partySet={new Set()}
        pcSet={new Set()}
        shinySpeciesIds={new Set()}
      />,
    );

    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('[ SEEN ]', { exact: true })).toBeInTheDocument();
  });
});
