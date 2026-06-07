import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { pokeDB } from '../../db/PokeDB';
import { useStore } from '../../store';
import { LocationSuggestions } from '../LocationSuggestions';

vi.mock('../../db/PokeDB', () => ({
  pokeDB: {
    getLocations: vi.fn<typeof pokeDB.getLocations>(),
    getInverseIndexBulk: vi.fn<typeof pokeDB.getInverseIndexBulk>(),
  },
}));

const queryClient = new QueryClient();

beforeEach(() => {
  vi.clearAllMocks();
  queryClient.clear();
});

test('returns null when no search term and no location selected', async () => {
  vi.mocked(pokeDB.getLocations).mockResolvedValue([]);
  useStore.setState({ searchTerm: '', selectedLocationId: null });
  await render(
    <QueryClientProvider client={queryClient}>
      <LocationSuggestions />
    </QueryClientProvider>,
  );

  await expect.element(page.getByRole('listbox')).not.toBeInTheDocument();
});

test('filters locations and renders suggestions based on search term', async () => {
  const mockLocations = [
    { id: 1, n: 'Pallet Town' },
    { id: 2, n: 'Viridian City' },
    { id: 3, n: 'Pewter City' },
    { id: 4, n: 'Cerulean City' },
    { id: 5, n: 'Vermilion City' },
    { id: 6, n: 'Celadon City' },
    { id: 7, n: 'Fuchsia City' },
    // A location with null/undefined name to hit the optional chaining branch
    { id: 8, n: undefined as unknown as string },
  ];

  vi.mocked(pokeDB.getLocations).mockResolvedValue(mockLocations);
  vi.mocked(pokeDB.getInverseIndexBulk).mockResolvedValue([[1, 2], [3], [], [], []]);

  useStore.setState({ searchTerm: 'city', selectedLocationId: null });

  await render(
    <QueryClientProvider client={queryClient}>
      <LocationSuggestions />
    </QueryClientProvider>,
  );

  // Give debounce and async state a moment
  await vi.waitFor(
    async () => {
      await expect.element(page.getByRole('listbox', { name: 'Location suggestions' })).toBeInTheDocument();
    },
    { timeout: 1000 },
  );

  // It should filter 'Viridian City' and 'Pewter City' because they include 'city'
  await expect.element(page.getByText('Viridian City')).toBeInTheDocument();
  await expect.element(page.getByText('Pewter City')).toBeInTheDocument();
  await expect.element(page.getByText('Cerulean City')).toBeInTheDocument();
  await expect.element(page.getByText('Vermilion City')).toBeInTheDocument();
  await expect.element(page.getByText('Celadon City')).toBeInTheDocument();

  // Limits to 5 matches, so Fuchsia City is excluded
  await expect.element(page.getByText('Fuchsia City')).not.toBeInTheDocument();
  await expect.element(page.getByText('Pallet Town')).not.toBeInTheDocument();

  // Check that the count is correctly rendered (2 detected for Viridian, 1 for Pewter)
  await expect.element(page.getByText('[2 DETECTED]')).toBeInTheDocument();
  await expect.element(page.getByText('[1 DETECTED]')).toBeInTheDocument();
});

test('clicking a suggestion sets the location and clears the search term', async () => {
  const mockLocations = [{ id: 2, n: 'Viridian City' }];

  vi.mocked(pokeDB.getLocations).mockResolvedValue(mockLocations);
  vi.mocked(pokeDB.getInverseIndexBulk).mockResolvedValue([[1]]);

  useStore.setState({ searchTerm: 'viridian', selectedLocationId: null });

  await render(
    <QueryClientProvider client={queryClient}>
      <LocationSuggestions />
    </QueryClientProvider>,
  );

  await vi.waitFor(async () => {
    await expect.element(page.getByRole('option', { name: 'Viridian City, 1 detected' })).toBeInTheDocument();
  });

  await page.getByRole('option', { name: 'Viridian City, 1 detected' }).click();

  expect(useStore.getState().selectedLocationId).toBe(2);
  expect(useStore.getState().searchTerm).toBe('');
});

test('renders selected location view and allows clearing', async () => {
  const mockLocations = [{ id: 5, n: 'Cerulean City' }];

  vi.mocked(pokeDB.getLocations).mockResolvedValue(mockLocations);

  useStore.setState({ searchTerm: '', selectedLocationId: 5 });

  await render(
    <QueryClientProvider client={queryClient}>
      <LocationSuggestions />
    </QueryClientProvider>,
  );

  // Because locations are fetched async, the name depends on them being populated.
  // Before locations populate, it may show "Selected Area" fallback if not found,
  // but let's wait for the query to populate it.

  // We trigger a re-render by waiting or we just verify the element structure
  await vi.waitFor(async () => {
    await expect.element(page.getByText(/Location:/)).toBeInTheDocument();
  });

  // Verify the clear button
  const clearButton = page.getByRole('button', { name: 'Clear location filter' });
  await expect.element(clearButton).toBeInTheDocument();

  await clearButton.click();
  expect(useStore.getState().selectedLocationId).toBe(null);
});
