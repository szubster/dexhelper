import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { DecorationItem } from '../../../features/decorations/types';
import { DecorationItemCard } from '../DecorationItemCard';

describe('DecorationItemCard', () => {
  const baseItem: DecorationItem = {
    id: 1,
    name: 'FEATHER BED',
    isUnlocked: true,
    isActive: false,
    isMysteryGift: false,
  };

  it('renders unlocked item details correctly', async () => {
    await render(<DecorationItemCard item={baseItem} />);

    await expect.element(page.getByText('FEATHER BED')).toBeVisible();
    await expect.element(page.getByText('ID: 01')).toBeVisible();
    await expect.element(page.getByText('UNLOCKED')).toBeVisible();
  });

  it('renders active badge when item is active', async () => {
    const activeItem: DecorationItem = {
      ...baseItem,
      isActive: true,
    };

    await render(<DecorationItemCard item={activeItem} />);

    await expect.element(page.getByText('ACTIVE')).toBeVisible();
  });

  it('renders mystery gift badge when item is mystery gift', async () => {
    const mgItem: DecorationItem = {
      ...baseItem,
      isMysteryGift: true,
    };

    await render(<DecorationItemCard item={mgItem} />);

    await expect.element(page.getByText('[MG]')).toBeVisible();
  });

  it('renders locked status when item is not unlocked', async () => {
    const lockedItem: DecorationItem = {
      ...baseItem,
      isUnlocked: false,
    };

    await render(<DecorationItemCard item={lockedItem} />);

    await expect.element(page.getByText('LOCKED')).toBeVisible();
  });

  it('applies correct styling for active items', async () => {
    const activeItem: DecorationItem = {
      ...baseItem,
      isActive: true,
    };

    const { container } = await render(<DecorationItemCard item={activeItem} />);
    const cardDiv = container.querySelector('div.flex.flex-col');
    expect(cardDiv?.className).toContain('border-[var(--theme-primary)]');
  });

  it('applies correct styling for locked items', async () => {
    const lockedItem: DecorationItem = {
      ...baseItem,
      isUnlocked: false,
    };

    const { container } = await render(<DecorationItemCard item={lockedItem} />);
    const cardDiv = container.querySelector('div.flex.flex-col');
    expect(cardDiv?.className).toContain('opacity-50');
  });
});
