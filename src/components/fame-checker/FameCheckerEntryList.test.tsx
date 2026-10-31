import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FameCheckerEntryList } from './FameCheckerEntryList';

describe('FameCheckerEntryList', () => {
  it('renders unlocked and missing entries correctly', async () => {
    const mockEntries = [
      { id: 0, unlocked: true, flavorText: 'Oak is a Pokemon researcher.' },
      { id: 1, unlocked: false, flavorText: 'He lives in Pallet Town.' },
    ];

    await render(<FameCheckerEntryList npcName="Prof. Oak" entries={mockEntries} />);

    await expect.element(page.getByText('Prof. Oak Profile')).toBeInTheDocument();
    await expect.element(page.getByText('Oak is a Pokemon researcher.')).toBeInTheDocument();
    await expect.element(page.getByText('??? [DATA CORRUPTED]')).toBeInTheDocument();
    await expect.element(page.getByText('Unlock condition not met')).toBeInTheDocument();

    const missingText = page.getByText('He lives in Pallet Town.');
    await expect.element(missingText).not.toBeInTheDocument();
  });
});
