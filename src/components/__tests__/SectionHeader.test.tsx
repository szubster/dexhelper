import { Activity } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { SectionHeader } from '../SectionHeader';

describe('SectionHeader', () => {
  it('renders title and icon correctly', async () => {
    const { getByText, container } = await render(
      <SectionHeader title="Geospatial Telemetry" icon={<Activity data-testid="activity-icon" size={14} />} />,
    );

    await expect.element(getByText('Geospatial Telemetry')).toBeVisible();
    expect(container.querySelector('[data-testid="activity-icon"]')).not.toBeNull();
  });

  it('renders subtitle, badge, and action elements', async () => {
    const { getByText } = await render(
      <SectionHeader
        title="SYSTEM LOGS"
        subtitle="SUB-NODE 04"
        badge={<span data-testid="test-badge">[ONLINE]</span>}
        action={<button type="button">REFRESH</button>}
      />,
    );

    await expect.element(getByText('SYSTEM LOGS')).toBeVisible();
    await expect.element(getByText('SUB-NODE 04')).toBeVisible();
    await expect.element(getByText('[ONLINE]')).toBeVisible();
    await expect.element(getByText('REFRESH')).toBeVisible();
  });

  it('applies variant styling classes properly', async () => {
    const { container } = await render(<SectionHeader title="EMERGENCY ALERT" variant="red" />);

    const rootElement = container.firstElementChild;
    expect(rootElement?.className).toContain('border-red-500/30');
    expect(rootElement?.className).toContain('bg-red-950/20');
  });
});
