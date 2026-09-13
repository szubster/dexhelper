import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import type React from 'react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { LivingDexGrid } from '../LivingDexGrid';

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

describe('LivingDexGrid', () => {
  beforeEach(() => {
    useStore.setState({
      saveData: null,
    });
  });

  afterEach(async () => {
    await cleanup();
  });

  test('renders default grid of 386 cells when no save data is present', async () => {
    const router = createMockRouter(<LivingDexGrid />);
    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('SYS.LIVING_DEX', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('000 / 386', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('001', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('386', { exact: true })).toBeInTheDocument();
  });

  test('calculates secured pokemon from party and PC', async () => {
    useStore.setState({
      saveData: {
        generation: 3,
        party: [1],
        pc: [4, 7],
        owned: new Set([1, 4, 7]),
        seen: new Set([1, 4, 7]),
        partyDetails: [{ speciesId: 1, isShiny: true }],
        pcDetails: [
          { speciesId: 4, isShiny: false },
          { speciesId: 7, isShiny: false },
        ],
      } as unknown as ReturnType<typeof useStore.getState>['saveData'],
    });

    const router = createMockRouter(<LivingDexGrid />);
    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('003 / 386', { exact: true })).toBeInTheDocument();
  });

  test('clicking a cell navigates to pokemon details', async () => {
    const rootRoute = createRootRoute();
    const indexRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <LivingDexGrid />,
    });
    const pokemonRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/pokemon/$pokemonId',
      component: () => <div>Pokemon Page</div>,
    });

    const routeTree = rootRoute.addChildren([indexRoute, pokemonRoute]);
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const router = createRouter({ routeTree, history });

    await render(<RouterProvider router={router} />);

    const cell = page.getByTestId('pokedex-card').first();
    await userEvent.click(cell);

    expect(router.state.location.pathname).toBe('/pokemon/1');
    expect(router.state.location.searchStr).toBe('?from=%2F');
  });
});
