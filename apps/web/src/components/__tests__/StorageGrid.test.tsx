import { beforeEach, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { StorageGrid } from '../StorageGrid';

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn<() => void>(),
}));

// Mock Zustand Store
vi.mock('../../store', () => ({
  useStore: vi.fn<() => void>(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

test('renders nothing when saveData is missing', async () => {
  (useStore as unknown as { mockReturnValue: (val: unknown) => void }).mockReturnValue(null);
  await render(<StorageGrid pokemonList={[]} />);
  // The grid returns null, so container should be empty.
  await expect.element(page.getByText('NO_DATA_FOUND')).not.toBeInTheDocument();
});

test('renders grid with empty locations', async () => {
  (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
    (selector: unknown) =>
      (selector as (state: unknown) => unknown)({
        saveData: {
          generation: 1,
          partyDetails: [],
          pcDetails: [],
        },
      }),
  );

  await render(<StorageGrid pokemonList={[{ id: 1, name: 'Bulbasaur' }]} />);

  // It should render the location headers
  await expect.element(page.getByText('Party')).toBeInTheDocument();

  // It should render EMPTY states
  await expect.element(page.getByText('EMPTY').first()).toBeInTheDocument();
});

test('renders grid with pokemon', async () => {
  (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
    (selector: unknown) =>
      (selector as (state: unknown) => unknown)({
        saveData: {
          generation: 1,
          partyDetails: [
            {
              speciesId: 1,
              storageLocation: 'Party',
              level: 5,
              isShiny: false,
              hash: '',
              otName: 'RED',
              pokerus: { strain: 3, daysRemaining: 2 },
            },
          ],
          pcDetails: [
            { speciesId: 4, storageLocation: 'Box 1', level: 10, isShiny: true, hash: '', otName: 'BLUE' },
            {
              speciesId: 7,
              storageLocation: 'Box 1',
              level: 5,
              isShiny: false,
              hash: '',
              isShinyCarrier: true,
              otName: 'GREEN',
            },
          ],
        },
      }),
  );

  await render(
    <StorageGrid
      pokemonList={[
        { id: 1, name: 'Bulbasaur' },
        { id: 4, name: 'Charmander' },
        { id: 7, name: 'Squirtle' },
      ]}
    />,
  );

  // Check party pokemon
  await expect.element(page.getByText('Bulbasaur')).toBeInTheDocument();
  await expect.element(page.getByText('RED')).toBeInTheDocument();
  await expect.element(page.getByText('[PKRS STRN: 3]')).toBeInTheDocument();

  // Check box pokemon
  await expect.element(page.getByText('Charmander')).toBeInTheDocument();
  await expect.element(page.getByText('BLUE')).toBeInTheDocument();
  await expect.element(page.getByText('Squirtle')).toBeInTheDocument();
  await expect.element(page.getByText('GREEN')).toBeInTheDocument();

  // Click navigation
  const btn = page.getByText('Bulbasaur');
  await btn.click();
});

test('renders carrier anomaly LED correctly', async () => {
  (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
    (selector: unknown) =>
      (selector as (state: unknown) => unknown)({
        saveData: {
          generation: 1,
          partyDetails: [],
          pcDetails: [
            {
              speciesId: 4,
              storageLocation: 'Box 1',
              level: 10,
              isShiny: false,
              hash: '',
              isShinyCarrier: true,
              otName: 'BLUE',
            },
          ],
        },
      }),
  );

  const { container } = await render(<StorageGrid pokemonList={[{ id: 4, name: 'Charmander' }]} />);

  const led = container.querySelector('.border-cyan-400.border-dashed');
  expect(led).toBeInTheDocument();
});
