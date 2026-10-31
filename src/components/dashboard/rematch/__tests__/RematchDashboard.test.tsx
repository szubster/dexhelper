import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { RematchDashboard } from '../RematchDashboard';

describe('RematchDashboard', () => {
  it('renders RematchDashboard with correct tactical styling', async () => {
    await render(<RematchDashboard />);

    await expect.element(page.getByText('[REMATCH_DASHBOARD]')).toBeInTheDocument();
    await expect.element(page.getByText('[STATUS: ONLINE]')).toBeInTheDocument();
    await expect.element(page.getByText('[AVAILABLE_REMATCHES]')).toBeInTheDocument();
    await expect.element(page.getByText('[LOCATION_DATA]')).toBeInTheDocument();
  });
});
