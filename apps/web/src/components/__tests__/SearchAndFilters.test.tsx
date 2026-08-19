import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { SearchAndFilters } from '../SearchAndFilters';

describe('SearchAndFilters', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const rootRoute = createRootRoute({
    component: () => <SearchAndFilters />,
  });

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory(),
  });

  beforeEach(() => {
    vi.clearAllMocks();
    useStore.getState().setSaveData({
      gameVersion: 'emerald',
      generation: 3,
      trainerName: 'TEST',
      trainerId: 12345,
      party: [],
      pc: [],
      partyDetails: [],
      pcDetails: [],
      seen: new Set(),
      owned: new Set(),
      // biome-ignore lint/suspicious/noExplicitAny: Required for partial save mock
    } as any);
    useStore.getState().setSearchTerm('');
    useStore.getState().setFilters([]);
  });

  it('returns null when no saveData is available', async () => {
    useStore.getState().setSaveData(null);
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    // It should not render anything
    await expect.element(page.getByText('[ PARAMETER_MATRIX ]')).not.toBeInTheDocument();
  });

  it('renders correctly', async () => {
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('[ PARAMETER_ROUTING ]')).toBeInTheDocument();
  });

  it('updates search term on input', async () => {
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const input = page.getByPlaceholder('[ ENTER COORDINATES, ID OR ENTITY ]');
    await input.fill('pikachu');
    await expect.element(input).toHaveValue('pikachu');
    expect(useStore.getState().searchTerm).toBe('pikachu');
  });

  it('clears search term on escape key', async () => {
    useStore.getState().setSearchTerm('bulbasaur');

    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const input = page.getByPlaceholder('[ ENTER COORDINATES, ID OR ENTITY ]');
    await input.click();
    await input.fill('test');

    // React specific simulation of keyDown
    await userEvent.keyboard('{Escape}');

    expect(useStore.getState().searchTerm).toBe('');
  });

  it('clears search term when clear button is clicked', async () => {
    useStore.getState().setSearchTerm('bulbasaur');

    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const clearButton = page.getByRole('button', { name: 'Clear input' });
    await clearButton.click();

    expect(useStore.getState().searchTerm).toBe('');
  });

  it('toggles filters', async () => {
    await render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );

    const missingBtn = page.getByTestId('filter-missing');
    await missingBtn.click();

    expect(useStore.getState().filters).toContain('missing');

    const allBtn = page.getByText('[ ALL ]');
    await allBtn.click();

    expect(useStore.getState().filters.length).toBe(0);
  });
});
