import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../saveParser/parsers/common';
import { extractHeldItems } from './heldItemExtractor';

describe('extractHeldItems', () => {
  it('extracts held items from party and pc details without duplicates and sorts them', () => {
    const mockSaveData = {
      partyDetails: [{ item: 5 }, { item: 2 }, { item: undefined }, { item: 0 }] as PokemonInstance[],
      pcDetails: [
        { item: 10 },
        { item: 5 }, // duplicate
        { item: undefined },
      ] as PokemonInstance[],
    } as SaveData;

    const items = extractHeldItems(mockSaveData);
    expect(items).toEqual([2, 5, 10]);
  });

  it('returns empty array if no items are held', () => {
    const mockSaveData = {
      partyDetails: [{ item: 0 }, { item: undefined }] as PokemonInstance[],
      pcDetails: [{ item: 0 }] as PokemonInstance[],
    } as SaveData;

    expect(extractHeldItems(mockSaveData)).toEqual([]);
  });

  it('returns empty array if no pokemon exist', () => {
    const mockSaveData = {
      partyDetails: [] as PokemonInstance[],
      pcDetails: [] as PokemonInstance[],
    } as SaveData;

    expect(extractHeldItems(mockSaveData)).toEqual([]);
  });
});
