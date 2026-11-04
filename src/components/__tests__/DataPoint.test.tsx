import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DataPoint } from '../DataPoint';

describe('DataPoint', () => {
  it('renders label and value correctly', async () => {
    expect.hasAssertions();
    await render(<DataPoint label="LOCATION" value="ROUTE 119" />);
    await expect.element(page.getByText('LOCATION')).toBeInTheDocument();
    await expect.element(page.getByText('ROUTE 119')).toBeInTheDocument();
  });

  it('renders children when value is not provided', async () => {
    expect.hasAssertions();
    await render(
      <DataPoint label="TELEMETRY">
        <span data-testid="child-telemetry">LIVE STREAM</span>
      </DataPoint>,
    );
    await expect.element(page.getByText('TELEMETRY')).toBeInTheDocument();
    await expect.element(page.getByTestId('child-telemetry')).toBeInTheDocument();
  });

  it('renders codeTag and sublabel when provided', async () => {
    expect.hasAssertions();
    await render(<DataPoint label="SYS_TARGET" value="RAYQUAZA" codeTag="TGT.01" sublabel="STATUS: SYNCED" />);
    await expect.element(page.getByText('SYS_TARGET')).toBeInTheDocument();
    await expect.element(page.getByText('[TGT.01]')).toBeInTheDocument();
    await expect.element(page.getByText('RAYQUAZA')).toBeInTheDocument();
    await expect.element(page.getByText('STATUS: SYNCED')).toBeInTheDocument();
  });

  it('applies custom classNames and theme variants', async () => {
    expect.hasAssertions();
    const { container } = await render(
      <DataPoint
        label="METRIC"
        value="OPTIMAL"
        variant="emerald"
        size="sm"
        className="custom-point"
        labelClassName="custom-label"
        valueClassName="custom-value"
      />,
    );
    const customPoint = container.querySelector<HTMLElement>('.custom-point');
    const customLabel = container.querySelector<HTMLElement>('.custom-label');
    const customValue = container.querySelector<HTMLElement>('.custom-value');

    expect(customPoint).not.toBeNull();
    expect(customLabel).not.toBeNull();
    expect(customValue).not.toBeNull();
    expect(customPoint?.className).toContain('border-emerald-500/30');
    expect(customPoint?.className).toContain('p-2');
  });

  it('renders hardware crosshairs, dashed borders, and active status LED', async () => {
    expect.hasAssertions();
    const { container } = await render(
      <DataPoint label="STATUS" value="ONLINE" showLed ledStatus="online" variant="amber" />,
    );

    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain('border-dashed');
    expect(card.className).toContain('group');

    const led = container.querySelector('[aria-hidden="true"].bg-emerald-500');
    expect(led).not.toBeNull();
  });
});
