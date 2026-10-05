import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { SafariTargetSelection } from '../SafariTargetSelection';
import { useSafariZoneSelection } from '../useSafariZoneSelection';

const queryClient = new QueryClient();

const renderWithQuery = (children: ReactNode) => {
  return render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </React.Suspense>,
  );
};

// Wrapper component to provide the selection hook
function TestWrapper() {
  const selection = useSafariZoneSelection({ initialVersion: 'emerald', initialTargetPokemon: null });
  return (
    <div>
      <div data-testid="version-value">{selection.version}</div>
      <div data-testid="target-value">{selection.targetPokemon === null ? 'null' : selection.targetPokemon}</div>
      <SafariTargetSelection selection={selection} />
    </div>
  );
}

describe('SafariTargetSelection', () => {
  beforeEach(() => {
    queryClient.clear();

    // Mock the pokemonList query response
    queryClient.setQueryData(
      ['pokemonList'],
      [
        { id: 25, name: 'Pikachu', nameLower: 'pikachu', idString: '25' },
        { id: 123, name: 'Scyther', nameLower: 'scyther', idString: '123' },
      ],
    );
  });

  it('renders the component with default selection', async () => {
    await renderWithQuery(<SafariTargetSelection />);
    await expect.element(page.getByText(/\[ Game Version \]/i)).toBeVisible();
    await expect.element(page.getByText(/\[ Target Pokémon \]/i)).toBeVisible();
  });

  it('changes game version and resets target pokemon', async () => {
    await renderWithQuery(<TestWrapper />);

    await expect.element(page.getByTestId('version-value')).toHaveTextContent('emerald');
    await expect.element(page.getByTestId('target-value')).toHaveTextContent('null');

    // Change to Yellow
    await userEvent.selectOptions(page.getByRole('combobox').nth(0), 'yellow');

    await expect.element(page.getByTestId('version-value')).toHaveTextContent('yellow');
    // Ensure target pokemon is still null after reset
    await expect.element(page.getByTestId('target-value')).toHaveTextContent('null');
  });

  it('changes target pokemon', async () => {
    await renderWithQuery(<TestWrapper />);

    await expect.element(page.getByTestId('target-value')).toHaveTextContent('null');

    const comboboxes = page.getByRole('combobox');

    // Select Pikachu
    await userEvent.selectOptions(comboboxes.nth(1), '25');

    await expect.element(page.getByTestId('target-value')).toHaveTextContent('25');
  });
});
