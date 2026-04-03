import { bench, describe } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { PokedexGrid } from './src/components/PokedexGrid';
import { useStore } from './src/store';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';

// Mock Pokemon data
const mockPokemonList = Array.from({ length: 151 }, (_, i) => ({
  id: i + 1,
  name: `Pokemon ${i + 1}`
}));

// Setup mock store
useStore.setState({
  saveData: {
    generation: 1,
    party: [1, 2, 3, 4, 5, 6],
    pc: Array.from({ length: 100 }, (_, i) => i + 10),
    owned: new Set([1, 2, 3]),
    seen: new Set([1, 2, 3, 4, 5]),
    partyDetails: Array.from({ length: 6 }, (_, i) => ({ speciesId: i + 1, isShiny: i % 2 === 0 })),
    pcDetails: Array.from({ length: 200 }, (_, i) => ({ speciesId: i + 1, isShiny: i % 20 === 0 })),
  } as any,
  isLivingDex: false,
  searchTerm: '',
  filters: ['missing'],
});

const rootRoute = createRootRoute({
  component: () => <PokedexGrid pokemonList={mockPokemonList} />,
})

const routeTree = rootRoute.addChildren([])

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'],
})

const router = createRouter({ routeTree, history: memoryHistory })


describe('PokedexGrid Performance', () => {
  bench('render PokedexGrid', () => {
    renderToString(<RouterProvider router={router} />);
  });
});
