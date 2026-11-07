import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalCheckbox } from '../TacticalCheckbox';

describe('TacticalCheckbox', () => {
  it('renders correctly as a standalone checkbox input', async () => {
    await render(<TacticalCheckbox data-testid="test-checkbox" />);
    const checkbox = page.getByTestId('test-checkbox');
    await expect.element(checkbox).toBeInTheDocument();
    const el = checkbox.element() as HTMLInputElement;
    expect(el.type).toBe('checkbox');
  });

  it('renders with label and toggles on click', async () => {
    const handleChange = vi.fn<(e: React.ChangeEvent<HTMLInputElement>) => void>();
    await render(<TacticalCheckbox data-testid="test-checkbox" label="Enable Option" onChange={handleChange} />);

    await expect.element(page.getByText('Enable Option')).toBeInTheDocument();
    const checkbox = page.getByTestId('test-checkbox');
    await expect.element(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', async () => {
    const ref = React.createRef<HTMLInputElement>();
    await render(<TacticalCheckbox ref={ref} data-testid="test-checkbox" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('respects disabled state', async () => {
    await render(<TacticalCheckbox data-testid="test-checkbox" label="Disabled Option" disabled />);
    const checkbox = page.getByTestId('test-checkbox');
    const el = checkbox.element() as HTMLInputElement;
    expect(el.disabled).toBe(true);
  });

  it('renders with sublabel and codeTag telemetry badges', async () => {
    await render(
      <TacticalCheckbox
        data-testid="test-checkbox"
        label="Telemetry Channel"
        sublabel="SENSOR_01_ACTIVE"
        codeTag="CH.01"
        variant="emerald"
      />,
    );
    await expect.element(page.getByText('Telemetry Channel')).toBeInTheDocument();
    await expect.element(page.getByText('SENSOR_01_ACTIVE')).toBeInTheDocument();
    await expect.element(page.getByText('[CH.01]')).toBeInTheDocument();
  });

  it('renders with different variants without errors', async () => {
    await render(
      <div>
        <TacticalCheckbox data-testid="cb-default" label="Default" variant="default" />
        <TacticalCheckbox data-testid="cb-amber" label="Amber" variant="amber" />
        <TacticalCheckbox data-testid="cb-red" label="Red" variant="red" />
        <TacticalCheckbox data-testid="cb-blue" label="Blue" variant="blue" />
        <TacticalCheckbox data-testid="cb-purple" label="Purple" variant="purple" />
      </div>,
    );
    await expect.element(page.getByTestId('cb-default')).toBeInTheDocument();
    await expect.element(page.getByTestId('cb-amber')).toBeInTheDocument();
    await expect.element(page.getByTestId('cb-red')).toBeInTheDocument();
    await expect.element(page.getByTestId('cb-blue')).toBeInTheDocument();
    await expect.element(page.getByTestId('cb-purple')).toBeInTheDocument();
  });
});
