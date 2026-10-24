import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { Gen3MysteryGift } from '../../../engine/saveParser/parsers/common';
import { MysteryEventTracker } from './MysteryEventTracker';

describe('MysteryEventTracker', () => {
  it('should return null when mysteryGiftData is not provided', async () => {
    await render(<MysteryEventTracker mysteryGiftData={undefined} />);
    await expect.element(page.getByText('MYSTERY EVENT TRACKER')).not.toBeInTheDocument();
  });

  it('should render the tracker when mysteryGiftData is provided', async () => {
    const mockData: Gen3MysteryGift = {
      hasAuroraTicket: true,
      hasMysticTicket: false,
      hasEonTicket: true,
      hasOldSeaMap: false,
      isSouthernIslandEnabled: true,
      isBirthIslandEnabled: true,
      isNavelRockEnabled: false,
      isFarawayIslandEnabled: false,
    };

    await render(<MysteryEventTracker mysteryGiftData={mockData} />);

    await expect.element(page.getByText('MYSTERY EVENT TRACKER')).toBeVisible();
    await expect.element(page.getByText('EON TICKET')).toBeVisible();
    await expect.element(page.getByText('SOUTHERN ISLAND')).toBeVisible();
    await expect.element(page.getByText('MYSTIC TICKET')).toBeVisible();
    await expect.element(page.getByText('AURORA TICKET')).toBeVisible();
  });

  it('should verify truthy states correctly', async () => {
    const mockData: Gen3MysteryGift = {
      hasAuroraTicket: true,
      hasMysticTicket: true,
      hasEonTicket: true,
      hasOldSeaMap: true,
      isSouthernIslandEnabled: true,
      isBirthIslandEnabled: true,
      isNavelRockEnabled: true,
      isFarawayIslandEnabled: true,
    };

    const { getByText } = await render(<MysteryEventTracker mysteryGiftData={mockData} />);

    await expect.element(getByText('MYSTERY EVENT TRACKER')).toBeVisible();

    const acquiredElements = page.getByText('ACQUIRED').elements();
    expect(acquiredElements).toHaveLength(4);

    const enabledElements = page.getByText('ENABLED').elements();
    expect(enabledElements).toHaveLength(4);
  });

  it('should verify falsy states correctly', async () => {
    const mockData: Gen3MysteryGift = {
      hasAuroraTicket: false,
      hasMysticTicket: false,
      hasEonTicket: false,
      hasOldSeaMap: false,
      isSouthernIslandEnabled: false,
      isBirthIslandEnabled: false,
      isNavelRockEnabled: false,
      isFarawayIslandEnabled: false,
    };

    const { getByText } = await render(<MysteryEventTracker mysteryGiftData={mockData} />);

    await expect.element(getByText('MYSTERY EVENT TRACKER')).toBeVisible();

    const missingElements = page.getByText('MISSING').elements();
    expect(missingElements).toHaveLength(4);

    const disabledElements = page.getByText('DISABLED').elements();
    expect(disabledElements).toHaveLength(4);
  });
});
