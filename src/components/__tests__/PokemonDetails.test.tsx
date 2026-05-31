import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { dexDataLoader } from '../../db/DexDataLoader';
import type { SaveData } from '../../engine/saveParser/index';
import { PokemonDetails } from '../PokemonDetails';

const queryClient = new QueryClient();

describe('PokemonDetails', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders Pokemon details and correctly processes encounters for Safari Zone', async () => {
    vi.spyOn(dexDataLoader, 'getPokemonDetails').mockResolvedValue({
      pokemon: {
        id: 1,

        efrm: [2, 3],
        eto: [],
        det: [{ tr: 1, ml: 16 }],
        cr: 45,
        baby: false,
      } as unknown as import('../../db/schema').PokemonMetadata,
      encounters: [
        { versionId: 1, areaId: 10, details: [{ chance: 100, minLevel: 5, maxLevel: 5, method: 1 }] },
        { versionId: 1, areaId: 11, details: [{ chance: 50, minLevel: 3, maxLevel: 6, method: 2 }] },
        { versionId: 2, areaId: 10, details: [{ chance: 100, minLevel: 5, maxLevel: 5, method: 1 }] },
      ],
      nameMap: { 1: 'Bulbasaur', 2: 'Ivysaur', 3: 'Venusaur' },
      areaNames: { 10: 'Safari Zone', 11: 'Another Area' },
    });

    const mockSaveData: SaveData = {
      generation: 1,
      party: [2],
      pc: [1],
      owned: new Set([1, 2]),
      // @ts-expect-error - strict typing allows partial structure for test
      partyDetails: [{ speciesId: 1, isShiny: true }],
      // @ts-expect-error - strict typing allows partial structure for test
      pcDetails: [{ speciesId: 1, isShiny: false }],
      badges: 0,
      money: 0,
      id: 1,
      playerName: 'Ash',
      timePlayed: '10:00',
    };

    await render(
      <QueryClientProvider client={queryClient}>
        <PokemonDetails
          pokemonId={1}
          pokemonName="Bulbasaur"
          gameVersion="red"
          saveData={mockSaveData}
          isLivingDex={true}
          pokeball="poke"
          onClose={() => {}}
          onNavigate={() => {}}
        />
      </QueryClientProvider>,
    );

    // Wait for the query to resolve
    await expect.element(page.getByRole('heading', { name: 'Bulbasaur' })).toBeVisible();

    // Check that we render the locations correctly (Safari Zone)
    await expect.element(page.getByText(/Safari Zone/i)).toBeVisible();
    await expect.element(page.getByText(/Another Area/i)).toBeVisible();
  });

  it('handles unknown version and empty encounters safely', async () => {
    vi.spyOn(dexDataLoader, 'getPokemonDetails').mockResolvedValue({
      pokemon: {
        id: 4,

        efrm: [],
        eto: [{ id: 5, det: [{ tr: 1, ml: 16 }] }],
        det: [],
        cr: 45,
        baby: true,
      } as unknown as import('../../db/schema').PokemonMetadata,
      encounters: [],
      nameMap: { 4: 'Charmander', 5: 'Charmeleon' },
      areaNames: {},
    });

    await render(
      <QueryClientProvider client={queryClient}>
        <PokemonDetails
          pokemonId={4}
          pokemonName="Charmander"
          gameVersion="unknown"
          saveData={null}
          isLivingDex={false}
          pokeball="poke"
          onClose={() => {}}
          onNavigate={() => {}}
        />
      </QueryClientProvider>,
    );

    // Wait for the query to resolve
    await expect.element(page.getByRole('heading', { name: 'Charmander' })).toBeVisible();

    // Check that we render the empty locations string "External cross-version extraction required" or similar from PokemonLocations component
    await expect.element(page.getByText(/DATA-SRC: UNKNOWN/i)).toBeVisible();
  });
});
