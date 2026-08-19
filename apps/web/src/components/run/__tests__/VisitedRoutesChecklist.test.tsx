import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '@dexhelper/engine/saveParser/parsers/common';
import { VisitedRoutesChecklist } from '../VisitedRoutesChecklist';

describe('VisitedRoutesChecklist', () => {
  const mockVisited = [
    {
      locationId: 1,
      locationName: 'Route 1',
      encounters: [
        {
          speciesId: 16,
          level: 3,
          currentHp: 15,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Party',
        } as unknown as PokemonInstance,
      ],
    },
    {
      locationId: 2,
      locationName: 'Route 2',
      encounters: [
        {
          speciesId: 19,
          level: 4,
          currentHp: 16,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Party',
        } as unknown as PokemonInstance,
        {
          speciesId: 16,
          level: 4,
          currentHp: 15,
          isShiny: false,
          hash: '',
          moves: [],
          storageLocation: 'Party',
        } as unknown as PokemonInstance,
      ],
    },
  ];

  const mockUnvisited = [
    {
      locationId: 3,
      locationName: 'Route 3',
    },
    {
      locationId: 4,
      locationName: 'Route 4',
    },
  ];

  it('renders visited routes correctly', async () => {
    await render(<VisitedRoutesChecklist visited={mockVisited} unvisited={mockUnvisited} />);

    // Check header
    await expect.element(page.getByText('SYS.VISITED_ROUTES')).toBeInTheDocument();

    // Check visited route 1
    await expect.element(page.getByText('Route 1')).toBeInTheDocument();
    await expect.element(page.getByText('1 ENCOUNTER')).toBeInTheDocument();

    // Check visited route 2
    await expect.element(page.getByText('Route 2')).toBeInTheDocument();
    await expect.element(page.getByText('2 ENCOUNTERS')).toBeInTheDocument();
  });

  it('renders unvisited routes correctly', async () => {
    await render(<VisitedRoutesChecklist visited={mockVisited} unvisited={mockUnvisited} />);

    // Check header
    await expect.element(page.getByText('SYS.UNVISITED_ROUTES')).toBeInTheDocument();

    // Check unvisited route 3
    await expect.element(page.getByText('Route 3')).toBeInTheDocument();

    // Check unvisited route 4
    await expect.element(page.getByText('Route 4')).toBeInTheDocument();
  });

  it('renders empty states when no routes are visited or unvisited', async () => {
    await render(<VisitedRoutesChecklist visited={[]} unvisited={[]} />);

    await expect.element(page.getByText('No routes visited yet')).toBeInTheDocument();
    await expect.element(page.getByText('All routes visited')).toBeInTheDocument();
  });
});
