import React, { useEffect } from 'react';
import { StorageGrid } from './StorageGrid';
import { useStore } from '../store';
import type { SaveData } from '../engine/saveParser';
import { expect, within } from '@storybook/test';

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

const meta = {
  title: 'Components/StorageGrid',
  component: StorageGrid,
};

export default meta;

export const Default = {
  render: () => {
    const setSaveData = useStore((s) => s.setSaveData);

    useEffect(() => {
      setSaveData(mockSaveData);
    }, [setSaveData]);

    return <StorageGrid pokemonList={mockPokemonList} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Check for filled locations
    const party = await canvas.findByText('Party');
    await expect(party).toBeInTheDocument();

    const units = await canvas.findAllByText('1 Units');
    await expect(units).toHaveLength(3); // Party, Box 1, Box 3 each have 1

    // Check for empty locations
    const box2 = await canvas.findByText('Box 2');
    await expect(box2).toBeInTheDocument();

    const box4 = await canvas.findByText('Box 4');
    await expect(box4).toBeInTheDocument();

    // Check for "EMPTY" text in empty boxes (there should be many in Gen 1 except Box 1 and Box 3)
    // Box 2, 4, 5, 6, 7, 8, 9, 10, 11, 12 and Daycare are empty.
    const emptyBoxes = await canvas.findAllByText('EMPTY');
    await expect(emptyBoxes).toHaveLength(11);
  }
};
