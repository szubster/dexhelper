import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { RejectedSuggestion } from '@dexhelper/engine/assistant/strategies/types';
import type { SaveData } from '@dexhelper/engine/saveParser/index';
import { AssistantDebugView } from '../AssistantDebugView';

describe('AssistantDebugView', () => {
  const mockGetPokemonName = vi.fn<(id: number) => string>((id) => {
    return id === 1 ? 'Bulbasaur' : 'Unknown';
  });

  const mockSaveData: SaveData = {
    generation: 1,
    gameVersion: 'red',
    trainerId: 12345,
    trainerName: 'ASH',
    badges: 0,
    inventory: [],
    pcItems: [],
    party: [],
    pc: [],
    partyDetails: [],
    pcDetails: [],
    owned: new Set([1, 2, 3]),
    seen: new Set(),
    currentMapId: 4,
    currentMapName: 'Pallet Town',
    currentBoxCount: 0,
    hallOfFameCount: 0,
  };

  it('renders nothing when saveData is null', async () => {
    await render(<AssistantDebugView rejected={[]} getPokemonName={mockGetPokemonName} saveData={null} />);
    await expect.element(page.getByText('[ SYS.DIAGNOSTICS ]')).not.toBeInTheDocument();
  });

  it('renders diagnostics without rejected logs', async () => {
    await render(<AssistantDebugView rejected={[]} getPokemonName={mockGetPokemonName} saveData={mockSaveData} />);

    await expect.element(page.getByText('[ SYS.DIAGNOSTICS ]')).toBeVisible();
    await expect.element(page.getByText('Pallet Town')).toBeVisible();
    await expect.element(page.getByText('ID: 4 (0x04)')).toBeVisible();
    await expect.element(page.getByText('red')).toBeVisible();
    await expect.element(page.getByText('Gen: 1')).toBeVisible();
    await expect.element(page.getByText('3', { exact: true })).toBeVisible(); // Owned
    await expect.element(page.getByText('ASH')).toBeVisible();
    await expect.element(page.getByText('ID: 12345')).toBeVisible();
    await expect.element(page.getByText('[ REJECTED_LOGS ]')).not.toBeInTheDocument();
  });

  it('renders rejected logs', async () => {
    const rejected: RejectedSuggestion[] = [
      {
        pokemonId: 1,
        code: 'MISSING_DATA',
        reason: 'This is a test reason',
      },
    ];

    await render(
      <AssistantDebugView rejected={rejected} getPokemonName={mockGetPokemonName} saveData={mockSaveData} />,
    );

    await expect.element(page.getByText('[ REJECTED_LOGS ]')).toBeVisible();
    await expect.element(page.getByText('#001')).toBeVisible();
    await expect.element(page.getByText('Bulbasaur')).toBeVisible();
    await expect.element(page.getByText('MISSING_DATA')).toBeVisible();
    await expect.element(page.getByText('"This is a test reason"')).toBeVisible();
  });

  it('renders Volcanic Ash count for Gen 3 saves', async () => {
    const gen3SaveData: SaveData = {
      ...mockSaveData,
      generation: 3,
      gameVersion: 'emerald',
      gen3VolcanicAsh: 450,
    };

    await render(<AssistantDebugView rejected={[]} getPokemonName={mockGetPokemonName} saveData={gen3SaveData} />);

    await expect.element(page.getByText('450', { exact: true })).toBeVisible();
    await expect.element(page.getByText('Volcanic Ash')).toBeVisible();
  });
});
