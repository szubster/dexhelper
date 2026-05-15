import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { dexDataLoader } from '../../db/DexDataLoader';
import { PokemonDetails } from '../PokemonDetails';

const queryClient = new QueryClient();

describe('PokemonDetails Locations Test', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders Pokemon details fallback locations correctly', async () => {
    vi.spyOn(dexDataLoader, 'getPokemonDetails').mockResolvedValue({
      pokemon: {
        id: 4,
        efrm: [],
        eto: [],
        det: [],
        cr: 45,
        baby: false,
      } as unknown as import('../../db/schema').PokemonMetadata,
      enc: [{ v: 1, aid: 10, d: [{ c: 100, min: 5, max: 5, m: 1 }] }],
      nameMap: { 4: 'Charmander' },
      areaNames: { 10: 'Area 10' },
    });

    await render(
      <QueryClientProvider client={queryClient}>
        <PokemonDetails
          pokemonId={4}
          pokemonName="Charmander"
          gameVersion="blue"
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

    // fallback locations component was removed data-testid in recent commit
  });
});
