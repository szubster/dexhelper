import type { QueryFunctionContext } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import { getDB, pokeDB } from '../db/PokeDB';
import type { PokeDBSchema } from '../db/schema';
import { pokemonListQueryOptions } from './pokemonQueries';

vi.mock('../db/PokeDB', () => ({
  pokeDB: {
    getAllPokemon: vi.fn<() => Promise<import('../db/schema').PokemonMetadata[]>>(),
  },
  getDB: vi.fn<() => Promise<import('idb').IDBPDatabase<PokeDBSchema>>>(),
}));

describe('pokemonQueries', () => {
  describe('pokemonListQueryOptions', () => {
    it('should have correct queryKey', () => {
      expect(pokemonListQueryOptions.queryKey).toEqual(['pokemonList']);
    });

    it('should fetch, map, and sort pokemon data correctly', async () => {
      const mockGetAllPokemon = vi.fn<() => Promise<import('../db/schema').PokemonMetadata[]>>().mockResolvedValue([
        { id: 2, n: 'ivysaur' } as import('../db/schema').PokemonMetadata,

        { id: 1, n: 'bulbasaur' } as import('../db/schema').PokemonMetadata,
        { id: 3, n: 'venusaur' } as import('../db/schema').PokemonMetadata,
      ]);

      vi.mocked(pokeDB.getAllPokemon).mockImplementation(mockGetAllPokemon);
      vi.mocked(getDB).mockResolvedValue({
        getAll: vi.fn<() => Promise<unknown[]>>(),
      } as unknown as import('idb').IDBPDatabase<PokeDBSchema>);

      const context = {
        queryKey: ['pokemonList'] as string[],
        signal: new AbortController().signal,
        meta: undefined,
      } as unknown as QueryFunctionContext<string[]>;

      const result = await pokemonListQueryOptions.queryFn?.(context);

      expect(mockGetAllPokemon).toHaveBeenCalled();
      expect(result).toEqual([
        { id: 1, name: 'Bulbasaur', nameLower: 'bulbasaur', idString: '1' },
        { id: 2, name: 'Ivysaur', nameLower: 'ivysaur', idString: '2' },
        { id: 3, name: 'Venusaur', nameLower: 'venusaur', idString: '3' },
      ]);
    });
  });
});
