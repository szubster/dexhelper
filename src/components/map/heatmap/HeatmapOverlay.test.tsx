import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { HeatmapOverlay } from './HeatmapOverlay';

test('HeatmapOverlay renders high density areas with glow', async () => {
  const mockData = {
    10: { density: 80, requiresMachBike: false, requiresAcroBike: false },
  };

  await render(<HeatmapOverlay heatmapData={mockData} config={{ showGlow: true, showDensityLabels: true }} />);

  // Should render the element with the correct text and glow class
  const element = page.getByText('80').element();
  // Traverse up to the parent div containing the class
  const parent = element?.parentElement;
  expect(parent?.className).toContain('bg-orange-900');
  expect(parent?.className).toContain('animate-pulse');
});

test('HeatmapOverlay renders labels when enabled', async () => {
  const mockData = {
    20: { density: 55, requiresMachBike: false, requiresAcroBike: false },
  };

  await render(<HeatmapOverlay heatmapData={mockData} config={{ showDensityLabels: true }} />);

  const label = page.getByText('55');
  await expect.element(label).toBeVisible();
});

test('HeatmapOverlay handles interaction', async () => {
  const mockData = {
    30: { density: 95, requiresMachBike: false, requiresAcroBike: false },
  };
  const onClick = vi.fn<(areaId: number, density: number) => void>();

  await render(<HeatmapOverlay heatmapData={mockData} config={{ showDensityLabels: true }} onAreaClick={onClick} />);

  // The interactive element will be the one with the color class
  const element = page.getByText('95').element()?.parentElement;
  element?.click();

  expect(onClick).toHaveBeenCalledWith(30, 95);
});
