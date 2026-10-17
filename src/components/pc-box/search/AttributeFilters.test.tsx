import { beforeEach, describe, expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useStore } from '../../../store';
import { AttributeFilters } from './AttributeFilters';

describe('AttributeFilters', () => {
  beforeEach(() => {
    useStore.setState({ attributeFilters: {} });
  });

  test('renders all filter sections', async () => {
    await render(<AttributeFilters />);

    await expect.element(page.getByText('ATTRIBUTE_FILTERS')).toBeVisible();
    await expect.element(page.getByText('NATURE')).toBeVisible();
    await expect.element(page.getByText('GENDER')).toBeVisible();
    await expect.element(page.getByText('ABILITY')).toBeVisible();
    await expect.element(page.getByText('HELD ITEM')).toBeVisible();
  });

  test('updates ability filter on input', async () => {
    await render(<AttributeFilters />);

    const abilityInput = page.getByPlaceholder('Ability name...');
    await abilityInput.fill('Intimidate');

    expect(useStore.getState().attributeFilters.ability).toBe('Intimidate');
  });

  test('updates held item filter on input', async () => {
    await render(<AttributeFilters />);

    const heldItemInput = page.getByPlaceholder('Item name...');
    await heldItemInput.fill('Leftovers');

    expect(useStore.getState().attributeFilters.heldItem).toBe('Leftovers');
  });

  test('updates nature filter on select', async () => {
    await render(<AttributeFilters />);

    const natureSelect = page.getByRole('combobox');
    await userEvent.selectOptions(natureSelect, 'jolly');

    expect(useStore.getState().attributeFilters.nature).toBe('jolly');
  });

  test('updates gender filter on click', async () => {
    await render(<AttributeFilters />);

    const maleButton = page.getByText('Male', { exact: true });
    await maleButton.click();

    expect(useStore.getState().attributeFilters.gender).toBe('Male');
  });
});
