import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import {
  ITEM_AURORA_TICKET,
  ITEM_EON_TICKET,
  ITEM_MYSTIC_TICKET,
  ITEM_OLD_SEA_MAP,
} from '@dexhelper/engine/saveParser/gen3/inventory/constants';
import type { SaveData } from '@dexhelper/engine/saveParser/parsers/common';
import { Gen3EventItemsDashboard } from '../Gen3EventItemsDashboard';

describe('Gen3EventItemsDashboard', () => {
  test('renders null if generation is not 3', async () => {
    const saveData = { generation: 2 } as SaveData;
    void render(<Gen3EventItemsDashboard saveData={saveData} />);
    await expect.element(page.getByText('EVENT ITEMS')).not.toBeInTheDocument();
  });

  test('renders null if gen3EventItems is missing', async () => {
    const saveData = { generation: 3 } as SaveData;
    void render(<Gen3EventItemsDashboard saveData={saveData} />);
    await expect.element(page.getByText('EVENT ITEMS')).not.toBeInTheDocument();
  });

  test('renders the event items correctly', async () => {
    const saveData = {
      generation: 3,
      gen3EventItems: {
        [ITEM_EON_TICKET]: true,
        [ITEM_MYSTIC_TICKET]: false,
        [ITEM_AURORA_TICKET]: true,
        [ITEM_OLD_SEA_MAP]: false,
      },
    } as unknown as SaveData;

    void render(<Gen3EventItemsDashboard saveData={saveData} />);

    await expect.element(page.getByText('EVENT ITEMS')).toBeVisible();

    const claimed = page.getByText('[X]');
    const unclaimed = page.getByText('[ ]');
    expect(claimed.elements().length).toBe(2);
    expect(unclaimed.elements().length).toBe(2);

    await expect.element(page.getByText('EON TICKET')).toBeVisible();
    await expect.element(page.getByText('MYSTIC TICKET')).toBeVisible();
    await expect.element(page.getByText('AURORA TICKET')).toBeVisible();
    await expect.element(page.getByText('OLD SEA MAP')).toBeVisible();
  });
});
