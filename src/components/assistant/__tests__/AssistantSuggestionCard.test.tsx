import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter, Outlet, RouterProvider } from '@tanstack/react-router';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { Suggestion } from '../../../engine/assistant/strategies/types';
import type { SaveData } from '../../../engine/saveParser/index';
import { AssistantSuggestionCard } from '../AssistantSuggestionCard';

// Setup basic router for links
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function renderWithProviders(ui: React.ReactNode) {
  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => ui,
  });
  // Add a dummy pokemonId route since the card links to it
  const pokemonRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/pokemon/$pokemonId',
    component: () => <div>Pokemon Details</div>,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([testRoute, pokemonRoute]),
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe('AssistantSuggestionCard', () => {
  const mockGetPokemonName = vi.fn<(id: number) => string>((id) => {
    const names: Record<number, string> = { 1: 'Bulbasaur', 4: 'Charmander', 7: 'Squirtle' };
    return names[id] ?? `#${id}`;
  });

  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'red',
    trainerId: 12345,
    trainerName: 'ASH',
    badges: 0,
    inventory: [{ id: 1, quantity: 1 }],
    pcItems: [],
    party: [],
    pc: [],
    partyDetails: [],
    pcDetails: [],
    owned: new Set(),
    seen: new Set(),
    currentMapId: 0,
    currentBoxCount: 0,
    hallOfFameCount: 0,
  };

  const defaultStyle = {
    icon: <span data-testid="test-icon">Icon</span>,
    color: 'border-red-500/30 text-red-100',
    bg: 'bg-red-500/10',
  };

  it('renders a basic suggestion properly', async () => {
    const suggestion: Suggestion = {
      id: 'test-1',
      priority: 10,
      category: 'Utility',
      title: 'Do the thing',
      description: 'You should really do this thing.',
    };

    await renderWithProviders(
      <AssistantSuggestionCard
        suggestion={suggestion}
        style={defaultStyle}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={mockGetPokemonName}
      />,
    );

    await expect.element(page.getByText('Do the thing')).toBeVisible();
    await expect.element(page.getByText('You should really do this thing.')).toBeVisible();
    await expect.element(page.getByText('Utility')).toBeVisible();
  });

  it('replaces PIDs in title and description', async () => {
    const suggestion: Suggestion = {
      id: 'test-2',
      priority: 10,
      category: 'Evolve',
      title: 'Evolve #1',
      description: 'Get a #4 and #7',
    };

    await renderWithProviders(
      <AssistantSuggestionCard
        suggestion={suggestion}
        style={defaultStyle}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={mockGetPokemonName}
      />,
    );

    await expect.element(page.getByText('Evolve Bulbasaur')).toBeVisible();
    await expect.element(page.getByText('Get a Charmander and Squirtle')).toBeVisible();
  });

  it('renders a single pokemon suggestion with sprite', async () => {
    const suggestion: Suggestion = {
      id: 'test-3',
      priority: 10,
      category: 'Catch',
      title: 'Catch a pokemon',
      description: 'Go catch it.',
      pokemonId: 1,
    };

    await renderWithProviders(
      <AssistantSuggestionCard
        suggestion={suggestion}
        style={defaultStyle}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={mockGetPokemonName}
      />,
    );

    await expect.element(page.getByText(/TARGET ACQUIRED/)).toBeVisible();
    await expect.element(page.getByText('PT.001')).toBeVisible();
  });

  it('renders multiple pokemon suggestions with methods', async () => {
    const suggestion: Suggestion = {
      id: 'test-4',
      priority: 10,
      category: 'Catch',
      title: 'Catch these',
      description: 'Go catch them.',
      pokemonIds: [1, 4],
      encounterInfo: {
        1: [{ areaId: 0, method: 'walk', chance: 20, minLevel: 5, maxLevel: 5 }],
        4: [{ areaId: 0, method: 'surf', chance: 10, minLevel: 10, maxLevel: 15 }],
      },
    };

    const areaNames = { 0: 'Pallet Town' };

    await renderWithProviders(
      <AssistantSuggestionCard
        suggestion={suggestion}
        style={defaultStyle}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={mockGetPokemonName}
        areaNames={areaNames}
      />,
    );

    await expect.element(page.getByText('WALK')).toBeVisible();
    await expect.element(page.getByText('SURF')).toBeVisible();
    await expect.element(page.getByText('20%')).toBeVisible();
    await expect.element(page.getByText('10%')).toBeVisible();
    await expect.element(page.getByText('Lv. 5')).toBeVisible();
    await expect.element(page.getByText('Lv. 10-15')).toBeVisible();
  });

  it('renders missing rod warning when rod is not in inventory', async () => {
    const suggestion: Suggestion = {
      id: 'test-6',
      priority: 10,
      category: 'Catch',
      title: 'Catch this fish',
      description: 'Fish it.',
      pokemonIds: [129],
      encounterInfo: {
        129: [{ areaId: 0, method: 'old-rod', chance: 100, minLevel: 5, maxLevel: 5 }],
      },
    };

    const saveDataWithoutRod: SaveData = {
      ...mockSaveData,
      inventory: [],
      pcItems: [],
    };

    await renderWithProviders(
      <AssistantSuggestionCard
        suggestion={suggestion}
        style={defaultStyle}
        showDebug={false}
        saveData={saveDataWithoutRod}
        getPokemonName={mockGetPokemonName}
      />,
    );

    await expect.element(page.getByText('MISSING_ROD', { exact: false })).toBeVisible();
  });

  it('renders warning and debug info', async () => {
    const suggestion: Suggestion = {
      id: 'test-5',
      priority: 99,
      category: 'Event',
      title: 'CRITICAL MISSION',
      description: 'Warning description',
      warning: 'Watch out!',
    };

    await renderWithProviders(
      <AssistantSuggestionCard
        suggestion={suggestion}
        style={defaultStyle}
        showDebug={true}
        saveData={mockSaveData}
        getPokemonName={mockGetPokemonName}
      />,
    );

    await expect.element(page.getByText('CRITICAL MISSION')).toBeVisible();
    await expect.element(page.getByText(/WARNING: Watch out!/i)).toBeVisible();
    await expect.element(page.getByText(/P: 99/)).toBeVisible();
  });

  it('renders time of day icons when enc.time is provided', async () => {
    const suggestion: Suggestion = {
      id: 'test-time',
      priority: 10,
      category: 'Catch',
      title: 'Catch a time mon',
      description: 'Time check.',
      pokemonIds: [7],
      encounterInfo: {
        7: [
          { areaId: 0, method: 'walk', chance: 100, minLevel: 5, maxLevel: 5, time: 7 }, // Morning | Day | Night
        ],
      },
    };

    await renderWithProviders(
      <AssistantSuggestionCard
        suggestion={suggestion}
        style={defaultStyle}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={mockGetPokemonName}
      />,
    );

    await expect.element(page.getByTitle('Morning')).toBeVisible();
    await expect.element(page.getByTitle('Day')).toBeVisible();
    await expect.element(page.getByTitle('Night')).toBeVisible();
  });

  it('renders multiple encounters properly evaluating max chance', async () => {
    const suggestion: Suggestion = {
      id: 'test-6',
      priority: 10,
      category: 'Catch',
      title: 'Catch a test mon',
      description: 'Find it.',
      pokemonIds: [7],
      encounterInfo: {
        7: [
          { areaId: 0, method: 'walk', chance: 10, minLevel: 5, maxLevel: 5 },
          { areaId: 0, method: 'walk', chance: 30, minLevel: 6, maxLevel: 6 },
          { areaId: 0, method: 'walk', chance: 20, minLevel: 7, maxLevel: 7 },
        ],
      },
    };

    const areaNames = { 0: 'Route 1' };

    await renderWithProviders(
      <AssistantSuggestionCard
        suggestion={suggestion}
        style={defaultStyle}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={mockGetPokemonName}
        areaNames={areaNames}
      />,
    );

    await expect.element(page.getByText('30%')).toBeVisible();
  });

  it('renders correctly when encounterInfo does not have data for a pokemon', async () => {
    const suggestion: Suggestion = {
      id: 'test-7',
      priority: 10,
      category: 'Catch',
      title: 'Catch an unknown mon',
      description: 'Find it if you can.',
      pokemonIds: [10],
      encounterInfo: {},
    };

    const areaNames = { 0: 'Route 1' };

    await renderWithProviders(
      <AssistantSuggestionCard
        suggestion={suggestion}
        style={defaultStyle}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={mockGetPokemonName}
        areaNames={areaNames}
      />,
    );

    await expect.element(page.getByText('Catch an unknown mon')).toBeVisible();
    await expect.element(page.getByText('Find it if you can.')).toBeVisible();
  });

  it('renders correctly when one of the encounter chances is equal to mainEnc chance', async () => {
    const suggestion: Suggestion = {
      id: 'test-8',
      priority: 10,
      category: 'Catch',
      title: 'Catch an equal mon',
      description: 'Find it if you can.',
      pokemonIds: [10],
      encounterInfo: {
        10: [
          { areaId: 0, method: 'walk', chance: 10, minLevel: 5, maxLevel: 5 },
          { areaId: 0, method: 'walk', chance: 10, minLevel: 6, maxLevel: 6 },
        ],
      },
    };

    const areaNames = { 0: 'Route 1' };

    const { getByText } = await renderWithProviders(
      <AssistantSuggestionCard
        suggestion={suggestion}
        style={defaultStyle}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={mockGetPokemonName}
        areaNames={areaNames}
      />,
    );
    await expect.element(getByText('Find it if you can.')).toBeVisible();
    await expect.element(page.getByText('Catch an equal mon')).toBeVisible();
  });

  it('renders correctly when category is not catch and pokemonIds exist', async () => {
    const suggestion: Suggestion = {
      id: 'test-9',
      priority: 10,
      category: 'Evolve',
      title: 'Evolve something',
      description: 'Find it if you can.',
      pokemonIds: [1, 4, 7, 10, 11, 12, 13, 14, 15],
    };

    await renderWithProviders(
      <AssistantSuggestionCard
        suggestion={suggestion}
        style={defaultStyle}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={mockGetPokemonName}
      />,
    );
    await expect.element(page.getByText('Evolve something')).toBeVisible();
    await expect.element(page.getByText('Find it if you can.')).toBeVisible();
  });
});
