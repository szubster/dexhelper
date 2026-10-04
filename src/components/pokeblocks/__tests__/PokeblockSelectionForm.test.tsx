import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { PokeblockProvider } from '../../../contexts/pokeblock/PokeblockContext';
import { PokeblockSelectionForm } from '../PokeblockSelectionForm';

describe('PokeblockSelectionForm', () => {
  it('renders correctly and allows input', async () => {
    await render(
      <PokeblockProvider>
        <PokeblockSelectionForm />
      </PokeblockProvider>,
    );

    await expect.element(page.getByText('Target Settings')).toBeVisible();
    await expect.element(page.getByText('Calculate Recommendation')).toBeVisible();
  });
});
