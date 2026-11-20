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

  const permFailuresBtn = page.getByRole('button', { name: 'Toggle permanent failures only' });
  await expect.element(permFailuresBtn).toHaveAttribute('aria-pressed', 'false');
  await permFailuresBtn.click();
  expect(mockToggleShowPermanentFailures).toHaveBeenCalled();

  const heatmapBtn = page.getByRole('button', { name: 'Toggle heatmap overlay' });
  await expect.element(heatmapBtn).toHaveAttribute('aria-pressed', 'false');
  await heatmapBtn.click();
  expect(mockSetShowHeatmap).toHaveBeenCalled();
});

test('DagFilterPanel renders TacticalButtons with active state variants when flags are true', async () => {
  const activeTypes = new Set<string>();
  const activeStatuses = new Set<string>();

  mockUseDagContext.mockReturnValue({
    activeTypes,
    activeStatuses,
    showPermanentFailures: true,
    showHeatmap: true,
    toggleActiveType: vi.fn<(type: string) => void>(),
    toggleActiveStatus: vi.fn<(status: string) => void>(),
    toggleShowPermanentFailures: vi.fn<() => void>(),
    setShowHeatmap: vi.fn<() => void>(),
  });

  await render(<DagFilterPanel />);

  const permFailuresBtn = page.getByRole('button', { name: 'Toggle permanent failures only' });
  await expect.element(permFailuresBtn).toHaveAttribute('aria-pressed', 'true');
  await expect.element(permFailuresBtn).toHaveAttribute('data-testid', 'btn-toggle-failures');

  const heatmapBtn = page.getByRole('button', { name: 'Toggle heatmap overlay' });
  await expect.element(heatmapBtn).toHaveAttribute('aria-pressed', 'true');
});
