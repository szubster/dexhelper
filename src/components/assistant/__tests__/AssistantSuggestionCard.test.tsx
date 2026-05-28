import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { Suggestion } from '../../../engine/assistant/strategies/types';
import type { SaveData } from '../../../engine/saveParser/index';
import { AssistantSuggestionCard } from '../AssistantSuggestionCard';

const mockSaveData = {
  generation: 1 as const,
  gameVersion: 'red' as const,
  trainerName: 'ASH',
  trainerId: 1,
  currentMapId: 0,
  party: [],
  partyDetails: [],
  pc: [],
  pcDetails: [],
  owned: new Set<number>(),
  seen: new Set<number>(),
  inventory: [{ id: 4, quantity: 1 }],
  badges: 0,
  currentBoxCount: 0,
  hallOfFameCount: 0,
} as SaveData;

const rootRoute = createRootRoute();
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function TestComponent() {
    const mockSuggestion: Suggestion = {
      id: 'catch-1',
      category: 'Catch',
      title: 'Catch Target',
      description: 'Catch it.',
      priority: 50,
      pokemonId: 1,
      pokemonIds: [1],
      encounterInfo: {
        1: [
          { method: 'walk', chance: 10, minLevel: 2, aid: 1 },
          { method: 'walk', chance: 50, minLevel: 2, aid: 1 },
          { method: 'walk', chance: 20, minLevel: 2, aid: 1 },
        ],
      },
    };

    const getPokemonName = (_id: number) => 'Bulbasaur';
    const areaNames = { 1: 'Route 1' };

    return (
      <AssistantSuggestionCard
        suggestion={mockSuggestion}
        // biome-ignore lint/suspicious/noExplicitAny: mocked icon for test
        style={{ color: 'text-emerald-400', bg: 'bg-emerald-500', icon: null as any }}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={getPokemonName}
        areaNames={areaNames}
      />
    );
  },
});
const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute]),
  history: createMemoryHistory({ initialEntries: ['/'] }),
});

describe('AssistantSuggestionCard', () => {
  test('renders multiple encounters with max chance selected', async () => {
    await render(<RouterProvider router={router} />);

    await expect.element(page.getByText('50%')).toBeVisible();
  });
});
