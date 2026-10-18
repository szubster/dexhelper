import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalProgressBar } from '../TacticalProgressBar';

describe('TacticalProgressBar', () => {
  it('renders label and value correctly', async () => {
    const { container } = await render(<TacticalProgressBar label="POWER" value={100} max={200} />);

    await expect.element(page.getByText('[ POWER ]')).toBeVisible();

    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).not.toBeNull();
    expect(progressBar?.getAttribute('aria-valuenow')).toBe('100');
    expect(progressBar?.getAttribute('aria-valuemax')).toBe('200');
  });

  it('renders custom valueDisplay when provided', async () => {
    await render(
      <TacticalProgressBar label="SHEEN" value={255} valueDisplay={<span data-testid="custom-val">255 (MAX)</span>} />,
    );

    await expect.element(page.getByTestId('custom-val')).toBeVisible();
    await expect.element(page.getByText('255 (MAX)')).toBeVisible();
  });

  it('renders custom segment counts', async () => {
    const { container } = await render(<TacticalProgressBar label="STAT" value={50} max={100} segments={10} />);

    const segments = container.querySelectorAll('[role="progressbar"] > div');
    expect(segments.length).toBe(10);
  });

  it('renders codeTag and applies variant styles', async () => {
    await render(<TacticalProgressBar label="TEMP" value={150} max={255} codeTag="THERM.01" variant="amber" />);

    await expect.element(page.getByText('[THERM.01]')).toBeVisible();
    await expect.element(page.getByText('[ TEMP ]')).toBeVisible();
  });
});
