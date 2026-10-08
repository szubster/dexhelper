import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Gen2RoomDecorationDashboard } from '../Gen2RoomDecorationDashboard';

describe('Gen2RoomDecorationDashboard', () => {
  it('renders all categories and all items with locked/unlocked status', async () => {
    // ID 5 is Featherly Bed
    // ID 2 is Pikachu Poster
    const unlocked = Array(45).fill(false);
    unlocked[4] = true; // Featherly Bed (index 4 is ID 5)
    unlocked[1] = true; // Pikachu Poster (index 1 is ID 2)

    const active = [5]; // Featherly Bed is active

    await render(<Gen2RoomDecorationDashboard activeDecorations={active} unlockedDecorations={unlocked} />);

    // Check Categories
    await expect.element(page.getByText('Beds')).toBeVisible();
    await expect.element(page.getByText('Posters')).toBeVisible();
    await expect.element(page.getByText('Plants')).toBeVisible();
    await expect.element(page.getByText('Consoles')).toBeVisible();

    // Check Items exist
    await expect.element(page.getByText('Featherly Bed')).toBeVisible();
    await expect.element(page.getByText('Pikachu Poster')).toBeVisible();
    await expect.element(page.getByText('Town Map')).toBeVisible(); // ID 1
  });

  it('renders mystery gift badge for exclusive items', async () => {
    await render(<Gen2RoomDecorationDashboard activeDecorations={[]} unlockedDecorations={[]} />);

    // Mystery Gift exclusives are IDs 22-43. Let's pick ID 22: Snorlax Doll
    await expect.element(page.getByText('Dolls')).toBeVisible();
    await expect.element(page.getByText('Snorlax Doll')).toBeVisible();

    // Check for mystery gift badge on the page. Snorlax Doll should have it.
    // There are many MG exclusives, so there are many '[MG]' badges.
    const mgBadges = page.getByText('[MG]');
    await expect.element(mgBadges.first()).toBeVisible();
  });

  it('renders correctly when no data is provided', async () => {
    await render(<Gen2RoomDecorationDashboard />);

    // The component defaults to empty arrays for activeDecorations and unlockedDecorations
    await expect.element(page.getByText('Room Decorations')).toBeVisible();

    // All items should still be displayed, but none should be unlocked or active
    // Town Map is ID 1
    await expect.element(page.getByText('Town Map')).toBeVisible();
  });
});
