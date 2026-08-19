import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { LocationGroupedHiddenItems } from '../HiddenItemsChecklist';
import { HiddenItemsChecklist } from '../HiddenItemsChecklist';

describe('HiddenItemsChecklist', () => {
  const mockData: LocationGroupedHiddenItems[] = [
    {
      locationId: 1,
      locationName: 'Route 1',
      items: [
        { itemId: 101, itemName: 'Potion', isAcquired: true },
        { itemId: 102, itemName: 'Antidote', isAcquired: false },
      ],
    },
    {
      locationId: 2,
      locationName: 'Viridian City',
      items: [
        { itemId: 103, itemName: 'Rare Candy', isAcquired: undefined }, // treated as unacquired
      ],
    },
  ];

  it('renders default to REMAINING filter, showing unacquired items', async () => {
    await render(<HiddenItemsChecklist groupedItems={mockData} />);

    // By default, only unacquired items should be shown
    await expect.element(page.getByText('Potion')).not.toBeInTheDocument();
    await expect.element(page.getByText('Antidote')).toBeInTheDocument();
    await expect.element(page.getByText('Rare Candy')).toBeInTheDocument();

    // Group headings should be present
    await expect.element(page.getByText('Route 1')).toBeInTheDocument();
    await expect.element(page.getByText('Viridian City')).toBeInTheDocument();
  });

  it('renders ALL filter correctly', async () => {
    await render(<HiddenItemsChecklist groupedItems={mockData} />);

    // Click on ALL TARGETS filter
    await page.getByRole('radio', { name: 'ALL TARGETS' }).click();

    // All items should be present
    await expect.element(page.getByText('Potion')).toBeInTheDocument();
    await expect.element(page.getByText('Antidote')).toBeInTheDocument();
    await expect.element(page.getByText('Rare Candy')).toBeInTheDocument();
  });

  it('renders FOUND filter correctly', async () => {
    await render(<HiddenItemsChecklist groupedItems={mockData} />);

    // Click on ACQUIRED filter
    await page.getByRole('radio', { name: 'ACQUIRED' }).click();

    // Only acquired items should be shown
    await expect.element(page.getByText('Potion')).toBeInTheDocument();
    await expect.element(page.getByText('Antidote')).not.toBeInTheDocument();
    await expect.element(page.getByText('Rare Candy')).not.toBeInTheDocument();

    // Group that has no acquired items should be hidden
    await expect.element(page.getByText('Viridian City')).not.toBeInTheDocument();
  });

  it('renders empty state when no items match filter', async () => {
    const allFoundData: LocationGroupedHiddenItems[] = [
      {
        locationId: 1,
        locationName: 'Route 1',
        items: [{ itemId: 101, itemName: 'Potion', isAcquired: true }],
      },
    ];

    await render(<HiddenItemsChecklist groupedItems={allFoundData} />);

    // Default REMAINING will have no items
    await expect.element(page.getByText('NO TARGETS FOUND IN SCAN')).toBeInTheDocument();
  });
});
