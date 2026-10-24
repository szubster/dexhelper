import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import * as missingHook from '../../../hooks/safariZone/useSafariZoneMissingEncounters';
import { useStore } from '../../../store';
import { SafariBountyBoard } from '../SafariBountyBoard';

const queryClient = new QueryClient();

const renderWithQuery = (children: ReactNode) => {
  return render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </React.Suspense>,
  );
};

vi.mock('../../../hooks/safariZone/useSafariZoneMissingEncounters', () => ({
  // biome-ignore lint/suspicious/noExplicitAny: explicit mock type needed
  useSafariZoneMissingEncounters: vi.fn<any>(),
}));

describe('SafariBountyBoard', () => {
  beforeEach(() => {
    queryClient.clear();
    queryClient.setQueryData(
      ['pokemonList'],
      [
        { id: 25, name: 'Pikachu', nameLower: 'pikachu', idString: '25' },
        { id: 123, name: 'Scyther', nameLower: 'scyther', idString: '123' },
      ],
    );
    useStore.setState({
      saveData: {
        generation: 1,
        gameVersion: 'yellow',
        owned: new Set<number>(),
        party: [],
        pc: [],
        // biome-ignore lint/suspicious/noExplicitAny: Mock save data for testing missing encounters
      } as any,
    });
  });

  it('renders no active bounties when missingAreas is empty', async () => {
    vi.mocked(missingHook.useSafariZoneMissingEncounters).mockReturnValue([]);
    await renderWithQuery(<SafariBountyBoard />);
    await expect.element(page.getByText('NO BOUNTIES ACTIVE')).toBeVisible();
    await expect.element(page.getByText(/\[ ALL SECURED \]/i)).toBeVisible();
  });

  it('renders bounties correctly', async () => {
    vi.mocked(missingHook.useSafariZoneMissingEncounters).mockReturnValue([
      {
        name: 'KANTO-SAFARI-ZONE',
        encounters: {
          yellow: [
            { pokemon: 25, chance: 10, minLevel: 15, maxLevel: 20, method: 'grass' },
            { pokemon: 123, chance: 5, minLevel: 25, maxLevel: 30, method: 'grass' },
          ],
        },
      },
    ]);

    await renderWithQuery(<SafariBountyBoard />);
    await expect.element(page.getByText(/\[ 2 TARGETS \]/i)).toBeVisible();
    await expect.element(page.getByText('Pikachu')).toBeVisible();
    await expect.element(page.getByText('Scyther')).toBeVisible();
    await expect.element(page.getByText(/10%/i)).toBeVisible();
    await expect.element(page.getByText(/L15/i)).toBeVisible();
  });
});
