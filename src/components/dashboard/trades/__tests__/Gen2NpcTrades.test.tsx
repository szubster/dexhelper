import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { EmulatorProvider } from '../../../../contexts/EmulatorContext';
import { useEmulatorStore } from '../../../../emulator/state/emulatorStore';
import type { SaveData } from '../../../../engine/saveParser';
import { Gen2NpcTrades } from '../Gen2NpcTrades';

describe('Gen2NpcTrades', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly with gen 2 data', async () => {
    useEmulatorStore.setState({
      saveData: {
        generation: 2,
        npcTradeFlags: [true, false, true, false, false, false, false],
      } as unknown as SaveData,
    });

    await render(
      <EmulatorProvider>
        <Gen2NpcTrades />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('IN-GAME TRADES')).toBeInTheDocument();
    await expect.element(page.getByText('ROCKY')).toBeInTheDocument();
    await expect.element(page.getByText('ROCKY')).toHaveClass('line-through');
    await expect.element(page.getByText('MUSCLE')).toBeInTheDocument();
    await expect.element(page.getByText('MUSCLE')).not.toHaveClass('line-through');
    await expect.element(page.getByText('VOLTY')).toBeInTheDocument();
    await expect.element(page.getByText('VOLTY')).toHaveClass('line-through');
  });

  it('does not render for gen 3 data', async () => {
    useEmulatorStore.setState({
      saveData: {
        generation: 3,
      } as unknown as SaveData,
    });

    await render(
      <EmulatorProvider>
        <Gen2NpcTrades />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('IN-GAME TRADES')).not.toBeInTheDocument();
  });
});
