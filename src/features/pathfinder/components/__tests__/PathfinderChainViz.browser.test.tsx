import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { PathfinderChainViz } from '../PathfinderChainViz';

describe('PathfinderChainViz', () => {
  test('renders nothing when chain is empty', async () => {
    const route = createRootRoute({
      component: () => <PathfinderChainViz chain={[]} targetMoveId={1} targetSpeciesId={2} />,
    });
    const router = createRouter({ routeTree: route, history: createMemoryHistory() });

    await render(<RouterProvider router={router} />);

    // Give it a moment, but check there's no header rendered
    await expect.element(page.getByText('BREEDING CHAIN ROUTE')).not.toBeInTheDocument();
  });

  test('renders chain steps correctly', async () => {
    const mockChain = [
      {
        speciesId: 1,
        speciesName: 'Bulbasaur',
        eggGroups: [1, 7],
        requiredGender: 'Male' as const,
      },
      {
        speciesId: 4,
        speciesName: 'Charmander',
        eggGroups: [1, 14],
        learnedMoves: [10],
        requiredGender: 'Female' as const,
      },
    ];

    const route = createRootRoute({
      component: () => <PathfinderChainViz chain={mockChain} targetMoveId={10} targetSpeciesId={4} />,
    });
    const router = createRouter({ routeTree: route, history: createMemoryHistory() });

    await render(<RouterProvider router={router} />);

    // Verify header
    await expect.element(page.getByText('BREEDING CHAIN ROUTE')).toBeVisible();

    // Verify first step (Source)
    await expect.element(page.getByText('SOURCE')).toBeVisible();
    await expect.element(page.getByText('Bulbasaur')).toBeVisible();
    await expect.element(page.getByText('ID.001')).toBeVisible();

    // Verify second step (Target)
    await expect.element(page.getByText('TARGET')).toBeVisible();
    await expect.element(page.getByText('Charmander')).toBeVisible();
    await expect.element(page.getByText('ID.004')).toBeVisible();

    // Verify move passed text is present
    await expect.element(page.getByText('ID.10')).toBeVisible();
  });
});
