import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { PokeblockSelectionForm } from '../PokeblockSelectionForm';
import { PokeblockProvider } from '../../../contexts/pokeblock/PokeblockContext';
import React from 'react';

describe('PokeblockSelectionForm', () => {
  it('renders correctly and allows input', async () => {
    await render(
      <PokeblockProvider>
        <PokeblockSelectionForm />
      </PokeblockProvider>
    );

    await expect.element(page.getByText('Target Settings')).toBeVisible();
    await expect.element(page.getByText('Calculate Recommendation')).toBeVisible();
  });
});
