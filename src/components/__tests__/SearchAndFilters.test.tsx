import { beforeEach, describe, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { SearchAndFilters } from '../SearchAndFilters';

vi.mock('../../store', () => ({
  useStore: vi.fn<() => unknown>(),
  FILTER_TYPES: ['secured', 'missing', 'dexOnly'],
}));

vi.mock('../LocationSuggestions', () => ({
  LocationSuggestions: () => <div data-testid="location-suggestions" />,
}));

const mockUseStore = useStore as unknown as ReturnType<typeof vi.fn>;

describe('SearchAndFilters', () => {
  const defaultStore = {
    saveData: {},
    searchTerm: '',
    setSearchTerm: vi.fn<(term: string) => void>(),
    filters: [],
    toggleFilter: vi.fn<(filter: string) => void>(),
    setFilters: vi.fn<(filters: string[]) => void>(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseStore.mockImplementation((selector: (state: typeof defaultStore) => unknown) => selector(defaultStore));
  });

  test('renders input and buttons', async () => {
    await render(<SearchAndFilters />);
    await expect.element(page.getByTestId('search-input')).toBeInTheDocument();
    await expect.element(page.getByText('All')).toBeInTheDocument();
    await expect.element(page.getByText('Secured')).toBeInTheDocument();
    await expect.element(page.getByText('Missing')).toBeInTheDocument();
    await expect.element(page.getByText('Dex Only')).toBeInTheDocument();
  });

  test('calls setSearchTerm on input change', async () => {
    await render(<SearchAndFilters />);
    const input = page.getByTestId('search-input');
    await input.fill('pikachu');
    expect(defaultStore.setSearchTerm).toHaveBeenCalledWith('pikachu');
  });

  test('toggles filters', async () => {
    await render(<SearchAndFilters />);
    await page.getByText('Secured').click();
    expect(defaultStore.toggleFilter).toHaveBeenCalledWith('secured');

    await page.getByText('All').click();
    expect(defaultStore.setFilters).toHaveBeenCalledWith([]);
  });
});
