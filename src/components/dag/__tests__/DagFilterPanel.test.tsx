import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagFilterPanel } from '../DagFilterPanel';

test('DagFilterPanel renders all types and statuses', async () => {
  const activeTypes = new Set(['TASK']);
  const activeStatuses = new Set(['COMPLETED', 'ACTIVE']);
  const mockOnTypeToggle = vi.fn<(type: string) => void>();
  const mockOnStatusToggle = vi.fn<(status: string) => void>();
  const mockOnTogglePermanentFailures = vi.fn<() => void>();
  const mockOnToggleHeatmap = vi.fn<() => void>();

  await render(
    <DagFilterPanel
      activeTypes={activeTypes}
      activeStatuses={activeStatuses}
      showPermanentFailures={false}
      showHeatmap={false}
      onTypeToggle={mockOnTypeToggle}
      onStatusToggle={mockOnStatusToggle}
      onTogglePermanentFailures={mockOnTogglePermanentFailures}
      onToggleHeatmap={mockOnToggleHeatmap}
    />,
  );

  await expect.element(page.getByText('TASK')).toBeInTheDocument();
  await expect.element(page.getByText('IDEA')).toBeInTheDocument();

  await expect.element(page.getByText('COMPLETED')).toBeInTheDocument();
  await expect.element(page.getByText('PENDING')).toBeInTheDocument();

  // Test toggling
  await page.getByText('IDEA').click();
  expect(mockOnTypeToggle).toHaveBeenCalledWith('IDEA');

  await page.getByText('READY').click();
  expect(mockOnStatusToggle).toHaveBeenCalledWith('READY');

  const permFailuresBtn = page.getByRole('button', { name: 'Toggle permanent failures only' });
  await expect.element(permFailuresBtn).toHaveAttribute('aria-pressed', 'false');
  await permFailuresBtn.click();
  expect(mockOnTogglePermanentFailures).toHaveBeenCalled();

  const heatmapBtn = page.getByRole('button', { name: 'Toggle heatmap overlay' });
  await expect.element(heatmapBtn).toHaveAttribute('aria-pressed', 'false');
  await heatmapBtn.click();
  expect(mockOnToggleHeatmap).toHaveBeenCalled();
});

test('DagFilterPanel renders TacticalButtons with active state variants when flags are true', async () => {
  const activeTypes = new Set<string>();
  const activeStatuses = new Set<string>();

  await render(
    <DagFilterPanel
      activeTypes={activeTypes}
      activeStatuses={activeStatuses}
      showPermanentFailures={true}
      showHeatmap={true}
      onTypeToggle={vi.fn<(type: string) => void>()}
      onStatusToggle={vi.fn<(status: string) => void>()}
      onTogglePermanentFailures={vi.fn<() => void>()}
      onToggleHeatmap={vi.fn<() => void>()}
    />,
  );

  const permFailuresBtn = page.getByRole('button', { name: 'Toggle permanent failures only' });
  await expect.element(permFailuresBtn).toHaveAttribute('aria-pressed', 'true');

  const heatmapBtn = page.getByRole('button', { name: 'Toggle heatmap overlay' });
  await expect.element(heatmapBtn).toHaveAttribute('aria-pressed', 'true');
});
