import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { dexDataLoader } from '../../db/DexDataLoader';
import type { SaveData } from '@dexhelper/engine/saveParser/index';
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
      enc: [
        { v: 1, aid: 10, d: [{ c: 100, min: 5, max: 5, m: 1 }] },
        { v: 1, aid: 11, d: [{ c: 50, min: 3, max: 6, m: 2 }] },
        { v: 2, aid: 10, d: [{ c: 100, min: 5, max: 5, m: 1 }] },
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
      partyDetails: [{ speciesId: 1, isShiny: true, hash: '' }],
      // @ts-expect-error - strict typing allows partial structure for test
      pcDetails: [{ speciesId: 1, isShiny: false, hash: '' }],
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

    // Give it time to lazy load
    await expect.element(page.getByText(/Safari Zone/i).first()).toBeVisible();
    await expect.element(page.getByText(/Another Area/i).first()).toBeVisible();
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
      enc: [],
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

    // Give it time to lazy load
    await expect.element(page.getByText(/SAT-LINK: UNKNOWN/i).first()).toBeVisible();
  });

  it('renders shiny carrier badge correctly', async () => {
    vi.spyOn(dexDataLoader, 'getPokemonDetails').mockResolvedValue({
      pokemon: {
        id: 7,
        efrm: [],
        eto: [],
        det: [],
        cr: 45,
        baby: false,
      } as unknown as import('../../db/schema').PokemonMetadata,
      enc: [],
      nameMap: { 7: 'Squirtle' },
      areaNames: {},
    });

    const mockSaveData: SaveData = {
      generation: 2,
      party: [],
      pc: [7],
      owned: new Set([7]),
      partyDetails: [],
      // @ts-expect-error - strict typing allows partial structure for test
      pcDetails: [{ speciesId: 7, isShiny: false, hash: '', isShinyCarrier: true }],
      badges: 0,
      money: 0,
      id: 1,
      playerName: 'Ash',
      timePlayed: '10:00',
    };

    const { container } = await render(
      <QueryClientProvider client={queryClient}>
        <PokemonDetails
          pokemonId={7}
          pokemonName="Squirtle"
          gameVersion="crystal"
          saveData={mockSaveData}
          isLivingDex={true}
          pokeball="poke"
          onClose={() => {}}
          onNavigate={() => {}}
        />
      </QueryClientProvider>,
    );

    await expect.element(page.getByRole('heading', { name: 'Squirtle' })).toBeVisible();

    // Test for the cyan colored border dashed element for shiny carrier badge
    const badge = container.querySelector('.border-cyan-500\\/50.border-dashed');
    expect(badge).toBeInTheDocument();
  });
});
