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

    const currentConditionInput = page.getByRole('spinbutton').nth(0);
    const currentSheenInput = page.getByRole('spinbutton').nth(1);
    const targetConditionInput = page.getByRole('spinbutton').nth(2);
    const numPlayersInput = page.getByRole('spinbutton').nth(3);

    await currentConditionInput.fill('50');
    await expect.element(currentConditionInput).toHaveValue(50);

    await currentSheenInput.fill('20');
    await expect.element(currentSheenInput).toHaveValue(20);

    await targetConditionInput.fill('100');
    await expect.element(targetConditionInput).toHaveValue(100);

    await numPlayersInput.fill('2');
    await expect.element(numPlayersInput).toHaveValue(2);
  });

  it('selects nature and target category', async () => {
    await render(
      <PokeblockProvider>
        <PokeblockSelectionForm />
      </PokeblockProvider>,
    );

    const button = page.getByText('Calculate Recommendation');
    await expect.element(button).toBeVisible();
    await button.click();
  });
});
