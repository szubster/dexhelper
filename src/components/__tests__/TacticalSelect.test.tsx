import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalSelect } from '../TacticalSelect';

describe('TacticalSelect', () => {
  test('renders with children', async () => {
    await render(
      <TacticalSelect>
        <option value="1">Option 1</option>
      </TacticalSelect>,
    );
    await expect.element(page.getByRole('combobox')).toBeVisible();
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
    // The select is now wrapped in a div with the container class
    expect(container.querySelector('.wrapper-class')).not.toBeNull();
  });
});
