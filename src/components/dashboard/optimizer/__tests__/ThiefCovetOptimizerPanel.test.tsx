import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '../../../../engine/saveParser/parsers/common';
import { ThiefCovetOptimizerPanel } from '../ThiefCovetOptimizerPanel';

const mockSaveData = {
  generation: 3,
  partyDetails: [
    {
      speciesId: 1,
      nickname: 'StealerOne',
      isShiny: false,
      moves: [168, 0, 0, 0], // THIEF
      personalityValue: 1234,
      dvs: { hp: 0, atk: 0, def: 0, spd: 0, spc: 0 },
      isEgg: false,
      level: 50,
      experience: 1000,
    } as unknown as PokemonInstance,
  ],
  pcDetails: [
    {
      speciesId: 2,
      nickname: 'StealerTwo',
      isShiny: true,
      moves: [343, 0, 0, 0], // COVET
      personalityValue: 5678,
      dvs: { hp: 0, atk: 0, def: 0, spd: 0, spc: 0 },
      isEgg: false,
      level: 50,
      experience: 1000,
    } as unknown as PokemonInstance,
  ],
};

const emptySaveData = {
  generation: 3,
  partyDetails: [],
  pcDetails: [],
};

describe('ThiefCovetOptimizerPanel', () => {
  it('renders correctly with stealers', async () => {
    await render(<ThiefCovetOptimizerPanel saveData={mockSaveData} />);
    await expect.element(page.getByText('THIEF/COVET OPTIMIZER')).toBeVisible();
    await expect.element(page.getByText('ACTIVE PARTY TEAM')).toBeVisible();
    await expect.element(page.getByText('StealerOne')).toBeVisible();
    await expect.element(page.getByText('THIEF', { exact: true })).toBeVisible();

    await expect.element(page.getByText('AVAILABLE IN STORAGE')).toBeVisible();
    await expect.element(page.getByText('StealerTwo')).toBeVisible();
    await expect.element(page.getByText('COVET', { exact: true })).toBeVisible();
  });

  it('renders correctly with no stealers', async () => {
    await render(<ThiefCovetOptimizerPanel saveData={emptySaveData} />);
    await expect.element(page.getByText('THIEF/COVET OPTIMIZER')).toBeVisible();
    await expect.element(page.getByText('NO CAPABLE POKEMON DETECTED')).toBeVisible();
  });
});
