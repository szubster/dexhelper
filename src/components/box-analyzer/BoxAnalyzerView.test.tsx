import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import type React from 'react';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { BaseSaveData, PokemonInstance } from '../../engine/saveParser/parsers/common';
import { useStore } from '../../store';
import { BoxAnalyzerView } from './BoxAnalyzerView';

const createMockPokemon = (overrides: Partial<PokemonInstance>): PokemonInstance =>
  ({
    speciesId: 1,
    level: 5,
    isShiny: false,
    moves: [],
    storageLocation: 'Box 1',
    ...overrides,
  }) as PokemonInstance;

const createBaseSaveData = (): BaseSaveData & { generation: 2 } => ({
  owned: new Set(),
  seen: new Set(),
  party: [],
  pc: [],
  partyDetails: [],
  pcDetails: [],
  gameVersion: 'crystal',
  generation: 2,
  badges: 0,
  trainerName: 'TEST',
  trainerId: 12345,
  currentMapId: 0,
  inventory: [],
  currentBoxCount: 0,
  hallOfFameCount: 0,
});

const mockPokemonList = [
  { id: 1, name: 'Bulbasaur', nameLower: 'bulbasaur', idString: '1' },
  { id: 4, name: 'Charmander', nameLower: 'charmander', idString: '4' },
  { id: 7, name: 'Squirtle', nameLower: 'squirtle', idString: '7' },
];

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute();
  const componentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => ui,
  });

  const routeTree = rootRoute.addChildren([componentRoute]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });

  return render(<RouterProvider router={router} />);
}

describe('BoxAnalyzerView', () => {
  it('renders header and content area when no save data', async () => {
    // Reset store
    useStore.setState({ saveData: null });

    void renderWithRouter(<BoxAnalyzerView pokemonList={mockPokemonList} />);

    await expect.element(page.getByText('Box Analyzer')).not.toBeInTheDocument();
  });

  it('displays matching Pokemon by species name', async () => {
    const pcDetails = [
      createMockPokemon({ speciesId: 1, storageLocation: 'Box 1', slot: 1 }), // Bulbasaur
      createMockPokemon({ speciesId: 4, storageLocation: 'Box 1', slot: 2 }), // Charmander
    ];

    const saveData = {
      ...createBaseSaveData(),
      pcDetails,
    };

    useStore.setState({ saveData, searchTerm: 'bulba' });

    void renderWithRouter(<BoxAnalyzerView pokemonList={mockPokemonList} />);

    await expect.element(page.getByText('Bulbasaur')).toBeVisible();
    await expect.element(page.getByText('Charmander')).not.toBeInTheDocument();
  });

  it('displays matching Pokemon by nickname', async () => {
    const pcDetails = [
      createMockPokemon({ speciesId: 1, nickname: 'VINES', storageLocation: 'Box 1', slot: 1 }),
      createMockPokemon({ speciesId: 4, nickname: 'FLAME', storageLocation: 'Box 1', slot: 2 }),
    ];

    const saveData = {
      ...createBaseSaveData(),
      pcDetails,
    };

    useStore.setState({ saveData, searchTerm: 'vines' });

    void renderWithRouter(<BoxAnalyzerView pokemonList={mockPokemonList} />);

    await expect.element(page.getByText('Bulbasaur')).toBeVisible();
    await expect.element(page.getByText('Charmander')).not.toBeInTheDocument();
  });

  it('displays matching Pokemon by OT name', async () => {
    const pcDetails = [
      createMockPokemon({ speciesId: 1, otName: 'ASH', storageLocation: 'Box 1', slot: 1 }),
      createMockPokemon({ speciesId: 4, otName: 'GARY', storageLocation: 'Box 1', slot: 2 }),
    ];

    const saveData = {
      ...createBaseSaveData(),
      pcDetails,
    };

    useStore.setState({ saveData, searchTerm: 'gary' });

    void renderWithRouter(<BoxAnalyzerView pokemonList={mockPokemonList} />);

    await expect.element(page.getByText('Bulbasaur')).not.toBeInTheDocument();
    await expect.element(page.getByText('Charmander')).toBeVisible();
  });

  it('displays empty state when no matches found', async () => {
    const pcDetails = [createMockPokemon({ speciesId: 1, storageLocation: 'Box 1', slot: 1 })];

    const saveData = {
      ...createBaseSaveData(),
      pcDetails,
    };

    useStore.setState({ saveData, searchTerm: 'xyz' });

    void renderWithRouter(<BoxAnalyzerView pokemonList={mockPokemonList} />);

    await expect.element(page.getByText('NO TARGETS FOUND IN DB')).toBeVisible();
  });
});
