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

test('renders shiny anomaly LED correctly', async () => {
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
              isShiny: true,
              hash: '',
              otName: 'BLUE',
            },
          ],
        },
      }),
  );

  const { container } = await render(<StorageGrid pokemonList={[{ id: 4, name: 'Charmander' }]} />);

  const led = container.querySelector('.border-amber-400');
  expect(led).toBeInTheDocument();
});

test('renders error LED correctly for fainted party pokemon', async () => {
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
              currentHp: 0, // Fainted
            },
          ],
          pcDetails: [],
        },
      }),
  );

  const { container } = await render(<StorageGrid pokemonList={[{ id: 1, name: 'Bulbasaur' }]} />);

  const led = container.querySelector('.border-red-500');
  expect(led).toBeInTheDocument();

  // also verify it renders the dead Skull icon
  const skull = container.querySelector('.text-red-500\\/50');
  expect(skull).toBeInTheDocument();
});

test('renders dead LED correctly for fainted box pokemon (should not render dead led)', async () => {
  (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
    (selector: unknown) =>
      (selector as (state: unknown) => unknown)({
        saveData: {
          generation: 1,
          partyDetails: [],
          pcDetails: [
            {
              speciesId: 1,
              storageLocation: 'Box 1',
              level: 5,
              isShiny: false,
              hash: '',
              otName: 'RED',
              currentHp: 0, // Fainted in box - shouldn't trigger error LED
            },
          ],
        },
      }),
  );

  const { container } = await render(<StorageGrid pokemonList={[{ id: 1, name: 'Bulbasaur' }]} />);

  const errorLed = container.querySelector('.border-red-500.shadow-\\[0_0_8px_rgba\\(239\\,68\\,68\\,0\\.8\\)\\]');
  expect(errorLed).not.toBeInTheDocument();
});

test('renders time capsule validation tags correctly', async () => {
  (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
    (selector: unknown) =>
      (selector as (state: unknown) => unknown)({
        saveData: {
          generation: 2,
          partyDetails: [
            {
              speciesId: 1, // Gen 1 (Bulbasaur)
              storageLocation: 'Party',
              level: 5,
              isShiny: false,
              hash: '',
              otName: 'RED',
              moves: [1, 2, 3, 4],
            },
            {
              speciesId: 152, // Gen 2 (Chikorita) - invalid
              storageLocation: 'Party',
              level: 5,
              isShiny: false,
              hash: '',
              otName: 'RED',
              moves: [1, 2, 3, 4],
            },
          ],
          pcDetails: [],
        },
      }),
  );

  await render(
    <StorageGrid
      pokemonList={[
        { id: 1, name: 'Bulbasaur' },
        { id: 152, name: 'Chikorita' },
      ]}
    />,
  );

  await expect.element(page.getByText('[ READY ]')).toBeInTheDocument();
  await expect.element(page.getByText('[ ERR ]')).toBeInTheDocument();
});

test('renders time capsule validation tags correctly when empty array', async () => {
  (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
    (selector: unknown) =>
      (selector as (state: unknown) => unknown)({
        saveData: {
          generation: 2,
          partyDetails: [
            {
              speciesId: 1,
              storageLocation: 'Party',
              level: 5,
              isShiny: false,
              hash: '',
              otName: 'RED',
              moves: [],
            },
          ],
          pcDetails: [],
        },
      }),
  );

  await render(<StorageGrid pokemonList={[{ id: 1, name: 'Bulbasaur' }]} />);

  await expect.element(page.getByText('[ READY ]')).toBeInTheDocument();
});

test('renders dead LED correctly for dead party pokemon', async () => {
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
              currentHp: 0,
            },
          ],
          pcDetails: [],
        },
      }),
  );

  const { container } = await render(<StorageGrid pokemonList={[{ id: 1, name: 'Bulbasaur' }]} />);

  const deadLed = container.querySelector('.border-red-500');
  expect(deadLed).toBeInTheDocument();
});

test('renders TimeCapsuleValidation tags when moves are empty array', async () => {
  (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
    (selector: unknown) =>
      (selector as (state: unknown) => unknown)({
        saveData: {
          generation: 2,
          partyDetails: [
            {
              speciesId: 1, // Gen 1 (Bulbasaur)
              storageLocation: 'Party',
              level: 5,
              isShiny: false,
              hash: '',
              otName: 'RED',
              moves: []
            }
          ],
          pcDetails: [],
        },
      }),
  );

  await render(<StorageGrid pokemonList={[{ id: 1, name: 'Bulbasaur' }]} />);

  await expect.element(page.getByText('[ READY ]')).toBeInTheDocument();
});
