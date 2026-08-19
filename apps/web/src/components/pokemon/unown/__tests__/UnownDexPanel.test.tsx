import { afterEach, describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import type { PokemonInstance } from '@dexhelper/engine/saveParser';
import { UnownDexPanel } from '../UnownDexPanel';

describe('UnownDexPanel', () => {
  afterEach(async () => {
    await cleanup();
  });

  const basePokemon: PokemonInstance & { location: string } = {
    speciesId: 201,
    level: 5,
    isShiny: false,
    hash: '',
    moves: [],
    location: 'Party',
    storageLocation: 'Party',
  };

  test('renders 0 / 26 discovered when no Unown forms are owned', async () => {
    await render(<UnownDexPanel yourPokemon={[]} />);
    await expect.element(page.getByText('0')).toBeInTheDocument();
    await expect.element(page.getByText(/26 FORMS ACQUIRED/)).toBeInTheDocument();
  });

  test('renders correctly when multiple Unown forms are owned', async () => {
    const mockYourPokemon = [
      { ...basePokemon, unownForm: 'A' },
      { ...basePokemon, unownForm: 'Z' },
    ];
    await render(<UnownDexPanel yourPokemon={mockYourPokemon} />);
    await expect.element(page.getByText('2', { exact: true })).toBeInTheDocument();
  });

  test('ignores non-Unown Pokémon when calculating owned forms', async () => {
    const mockYourPokemon = [
      { ...basePokemon, speciesId: 1, unownForm: 'A' }, // Not Unown
      { ...basePokemon, unownForm: 'B' }, // Unown
    ];
    await render(<UnownDexPanel yourPokemon={mockYourPokemon} />);
    await expect.element(page.getByText('1', { exact: true })).toBeInTheDocument();
  });
});
