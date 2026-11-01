import { expect, test, vi } from 'vitest';
import type { PokemonMetadata } from '../../db/schema';
import type { PokemonInstance } from '../../engine/saveParser/parsers/common';
import { getDerivedParentStats, useShinyBreedingStore } from './store';

vi.mock('../../db/PokeDB', () => ({
  pokeDB: {
    getAllPokemon: vi.fn<() => Promise<PokemonMetadata[]>>().mockResolvedValue([]),
  },
}));

test('should set and clear parents correctly', async () => {
  const store = useShinyBreedingStore.getState();
  expect(store.parent1).toBeNull();
  expect(store.parent2).toBeNull();

  const mon = { speciesId: 1, dvs: { atk: 15, def: 10, spd: 10, spc: 10, hp: 10 } } as PokemonInstance;

  store.setParent1(mon);
  expect(useShinyBreedingStore.getState().parent1).toEqual(mon);

  store.clearParents();
  expect(useShinyBreedingStore.getState().parent1).toBeNull();
});

test('getDerivedParentStats returns expected values', () => {
  const mon = { speciesId: 2, dvs: { atk: 1, def: 10, spd: 10, spc: 15, hp: 10 } } as PokemonInstance;
  const metadata = { id: 2, gr: 4 } as PokemonMetadata; // Half female, threshold 7

  const stats = getDerivedParentStats(mon, metadata);

  expect(stats).not.toBeNull();
  expect(stats?.speciesId).toBe(2);
  expect(stats?.defenseDv).toBe(10);
  expect(stats?.specialDv).toBe(15);
  expect(stats?.gender).toBe('female'); // Atk 1 <= 7
});
