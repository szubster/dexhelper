import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagFilterPanel } from '../DagFilterPanel';

const mockUseDagContext = vi.fn<() => Record<string, unknown>>();

vi.mock('../../dashboard/DagContext', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../../dashboard/DagContext')>();
  return {
    ...mod,
    useDagContext: () => mockUseDagContext(),
  };
});

test('DagFilterPanel renders all types and statuses', async () => {
  const activeTypes = new Set(['TASK']);
  const activeStatuses = new Set(['COMPLETED', 'ACTIVE']);
  const mockToggleActiveType = vi.fn<(type: string) => void>();
  const mockToggleActiveStatus = vi.fn<(status: string) => void>();
  const mockToggleShowPermanentFailures = vi.fn<() => void>();
  const mockSetShowHeatmap = vi.fn<() => void>();

  mockUseDagContext.mockReturnValue({
    activeTypes,
    activeStatuses,
    showPermanentFailures: false,
    showHeatmap: false,
    toggleActiveType: mockToggleActiveType,
    toggleActiveStatus: mockToggleActiveStatus,
    toggleShowPermanentFailures: mockToggleShowPermanentFailures,
    setShowHeatmap: mockSetShowHeatmap,
  });

  await render(<DagFilterPanel />);

  await expect.element(page.getByText('TASK')).toBeInTheDocument();
  await expect.element(page.getByText('IDEA')).toBeInTheDocument();

  await expect.element(page.getByText('COMPLETED')).toBeInTheDocument();
  await expect.element(page.getByText('PENDING')).toBeInTheDocument();

  // Test toggling
  await page.getByText('IDEA').click();
  expect(mockToggleActiveType).toHaveBeenCalledWith('IDEA');

  await page.getByText('READY').click();
  expect(mockToggleActiveStatus).toHaveBeenCalledWith('READY');

  await page.getByText('[ PERMANENT_FAILURES_ONLY ]').click();
  expect(mockToggleShowPermanentFailures).toHaveBeenCalled();

  await page.getByText('[ HEATMAP_OVERLAY ]').click();
  expect(mockSetShowHeatmap).toHaveBeenCalled();
});
