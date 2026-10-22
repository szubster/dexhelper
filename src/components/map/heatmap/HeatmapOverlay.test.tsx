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

test('HeatmapOverlay does not render zero density or below low threshold', async () => {
  const mockData = {
    40: { density: 5, requiresMachBike: false, requiresAcroBike: false }, // below low threshold (10)
  };

  await render(<HeatmapOverlay heatmapData={mockData} config={{ showDensityLabels: true }} />);

  // The element should not be rendered, so getByText should throw or not be found
  await expect.element(page.getByText('5')).not.toBeInTheDocument();
});

test('HeatmapOverlay renders empty when data is empty', async () => {
  await render(<HeatmapOverlay heatmapData={{}} config={{ showDensityLabels: true }} />);

  // It should just render the grid container but no inner density boxes
  await expect.element(page.getByText('0')).not.toBeInTheDocument();
});

test('HeatmapOverlay displays bike requirements indicators', async () => {
  const mockData = {
    50: { density: 75, requiresMachBike: true, requiresAcroBike: true },
  };

  await render(<HeatmapOverlay heatmapData={mockData} config={{ showDensityLabels: true }} />);

  // The Mach Bike indicator is yellow-400
  // The Acro Bike indicator is blue-400
  await expect.element(page.getByTitle('Requires Mach Bike')).toBeInTheDocument();
  await expect.element(page.getByTitle('Requires Acro Bike')).toBeInTheDocument();
});
