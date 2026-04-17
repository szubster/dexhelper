/** @vitest-environment jsdom */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppLayout } from '../AppLayout';

// biome-ignore lint/suspicious/noExplicitAny: Required for React 19 testing in JSDOM
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

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

  let originalLocation: Location;
  let container: HTMLDivElement | null = null;
  let root: Root | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);

    originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, reload: vi.fn() },
    });
  });

  afterEach(() => {
    if (root) {
      act(() => {
        root?.unmount();
      });
    }
    if (container) {
      document.body.removeChild(container);
      container = null;
    }

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
    vi.restoreAllMocks();
  });

  it('should reload the page when a chunk load error occurs', async () => {
    await act(async () => {
      root?.render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>,
      );
    });

    const errorEvent = new window.ErrorEvent('error', {
      message: 'Failed to fetch dynamically imported module',
    });

    await act(async () => {
      window.dispatchEvent(errorEvent);
    });

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it('should not reload the page for other errors', async () => {
    await act(async () => {
      root?.render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>,
      );
    });

    const errorEvent = new window.ErrorEvent('error', {
      message: 'Some other random error',
    });

    await act(async () => {
      window.dispatchEvent(errorEvent);
    });

    await new Promise((r) => setTimeout(r, 50));
    expect(window.location.reload).not.toHaveBeenCalled();
  });
});
