// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import type { SaveData } from '../../engine/saveParser/index';
import { useStore } from '../../store';
import { LivingDexCell } from '../LivingDexCell';
import { LivingDexGrid } from '../LivingDexGrid';

vi.mock('../../store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../store')>();
  return {
    ...actual,
    useStore: vi.fn(),
  };
});

const queryClient = new QueryClient();

const createMockRouter = (component: React.ReactNode) => {
  const rootRoute = createRootRoute({
    component: () => <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  });
  const routeTree = rootRoute.addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
    }),
  ]);
  const history = createMemoryHistory();
  return createRouter({ routeTree, history });
};

describe('LivingDexGrid', () => {
  beforeEach(() => {
    vi.mocked(useStore).mockImplementation((selector: unknown) => {
      if (typeof selector === 'function') {
        return selector({
          saveData: {
            generation: 3,
            party: [1],
            pc: [2],
            partyDetails: [{ speciesId: 1, isShiny: true }],
            pcDetails: [],
          } as unknown as SaveData,
        });
      }
      return undefined;
    });
  });

  afterEach(async () => {
    await cleanup();
    queryClient.clear();
    vi.restoreAllMocks();
  });

  test('renders correct number of cells and states', async () => {
    const router = createMockRouter(<LivingDexGrid />);
    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('SYS.LIVING_DEX')).toBeInTheDocument();
    await expect.element(page.getByText('SECURED:')).toBeInTheDocument();
    await expect.element(page.getByText('002 / 386')).toBeInTheDocument();
  });
});

describe('LivingDexCell', () => {
  afterEach(async () => {
    await cleanup();
    queryClient.clear();
  });

  test('renders cell correctly', async () => {
    const router = createMockRouter(<LivingDexCell id={151} inParty={true} inPC={false} isShiny={true} />);
    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('151')).toBeInTheDocument();
    await expect.element(page.getByTestId('pokedex-card')).toBeInTheDocument();
  });
});
