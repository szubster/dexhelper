import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { pokeDB } from '../../../db/PokeDB';
import type { ItemMetadata } from '../../../db/schema';
import { useStore } from '../../../store';
import { WildItemSelector } from './WildItemSelector';

vi.mock('../../../db/PokeDB', () => ({
  pokeDB: {
    getAllItems: vi.fn<() => Promise<ItemMetadata[]>>(),
  },
}));

describe('WildItemSelector', () => {
  const mockItems = [
    { id: 1, name: 'Potion', cost: 100 },
    { id: 2, name: 'Antidote', cost: 100 },
    { id: 3, name: 'Paralyze Heal', cost: 200 },
  ] as ItemMetadata[];

  beforeEach(() => {
    vi.mocked(pokeDB.getAllItems).mockResolvedValue(mockItems);
    useStore.setState({
      selectedWildItemIds: [],
    });
  });

  it('should render the component', async () => {
    await render(<WildItemSelector />);
    await expect.element(page.getByText('WILD ITEM TRACKER TARGETS')).toBeVisible();
  });

  it('should filter items based on search query', async () => {
    await render(<WildItemSelector />);
    await expect.element(page.getByText('POTION')).toBeVisible();
    await expect.element(page.getByText('ANTIDOTE')).toBeVisible();

    const input = page.getByPlaceholder('SEARCH ITEMS...');
    await input.fill('pot');

    await expect.element(page.getByText('POTION')).toBeVisible();
    await expect.element(page.getByText('ANTIDOTE')).not.toBeInTheDocument();
  });

  it('should toggle item selection', async () => {
    await render(<WildItemSelector />);

    // Add item - find the actual button and click it
    // Use role for selecting item
    const els = page.getByRole('button', { name: 'POTION' });
    await els.first().click();
    expect(useStore.getState().selectedWildItemIds).toContain(1);

    // UI should show it in the selected targets section
    await expect.element(page.getByText('SELECTED TARGETS')).toBeVisible();

    // The button should now be primary (or selected in some way)
    // There are now two elements with POTION text - the main list button and the selected item badge
    // In WildItemSelector, the selected tags use title="Remove target" for the X button
    // The actual button in the list can be clicked again to unselect

    // Click the X button in the selected targets list
    const removeBtn = page.getByTitle('Remove target');
    await removeBtn.click();

    expect(useStore.getState().selectedWildItemIds).not.toContain(1);
  });

  it('should remove item via the X button in selected targets', async () => {
    useStore.setState({ selectedWildItemIds: [1] });
    await render(<WildItemSelector />);

    await expect.element(page.getByText('SELECTED TARGETS')).toBeVisible();

    const removeBtn = page.getByTitle('Remove target');
    await removeBtn.click();

    expect(useStore.getState().selectedWildItemIds).not.toContain(1);
  });

  it('should clear all items', async () => {
    useStore.setState({ selectedWildItemIds: [1, 2] });
    await render(<WildItemSelector />);

    const clearBtn = page.getByText('CLEAR ALL');
    await clearBtn.click();

    expect(useStore.getState().selectedWildItemIds).toHaveLength(0);
  });
});
