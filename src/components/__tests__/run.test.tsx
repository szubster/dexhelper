import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { pokeDB } from '../../db/PokeDB';
import type { SaveData } from '../../engine/saveParser/parsers/common';
import { Route as RunRoute } from '../../routes/run';
import { useStore } from '../../store';

// Mock dependencies
vi.mock('../../store', () => ({
  // biome-ignore lint/suspicious/noExplicitAny: mock
  useStore: vi.fn<() => any>(),
}));

vi.mock('../../db/PokeDB', () => ({
  pokeDB: {
    // biome-ignore lint/suspicious/noExplicitAny: mock
    getAllAreas: vi.fn<() => any>(),
  },
}));

const mockSaveData: SaveData = {
  generation: 2,
  owned: new Set(),
  seen: new Set(),
  party: [],
  pc: [],
  partyDetails: [],
  pcDetails: [],
  gameVersion: 'crystal',
  badges: 0,
  trainerName: 'Ash',
  trainerId: 12345,
  currentMapId: 1,
  inventory: [],
  currentBoxCount: 0,
  hallOfFameCount: 0,
};

test('RunDashboard renders NO SAVE DATA when saveData is null', async () => {
  // biome-ignore lint/suspicious/noExplicitAny: mock
  vi.mocked(useStore).mockImplementation((selector: any) => selector({ saveData: null }));

  const rootRoute = createRootRoute();
  const runRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/run',
    // biome-ignore lint/suspicious/noExplicitAny: mock
    // biome-ignore lint/style/noNonNullAssertion: mock
    component: RunRoute.options.component! as any,
  });

  const routeTree = rootRoute.addChildren([runRoute]);
  const history = createMemoryHistory({ initialEntries: ['/run'] });
  const router = createRouter({ routeTree, history });

  void render(<RouterProvider router={router} />);
  await expect.element(page.getByText('NO SAVE DATA')).toBeInTheDocument();
});

test('RunDashboard renders dashboard when saveData is present', async () => {
  // biome-ignore lint/suspicious/noExplicitAny: mock
  vi.mocked(useStore).mockImplementation((selector: any) => selector({ saveData: mockSaveData }));
  vi.mocked(pokeDB.getAllAreas).mockResolvedValue([{ id: 1, n: 'New Bark Town', dist: { 1: 0 } }]);

  const rootRoute = createRootRoute();
  const runRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/run',
    // biome-ignore lint/suspicious/noExplicitAny: mock
    // biome-ignore lint/style/noNonNullAssertion: mock
    component: RunRoute.options.component! as any,
  });

  const routeTree = rootRoute.addChildren([runRoute]);
  const history = createMemoryHistory({ initialEntries: ['/run'] });
  const router = createRouter({ routeTree, history });

  void render(<RouterProvider router={router} />);
  await expect.element(page.getByText('Run Dashboard')).toBeInTheDocument();
  await expect.element(page.getByText('SYS.ALIVE_TEAM')).toBeInTheDocument();
  await expect.element(page.getByText('SYS.VISITED_ROUTES')).toBeInTheDocument();
});
