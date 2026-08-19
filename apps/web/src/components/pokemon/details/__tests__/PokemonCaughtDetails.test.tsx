import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '@dexhelper/engine/saveParser/index';
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
    hash: '',
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

  it('renders correctly for shiny carrier', async () => {
    (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
      (selector: unknown) =>
        (selector as (state: unknown) => unknown)({
          saveData: {
            generation: 1,
          },
        }),
    );

    const carrierPokemon = { ...mockPokemon, isShinyCarrier: true };
    await render(<PokemonCaughtDetails yourPokemon={[carrierPokemon]} />);

    await expect.element(page.getByText('CARRIER ANOMALY')).toBeInTheDocument();
  });

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

    await expect.element(page.getByText('[ ACQUIRED_RIBBONS ]')).toBeInTheDocument();
    await expect.element(page.getByText('Cool', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Master')).toBeInTheDocument();
  });

  it('renders ContestConditionStats and ContestSheenDisplay for pokemon with condition', async () => {
    (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
      (selector: unknown) =>
        (selector as (state: unknown) => unknown)({
          saveData: {
            generation: 3,
          },
        }),
    );

    const pokemonWithCondition = {
      ...mockPokemon,
      condition: {
        cool: 50,
        beauty: 60,
        cute: 70,
        smart: 80,
        tough: 90,
        sheen: 200,
      },
    };

    await render(<PokemonCaughtDetails yourPokemon={[pokemonWithCondition]} />);

    await expect.element(page.getByText('SYS.CONTEST_STATS')).toBeInTheDocument();
    await expect.element(page.getByText('Sheen')).toBeInTheDocument();
    await expect.element(page.getByText('200')).toBeInTheDocument();
  });

  it('renders Pokerus strain when present', async () => {
    (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
      (selector: unknown) =>
        (selector as (state: unknown) => unknown)({
          saveData: {
            generation: 3,
          },
        }),
    );

    const pokemonWithPokerus = {
      ...mockPokemon,
      pokerus: { strain: 3, daysRemaining: 2 },
    };

    await render(<PokemonCaughtDetails yourPokemon={[pokemonWithPokerus]} />);

    await expect.element(page.getByText('[ POKERUS_STRAIN ]')).toBeInTheDocument();
    await expect.element(page.getByText('[PKRS STRN: 3]', { exact: true })).toBeInTheDocument();
  });
});
