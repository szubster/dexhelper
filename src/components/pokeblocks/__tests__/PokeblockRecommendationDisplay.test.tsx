import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { PokeblockProvider } from '../../../contexts/pokeblock/PokeblockContext';
import { PokeblockRecommendationDisplay } from '../PokeblockRecommendationDisplay';

describe('PokeblockRecommendationDisplay', () => {
  it('renders default state', async () => {
    await render(
      <PokeblockProvider>
        <PokeblockRecommendationDisplay />
      </PokeblockProvider>,
    );

    await expect.element(page.getByText('Recommendation Results')).toBeVisible();
    await expect
      .element(page.getByText('No recommendation calculated yet. Adjust settings and click calculate.'))
      .toBeVisible();
  });
});
