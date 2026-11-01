import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRouteWithContext, createRouter, RouterProvider } from '@tanstack/react-router';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../engine/saveParser/parsers/common';
import { AppHeader } from '../AppHeader';

interface RootContext {
  queryClient: QueryClient;
}

describe('AppHeader', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const mockGen3SaveData: SaveData = {
    generation: 3,
    owned: new Set(),
    seen: new Set(),
    party: [],
    pc: [],
    partyDetails: [],
    pcDetails: [],
    gameVersion: 'emerald',
    badges: 0,
    trainerName: 'RUBY',
    trainerId: 12345,
    currentMapId: 0,
    inventory: [],
    currentBoxCount: 0,
    hallOfFameCount: 0,
  };

  const rootRoute = createRootRouteWithContext<RootContext>()({
    component: () => (
      <AppHeader
        saveData={mockGen3SaveData}
        effectiveVersion="emerald"
        setIsSettingsOpen={vi.fn<(open: boolean) => void>()}
        setIsVersionModalOpen={vi.fn<(open: boolean) => void>()}
        handleFileUpload={vi.fn<(e: React.ChangeEvent<HTMLInputElement>) => void>()}
      />
    ),
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
    context: { queryClient },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render AppHeader and execute without crashing', async () => {
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    // Verify the header rendered successfully by checking for the main brand label
    await expect.element(page.getByText('DEXHELPER')).toBeInTheDocument();
  });
});
