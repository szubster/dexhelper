import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { RematchDashboard } from '../RematchDashboard';

describe('RematchDashboard', () => {
  it('renders correctly', async () => {
    const { getByText } = await render(<RematchDashboard />);
    await expect.element(getByText('[REMATCH_DASHBOARD]')).toBeInTheDocument();
    await expect.element(getByText('[AVAILABLE_REMATCHES]')).toBeInTheDocument();
    await expect.element(getByText('[LOCATION_DATA]')).toBeInTheDocument();
  });
});
