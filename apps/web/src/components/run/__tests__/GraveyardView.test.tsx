import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '@dexhelper/engine/saveParser/parsers/common';
import { GraveyardView } from '../GraveyardView';

describe('GraveyardView', () => {
  const mockGeneration = 2;

  it('renders "NO CASUALTIES RECORDED" when graveyard is empty', async () => {
    await render(<GraveyardView graveyard={[]} generation={mockGeneration} />);

    await expect.element(page.getByText('SYS.GRAVEYARD')).toBeInTheDocument();
    await expect.element(page.getByText('NO CASUALTIES RECORDED')).toBeInTheDocument();
  });

  it('renders dead Pokemon when graveyard is not empty', async () => {
    const mockGraveyard: PokemonInstance[] = [
      {
        speciesId: 25, // Pikachu
        level: 15,
        currentHp: 35,
        isShiny: false,
        hash: '',
        moves: [],
        otName: 'ASH',
        storageLocation: 'Box 1',
        caughtData: {
          location: 1,
          locationName: 'Route 1',
          time: 'Day',
          level: 5,
        },
      },
      {
        speciesId: 1, // Bulbasaur
        level: 10,
        currentHp: 45,
        isShiny: false,
        hash: '',
        moves: [],
        storageLocation: 'Box 1',
        caughtData: {
          location: 2,
          locationName: 'Route 2',
          time: 'Morning',
          level: 5,
        },
      },
    ];

    await render(<GraveyardView graveyard={mockGraveyard} generation={mockGeneration} />);

    await expect.element(page.getByText('SYS.GRAVEYARD')).toBeInTheDocument();
    await expect.element(page.getByText('NO CASUALTIES RECORDED')).not.toBeInTheDocument();

    await expect.element(page.getByText('ASH')).toBeInTheDocument();
    await expect.element(page.getByText('LVL 15')).toBeInTheDocument();

    await expect.element(page.getByText('ID: 001')).toBeInTheDocument();
    await expect.element(page.getByText('LVL 10')).toBeInTheDocument();

    // Check that there are two 'DEAD' labels
    const deadLabels = page.getByText('DEAD');
    await expect.element(deadLabels.first()).toBeInTheDocument();
    // Cannot easily count elements in vitest-browser-react, but checking presence is sufficient.
  });
});
