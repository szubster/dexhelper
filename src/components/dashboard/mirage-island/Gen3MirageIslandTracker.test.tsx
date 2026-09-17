import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';
import { Gen3MirageIslandTracker } from './Gen3MirageIslandTracker';
import type { Gen3SaveData } from '../../../engine/saveParser/parsers/common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { pokeDB } from '../../../db/PokeDB';

vi.mock('../../../db/PokeDB', () => ({
  pokeDB: {
    getPokemon: vi.fn(),
  },
}));

describe('Gen3MirageIslandTracker', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    );
  };

  it('renders correctly when no match is found', async () => {
    const saveData = {
      partyDetails: [],
      pcDetails: [],
    } as unknown as Gen3SaveData;

    const { getByText } = await renderWithProviders(<Gen3MirageIslandTracker saveData={saveData} />);

    await expect.element(getByText('NO MATCH FOUND')).toBeVisible();
  });

  it('renders correctly when a match is found in the party', async () => {
    vi.mocked(pokeDB.getPokemon).mockResolvedValueOnce({ id: 25, n: 'Pikachu' } as any);

    const saveData = {
      partyDetails: [
        { isMirageIslandKey: true, speciesId: 25 },
      ],
      pcDetails: [],
    } as unknown as Gen3SaveData;

    const { getByText } = await renderWithProviders(<Gen3MirageIslandTracker saveData={saveData} />);

    await expect.element(getByText('MATCH FOUND')).toBeVisible();
    await expect.element(getByText('SPECIES')).toBeVisible();
    await expect.element(getByText('PIKACHU')).toBeVisible();
    await expect.element(getByText('LOCATION')).toBeVisible();
    await expect.element(getByText('Party')).toBeVisible();
  });

  it('renders correctly when a match is found in the PC', async () => {
    vi.mocked(pokeDB.getPokemon).mockResolvedValueOnce({ id: 151, n: 'Mew' } as any);

    const saveData = {
      partyDetails: [],
      pcDetails: [
        { isMirageIslandKey: false, speciesId: 1 },
        { isMirageIslandKey: true, speciesId: 151, storageLocation: 'Box 2' },
      ],
    } as unknown as Gen3SaveData;

    const { getByText } = await renderWithProviders(<Gen3MirageIslandTracker saveData={saveData} />);

    await expect.element(getByText('MATCH FOUND')).toBeVisible();
    await expect.element(getByText('SPECIES')).toBeVisible();
    await expect.element(getByText('MEW')).toBeVisible();
    await expect.element(getByText('LOCATION')).toBeVisible();
    await expect.element(getByText('Box 2')).toBeVisible();
  });
});
