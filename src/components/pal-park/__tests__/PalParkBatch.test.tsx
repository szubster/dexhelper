import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '../../../engine/saveParser/parsers/common';
import { PalParkBatch } from '../PalParkBatch';

describe('PalParkBatch', () => {
  const mockPokemon: PokemonInstance = {
    speciesId: 25, // Pikachu
    level: 50,
    isShiny: false,
    moves: [1, 2, 3, 4],
    storageLocation: 'Box 1',
    nickname: 'SPARKY',
    hash: 'mock-hash-1',
  };

  it('renders full batch of 6 pokemon', async () => {
    const batch = Array(6)
      .fill(null)
      .map((_, i) => ({
        pokemon: { ...mockPokemon, speciesId: mockPokemon.speciesId + i, hash: `hash-${i}`, nickname: `SPARKY_${i}` },
        location: { box: 1, slot: i + 1 },
      }));

    await render(<PalParkBatch batch={batch} batchIndex={0} />);

    await expect.element(page.getByText('Batch 1')).toBeVisible();
    await expect.element(page.getByText('[6/6]')).toBeVisible();
    await expect.element(page.getByText('SPARKY_0')).toBeVisible();
    await expect.element(page.getByText('SPARKY_5')).toBeVisible();

    // Ensure 0 empty slots
    await expect.element(page.getByText('EMPTY SLOT')).not.toBeInTheDocument();
  });

  it('renders empty slots when batch has fewer than 6 pokemon', async () => {
    const batch = [{ pokemon: { ...mockPokemon, nickname: undefined, otName: 'ASH' }, location: { box: 2, slot: 5 } }];

    await render(<PalParkBatch batch={batch} batchIndex={1} />);

    await expect.element(page.getByText('Batch 2')).toBeVisible();
    await expect.element(page.getByText('[1/6]')).toBeVisible();
    await expect.element(page.getByText('ASH')).toBeVisible();

    const emptySlots = page.getByText('EMPTY SLOT').elements();
    expect(emptySlots.length).toBe(5);
  });
});
