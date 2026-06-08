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
});
