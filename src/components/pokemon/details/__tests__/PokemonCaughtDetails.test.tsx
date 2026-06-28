import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '../../../../engine/saveParser/index';
import { useStore } from '../../../../store';
import { PokemonCaughtDetails } from '../PokemonCaughtDetails';

vi.mock('../../../../store', () => ({
  useStore: vi.fn<() => void>(),
}));

describe('PokemonCaughtDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockPokemon: PokemonInstance & { location: string } = {
    speciesId: 1, // Bulbasaur
    level: 5,
    isShiny: false,
    otName: 'ASH',
    storageLocation: 'Party',
    slot: 1,
    location: 'Party',
    moves: [1, 2],
    currentHp: 20,
    condition: { cool: 0, beauty: 0, cute: 0, smart: 0, tough: 0, sheen: 0 },
    friendship: 100,
    item: 0,
  };

  it('renders correctly', async () => {
    (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
      (selector: unknown) =>
        (selector as (state: unknown) => unknown)({
          saveData: {
            generation: 1,
          },
        }),
    );

    await render(<PokemonCaughtDetails yourPokemon={[mockPokemon]} />);

    await expect.element(page.getByText('LV.5')).toBeInTheDocument();
    await expect.element(page.getByText('Party')).toBeInTheDocument();
  });

  it('renders Gen 2 specific info and Time Capsule validation', async () => {
    (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
      (selector: unknown) =>
        (selector as (state: unknown) => unknown)({
          saveData: {
            generation: 2,
          },
        }),
    );

    await render(<PokemonCaughtDetails yourPokemon={[mockPokemon]} />);

    await expect.element(page.getByText('[ TIME CAPSULE COMPATIBLE ]')).toBeInTheDocument();
  });

  it('renders Gen 2 specific info and Time Capsule validation with error', async () => {
    (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
      (selector: unknown) =>
        (selector as (state: unknown) => unknown)({
          saveData: {
            generation: 2,
          },
        }),
    );

    await render(<PokemonCaughtDetails yourPokemon={[{ ...mockPokemon, speciesId: 152 }]} />);

    await expect.element(page.getByText('INVALID: Gen 2 Species')).toBeInTheDocument();
  });

  it('renders ContestRibbonsPanel for Gen 3 pokemon with ribbons', async () => {
    (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
      (selector: unknown) =>
        (selector as (state: unknown) => unknown)({
          saveData: {
            generation: 3,
          },
        }),
    );

    const gen3PokemonWithRibbons = {
      ...mockPokemon,
      ribbons: {
        cool: 4,
        beauty: 0,
        cute: 0,
        smart: 0,
        tough: 0,
      },
    };

    await render(<PokemonCaughtDetails yourPokemon={[gen3PokemonWithRibbons]} />);

    await expect.element(page.getByText('Contest Ribbons')).toBeInTheDocument();
    await expect.element(page.getByText('Cool')).toBeInTheDocument();
    await expect.element(page.getByText('Master')).toBeInTheDocument();
  });

  it('renders ContestSheenDisplay for Gen 3 pokemon with condition stats', async () => {
    (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
      (selector: unknown) =>
        (selector as (state: unknown) => unknown)({
          saveData: {
            generation: 3,
          },
        }),
    );

    const gen3PokemonWithCondition = {
      ...mockPokemon,
      condition: {
        cool: 10,
        beauty: 20,
        cute: 30,
        smart: 40,
        tough: 50,
        sheen: 150,
      },
    };

    await render(<PokemonCaughtDetails yourPokemon={[gen3PokemonWithCondition]} />);

    await expect.element(page.getByText('Sheen')).toBeInTheDocument();
    await expect.element(page.getByText('150 / 255')).toBeInTheDocument();
  });
});
