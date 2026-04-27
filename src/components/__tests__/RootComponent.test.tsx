import { render } from 'vitest-browser-react';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootComponent } from '../../routes/__root';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { saveDB } from '../../db/SaveDB';
import { useStore } from '../../store';

vi.mock('../../db/SaveDB', () => ({
  saveDB: {
    getSave: vi.fn(),
    deleteSave: vi.fn(),
  },
}));

describe('RootComponent hydration', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const rootRoute = createRootRoute({
    component: RootComponent,
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory(),
  });

  beforeEach(() => {
    vi.clearAllMocks();
    useStore.setState({ saveData: null });
  });

  it('should hydrate from saveDB', async () => {
    const mockBuffer = new Uint8Array([1, 2, 3]);
    vi.mocked(saveDB.getSave).mockResolvedValue(mockBuffer);

    // Mock parseSaveFile, not currently doing full mocked parser to keep it simple, but we test the branch
    // Because parseSaveFile throws for invalid buffer we expect deleteSave
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await vi.waitFor(() => {
      expect(saveDB.getSave).toHaveBeenCalledWith('last_save_file');
    });
  });

  it('should delete save if parse throws', async () => {
    const mockBuffer = new Uint8Array([1, 2, 3]);
    vi.mocked(saveDB.getSave).mockResolvedValue(mockBuffer);

    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await vi.waitFor(() => {
      expect(saveDB.deleteSave).toHaveBeenCalledWith('last_save_file');
    });
  });
});
