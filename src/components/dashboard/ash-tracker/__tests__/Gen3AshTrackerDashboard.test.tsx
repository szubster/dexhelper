import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { Gen3AshTrackerDashboard } from '../Gen3AshTrackerDashboard';

describe('Gen3AshTrackerDashboard', () => {
  it('renders correctly with 0 ash', async () => {
    const { getByText } = await render(<Gen3AshTrackerDashboard gen3VolcanicAsh={0} />);

    await expect.element(getByText('VOLCANIC ASH TRACKER')).toBeInTheDocument();
    await expect.element(getByText('0', { exact: true })).toBeInTheDocument();

    // Check craftable items state
    await expect.element(getByText('Need 250')).toBeInTheDocument();
    await expect.element(getByText('Need 8000')).toBeInTheDocument();
  });

  it('renders correctly with enough ash for some items', async () => {
    const { getByText } = await render(<Gen3AshTrackerDashboard gen3VolcanicAsh={600} />);

    await expect.element(getByText('600', { exact: true })).toBeInTheDocument();

    // Should be able to craft Blue (250), Yellow (500), Red (500)
    // Should NOT be able to craft White (1000)
    await expect.element(getByText('Need 400').first()).toBeInTheDocument(); // 1000 - 600 = 400 (White/Black flute)
    await expect.element(getByText('Need 5400')).toBeInTheDocument(); // 6000 - 600 = 5400 (Pretty Chair)
  });

  it('renders correctly with enough ash for all items', async () => {
    const { getByText, container } = await render(<Gen3AshTrackerDashboard gen3VolcanicAsh={10000} />);

    await expect.element(getByText('10,000', { exact: true })).toBeInTheDocument();

    // "Need X" shouldn't exist since we can craft everything
    const needTextElements = Array.from(container.querySelectorAll('*')).filter((el) =>
      el.textContent?.includes('Need'),
    );
    expect(needTextElements.length).toBe(0);
  });
});
