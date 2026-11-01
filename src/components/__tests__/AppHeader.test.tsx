import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import type React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../engine/saveParser/parsers/common';
import { AppHeader } from '../AppHeader';

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

  const rootRoute = createRootRoute({
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
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render RMTCH button when Gen 3 save data is present', async () => {
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('SYS.RMTCH')).toBeInTheDocument();
  });
});
