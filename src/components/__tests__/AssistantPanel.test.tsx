import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../engine/saveParser';
import { useAssistant } from '../../hooks/useAssistant';
import { AssistantPanel } from '../AssistantPanel';

vi.mock('../../hooks/useAssistant', () => ({
  useAssistant: vi.fn<typeof useAssistant>(),
}));

// Setup basic router
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function renderWithProviders(ui: React.ReactNode) {
  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => ui,
  });

  queryClient.setQueryData(
    ['pokemonList'],
    [
      { id: 1, name: 'BULBASAUR' },
      { id: 4, name: 'CHARMANDER' },
    ],
  );

  const router = createRouter({
    routeTree: rootRoute.addChildren([testRoute]),
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

const mockSaveData: SaveData = {
  generation: 1,
  gameVersion: 'red',
  trainerId: 12345,
  trainerName: 'ASH',
  badges: 0,
  inventory: [],
  pcItems: [],
  party: [],
  pc: [],
  partyDetails: [],
  pcDetails: [],
  owned: new Set(),
  seen: new Set(),
  currentMapId: 0,
  currentBoxCount: 0,
  hallOfFameCount: 0,
};

describe('AssistantPanel', () => {
  it('renders loading state', async () => {
    vi.mocked(useAssistant).mockReturnValue({
      suggestions: [],
      debug: { rejected: [] },
      isLoading: true,
      areaNames: {},
      heatmap: {},
    });

    await renderWithProviders(<AssistantPanel saveData={mockSaveData} isLivingDex={false} manualVersion={null} />);

    await expect.element(page.getByText('TACTICAL OPERATIONS AI')).toBeVisible();
  });

  it('renders empty state', async () => {
    vi.mocked(useAssistant).mockReturnValue({
      suggestions: [],
      debug: { rejected: [] },
      isLoading: false,
      areaNames: {},
      heatmap: {},
    });

    await renderWithProviders(<AssistantPanel saveData={mockSaveData} isLivingDex={false} manualVersion={null} />);

    await expect.element(page.getByText(/SYS.NOMINAL/)).toBeVisible();
  });

  it('renders suggestions and can toggle debug view', async () => {
    vi.mocked(useAssistant).mockReturnValue({
      suggestions: [
        {
          id: 'test-1',
          priority: 10,
          category: 'Catch',
          title: 'Catch Bulbasaur',
          description: 'Go catch it.',
          pokemonId: 1,
        },
        {
          id: 'test-2',
          priority: 5,
          category: 'Trade',
          title: 'Trade for Machamp',
          description: 'Trade to get Machamp.',
        },
      ],
      debug: {
        rejected: [{ pokemonId: 10, code: 'MISSING_DATA', reason: 'Test reason' }],
      },
      isLoading: false,
      areaNames: {},
      heatmap: {},
    });

    await renderWithProviders(<AssistantPanel saveData={mockSaveData} isLivingDex={false} manualVersion={null} />);

    await expect.element(page.getByText(/WILD ENCOUNTERS/)).toBeVisible();
    await expect.element(page.getByText(/Catch Bulbasaur/)).toBeVisible();

    // Click the TRADES category in the new OPS.MATRIX sidebar to see trade suggestions
    const tradesCategoryBtn = page.getByRole('button', { name: /TRADES/i });
    await userEvent.click(tradesCategoryBtn);

    await expect.element(page.getByText(/TRADE REQUIRED/)).toBeVisible();
    await expect.element(page.getByText(/Trade for Machamp/)).toBeVisible();

    const debugBtn = page.getByRole('button', { name: /Toggle Diagnostic Feed/i });
    await userEvent.click(debugBtn);

    await expect.element(page.getByText(/SYS.DIAGNOSTICS/)).toBeVisible();
    await expect.element(page.getByText(/Test reason/)).toBeVisible();
  });
});
