import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { VisitedRoutesChecklistProps } from '../../components/run/VisitedRoutesChecklist';
import type { UnifiedLocation } from '../../db/schema';

// Mock dependencies
vi.mock('../../db/PokeDB', () => ({
  pokeDB: {
    getAllAreas: vi.fn<() => Promise<Pick<UnifiedLocation, 'id' | 'n'>[]>>().mockResolvedValue([
      { id: 1, n: 'Route 1' },
      { id: 2, n: 'Route 2' },
      { id: 3, n: 'Route 3' },
    ]),
  },
}));

const mockSaveData = {
  generation: 2,
  partyDetails: [],
  player: { name: 'ASH' },
  boxes: [],
};

vi.mock('../../store', () => ({
  useStore: vi.fn<(selector: (state: { saveData: typeof mockSaveData }) => unknown) => unknown>((selector) =>
    selector({ saveData: mockSaveData }),
  ),
}));

vi.mock('../../engine/nuzlocke/tracker', () => ({
  aggregateEncountersByLocation: vi
    .fn<() => unknown>()
    .mockReturnValue([{ locationId: 1, locationName: 'Route 1', encounters: [] }]),
}));

vi.mock('../../components/run/AliveTeamView', () => ({
  AliveTeamView: () => <div data-testid="alive-team-view">Alive Team</div>,
}));

vi.mock('../../components/run/VisitedRoutesChecklist', () => ({
  VisitedRoutesChecklist: ({ visited, unvisited }: VisitedRoutesChecklistProps) => (
    <div data-testid="visited-routes-checklist">
      <div data-testid="visited-count">{visited.length}</div>
      <div data-testid="unvisited-count">{unvisited.length}</div>
    </div>
  ),
}));

// We need to import the component we want to test
// The component is the component property of the Route object
import type React from 'react';
import { Route } from '../run';

describe('RunDashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with save data', async () => {
    // The component might be wrapped, let's just render Route.options.component
    const Component = Route.options.component as React.ComponentType;
    await render(<Component />);

    await expect.element(page.getByTestId('alive-team-view')).toBeInTheDocument();
    await expect.element(page.getByTestId('visited-routes-checklist')).toBeInTheDocument();

    // We mocked the hook and db so it should show 1 visited and 2 unvisited eventually
    // (Wait for useEffect to run)
    await expect.element(page.getByTestId('visited-count')).toHaveTextContent('1');
    await expect.element(page.getByTestId('unvisited-count')).toHaveTextContent('2');
  });
});
