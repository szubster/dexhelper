import { describe, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { pokeDB } from '../../../../db/PokeDB';
import { WildItemSelector } from '../WildItemSelector';

describe('WildItemSelector', () => {
  test('renders item targets header and search input', async () => {
    vi.spyOn(pokeDB, 'getAllItems').mockResolvedValue([
      { id: 1, name: 'Master Ball' },
      { id: 2, name: 'Ultra Ball' },
    ]);

    await render(<WildItemSelector />);

    await expect.element(page.getByText('WILD ITEM TRACKER TARGETS')).toBeVisible();
    await expect.element(page.getByPlaceholder('SEARCH ITEMS...')).toBeVisible();
    await expect.element(page.getByText('MASTER BALL')).toBeVisible();
    await expect.element(page.getByText('ULTRA BALL')).toBeVisible();
  });

  test('safely handles error when pokeDB.getAllItems rejects without leaking raw error object', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(pokeDB, 'getAllItems').mockRejectedValue(new Error('Database error'));

    await render(<WildItemSelector />);

    await expect.element(page.getByText('WILD ITEM TRACKER TARGETS')).toBeVisible();
    expect(errorSpy).toHaveBeenCalledWith('Failed to fetch items:', 'Database error');

    errorSpy.mockRestore();
  });
});
