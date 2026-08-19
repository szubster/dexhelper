import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '@dexhelper/engine/saveParser/parsers/common';
import { useStore } from '../../../../store';
import { GlobalRibbonChecklistDashboard } from '../GlobalRibbonChecklistDashboard';

vi.mock('../../../../store', () => ({
  useStore: vi.fn<() => unknown>(),
}));

describe('GlobalRibbonChecklistDashboard', () => {
  it('renders nothing if not generation 3', async () => {
    vi.mocked(useStore).mockImplementation((selector) => {
      const state = { saveData: { generation: 2 } as SaveData, isLivingDex: false };
      return selector(state as unknown as Parameters<Parameters<typeof useStore>[0]>[0]);
    });

    await render(<GlobalRibbonChecklistDashboard />);
    await expect.element(page.getByText('GLOBAL RIBBON CHECKLIST')).not.toBeInTheDocument();
  });

  it('renders NO POKEMON WITH RIBBONS FOUND if no pokemon have ribbons', async () => {
    vi.mocked(useStore).mockImplementation((selector) => {
      const state = {
        saveData: {
          generation: 3,
          partyDetails: [],
          pcDetails: [],
        } as unknown as SaveData,
        isLivingDex: false,
      };
      return selector(state as unknown as Parameters<Parameters<typeof useStore>[0]>[0]);
    });

    await render(<GlobalRibbonChecklistDashboard />);
    await expect.element(page.getByText('NO POKEMON WITH RIBBONS FOUND')).toBeInTheDocument();
  });

  it('renders list of pokemon with ribbons', async () => {
    vi.mocked(useStore).mockImplementation((selector) => {
      const state = {
        saveData: {
          generation: 3,
          partyDetails: [
            {
              speciesId: 25,
              level: 10,
              nickname: 'PIKACHU',
              ribbons: { cool: 1, beauty: 0, cute: 2, smart: 0, tough: 0 },
            },
          ],
          pcDetails: [],
        } as unknown as SaveData,
        isLivingDex: true,
      };
      return selector(state as unknown as Parameters<Parameters<typeof useStore>[0]>[0]);
    });

    await render(<GlobalRibbonChecklistDashboard />);
    await expect.element(page.getByText('GLOBAL RIBBON CHECKLIST')).toBeInTheDocument();
    await expect.element(page.getByText('PIKACHU (Lv 10)')).toBeInTheDocument();
    await expect.element(page.getByText('Cool', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Cute', { exact: true })).toBeInTheDocument();
  });
});
