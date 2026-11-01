import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { beforeEach, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { EmulatorContext } from '../../../../contexts/EmulatorContext';
import type { PokemonMetadata } from '../../../../db/schema';
import { useEmulatorStore } from '../../../../emulator/state/emulatorStore';
import type { SaveData } from '../../../../engine/saveParser/index';
import type { PokemonInstance } from '../../../../engine/saveParser/parsers/common';
import { useShinyBreedingStore } from '../../store';
import { ShinyBreedingManualSelector } from '../ShinyBreedingManualSelector';

vi.mock('../../../../db/PokeDB', () => ({
  pokeDB: {
    getAllPokemon: vi
      .fn<() => Promise<PokemonMetadata[]>>()
      .mockResolvedValue([
        { id: 25, n: 'Pikachu', gr: 4, eg: [1] } as unknown as PokemonMetadata,
        { id: 132, n: 'Ditto', gr: -1, eg: [13] } as unknown as PokemonMetadata,
      ]),
  },
}));

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const mockSaveData = {
  generation: 2,
  partyDetails: [{ speciesId: 25, dvs: { atk: 15, def: 10, spd: 10, spc: 10 }, isShiny: true }],
  pcDetails: [{ speciesId: 132, dvs: { atk: 7, def: 10, spd: 10, spc: 10 }, isShiny: false }],
};

beforeEach(() => {
  useShinyBreedingStore.getState().clearParents();
});

test('renders manual selector and calculates odds', async () => {
  useEmulatorStore.setState({ saveData: mockSaveData as unknown as SaveData });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <EmulatorContext.Provider value={useEmulatorStore}>{children}</EmulatorContext.Provider>
    </QueryClientProvider>
  );

  const { getByText } = await render(<ShinyBreedingManualSelector />, { wrapper });

  await expect.element(getByText('MANUAL PAIR EVALUATION')).toBeVisible();

  const selects = document.querySelectorAll('select');
  expect(selects.length).toBe(2);

  useShinyBreedingStore.getState().setParent1(mockSaveData.partyDetails[0] as unknown as PokemonInstance);
  useShinyBreedingStore.getState().setParent2(mockSaveData.pcDetails[0] as unknown as PokemonInstance);

  await expect.element(getByText('MALE OFFSPRING: 1/64', { exact: true })).toBeVisible();
});
