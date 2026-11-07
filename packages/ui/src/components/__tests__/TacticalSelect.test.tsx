import { describe, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalSelect } from '../TacticalSelect';

describe('TacticalSelect', () => {
  test('renders with children and tactical utility classes', async () => {
    await render(
      <TacticalSelect data-testid="tactical-select-test-id">
        <option value="1">Option 1</option>
      </TacticalSelect>,
    );
    const select = page.getByTestId('tactical-select-test-id');
    await expect.element(select).toBeVisible();
    await expect.element(select).toHaveClass('tactical-select');

    const el = select.element() as HTMLSelectElement;
    const classList = el.className;
    expect(classList).toContain('tactical-select');
  });

  test('handles onChange event', async () => {
    const handleChange = vi.fn<() => void>();
    await render(
      <TacticalSelect onChange={handleChange} data-testid="select">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </TacticalSelect>,
    );
    const select = page.getByTestId('select');
    const el = select.element() as HTMLSelectElement;
    el.value = '2';
    el.dispatchEvent(new Event('change', { bubbles: true }));
    expect(handleChange).toHaveBeenCalled();
  });

  test('applies custom className', async () => {
    await render(
      <TacticalSelect className="custom-class">
        <option value="1">Option 1</option>
      </TacticalSelect>,
    );
    await expect.element(page.getByRole('combobox')).toHaveClass(/custom-class/);
  });

  test('applies containerClassName to wrapper', async () => {
    const { container } = await render(
      <TacticalSelect containerClassName="wrapper-class">
        <option value="1">Option 1</option>
      </TacticalSelect>,
    );
    expect(container.querySelector('.wrapper-class')).not.toBeNull();
  });

  test('renders with edge labels, codeTag, and sublabel', async () => {
    await render(
      <TacticalSelect label="SYS.PORT" codeTag="COM.01" sublabel="BAUD: 9600" showLed ledStatus="online">
        <option value="1">Port 1</option>
      </TacticalSelect>,
    );

    await expect.element(page.getByText('SYS.PORT')).toBeVisible();
    await expect.element(page.getByText('COM.01')).toBeVisible();
    await expect.element(page.getByText('BAUD: 9600')).toBeVisible();
  });

  test('renders with CVA theme variants', async () => {
    await render(
      <TacticalSelect variant="emerald" data-testid="emerald-select">
        <option value="1">Option 1</option>
      </TacticalSelect>,
    );
    const select = page.getByTestId('emerald-select');
    await expect.element(select).toHaveClass(/border-emerald-500/);
  });
});
