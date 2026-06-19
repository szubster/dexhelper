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

  await render(
    <DagFilterPanel
      activeTypes={activeTypes}
      activeStatuses={activeStatuses}
      showPermanentFailures={false}
      onTypeToggle={mockOnTypeToggle}
      onStatusToggle={mockOnStatusToggle}
      onTogglePermanentFailures={mockOnTogglePermanentFailures}
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

  await page.getByText('[ PERMANENT_FAILURES_ONLY ]').click();
  expect(mockOnTogglePermanentFailures).toHaveBeenCalled();
});
