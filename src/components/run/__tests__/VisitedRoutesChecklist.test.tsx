import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '../../../engine/saveParser/parsers/common';
import { VisitedRoutesChecklist } from '../VisitedRoutesChecklist';

test('VisitedRoutesChecklist renders empty states', async () => {
  void render(<VisitedRoutesChecklist visited={[]} unvisited={[]} />);

  await expect.element(page.getByText('No routes visited yet')).toBeInTheDocument();
  await expect.element(page.getByText('All routes visited')).toBeInTheDocument();
});

test('VisitedRoutesChecklist renders visited and unvisited routes', async () => {
  const visited = [
    {
      locationId: 1,
      locationName: 'Route 1',
      encounters: [{ speciesId: 16, currentHp: 10 } as PokemonInstance],
    },
  ];

  const unvisited = [
    {
      locationId: 2,
      locationName: 'Route 2',
    },
  ];

  void render(<VisitedRoutesChecklist visited={visited} unvisited={unvisited} />);

  await expect.element(page.getByText('Route 1')).toBeInTheDocument();
  await expect.element(page.getByText('1 ENCOUNTER')).toBeInTheDocument();
  await expect.element(page.getByText('Route 2')).toBeInTheDocument();
});
