import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { COVET_MOVE_ID, THIEF_MOVE_ID } from '../../../engine/moves/itemStealers';
import type { PokemonInstance } from '../../../engine/saveParser/parsers/common';
import { ThiefCovetOptimizerPanel } from './ThiefCovetOptimizerPanel';

describe('ThiefCovetOptimizerPanel', () => {
  test('renders empty state when no stealers are found', async () => {
    const saveData = {
      generation: 3,
      partyDetails: [] as PokemonInstance[],
      pcDetails: [] as PokemonInstance[],
    };

    await render(<ThiefCovetOptimizerPanel saveData={saveData} />);

    await expect.element(page.getByText('NO CAPABLE POKEMON DETECTED')).toBeVisible();
  });

  test('renders stealers when found', async () => {
    const saveData = {
      generation: 3,
      partyDetails: [
        {
          speciesId: 1,
          nickname: 'ThiefBulba',
          isShiny: false,
          personalityValue: 123,
          moves: [THIEF_MOVE_ID],
          level: 5,
          storageLocation: { type: 'party', index: 0 },
          hash: 'hash1',
        } as unknown as PokemonInstance,
      ],
      pcDetails: [
        {
          speciesId: 4,
          nickname: 'CovetCharm',
          isShiny: true,
          personalityValue: 456,
          moves: [COVET_MOVE_ID],
          level: 5,
          storageLocation: { type: 'pc', box: 0, index: 0 },
          hash: 'hash2',
        } as unknown as PokemonInstance,
      ],
    };

    await render(<ThiefCovetOptimizerPanel saveData={saveData} />);

    await expect.element(page.getByText('ThiefBulba')).toBeVisible();
    await expect.element(page.getByText('THIEF').first()).toBeVisible();

    await expect.element(page.getByText('CovetCharm')).toBeVisible();
    await expect.element(page.getByText('COVET').first()).toBeVisible();
  });
});
