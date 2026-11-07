import type { QueryFunctionContext } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import { pokeDB } from '../db/PokeDB';

import { pokemonListQueryOptions } from './pokemonQueries';

vi.mock('../db/PokeDB', () => ({
  pokeDB: {
    getAllPokemon: vi.fn<() => Promise<import('../db/schema').PokemonMetadata[]>>(),
  },
}));

describe('pokemonQueries', () => {
  describe('pokemonListQueryOptions', () => {
    it('should have correct queryKey', () => {
      expect(pokemonListQueryOptions.queryKey).toEqual(['pokemonList']);
    });

    it('should fetch, map, and sort pokemon data correctly', async () => {
      vi.mocked(pokeDB.getAllPokemon).mockResolvedValue([
        { id: 2, n: 'ivysaur' },
        { id: 1, n: 'bulbasaur' },
        { id: 3, n: 'venusaur' },
      ] as unknown as import('../db/schema').PokemonMetadata[]);

      const context = {
        queryKey: ['pokemonList'] as string[],
        signal: new AbortController().signal,
        meta: undefined,
      } as unknown as QueryFunctionContext<string[]>;

      const result = await pokemonListQueryOptions.queryFn?.(context);

      expect(pokeDB.getAllPokemon).toHaveBeenCalled();
      expect(result).toEqual([
        { id: 1, name: 'Bulbasaur', nameLower: 'bulbasaur', idString: '1' },
        { id: 2, name: 'Ivysaur', nameLower: 'ivysaur', idString: '2' },
        { id: 3, name: 'Venusaur', nameLower: 'venusaur', idString: '3' },
      ]);
    });
  });
});
