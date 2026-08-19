import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { pokeDB } from '../../../../db/PokeDB';
import type { PokemonInstance, SaveData } from '@dexhelper/engine/saveParser';
import { useStore } from '../../../../store';
import { ShinyCarrierBreedingDashboard } from '../ShinyCarrierBreedingDashboard';

vi.mock('../../../../store', () => ({
  useStore: vi.fn<(...args: unknown[]) => unknown>(),
}));

vi.mock('../../../../db/PokeDB', () => ({
  pokeDB: {
    getAllPokemon: vi.fn<(...args: unknown[]) => Promise<unknown>>(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('returns null if generation is not 2', async () => {
  vi.mocked(useStore, true).mockReturnValue({ generation: 3 } as unknown as SaveData);
  vi.mocked(pokeDB.getAllPokemon, true).mockResolvedValue([]);
  const { container } = await render(<ShinyCarrierBreedingDashboard />, { wrapper });
  expect(container.innerHTML).toBe('');
});

test('renders NO SHINY CARRIER BREEDING PAIRS AVAILABLE if no pairs match criteria', async () => {
  vi.mocked(useStore, true).mockReturnValue({
    generation: 2,
    partyDetails: [],
    pcDetails: [],
  } as unknown as SaveData);

  vi.mocked(pokeDB.getAllPokemon, true).mockResolvedValue([]);

  await render(<ShinyCarrierBreedingDashboard />, { wrapper });

  await expect.element(page.getByText('NO SHINY CARRIER BREEDING PAIRS AVAILABLE')).toBeInTheDocument();
});

test('renders optimal breeding pairs if matches are found', async () => {
  const pA: Partial<PokemonInstance> = {
    speciesId: 25, // Pikachu
    isShinyCarrier: true,
    isShiny: false,
    hash: '',
    dvs: { hp: 15, atk: 0, def: 10, spd: 10, spc: 10 },
  };

  const pB: Partial<PokemonInstance> = {
    speciesId: 132, // Ditto
    isShinyCarrier: false,
    isShiny: true,
    hash: '',
    dvs: { hp: 15, atk: 15, def: 15, spd: 15, spc: 15 },
  };

  vi.mocked(useStore, true).mockReturnValue({
    generation: 2,
    partyDetails: [pA as unknown as PokemonInstance],
    pcDetails: [pB as unknown as PokemonInstance],
  } as unknown as SaveData);

  vi.mocked(pokeDB.getAllPokemon, true).mockResolvedValue([
    { id: 25, n: 'Pikachu', cr: 0, gr: 4, eg: [5, 6], baby: false, eto: [], efrm: [], det: [] },
    { id: 132, n: 'Ditto', cr: 0, gr: -1, eg: [13], baby: false, eto: [], efrm: [], det: [] },
  ]);

  await render(<ShinyCarrierBreedingDashboard />, { wrapper });

  await expect.element(page.getByText('OPTIMAL BREEDING PAIRS', { exact: true })).toBeInTheDocument();
  await expect.element(page.getByText('SCORE: 2')).toBeInTheDocument();
  await expect.element(page.getByText('PIKACHU')).toBeInTheDocument();
  await expect.element(page.getByText('LOC: PARTY - SLOT 1')).toBeInTheDocument();
  await expect.element(page.getByText('DITTO')).toBeInTheDocument();
  await expect.element(page.getByText('LOC: BOX 1 - SLOT 1')).toBeInTheDocument();
});
