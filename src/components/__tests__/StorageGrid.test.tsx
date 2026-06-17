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
          partyDetails: [{ speciesId: 1, storageLocation: 'Party', level: 5, isShiny: false, otName: 'RED' }],
          pcDetails: [{ speciesId: 4, storageLocation: 'Box 1', level: 10, isShiny: true, otName: 'BLUE' }],
        },
      }),
  );

  await render(
    <StorageGrid
      pokemonList={[
        { id: 1, name: 'Bulbasaur' },
        { id: 4, name: 'Charmander' },
      ]}
    />,
  );

  // Check party pokemon
  await expect.element(page.getByText('Bulbasaur')).toBeInTheDocument();
  await expect.element(page.getByText('RED')).toBeInTheDocument();

  // Check box pokemon
  await expect.element(page.getByText('Charmander')).toBeInTheDocument();
  await expect.element(page.getByText('BLUE')).toBeInTheDocument();

  // Click navigation
  const btn = page.getByText('Bulbasaur');
  await btn.click();
});

test('renders Time Capsule UI indicator for Gen 2 save if eligible', async () => {
  (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
    (selector: unknown) =>
      (selector as (state: unknown) => unknown)({
        saveData: {
          generation: 2,
          partyDetails: [{ speciesId: 1, storageLocation: 'Party', level: 5, isShiny: false, moves: [1, 2, 3] }],
          pcDetails: [],
        },
      }),
  );

  await render(<StorageGrid pokemonList={[{ id: 1, name: 'Bulbasaur' }]} />);

  await expect.element(page.getByText('TIME CAPSULE READY')).toBeInTheDocument();
});

test('renders Time Capsule error indicator for Gen 2 save if ineligible', async () => {
  (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
    (selector: unknown) =>
      (selector as (state: unknown) => unknown)({
        saveData: {
          generation: 2,
          partyDetails: [{ speciesId: 152, storageLocation: 'Party', level: 5, isShiny: false, moves: [1, 2, 3] }],
          pcDetails: [],
        },
      }),
  );

  await render(<StorageGrid pokemonList={[{ id: 152, name: 'Chikorita' }]} />);

  await expect.element(page.getByText('ERR')).toBeInTheDocument();
});
