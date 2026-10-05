import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { PokeblockOptimizerPanel } from '../PokeblockOptimizerPanel';

describe('PokeblockOptimizerPanel', () => {
  it('renders correctly', async () => {
    await render(<PokeblockOptimizerPanel />);
    await expect.element(page.getByText('POKEBLOCK OPTIMIZER')).toBeVisible();
    await expect.element(page.getByText('Target Settings')).toBeVisible();
    await expect.element(page.getByText('Recommendation Results')).toBeVisible();
    await expect
      .element(page.getByText('No recommendation calculated yet. Adjust settings and click calculate.'))
      .toBeVisible();
  });
});
