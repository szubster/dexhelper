import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import type React from 'react';
import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { useGen3DashboardData } from '../../../../contexts/Gen3DashboardDataContext';
import { MissedMilestonesWidget, PokedexGapVisualizerWidget, TrainerCardStatusWidget } from '../index';

vi.mock('../../../../contexts/Gen3DashboardDataContext', () => ({
  useGen3DashboardData: vi.fn<() => void>(),
}));

// Mock useStore hook and its values
vi.mock('../../../../store', () => ({
  useStore: vi.fn<() => Record<string, unknown>>(() => ({
    saveData: {
      gameTitle: 'POKEMON EMER',
    },
  })),
}));

// Mock useQuery hook
vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useQuery: vi.fn<() => Record<string, unknown>>(() => ({
      data: [
        { id: 1, name: 'Bulbasaur', nameLower: 'bulbasaur', idString: '1' },
        { id: 2, name: 'Ivysaur', nameLower: 'ivysaur', idString: '2' },
        { id: 4, name: 'Charmander', nameLower: 'charmander', idString: '4' },
        { id: 5, name: 'Charmeleon', nameLower: 'charmeleon', idString: '5' },
      ],
      isLoading: false,
    })),
  };
});

vi.mock('../../../../contexts/EmulatorContext', () => ({
  useParsedSaveData: vi.fn<() => Record<string, unknown>>(() => ({
    owned: new Set([1, 2, 4, 5]),
    seen: new Set([1, 2, 4, 5]),
    party: [],
    pc: [],
  })),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const rootRoute = createRootRoute({ component: () => <>{children}</> });
  const route = createRoute({ getParentRoute: () => rootRoute, path: '/' });
  const router = createRouter({ routeTree: rootRoute.addChildren([route]), history: createMemoryHistory() });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

test('TrainerCardStatusWidget renders correctly', async () => {
  vi.mocked(useGen3DashboardData).mockReturnValue({
    missingNational: new Set(),
    missingHoenn: new Set(),
    missedMasterBall: false,
    missedLegendaries: [],
    trainerCard: {
      hasHallOfFame: true,
      hasHoennDex: false,
      hasNationalDex: true,
      hasContestMaster: false,
      hasBattleFrontier: true,
    },
  });

  const screen = await render(<TrainerCardStatusWidget />);
  await expect.element(screen.getByText('TRAINER CARD UPGRADES')).toBeInTheDocument();
  await expect.element(screen.getByText('Hall of Fame Debut')).toBeInTheDocument();
});

test('MissedMilestonesWidget renders correctly', async () => {
  vi.mocked(useGen3DashboardData).mockReturnValue({
    missingNational: new Set(),
    missingHoenn: new Set(),
    missedMasterBall: true,
    missedLegendaries: ['Rayquaza'],
    trainerCard: null,
  });

  const screen = await render(<MissedMilestonesWidget />);
  await expect.element(screen.getByText('MISSED MILESTONES')).toBeInTheDocument();
  await expect.element(screen.getByText('Master Ball')).toBeInTheDocument();
  await expect.element(screen.getByText('Rayquaza')).toBeInTheDocument();
});

test('PokedexGapVisualizerWidget renders correctly', async () => {
  vi.mocked(useGen3DashboardData).mockReturnValue({
    missingNational: new Set([1, 2]),
    missingHoenn: new Set([4, 5]),
    missedMasterBall: false,
    missedLegendaries: [],
    trainerCard: null,
  });

  const screen = await render(<PokedexGapVisualizerWidget />, { wrapper });
  await expect.element(screen.getByText('POKÉDEX GAP ANALYSIS')).toBeInTheDocument();
  await expect.element(screen.getByText(/HOENN DEX GAPS/)).toBeInTheDocument();
  await expect.element(screen.getByText(/NATIONAL DEX GAPS/)).toBeInTheDocument();
});
