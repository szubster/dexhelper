import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '../../../engine/saveParser/parsers/common';
import { VisitedRoutesChecklist } from '../VisitedRoutesChecklist';

describe('VisitedRoutesChecklist', () => {
  it('renders visited and unvisited routes', async () => {
    const visited = [
      {
        locationId: 1,
        locationName: 'Route 1',
        encounters: [{} as PokemonInstance],
      },
      {
        locationId: 2,
        locationName: 'Pallet Town',
        encounters: [{} as PokemonInstance, {} as PokemonInstance],
      },
    ];

    const unvisited = [
      {
        locationId: 3,
        locationName: 'Route 2',
      },
    ];

    await render(<VisitedRoutesChecklist visited={visited} unvisited={unvisited} />);

    // Check titles
    await expect.element(page.getByText('SYS.VISITED_ROUTES')).toBeInTheDocument();
    await expect.element(page.getByText('SYS.UNVISITED_ROUTES')).toBeInTheDocument();

    // Check visited routes
    await expect.element(page.getByText('Route 1')).toBeInTheDocument();
    await expect.element(page.getByText('1 ENCOUNTER')).toBeInTheDocument();

    await expect.element(page.getByText('Pallet Town')).toBeInTheDocument();
    await expect.element(page.getByText('2 ENCOUNTERS')).toBeInTheDocument();

    // Check unvisited routes
    await expect.element(page.getByText('Route 2')).toBeInTheDocument();
  });

  it('renders empty states', async () => {
    await render(<VisitedRoutesChecklist visited={[]} unvisited={[]} />);

    await expect.element(page.getByText(/No routes visited yet/i)).toBeInTheDocument();
    await expect.element(page.getByText(/All routes visited/i)).toBeInTheDocument();
  });
});
