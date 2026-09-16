import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { RngCalculatorDashboard } from './RngCalculatorDashboard';

describe('RngCalculatorDashboard', () => {
  it('renders the RngExplainer within the dashboard', async () => {
    await render(<RngCalculatorDashboard />);
    await expect.element(page.getByText('RNG CALCULATOR TOOLBOX')).toBeInTheDocument();
    await expect.element(page.getByText('RNG Tool Integration')).toBeInTheDocument();
  });
});
