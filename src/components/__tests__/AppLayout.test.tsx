/** @vitest-environment jsdom */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { act, render, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppLayout } from '../AppLayout';

describe('AppLayout chunk error handling', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const rootRoute = createRootRoute({
    component: () => <AppLayout><div>Test Child</div></AppLayout>,
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory(),
  });

  let originalLocation: Location;

  beforeEach(() => {
    originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, reload: vi.fn() },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
    vi.restoreAllMocks();
  });

  it('should reload the page when a chunk load error occurs', async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );
    });

    await act(async () => {
      const errorEvent = new window.ErrorEvent('error', {
        message: 'Failed to fetch dynamically imported module',
      });
      window.dispatchEvent(errorEvent);
    });

    await waitFor(() => {
      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
  });

  it('should not reload the page for other errors', async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );
    });

    await act(async () => {
      const errorEvent = new window.ErrorEvent('error', {
        message: 'Some other random error',
      });
      window.dispatchEvent(errorEvent);
    });

    // Wait slightly to ensure it's not called
    await new Promise(r => setTimeout(r, 50));
    expect(window.location.reload).not.toHaveBeenCalled();
  });
});
