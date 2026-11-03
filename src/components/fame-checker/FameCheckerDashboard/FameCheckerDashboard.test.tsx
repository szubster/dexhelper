import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useEmulatorStore } from '../../../emulator/state/emulatorStore';
import type { SaveData } from '../../../engine/saveParser/parsers/common';
import { FameCheckerDashboard } from './FameCheckerDashboard';

describe('FameCheckerDashboard', () => {
  it('renders "NO FAME CHECKER DATA FOUND" when no data is present', async () => {
    useEmulatorStore.setState({ saveData: null });
    await render(<FameCheckerDashboard />);

    await expect.element(page.getByText('NO FAME CHECKER DATA FOUND')).toBeInTheDocument();
  });

  it('renders the initial state awaiting selection', async () => {
    useEmulatorStore.setState({
      saveData: {
        gameVersion: 'firered',
        gen3FameChecker: Array(16).fill({
          pickState: 0,
          flavorTextFlags: Array(6).fill(false),
        }),
      } as unknown as SaveData,
    });

    await render(<FameCheckerDashboard />);

    await expect.element(page.getByText('AWAITING TARGET SELECTION')).toBeInTheDocument();
    await expect.element(page.getByText('Fame Checker Targets')).toBeInTheDocument();
  });

  it('updates entry list when an NPC is selected', async () => {
    useEmulatorStore.setState({
      saveData: {
        gameVersion: 'firered',
        gen3FameChecker: Array(16)
          .fill({
            pickState: 0,
            flavorTextFlags: Array(6).fill(false),
          })
          .map((item, index) =>
            index === 0 ? { ...item, flavorTextFlags: [true, false, true, false, false, false] } : item,
          ),
      } as unknown as SaveData,
    });

    await render(<FameCheckerDashboard />);

    const oakButton = page.getByRole('button', { name: 'Prof. Oak' });
    await oakButton.click();

    await expect.element(page.getByText('Prof. Oak Profile')).toBeInTheDocument();

    // Based on the data, the first and third entries are unlocked
    const unlockedEntries = page.getByText(/Profile data fragment/).all();
    expect(unlockedEntries).toHaveLength(2);

    const lockedEntries = page.getByText('??? [DATA CORRUPTED]').all();
    expect(lockedEntries).toHaveLength(4);
  });
});
