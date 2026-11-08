import type { QueryFunctionContext } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import { pokeDB } from '../db/PokeDB';
import type { PokemonMetadata } from '../db/schema';
import { pokemonListQueryOptions } from './pokemonQueries';

vi.mock('../db/PokeDB', () => ({
  pokeDB: {
    getAllPokemon: vi.fn<() => Promise<PokemonMetadata[]>>(),
  },
}));

describe('pokemonQueries', () => {
  describe('pokemonListQueryOptions', () => {
    it('should have correct queryKey', () => {
      expect(pokemonListQueryOptions.queryKey).toEqual(['pokemonList']);
    });

    it('should fetch, map, and sort pokemon data correctly', async () => {
      const mockGetAll = vi.fn<() => Promise<Array<{ id: number; n: string }>>>().mockResolvedValue([
        { id: 2, n: 'ivysaur' },
        { id: 1, n: 'bulbasaur' },
        { id: 3, n: 'venusaur' },
      ]);

      vi.mocked(pokeDB.getAllPokemon).mockImplementation(mockGetAll as unknown as () => Promise<PokemonMetadata[]>);

      const context = {
        queryKey: ['pokemonList'] as string[],
        signal: new AbortController().signal,
        meta: undefined,
      } as unknown as QueryFunctionContext<string[]>;

      const result = await pokemonListQueryOptions.queryFn?.(context);

      expect(mockGetAll).toHaveBeenCalled();
      expect(result).toEqual([
        { id: 1, name: 'Bulbasaur', nameLower: 'bulbasaur', idString: '1' },
        { id: 2, name: 'Ivysaur', nameLower: 'ivysaur', idString: '2' },
        { id: 3, name: 'Venusaur', nameLower: 'venusaur', idString: '3' },
      ]);
    });
  });
});
