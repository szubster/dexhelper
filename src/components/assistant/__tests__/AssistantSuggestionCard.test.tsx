import React from 'react';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, it, expect } from 'vitest';
import { AssistantSuggestionCard } from '../AssistantSuggestionCard';
import type { Suggestion } from '../../../engine/assistant/types';
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import type { SaveData } from '../../../engine/saveParser/index';

describe('AssistantSuggestionCard', () => {
  const mockSuggestion: Suggestion = {
    id: 'test-1',
    category: 'Nearby',
    title: 'Nearby: Pidgey',
    description: 'Found at Route 1 (1 areas away).',
    priority: 100,
    pokemonId: 16,
  };

  const mockSaveData = {
    generation: 1,
    inventory: [],
    money: 0,
    timePlayed: 0,
    badges: 0,
  } as unknown as SaveData;

  const mockStyle = {
    icon: <div>Icon</div>,
    color: 'text-zinc-500',
    bg: 'bg-zinc-500',
  };

  const rootRoute = createRootRoute({
    component: () => <AssistantSuggestionCard
        suggestion={mockSuggestion}
        style={mockStyle}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={() => 'Pidgey'}
    />
  });

  const rootRouteWithWarning = createRootRoute({
    component: () => <AssistantSuggestionCard
        suggestion={{...mockSuggestion, warning: 'Only available in the Morning/Night'}}
        style={mockStyle}
        showDebug={false}
        saveData={mockSaveData}
        getPokemonName={() => 'Pidgey'}
    />
  });

  const renderWithRouter = (route: typeof rootRoute) => {
    const memoryHistory = createMemoryHistory();
    const router = createRouter({ routeTree: route, history: memoryHistory });
    return render(<RouterProvider router={router} />);
  };

  it('renders the card with title and description', async () => {
    renderWithRouter(rootRoute);
    await expect.element(page.getByText('Nearby: Pidgey')).toBeInTheDocument();
    await expect.element(page.getByText('Found at Route 1 (1 areas away).')).toBeInTheDocument();
  });

  it('renders the warning section when suggestion has a warning', async () => {
    renderWithRouter(rootRouteWithWarning);
    await expect.element(page.getByText('Only available in the Morning/Night')).toBeInTheDocument();
  });
});
