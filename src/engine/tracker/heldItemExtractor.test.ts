import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../saveParser/parsers/common';
import { extractHeldItems } from './heldItemExtractor';

describe('extractHeldItems', () => {
  it('should extract held items from party', () => {
    const saveData = {
      partyDetails: [
        { item: 1 } as PokemonInstance,
        { item: 2 } as PokemonInstance,
        { item: 0 } as PokemonInstance,
        { item: undefined } as unknown as PokemonInstance,
      ],
      pcDetails: [],
    } as unknown as SaveData;
    const result = extractHeldItems(saveData);
    expect(result).toEqual([1, 2]);
  });

  it('should extract held items from PC boxes', () => {
    const saveData = {
      partyDetails: [],
      pcDetails: [{ item: 3 } as PokemonInstance, { item: 4 } as PokemonInstance, { item: 5 } as PokemonInstance],
    } as unknown as SaveData;
    const result = extractHeldItems(saveData);
    expect(result).toEqual([3, 4, 5]);
  });

  it('should extract held items including duplicates from both party and PC boxes', () => {
    const saveData = {
      partyDetails: [{ item: 1 } as PokemonInstance, { item: 2 } as PokemonInstance, { item: 3 } as PokemonInstance],
      pcDetails: [{ item: 2 } as PokemonInstance, { item: 4 } as PokemonInstance],
    } as unknown as SaveData;
    const result = extractHeldItems(saveData);
    expect(result).toEqual([1, 2, 2, 3, 4]);
  });

  it('should handle undefined party and boxes', () => {
    const saveData = {} as SaveData;
    const result = extractHeldItems(saveData);
    expect(result).toEqual([]);
  });

  it('should handle null pokemon instances', () => {
    const saveData = {
      partyDetails: [null as unknown as PokemonInstance],
      pcDetails: [null as unknown as PokemonInstance],
    } as unknown as SaveData;
    const result = extractHeldItems(saveData);
    expect(result).toEqual([]);
  });
});
