import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { PokeblockColor } from '../../../../engine/saveParser/gen3/pokeblock/types';
import type { SaveData } from '../../../../engine/saveParser/parsers/common';
import { Gen3PokeblocksDashboard } from '../Gen3PokeblocksDashboard';

const mockSaveData: SaveData = {
  generation: 3,
  gameVersion: 'emerald',
  isSaveDataInitialized: true,
  player: { name: 'TEST', id: '12345', money: 0, gender: 'boy' },
  pokedex: {},
  boxCount: 14,
  boxes: [],
  party: [],
  daycare: [],
  time: { hours: 0, minutes: 0, seconds: 0 },
  gameStats: {},
  gen3Pokeblocks: [{ color: PokeblockColor.Red }, { color: PokeblockColor.Blue }, { color: PokeblockColor.None }],
} as unknown as SaveData;

describe('Gen3PokeblocksDashboard', () => {
  it('renders correctly for gen 3 saves with pokeblocks', async () => {
    const screen = await render(<Gen3PokeblocksDashboard saveData={mockSaveData} />);
    await expect.element(screen.getByText('POKÉBLOCKS')).toBeInTheDocument();
    await expect.element(screen.getByText('RED POKÉBLOCK')).toBeInTheDocument();
    await expect.element(screen.getByText('BLUE POKÉBLOCK')).toBeInTheDocument();
  });

  it('renders nothing for non-gen 3 saves', async () => {
    const nonGen3Save = { ...mockSaveData, generation: 2 } as unknown as SaveData;
    const { container } = await render(<Gen3PokeblocksDashboard saveData={nonGen3Save} />);

    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when there are no pokeblocks', async () => {
    const noPokeblocksSave = { ...mockSaveData, gen3Pokeblocks: [] } as unknown as SaveData;
    const { container } = await render(<Gen3PokeblocksDashboard saveData={noPokeblocksSave} />);
    expect(container.innerHTML).toBe('');
  });
});
