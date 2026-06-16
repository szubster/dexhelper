import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '../../../../engine/saveParser';
import { useStore } from '../../../../store';
import { PokemonCaughtDetails } from '../PokemonCaughtDetails';

// Mock the store
vi.mock('../../../../store', () => ({
  useStore: vi.fn(),
}));

describe('PokemonCaughtDetails', () => {
  const mockPokemonBase = {
    speciesId: 1, // Bulbasaur
    level: 5,
    isShiny: false,
    moves: [1, 2], // Gen 1 moves
    storageLocation: 'Party',
    slot: 1,
    location: 'Party',
  } as unknown as PokemonInstance & { location: string };

  it('renders correctly without Time Capsule status for Gen 1 save', async () => {
    // biome-ignore lint/suspicious/noExplicitAny: using any for mock
    vi.mocked(useStore).mockImplementation((selector: (state: any) => any) =>
      selector({ saveData: { generation: 1 } }),
    );

    await render(<PokemonCaughtDetails yourPokemon={[mockPokemonBase]} />);

    await expect.element(page.getByText('Time Capsule Status')).not.toBeInTheDocument();
  });

  it('renders Time Capsule Ready status for eligible Gen 1 Pokemon in Gen 2 save', async () => {
    // biome-ignore lint/suspicious/noExplicitAny: using any for mock
    vi.mocked(useStore).mockImplementation((selector: (state: any) => any) =>
      selector({ saveData: { generation: 2 } }),
    );

    await render(<PokemonCaughtDetails yourPokemon={[mockPokemonBase]} />);

    await expect.element(page.getByText('Time Capsule Status')).toBeInTheDocument();
    await expect.element(page.getByText('[ TIME CAPSULE READY ]')).toBeInTheDocument();
  });

  it('renders INELIGIBLE status for Gen 2 Pokemon in Gen 2 save', async () => {
    // biome-ignore lint/suspicious/noExplicitAny: using any for mock
    vi.mocked(useStore).mockImplementation((selector: (state: any) => any) =>
      selector({ saveData: { generation: 2 } }),
    );

    const ineligiblePokemon = { ...mockPokemonBase, speciesId: 152 }; // Chikorita

    await render(<PokemonCaughtDetails yourPokemon={[ineligiblePokemon]} />);

    await expect.element(page.getByText('Time Capsule Status')).toBeInTheDocument();
    await expect.element(page.getByText('[ INELIGIBLE ]')).toBeInTheDocument();
    await expect.element(page.getByText('INVALID: Gen 2 Species')).toBeInTheDocument();
  });
});
