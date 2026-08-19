import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '@dexhelper/engine/saveParser/parsers/common';
import { AliveTeamView } from '../AliveTeamView';

describe('AliveTeamView', () => {
  const mockGeneration = 2;
  const mockTeam: PokemonInstance[] = [
    {
      speciesId: 155,
      level: 5,
      currentHp: 18,
      isShiny: false,
      hash: '',
      moves: [1, 2],
      storageLocation: 'Party',
      otName: 'CYNDAQUIL',
    },
    {
      speciesId: 16,
      level: 4,
      currentHp: 0, // Dead
      isShiny: false,
      hash: '',
      moves: [3, 4],
      storageLocation: 'Party',
      otName: 'PIDGEY',
    },
    {
      speciesId: 19,
      level: 3,
      currentHp: 15,
      isShiny: false,
      hash: '',
      moves: [5],
      storageLocation: 'Party',
      // Missing otName to test fallback
    },
  ];

  it('renders alive team members correctly', async () => {
    await render(<AliveTeamView team={mockTeam} generation={mockGeneration} />);

    // Check header
    await expect.element(page.getByText('SYS.ALIVE_TEAM')).toBeInTheDocument();

    // Check alive member 1
    await expect.element(page.getByText('CYNDAQUIL')).toBeInTheDocument();
    await expect.element(page.getByText('LVL 5')).toBeInTheDocument();
    await expect.element(page.getByText('18 HP')).toBeInTheDocument();

    // Check alive member 2 (fallback name ID)
    await expect.element(page.getByText('ID: 019')).toBeInTheDocument();
    await expect.element(page.getByText('LVL 3')).toBeInTheDocument();
    await expect.element(page.getByText('15 HP')).toBeInTheDocument();

    // Check dead member is NOT rendered
    await expect.element(page.getByText('PIDGEY')).not.toBeInTheDocument();
    await expect.element(page.getByText('LVL 4')).not.toBeInTheDocument();
  });

  it('renders Team Wipe Detected state when no members are alive', async () => {
    const deadTeam: PokemonInstance[] = [
      { ...mockTeam[1] } as unknown as PokemonInstance,
      { ...mockTeam[1], speciesId: 19, otName: 'RATTATA' } as unknown as PokemonInstance,
    ];
    await render(<AliveTeamView team={deadTeam} generation={mockGeneration} />);

    await expect.element(page.getByText('CRITICAL_FAILURE')).toBeInTheDocument();
    await expect.element(page.getByText(/No vital signs found/)).toBeInTheDocument();
    await expect.element(page.getByText('PIDGEY')).not.toBeInTheDocument();
  });

  it('renders Team Wipe Detected state when team is empty', async () => {
    await render(<AliveTeamView team={[]} generation={mockGeneration} />);

    await expect.element(page.getByText('CRITICAL_FAILURE')).toBeInTheDocument();
  });
});
