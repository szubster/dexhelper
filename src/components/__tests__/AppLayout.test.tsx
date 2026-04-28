import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { reloadPage } from '../../utils/window';
import { AppLayout } from '../AppLayout';

vi.mock('../../utils/window', () => ({
  reloadPage: vi.fn<() => void>(),
}));

describe('AppLayout chunk error handling', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const rootRoute = createRootRoute({
    component: () => (
      <AppLayout>
        <div>Test Child</div>
      </AppLayout>
    ),
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory(),
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should reload the page when a chunk load error occurs', async () => {
    const { getByText } = await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(getByText('Test Child')).toBeInTheDocument();

    const errorEvent = new window.ErrorEvent('error', {
      message: 'Failed to fetch dynamically imported module',
    });
    window.dispatchEvent(errorEvent); // no void needed actually, but let's add it if needed.

    await vi.waitFor(() => {
      expect(reloadPage).toHaveBeenCalledTimes(1);
    });
  });

  it('should not reload the page for other errors', async () => {
    const { getByText } = await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(getByText('Test Child')).toBeInTheDocument();

    const errorEvent = new window.ErrorEvent('error', {
      message: 'Some other random error',
    });
    window.dispatchEvent(errorEvent); // no void needed actually, but let's add it if needed.

    await new Promise((r) => setTimeout(r, 50));
    expect(reloadPage).not.toHaveBeenCalled();
  });
});
