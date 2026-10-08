import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ShoalCaveDashboard } from './ShoalCaveDashboard';

describe('ShoalCaveDashboard', () => {
  it('renders TideDisplay and ShoalItemTracker', async () => {
    await render(
      <ShoalCaveDashboard tide="High" hoursUntilNextTide={2} minutesUntilNextTide={30} shells={2} salts={1} />,
    );

    await expect.element(page.getByText('Shoal Cave Tide Status')).toBeInTheDocument();
    await expect.element(page.getByText('High')).toBeInTheDocument();
    await expect.element(page.getByText('2h 30m')).toBeInTheDocument();

    await expect.element(page.getByText('Shoal Shells')).toBeInTheDocument();
    await expect.element(page.getByText('2 / 4')).toBeInTheDocument();
    await expect.element(page.getByText('INSUFFICIENT MATERIALS')).toBeInTheDocument();
  });
});
