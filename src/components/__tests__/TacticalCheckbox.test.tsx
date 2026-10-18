import type React from 'react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalCheckbox } from '../TacticalCheckbox';

describe('TacticalCheckbox', () => {
  it('renders standard standalone checkbox', async () => {
    await render(<TacticalCheckbox data-testid="checkbox-test" />);

    const checkbox = page.getByTestId('checkbox-test');
    await expect.element(checkbox).toBeVisible();
    await expect.element(checkbox).not.toBeChecked();
  });

  it('renders with label and checks/unchecks when clicked', async () => {
    const handleChange = vi.fn<(e: React.ChangeEvent<HTMLInputElement>) => void>();
    await render(<TacticalCheckbox label="Routes Layer" onChange={handleChange} data-testid="checkbox-layer" />);

    const labelElement = page.getByText('Routes Layer');
    await expect.element(labelElement).toBeVisible();

    const checkbox = page.getByTestId('checkbox-layer');
    await expect.element(checkbox).not.toBeChecked();

    await userEvent.click(labelElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles controlled checked state', async () => {
    await render(
      <TacticalCheckbox label="Controlled Checkbox" checked={true} onChange={() => {}} data-testid="controlled-cb" />,
    );

    const checkbox = page.getByTestId('controlled-cb');
    await expect.element(checkbox).toBeChecked();
  });

  it('forwards ref correctly', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<TacticalCheckbox ref={ref} data-testid="ref-cb" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('INPUT');
    expect(ref.current?.type).toBe('checkbox');
  });
});
