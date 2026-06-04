import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { UnifiedLocation } from '../../../db/schema';
import type { LocationEncounters } from '../../../engine/nuzlocke/tracker';
import type { SaveData } from '../../../engine/saveParser';
import { Route } from '../../../routes/run';

// Mock dependencies
vi.mock('../../../store', () => ({
  useStore: vi.fn<(_: (state: { saveData: SaveData | null }) => unknown) => unknown>((selector) => {
    return selector({
      saveData: {
        partyDetails: [],
        generation: 3,
      } as unknown as SaveData,
    });
  }),
}));

vi.mock('../../../db/PokeDB', () => ({
  pokeDB: {
    getAllAreas: vi.fn<() => Promise<UnifiedLocation[]>>().mockResolvedValue([]),
  },
}));

vi.mock('../../../engine/nuzlocke/tracker', () => ({
  aggregateEncountersByLocation: vi.fn<() => LocationEncounters[]>().mockReturnValue([]),
}));

describe('RunDashboard', () => {
  it('renders correctly with saveData', async () => {
    const Component = Route.options.component as React.ElementType;
    await render(<Component />);
    await expect.element(page.getByText('RUN_DASHBOARD.SYS')).toBeInTheDocument();
  });

  it('renders awaiting data state when no saveData exists', async () => {
    const { useStore } = await import('../../../store');
    vi.mocked(useStore).mockImplementation((selector: unknown) => {
      // @ts-expect-error test mock
      return selector({
        saveData: null,
      });
    });

    const Component = Route.options.component as React.ElementType;
    await render(<Component />);
    await expect.element(page.getByText('[ AWAITING_DATA ]')).toBeInTheDocument();
  });
});
