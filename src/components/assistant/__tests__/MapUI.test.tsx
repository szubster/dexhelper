import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { MapUI } from '../MapUI';

describe('MapUI', () => {
  it('should not render anything if heatmap is empty or has only 0 density', async () => {
    await render(<MapUI heatmap={{ 1: 0, 2: 0 }} />);
    // When returning null, the DOM element won't have the elements we look for.
    await expect.element(page.getByText(/Active Route Radar/i)).not.toBeInTheDocument();
  });

  it('should render route radar correctly when there is heatmap data', async () => {
    const heatmap = { 10: 2, 20: 5 };
    const areaNames = { 10: 'Route 1', 20: 'Route 2' };

    await render(<MapUI heatmap={heatmap} areaNames={areaNames} />);

    // Header text
    await expect.element(page.getByText(/Active Route Radar/i)).toBeVisible();
    await expect.element(page.getByText(/ROUTE\.RADAR/)).toBeVisible();

    // Area Names
    await expect.element(page.getByText('Route 1')).toBeVisible();
    await expect.element(page.getByText('Route 2')).toBeVisible();

    // Density values
    await expect.element(page.getByText('[2]')).toBeVisible();
    await expect.element(page.getByText('[5]')).toBeVisible();
  });

  it('should default to generic area name if areaNames is not provided', async () => {
    const heatmap = { 99: 1 };

    await render(<MapUI heatmap={heatmap} />);

    await expect.element(page.getByText('AREA #99')).toBeVisible();
  });
});
