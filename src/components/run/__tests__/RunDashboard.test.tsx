import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { pokeDB } from '../../../db/PokeDB';
import type { UnifiedLocation } from '../../../db/schema';
import type { SaveData } from '../../../engine/saveParser/parsers/common';
import { useStore } from '../../../store';
import { RunDashboard } from '../RunDashboard';

// Mock the child components to simplify testing
vi.mock('../AliveTeamView', () => ({
  AliveTeamView: () => <div data-testid="mock-alive-team">AliveTeamView</div>,
}));

vi.mock('../VisitedRoutesChecklist', () => ({
  VisitedRoutesChecklist: () => <div data-testid="mock-visited-checklist">VisitedRoutesChecklist</div>,
}));

describe('RunDashboard', () => {
  beforeEach(() => {
    useStore.setState({ saveData: null });
    vi.spyOn(pokeDB, 'getAllAreas').mockResolvedValue([]);
  });

  test('renders waiting state when saveData is null', async () => {
    const { getByText } = await render(<RunDashboard />);
    await expect.element(getByText('[ WAITING FOR SAVE DATA UPLOAD ]')).toBeVisible();
  });

  test('renders dashboard when saveData is available', async () => {
    const mockSaveData: SaveData = {
      generation: 3,
      trainerName: 'Ash',
      trainerId: 12345,
      party: [],
      partyDetails: [],
      pc: [],
      pcDetails: [],
      badges: 0,
      owned: new Set(),
      seen: new Set(),
      gameVersion: 'emerald',
      currentMapId: 1,
      inventory: [],
      currentBoxCount: 0,
      hallOfFameCount: 0,
    };
    useStore.setState({ saveData: mockSaveData });

    const mockAreas: UnifiedLocation[] = [
      { id: 1, n: 'Pallet Town', dist: {}, conn: [] },
      { id: 2, n: 'Route 1', dist: {}, conn: [] },
    ];
    vi.spyOn(pokeDB, 'getAllAreas').mockResolvedValue(mockAreas);

    const { getByTestId } = await render(<RunDashboard />);
    await expect.element(getByTestId('mock-alive-team')).toBeVisible();
    await expect.element(getByTestId('mock-visited-checklist')).toBeVisible();
  });
});
