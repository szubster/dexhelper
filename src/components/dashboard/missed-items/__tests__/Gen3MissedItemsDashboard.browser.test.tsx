import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useGen3MissedItems } from '../../../../contexts/Gen3MissedItemsContext';
import { Gen3MissedItemsDashboard } from '../Gen3MissedItemsDashboard';

vi.mock('../../../../contexts/Gen3MissedItemsContext', () => ({
  useGen3MissedItems:
    vi.fn<() => { missedItemsData: { missedMasterBall: boolean; missedLegendaries: string[] } | null }>(),
}));

describe('Gen3MissedItemsDashboard', () => {
  it('renders null when there is no missed items data', async () => {
    vi.mocked(useGen3MissedItems).mockReturnValue({ missedItemsData: null });
    await render(<Gen3MissedItemsDashboard />);
    await expect.element(page.getByText('Missed Items & Milestones')).not.toBeInTheDocument();
  });

  it('renders missed master ball and missed legendaries', async () => {
    vi.mocked(useGen3MissedItems).mockReturnValue({
      missedItemsData: {
        missedMasterBall: true,
        missedLegendaries: ['Mewtwo', 'Kyogre'],
      },
    });

    await render(<Gen3MissedItemsDashboard />);
    await expect.element(page.getByText('Missed Items & Milestones')).toBeInTheDocument();
    await expect.element(page.getByText('Master Ball Status')).toBeInTheDocument();
    await expect.element(page.getByText('Missed', { exact: true })).toBeInTheDocument();

    await expect.element(page.getByText('Missed Legendaries')).toBeInTheDocument();
    await expect.element(page.getByText('Mewtwo')).toBeInTheDocument();
    await expect.element(page.getByText('Kyogre')).toBeInTheDocument();
  });

  it('renders not missed master ball and no legendaries', async () => {
    vi.mocked(useGen3MissedItems).mockReturnValue({
      missedItemsData: {
        missedMasterBall: false,
        missedLegendaries: [],
      },
    });

    await render(<Gen3MissedItemsDashboard />);
    await expect.element(page.getByText('Master Ball Status')).toBeInTheDocument();
    await expect.element(page.getByText('Not Missed (or Acquired)')).toBeInTheDocument();
    await expect.element(page.getByText('None')).toBeInTheDocument();
  });
});
