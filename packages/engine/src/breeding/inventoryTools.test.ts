import { describe, expect, it } from 'vitest';
import type { PokemonInstance, SaveData } from '../saveParser/index';
import { buildInventoryBySpecies, extractAllInstances } from './inventoryTools';

describe('inventoryTools', () => {
  const mockParty: PokemonInstance[] = [
    { speciesId: 1, level: 5, isShiny: false, moves: [], storageLocation: 'party', hash: 'a' },
  ];

  const mockPC: PokemonInstance[] = [
    { speciesId: 1, level: 10, isShiny: false, moves: [], storageLocation: 'pc', hash: 'b' },
    { speciesId: 4, level: 5, isShiny: false, moves: [], storageLocation: 'pc', hash: 'c' },
  ];

  it('extractAllInstances should combine party and PC box members', () => {
    const saveData: Partial<SaveData> = {
      partyDetails: mockParty,
      pcDetails: mockPC,
    };

    const instances = extractAllInstances(saveData as SaveData);
    expect(instances.length).toBe(3);
    expect(instances[0]?.speciesId).toBe(1);
    expect(instances[1]?.speciesId).toBe(1);
    expect(instances[2]?.speciesId).toBe(4);
  });

  it('buildInventoryBySpecies should group instances by species ID', () => {
    const instances = [...mockParty, ...mockPC];
    const inventory = buildInventoryBySpecies(instances);

    expect(inventory.has(1)).toBe(true);
    expect(inventory.get(1)?.length).toBe(2);
    expect(inventory.has(4)).toBe(true);
    expect(inventory.get(4)?.length).toBe(1);
    expect(inventory.has(2)).toBe(false);
  });
});
