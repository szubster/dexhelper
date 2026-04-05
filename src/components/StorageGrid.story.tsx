import React, { useEffect } from 'react';
import { StorageGrid } from './StorageGrid';
import { useStore } from '../store';
import type { SaveData } from '../engine/saveParser';

const mockPokemonList = [
  { id: 1, name: 'Bulbasaur' },
  { id: 4, name: 'Charmander' },
  { id: 7, name: 'Squirtle' },
  { id: 25, name: 'Pikachu' },
];

const mockSaveData: SaveData = {
  generation: 1,
  owned: new Set([1, 4, 7, 25]),
  seen: new Set([1, 4, 7, 25]),
  party: [25],
  pc: [1, 4, 7],
  partyDetails: [
    {
      speciesId: 25,
      level: 5,
      isShiny: false,
      moves: [1],
      dvs: { hp: 10, atk: 10, def: 10, spd: 10, spc: 10 },
      storageLocation: 'Party',
      slot: 1,
    },
  ],
  pcDetails: [
    {
      speciesId: 1,
      level: 5,
      isShiny: false,
      moves: [3],
      dvs: { hp: 10, atk: 10, def: 10, spd: 10, spc: 10 },
      storageLocation: 'Box 1',
      slot: 1,
    },
    // Box 2 is empty
    {
      speciesId: 4,
      level: 5,
      isShiny: true,
      moves: [5],
      dvs: { hp: 15, atk: 15, def: 15, spd: 15, spc: 15 },
      storageLocation: 'Box 3',
      slot: 1,
    },
  ],
  gameVersion: 'yellow',
  badges: 0,
  trainerName: 'ASH',
  trainerId: 12345,
  currentMapId: 1,
  inventory: [],
  currentBoxCount: 1,
  hallOfFameCount: 0,
};

export function StorageGridStory() {
  const setSaveData = useStore((s) => s.setSaveData);

  useEffect(() => {
    setSaveData(mockSaveData);
  }, [setSaveData]);

  return <StorageGrid pokemonList={mockPokemonList} />;
}
