import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalBadge } from '../TacticalBadge';

describe('TacticalBadge', () => {
  it('renders correctly with tactical utility classes', async () => {
    await render(<TacticalBadge>Test Badge</TacticalBadge>);
    const badge = page.getByText('Test Badge');
    await expect.element(badge).toBeInTheDocument();
    await expect.element(badge).toHaveClass('tactical-badge');
    const el = badge.element() as HTMLSpanElement;
    const classes = el.className;
    expect(classes).toContain('tactical-badge');
  });

  it('applies variant classes correctly', async () => {
    await render(<TacticalBadge variant="amber">Amber Badge</TacticalBadge>);
    const badge = page.getByText('Amber Badge');
    await expect.element(badge).toBeInTheDocument();
    await expect.element(badge).toHaveClass('text-amber-500/60');
  });

  it('renders status dot and pulse animation when props are passed', async () => {
    await render(
      <TacticalBadge variant="emerald" dot pulse>
        Live Telemetry
      </TacticalBadge>,
    );
    const badgeText = page.getByText('Live Telemetry');
    await expect.element(badgeText).toBeInTheDocument();
    const container = page.getByText('Live Telemetry').element().closest('.tactical-badge');
    expect(container?.className).toContain('animate-pulse');
  });
});
