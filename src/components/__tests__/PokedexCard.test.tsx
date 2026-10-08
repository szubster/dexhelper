import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { EmulatorProvider, useParsedSaveData } from '../../contexts/EmulatorContext';

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
    component: () => <EmulatorProvider>{component}</EmulatorProvider>,
  });
  const routeTree = rootRoute.addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <EmulatorProvider>{component}</EmulatorProvider>,
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
    vi.mocked(useParsedSaveData).mockReturnValue(null);
    const router = createMockRouter(
      <PokedexCard
        pokemon={mockPokemon}
        idx={0}
        isLivingDex={false}
        partySet={new Set()}
        pcSet={new Set()}
        shinySpeciesIds={new Set()}
        versionExclusiveIds={new Set()}
      />,
    );

    await render(<RouterProvider router={router} />);

    // Test for ID styling
    await expect.element(page.getByText('ID.001', { exact: true })).toBeInTheDocument();
  });

  test('renders [ SECURED ] when in storage', async () => {
    vi.mocked(useParsedSaveData).mockReturnValue({ owned: new Set([1]), seen: new Set([1]) } as unknown as ReturnType<
      typeof useParsedSaveData
    >);
    const router = createMockRouter(
      <PokedexCard
        pokemon={mockPokemon}
        idx={0}
        isLivingDex={false}
        partySet={new Set([1])}
        pcSet={new Set()}
        shinySpeciesIds={new Set()}
        versionExclusiveIds={new Set()}
      />,
    );

    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('[ SECURED ]', { exact: true })).toBeInTheDocument();
  });

  test('renders [ DEX_ONLY ] when owned but not in storage', async () => {
    vi.mocked(useParsedSaveData).mockReturnValue({ owned: new Set([1]), seen: new Set([1]) } as unknown as ReturnType<
      typeof useParsedSaveData
    >);
    const router = createMockRouter(
      <PokedexCard
        pokemon={mockPokemon}
        idx={0}
        isLivingDex={false}
        partySet={new Set()}
        pcSet={new Set()}
        shinySpeciesIds={new Set()}
        versionExclusiveIds={new Set()}
      />,
    );

    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('[ DEX_ONLY ]', { exact: true })).toBeInTheDocument();
  });

  test('renders [ SEEN ] when seen but not owned', async () => {
    vi.mocked(useParsedSaveData).mockReturnValue({ owned: new Set(), seen: new Set([1]) } as unknown as ReturnType<
      typeof useParsedSaveData
    >);
    const router = createMockRouter(
      <PokedexCard
        pokemon={mockPokemon}
        idx={0}
        isLivingDex={false}
        partySet={new Set()}
        pcSet={new Set()}
        shinySpeciesIds={new Set()}
        versionExclusiveIds={new Set()}
      />,
    );

    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('[ SEEN ]', { exact: true })).toBeInTheDocument();
  });
});

vi.mock('../../contexts/EmulatorContext', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../contexts/EmulatorContext')>();
  return {
    ...mod,
    useParsedSaveData: vi.fn<typeof useParsedSaveData>(),
  };
});
